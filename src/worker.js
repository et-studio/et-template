
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
  child_create(it) {
    var re = ''

    var parentElementId = it.parentId
    if (it.isRoot)
      parentElementId = null
    if (it.context) {
      re = re + `
  _tp_createTemplate(_this, ${parentElementId}, ${it.templateName}, ${it.context})
`
    } else {
      re = re + `
  _tp_createTemplate(_this, ${parentElementId}, ${it.templateName})
`
    }

    return re
  },
  child_update(it) {
    var re = ''

    re = re + `
var _template = _tp_getTemlate(_this, ${it.id})
_template.update()
`

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
  compile_angular(it) {
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
angular.module('et.template').factory('${it.moduleId}', [${paths.join(',')}, function(${variables.join(',')}) {
  ${this.compile_template(it)}
  return function(option) {
    return new ${it.templateName}(option)
  }
}]);
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
  global['${it.moduleId}'] = ${it.templateName}
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
      var it = _this.context

      ${createList.join('\n')}
    }${updateList.length ? ',' : ''}
`
      if (updateList.length) {
        re = re + `
      update: function (${args.join(',')}) {
        var _this = this
        var _last = _this.last
        var it = _this.context

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

    if (it.output) {
      re = re + `
  _tp_bind(_this, ${it.id}, 'change input', function () {
    ${_.translateMarks(it.output)} = this.value
  })
`
    }

    if (!_.isEmpty(it.outputs)) {
      re = re + `
  _tp_bind(_this, ${it.id}, 'change input', function () {
`
      it.outputs.map((output, index, list) => {
        var name = output.propName
        var expression = output.expression
        re = re + `
      ${_.translateMarks(expression)} = this.${_.translateMarks(name)}
`
      })
      re = re + `
  })
`
    }

    if (!_.isEmpty(it.events)) {
      var eventsStringList = []
      Object.keys(it.events).map((eventName, index, list) => {
        var isLast = (list.length - 1) === index
        var event = it.events[eventName]
        var expression = event.expression
        var args = event.args
        var isJustEvent = args.every(item => item === '$event')
        var argsStrList = args.map((item, index) => {
          if (item === '$event') {
            return item
          } else {
            return `_args[${index}]`
          }
        })
        if (!args.length) {
          eventsStringList.push(`'${_.translateMarks(eventName)}': function () {
        ${expression}()
      }`)
        } else if (isJustEvent) {
          eventsStringList.push(`'${_.translateMarks(eventName)}': function ($event) {
        ${expression}(${argsStrList.join(', ')})
      }`)
        } else {
          eventsStringList.push(`'${_.translateMarks(eventName)}': function ($event) {
        var _args = _tp_getEventArguments(_this, ${it.id}, '${_.translateMarks(eventName)}')
        ${expression}(${argsStrList.join(', ')})
      }`)
        }
      })
      re = re + `
  _tp_bindEventsByMap(_this, ${it.id}, {
    ${eventsStringList.join(',\n')}
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

    Object.keys(it.events).map((key, index, list) => {
      var isLast = (list.length - 1) === index
      var event = it.events[key]
      var args = event.args
      var isJustEvent = args.every(item => item === '$event')
      var argsStrList = args.map((item) => {
        if (item !== '$event') {
          return item
        } else {
          return 'null'
        }
      })
      if (args.length && !isJustEvent) {
        re = re + `
    var _current = [${argsStrList.join(', ')}]
    var _saved = _tp_getEventArguments(_this, ${it.id}, '${_.translateMarks(key)}')
    if (!_tp_isArrayEqual(_saved, _current)) {
      _tp_saveEventArguments(_this, ${it.id}, '${_.translateMarks(key)}', _current)
    }
`
      }
    })

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
`

    if (!it.trackBy) {
      re = re + `
    ${this.for_without_track_by(it)}
`
    } else {
      re = re + `
    ${this.for_with_track_by(it)}
`
    }

    re = re + `
  _template.update(${it.args.join(', ')})
}
for (; _index < _lastLength; _index++) {
  _tp_remove(_this, '${it.id}_' + _index)
}
`

    if (it.isRoot) {
      re = re + `
  _tp_setRoot(this, ${it.id}, _len)
`
    }

    return re
  },
  for_with_track_by(it) {
    var re = ''

    re = re + `
var _itemId = '${it.id}_' + ${it.trackBy}
`

    if (it.context) {
      re = re + `
  var _template = _tp_getConditionTemplate(_this, _itemId, ${it.templateName}, ${it.context})
`
    } else {
      re = re + `
  var _template = _tp_getConditionTemplate(_this, _itemId, ${it.templateName})
`
    }

    re = re + `
var _isTemplateChanged = false
var _lastItemId = _last['for_item_id_' + '2_' + _index]
_last['for_item_id_' + '2_' + _index] = itemId
if (_lastItemId && _lastItemId !== itemId) {
  // if come to here the lastTemplate should be created
  var _lastTemplate = _tp_getTemplate(_this, _itemId)
  if (_lastTemplate) _lastTemplate.remove()
  _isTemplateChanged = true
}

if (_index >= _lastLength || _isTemplateChanged) {
  var _prevId = _index?('${it.id}_' + (_index - 1)) : ${it.lineId}
  _tp_after(_this, _prevId, _itemId)
}
`

    return re
  },
  for_without_track_by(it) {
    var re = ''

    re = re + `
var _itemId = '${it.id}_' + _index
`

    if (it.context) {
      re = re + `
  var _template = _tp_getConditionTemplate(_this, _itemId, ${it.templateName}, ${it.context})
`
    } else {
      re = re + `
  var _template = _tp_getConditionTemplate(_this, _itemId, ${it.templateName})
`
    }
    re = re + `
if (_index >= _lastLength) {
  var _prevId = _index?('${it.id}_' + (_index - 1)) : ${it.lineId}
  _tp_after(_this, _prevId, _itemId)
}
`

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

    re = re + `
var _index
var _templateId = _last[${it.saveId}]
var _template = _tp_getTemplate(_this, _templateId)

`
    _.each(it.doms, (dom, i) => {
      var condition = ''
      if (dom.tag !== 'else')
        condition = `(${dom.condition})`
      re = re + `
  ${dom.tag} ${condition} {
    _index = ${i}
  }
`
    })
    re = re + `

if (_last[${it.valueId}] !== _index) {
  _last[${it.valueId}] = _index

  if (_template) {
    _template.remove()
`
    if (it.isRoot) {
      re = re + `
      _tp_removeRoot(_this, _templateId)
`
    }
    re = re + `
  }

  var _currentTemplateId
  var _TemplateConstructor
`
    _.each(it.doms, (dom, i) => {
      var condition = ''
      if (dom.tag !== 'else')
        condition = `(${dom.condition})`
      re = re + `
    ${dom.tag} ${condition} {
      _currentTemplateId = ${dom.id ? dom.id : null}
      _TemplateConstructor = ${dom.id ? dom.templateName : null}
    }
`
    })
    re = re + `
  if (_TemplateConstructor) {
    _last[${it.saveId}] = _currentTemplateId
    _template = _tp_getConditionTemplate(_this, _currentTemplateId, _TemplateConstructor)
    _tp_after(_this, ${it.lineId}, _currentTemplateId)
`
    if (it.isRoot) {
      re = re + `
      _tp_setRoot(_this, _currentTemplateId)
`
    }
    re = re + `
  } else {
    _last[${it.saveId}] = null
    _template = null
  }
}
if (_template) _template.update(${it.args.join(', ')})
`

    return re
  },
  node_createTemplate(it) {
    var re = ''

    re = re + `
var ${it.templateName} = _dep_createTemplate({
  create: function () {
    var _this = this
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
