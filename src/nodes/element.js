'use strict'

import Basic from './basic'

import _ from '../util'
import elementParser from '../parsers/element'
import valueParser from '../parsers/value'
import elementHandler from './element-handler'

var NAME_SPACE = 'element'
var ET_MODEL = 'et-model'
var PROPERTIY_SET = {
  'INPUT': ['value', 'checked'],
  'TEXTAREA': ['value']
}

class Element extends Basic {
  constructor (source, options, expressions) {
    super(source, options)

    this.namespace = NAME_SPACE
    this.nodeType = 1
    this.expressions = elementHandler.parse(expressions)
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
}

export default Element
