'use strict'

import Basic from './basic'

import _ from '../util'
import elementParser from '../parsers/element'
import valueParser from '../parsers/value'
import elementHandler from './element-handler'

var NAME_SPACE = 'element'
var PROPERTIY_SET = {
  'INPUT': ['value', 'checked'],
  'TEXTAREA': ['value']
}

class Element extends Basic {
  constructor (origin, options) {
    super(origin, options)

    this.namespace = NAME_SPACE
    this.output = null
    this.events = []
    this.nodeType = 1
    this.expressions = elementHandler.parse(origin.expressions)
  }

  // 这部分方法和代码是为初始化的时候写的
  parse (source) {
    var tinyNode = elementParser.parse(source, this.options)
    this.attributes = tinyNode.attributes
    this.nodeName = tinyNode.nodeName.toUpperCase()
  }

  // 接下来的方法都是一些外部或者内部使用的辅助方法
  // 获取那些固定的 不是动态的属性
  getResidentAttributes () {
    var attributes = {}
    var properties = {}
    var propertiesList = PROPERTIY_SET[this.nodeName] || []

    var attrs = this.attributes
    for (var key in attrs) {
      var value = attrs[key]
      var isProperty = propertiesList.indexOf(key) >= 0
      if (!valueParser.isErratic(value)) {
        if (isProperty) {
          properties[key] = value
        } else {
          attributes[key] = value
        }
      }
    }

    return {attributes: attributes, properties: properties}
  }
  // 获取那些动态的属性
  getErraticAttributes () {
    var attrs = this.attributes
    var erracticMap = {}
    for (var key in attrs) {
      var value = attrs[key]
      if (valueParser.isErratic(value)) {
        erracticMap[key] = value
      }
    }
    return this.translateAttributesToCode(erracticMap)
  }
  // 将条件表达式转换成为work对象使用的数据
  translateExpressions () {
    var results = []
    var _this = this
    _.each(this.expressions, (items) => {
      var newItems = []
      var valueId = _this.getRootValueId()
      _.each(items, (item) => {
        var obj = _.pick(item, 'tag', 'exclusions', 'condition')
        var attrs = _this.translateAttributesToCode(item.attributes)

        obj.valueId = valueId
        obj.residentAttributes = attrs.filter((attr) => { return !attr.isErratic })
        obj.erraticAttributes = attrs.filter((attr) => { return attr.isErratic })
        newItems.push(obj)
      })
      results.push(newItems)
    })
    return results
  }
  // 判断动态属性 并且添加函数判断和设置
  translateAttributesToCode (attrs) {
    var results = []
    var propertis = PROPERTIY_SET[this.nodeName] || []

    for (var key in attrs) {
      var value = attrs[key]
      var tmp = {
        key: key,
        isErratic: valueParser.isErratic(value),
        isProperty: propertis.indexOf(key) >= 0,
        value: value,
        valueString: valueParser.parse(value)
      }
      if (tmp.isErratic && !tmp.isProperty) {
        tmp.valueId = this.getRootValueId()
      }
      results.push(tmp)
    }
    return results
  }

  // functions for value output
  setOutput (expression) {
    this.output = expression
  }
  getOutput () {
    return this.output
  }
  // functions for events
  setEvents (newEventsMap) {
    _.extend(this.events, newEventsMap)
  }
  setEvent (eventName, expression, args = []) {
    this.events[eventName] = {
      expression: expression,
      args: args
    }
  }
  getEvents () {
    return this.events
  }

  assembleWorkerData () {
    var it = this._workerData
    if (it) return it

    var set = this.getResidentAttributes()
    this._workerData = it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      parentId: this.getParentId(),
      nodeName: this.getNodeName(),
      events: this.getEvents(),
      output: this.getOutput(),

      attributes: set.attributes,
      properties: set.properties,
      erraticAttributes: this.getErraticAttributes(),
      expressions: this.translateExpressions()
    }
    return it
  }
}

export default Element
