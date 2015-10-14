
'use strict'
import _ from './util'

export default {

  attributes_remove(it) {
    var re = ''

    var attrs = arguments[1] || []
    if (attrs.length === 1) {
      re = re + `
  @.removeAttribute(_this, ${it.id}, '${_.translateMarks(attrs[0])}')
`
    } else if (attrs.length > 1) {
      var exclusions = attrs.map((item) => {
        return `'${_.translateMarks(item)}'`
      })
      re = re + `
  @.removeAttributes(_this, ${it.id}, ${exclusions.join(',')})
`
    }

    return re
  },
  attributes_update(it) {
    var re = ''

    var attrs = arguments[1] || []
    _.each(attrs, (attr) => {
      if (attr.isErratic) {
        if (attr.isProperty) {
          re = re + `
      var _tmp = ${attr.valueString}
      if (@.getProperty(_this, ${it.id}, '${_.translateMarks(attr.key)}') !== _tmp) {
        @.setProperty(_this, ${it.id}, '${_.translateMarks(attr.key)}', _tmp)
      }
`
        } else {
          re = re + `
      var _tmp = ${attr.valueString}
      if (_last[${attr.valueId}] !== _tmp) {
        _last[${attr.valueId}] = _tmp
        @.setAttribute(_this, ${it.id}, '${_.translateMarks(attr.key)}', _tmp)
      }
`
        }
      } else {
        if (attr.isProperty) {
          re = re + `
      @.setProperty(_this, ${it.id}, '${_.translateMarks(attr.key)}', '${_.translateMarks(attr.value)}')
`
        } else {
          re = re + `
      @.setAttribute(_this, ${it.id}, '${_.translateMarks(attr.key)}', '${_.translateMarks(attr.value)}')
`
        }
      }
    })

    return re
  },
  compile_amd(it) {
    var re = ''

    var paths = [`'${it.dependency}'`]
    var variables = ['_dep']
    for (var i = 0, len = it.requires.length; i < len; i++) {
      var item = it.requires[i]
      paths.push(`'${item.path}'`)
      variables.push(item.name)
    }

    re = re + `
;define('${it.moduleId}', [${paths.join(',')}], function(${variables.join(',')}){
  ${this.compile_template(it)}
  return ${it.templateName}
})
`

    return re
  },
  compile_cmd(it) {
    var re = ''

    var requires = []
    for (var i = 0, len = it.requires.length; i < len; i++) {
      var item = it.requires[i]
      requires.push(`var ${item.name} = require('${item.path}')`)
    }

    re = re + `
;define(function(require, exports, module){
  ${requires.join('\n')}
  var _dep = require('${it.dependency}')
  ${this.compile_template(it)}
  module.exports = exports['default'] = ${it.templateName}
})
`

    return re
  },
  compile_common(it) {
    var re = ''

    var requires = []
    for (var i = 0, len = it.requires.length; i < len; i++) {
      var item = it.requires[i]
      requires.push(`var ${item.name} = require('${item.path}')`)
    }

    re = re + `
'use strict'

${requires.join('\n')}
var _dep = require('${it.dependency}')
${this.compile_template(it)}
module.exports = exports['default'] = ${it.templateName}
`

    return re
  },
  compile_global(it) {
    var re = ''

    var requires = []
    for (var i = 0, len = it.requires.length; i < len; i++) {
      var item = it.requires[i]
      requires.push(`var ${item.name} = global['${item.path}']`)
    }

    re = re + `
;(function(global){
  ${requires.join('\n')}
  var _dep = global['${it.dependency}']
  ${this.compile_template(it)}
  global.${it.moduleId} = ${it.templateName}
})(window)
`

    return re
  },
  compile_template(it) {
    var re = ''

    re = re + `
// 默认认为_dep对象已经存在了
var _dep_createTemplate = _dep.dep_createTemplate
// __bodyStart__
it.newDoms.join('\n')
`

    return re
  },
  element_create(it) {
    var re = ''

    var nullString = 'null'
    var attributesString = nullString
    var propertiesString = nullString
    var parentElementId = it.parentId
    if (it.isRoot)
      parentElementId = nullString

    if (!_.isEmpty(it.attributes)) {
      attributesString = JSON.stringify(it.attributes, null, 2)
    }
    if (!_.isEmpty(it.properties)) {
      propertiesString = JSON.stringify(it.properties, null, 2)
    }

    if (propertiesString !== nullString) {
      re = re + `
  @.createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}', ${attributesString}, ${propertiesString})
`
    } else if (attributesString !== nullString) {
      re = re + `
  @.createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}', ${attributesString})
`
    } else {
      re = re + `
  @.createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}')
`
    }

    if (it.modelKey) {
      re = re + `
  @.bind(_this, ${it.id}, 'change keyup', function (e) {
`
      if (it.modelType === 'model') {
        re = re + `
      _scope.set('${_.translateMarks(it.modelKey)}', e.target.value)
`
      } else if (it.modelType === 'object') {
        re = re + `
      _scope${it.modelKey} = e.target.value
`
      } else {
        re = re + `
      _scope.trigger('et-model', '${_.translateMarks(it.modelKey)}', e.target.value, e)
`
      }
      re = re + `
  })
`
    }

    return re
  },
  element_update(it) {
    var re = ''

    if (it.erraticAttributes.length || it.expressions.length) {
      re = re + `
  ${this.attributes_update(it, it.erraticAttributes)}
`

      _.each(it.expressions, (items) => {
        _.each(items, (item, i) => {
          var condition = ''
          if (item.tag !== 'else') {
            condition = `(${item.condition})`
          }
          re = re + `
      ${item.tag} ${condition} {
        if (_last[${item.valueId}] !== ${i}) {
          _last[${item.valueId}] = ${i}
          ${this.attributes_update(it, item.residentAttributes)}
          ${this.attributes_remove(it, item.exclusions)}
        }
        ${this.attributes_update(it, item.erraticAttributes)}
      }
`
        })
      })
    }

    return re
  },
  for_create(it) {
    var re = ''

    var parentElementId = it.parentId
    if (it.isRoot)
      parentElementId = null
    re = re + `
@.createLine(_this, ${parentElementId}, ${it.lineId})
`

    return re
  },
  for_update(it) {
    var re = ''

    re = re + `
var _lastLength = _last[${it.valueId}] || 0
var _list = ${it.expression} || []

var _index = 0
var _len = _last[${it.valueId}] = _list.length
for (; _index < _len; _index++) {
  var ${it.indexName} = _index
  var ${it.itemName} = _list[_index]
  var _itemId = '${it.id}_' + _index
  var _template = @.getCondtionTemplate(_this, _itemId, ${it.templateName}, this.options)

  if (_index >= _lastLength) {
    var _prevId = _index?('${it.id}_' + (_index - 1)) : ${it.lineId}
    @.after(_this, _prevId, _itemId)
  }
  _template.update(${it.args.join(', ')})
}
for (; _index < _lastLength; _index++) {
  @.remove(_elements, '${it.id}_' + _index)
}
`

    if (it.isRoot) {
      re = re + `
  @.setRoot(this, ${it.id}, _len)
`
    }

    return re
  },
  html_create(it) {
    var re = ''

    if (it.isErratic) return ''
    re = re + `
@.html(_this, ${it.parentId}, '${_.translateMarks(it.expression)}')
`

    return re
  },
  html_update(it) {
    var re = ''

    if (!it.isErratic) return ''
    re = re + `
var _tmp = ${it.valueString}
if (_last[${it.valueId}] !== _tmp) {
  _last[${it.valueId}] = _tmp
  @.html(_this, ${it.parentId}, _tmp)
}
`

    return re
  },
  if_create(it) {
    var re = ''

    var parentElementId = it.parentId
    if (it.isRoot)
      parentElementId = null
    re = re + `
@.createLine(_this, ${parentElementId}, ${it.lineId})
`

    return re
  },
  if_update(it) {
    var re = ''

    var parentElementId = it.parentId
    if (it.isRoot)
      parentElementId = null

    _.each(it.doms, (dom, i) => {
      var condition = ''
      if (dom.tag !== 'else') {
        condition = `(${expression.condition})`
      }

      if (dom.id) {
        re = re + `
    ${dom.tag} ${condition} {
      var _template = @.getConditionTemplate(_this, ${parentElementId}, ${dom.id}, ${dom.templateName}, this.options)
      if (_last[${it.valueId}] !== ${i}) {
        _last[${it.valueId}] = ${i}

        var _lastTemplateId = _last[${it.saveId}]
        var _lastTemplate = @.getTemplate(_this, _lastTemplateId)
        if (_lastTemplate) {
          _lastTemplate.remove()
`
        if (it.isRoot) {
          re = re + `
            @.removeRoot(_this, _lastTemplateId)
`
        }
        re = re + `
        }

        _last[${it.saveId}] = ${dom.id}
        @.after(_this, ${it.lineId}, ${dom.id})
`
        if (it.isRoot) {
          re = re + `
          @.setRoot(_this, ${dom.id})
`
        }
        re = re + `
      }
      _template.update(${dom.args.join(', ')})
    }
`
      } else {
        re = re + `
    ${dom.tag} ${condition} {
      if (_last[${it.valueId}] !== ${i}) {
        _last[${it.valueId}] = ${i}

        var _lastTemplateId = _last[${it.saveId}]
        var _lastTemplate = @.getTemplate(_this, _lastTemplateId)
        if (_lastTemplate) {
          _lastTemplate.remove()
`
        if (it.isRoot) {
          re = re + `
            @.removeRoot(_this, _lastTemplateId)
`
        }
        re = re + `
        }
        _last[${it.saveId}] = null
      }
    }
`
      }
    })

    return re
  },
  import_create(it) {
    var re = ''

    var parentElementId = it.parentId
    if (it.isRoot)
      parentElementId = null
    re = re + `
@.createTemplate(_this, ${parentElementId}, ${it.templateName}, this.options)
`

    return re
  },
  import_update(it) {
    var re = ''

    re = re + `
var _template = @.getTemlate(_this, ${it.id})
_template.update(${it.args.join(', ')})
`

    return re
  },
  node_createTemplate(it) {
    var re = ''

    re = re + `
var ${it.templateName} = _dep_createTemplate({
  create: function () {
    var _this = this
`
    if (it.modelType === 'model' || it.modelType === 'object') {
      re = re + `
      var _scope = this.options.scope
`
    } else {
      re = re + `
      var _scope = this
`
    }
    re = re + `
    ${it.createList.join('\n')}
  }${it.updateList.length ? ',' : ''}
`
    if (it.updateList.length) {
      re = re + `
    update: function (${it.args.join(', ')}) {
      var _this = this
      var _last = this.last

      ${it.updateList.join('\n')}
    }
`
    }
    re = re + `
})
`

    return re
  },
  text_create(it) {
    var re = ''

    var parentElementId = it.parentId
    if (it.isRoot)
      parentElementId = null
    var text = it.isErratic ? '' : it.text
    re = re + `
@.createText(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(text)}')
`

    return re
  },
  text_update(it) {
    var re = ''

    if (!it.isErratic) return ''

    re = re + `
var _tmp = ${it.valueString}
if (_last[${it.valueId}] !== _tmp) {
  _last[${it.valueId}] = _tmp
  @.text(_this, ${it.id}, _tmp)
}
`

    return re
  }

}
