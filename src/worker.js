
'use strict'
import _ from './util'

export default {

  attributes_remove(it) {
    var re = ''

    var attrs = arguments[1] || []
    if (attrs.length === 1) {
      re = re + `
  _tp_removeAttribute(_this, ${it.id}, '${_.translateMarks(attrs[0])}')
`
    } else if (attrs.length > 1) {
      var exclusions = attrs.map((item) => {
        return `'${_.translateMarks(item)}'`
      })
      re = re + `
  _tp_removeAttributes(_this, ${it.id}, ${exclusions.join(',')})
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
      if (_tp_getProperty(_this, ${it.id}, '${_.translateMarks(attr.key)}') !== _tmp) {
        _tp_setProperty(_this, ${it.id}, '${_.translateMarks(attr.key)}', _tmp)
      }
`
        } else {
          re = re + `
      var _tmp = ${attr.valueString}
      if (_last[${attr.valueId}] !== _tmp) {
        _last[${attr.valueId}] = _tmp
        _tp_setAttribute(_this, ${it.id}, '${_.translateMarks(attr.key)}', _tmp)
      }
`
        }
      } else {
        if (attr.isProperty) {
          re = re + `
      _tp_setProperty(_this, ${it.id}, '${_.translateMarks(attr.key)}', '${_.translateMarks(attr.value)}')
`
        } else {
          re = re + `
      _tp_setAttribute(_this, ${it.id}, '${_.translateMarks(attr.key)}', '${_.translateMarks(attr.value)}')
`
        }
      }
    })

    return re
  },
  compile_amd(it) {
    var re = ''

    var dependencies = it.dependencies || []
    var paths = []
    var variables = []
    for (var i = 0, len = dependencies.length; i < len; i++) {
      var item = dependencies[i]
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

    var dependencies = it.dependencies || []
    var requires = []
    for (var i = 0, len = dependencies.length; i < len; i++) {
      var item = dependencies[i]
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

    var dependencies = it.dependencies || []
    var requires = []
    for (var i = 0, len = dependencies.length; i < len; i++) {
      var item = dependencies[i]
      requires.push(`var ${item.name} = require('${item.path}')`)
    }

    re = re + `
'use strict'

${requires.join('\n')}
${this.compile_template(it)}
module.exports = exports['default'] = ${it.templateName}
`

    return re
  },
  compile_global(it) {
    var re = ''

    var dependencies = it.dependencies || []
    var requires = []
    for (var i = 0, len = dependencies.length; i < len; i++) {
      var item = dependencies[i]
      requires.push(`var ${item.name} = global['${item.path}']`)
    }

    re = re + `
;(function(global){
  ${requires.join('\n')}
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
// @_tp_mark
`

    _.each(it.newDoms, (dom) => {
      var templateName = dom.getTemplateName()
      var createList = dom.getCreateList()
      var updateList = dom.getUpdateList()
      var args = dom.getArguments()

      re = re + `
  var ${templateName} = _dep_createTemplate({
    create: function () {
      var _this = this
`
      if (it.hasModelKey && (it.modelType === 'model' || it.modelType === 'object')) {
        re = re + `
        var _scope = this.options.scope
`
      } else if (it.hasModelKey) {
        re = re + `
        var _scope = this
`
      }
      re = re + `
      ${createList.join('\n')}
    }${updateList.length ? ',' : ''}
`
      if (updateList.length) {
        re = re + `
      update: function (${args.join(',')}) {
        var _this = this
        var _last = this.last
        ${updateList.join('\n')}
      }
`
      }
      re = re + `
  })
`
    })

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
  _tp_createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}', ${attributesString}, ${propertiesString})
`
    } else if (attributesString !== nullString) {
      re = re + `
  _tp_createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}', ${attributesString})
`
    } else {
      re = re + `
  _tp_createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}')
`
    }

    if (it.modelKey) {
      re = re + `
  _tp_bind(_this, ${it.id}, 'change keyup', function (e) {
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
_tp_createLine(_this, ${parentElementId}, ${it.lineId})
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
  var _template = _tp_getCondtionTemplate(_this, _itemId, ${it.templateName}, this.options)

  if (_index >= _lastLength) {
    var _prevId = _index?('${it.id}_' + (_index - 1)) : ${it.lineId}
    _tp_after(_this, _prevId, _itemId)
  }
  _template.update(${it.args.join(', ')})
}
for (; _index < _lastLength; _index++) {
  _tp_remove(_elements, '${it.id}_' + _index)
}
`

    if (it.isRoot) {
      re = re + `
  _tp_setRoot(this, ${it.id}, _len)
`
    }

    return re
  },
  format_amd(it) {
    var re = ''

    var ids = it.moduleIds.map((item) => {
      return `'${item}'`
    })
    re = re + `
;define('${it.moduleId}', [${ids.join(',')}], function([${it.moduleIds.join(',')}]){
  var module = {}
  ${it.content}
  return module.exports
})
`

    return re
  },
  format_cmd(it) {
    var re = ''

    re = re + `
;define(function(require, exports, module){
  ${it.content}
})
`

    return re
  },
  format_global(it) {
    var re = ''

    re = re + `
;(function(global){
  var module = {}
  var exports = {}
  function require (key) {
    return global[key]
  }

  ${it.content}
  global.${it.moduleId} = module.exports
})(window)
`

    return re
  },
  format_tp(it) {
    var re = ''

    var declares = it.methods.map((method) => {
      return `var ${method} = _dep.${method.substr(1)}`
    })
    re = re + `
${it.header}

${declares.join('\n')}

${it.body}
`

    return re
  },
  html_create(it) {
    var re = ''

    if (it.isErratic) return ''
    re = re + `
_tp_html(_this, ${it.parentId}, '${_.translateMarks(it.expression)}')
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
  _tp_html(_this, ${it.parentId}, _tmp)
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
_tp_createLine(_this, ${parentElementId}, ${it.lineId})
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
      var _template = _tp_getConditionTemplate(_this, ${parentElementId}, ${dom.id}, ${dom.templateName}, this.options)
      if (_last[${it.valueId}] !== ${i}) {
        _last[${it.valueId}] = ${i}

        var _lastTemplateId = _last[${it.saveId}]
        var _lastTemplate = _tp_getTemplate(_this, _lastTemplateId)
        if (_lastTemplate) {
          _lastTemplate.remove()
`
        if (it.isRoot) {
          re = re + `
            _tp_removeRoot(_this, _lastTemplateId)
`
        }
        re = re + `
        }

        _last[${it.saveId}] = ${dom.id}
        _tp_after(_this, ${it.lineId}, ${dom.id})
`
        if (it.isRoot) {
          re = re + `
          _tp_setRoot(_this, ${dom.id})
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
        var _lastTemplate = _tp_getTemplate(_this, _lastTemplateId)
        if (_lastTemplate) {
          _lastTemplate.remove()
`
        if (it.isRoot) {
          re = re + `
            _tp_removeRoot(_this, _lastTemplateId)
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
_tp_createTemplate(_this, ${parentElementId}, ${it.templateName}, this.options)
`

    return re
  },
  import_update(it) {
    var re = ''

    re = re + `
var _template = _tp_getTemlate(_this, ${it.id})
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
_tp_createText(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(text)}')
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
  _tp_text(_this, ${it.id}, _tmp)
}
`

    return re
  }

}
