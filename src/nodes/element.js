'use strict'

import Basic from './basic'

import _ from '../util'
import worker from '../worker'
import elementParser from '../parsers/element'
import valueParser from '../parsers/value'
import elementHandler from './element-handler'

var ET_MODEL = 'et-model'
var PROPERTIY_SET = {
  'INPUT': ['value', 'checked'],
  'TEXTAREA': ['value']
}

class Element extends Basic {
  constructor (source, options = {}) {
    super(source, options)

    this.nodeType = 1
    this.isVirtualNode = false
    this.expressions = elementHandler.parse(options.expressions)
  }

  // 这部分方法和代码是为初始化的时候写的
  parse (source) {
    var tinyNode = elementParser.parse(source, this.options)
    this.modelKey = tinyNode.attributes[ET_MODEL]
    if (this.modelKey) {
      var isObject = this.options.modelType === 'object'
      var isMiddleBrackets = this.modelKey[0] === '[' &&
      this.modelKey[this.modelKey.lenth - 1] === ']'

      if (isObject && !isMiddleBrackets) {
        this.modelKey = '.' + this.modelKey
      }
    }

    if (this.modelKey) delete tinyNode.attributes[ET_MODEL]
    this.attributes = tinyNode.attributes
    this.nodeName = tinyNode.nodeName.toUpperCase()
  }

  // 接下来的方法都是一些外部或者内部使用的辅助方法
  getResidentAttributes () {// 获取那些固定的 不是动态的属性
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
  getErraticAttributes () {// 获取那些动态的属性
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
  translateExpressions () {// 将条件表达式转换成为work对象使用的数据
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
  translateAttributesToCode (attrs) {// 判断动态属性 并且添加函数判断和设置
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

  // 这部分代码是为编译的时候写的
  assembleWrokerData () {
    var it = this._workerData
    if (it) return it

    var set = this.getResidentAttributes()
    this._workerData = it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      parentId: this.getParentId(),
      nodeName: this.getNodeName(),
      modelKey: this.modelKey,
      modelType: this.options.modelType,

      attributes: set.attributes,
      properties: set.properties,
      erraticAttributes: this.getErraticAttributes(),
      expressions: this.translateExpressions()
    }
    return it
  }
  deliverCreate () {
    var results = this.getChildrenCreate()
    var it = this.assembleWrokerData()
    results.unshift(worker.element_create(it))
    return results
  }
  deliverAppend () {
    var results = this.getChildrenAppend()
    var it = this.assembleWrokerData()
    results.unshift(worker.element_append(it))
    return results
  }
  deliverUpdate () {
    var results = this.getChildrenUpdate()
    var it = this.assembleWrokerData()
    var updateStr = worker.element_update(it)
    if (updateStr) results.unshift(updateStr)
    return results
  }
  deliverRemove () {
    var it = this.assembleWrokerData()
    return [worker.element_remove(it)]
  }
}

export default Element
