'use strict'

/**
 * Dom 的结构
 *  - nodeName        {String}
 *  - children        {Array[Dom]}
 *  - expressions     {Array[Expression]} 在属性上面的表达式数组
 *  - parent          {Dom}
 *  - previous        {Dom}
 *  - next            {Dom}
 *  - attributes      {Map<String, String>}
 *  - textContent     {String}
 *  - nodeType        {number} root: root dom, 1: element, 3:textNode, 8:commentNode
 *
 * Expression
 *  - condition       {String} 属性显示条件
 *  - attributes      {Map<String, String>}
 *
 * #if 节点
 *  - condition       {String} 判断条件
 *
 * #elseif
 *  - condition
 *
 * #for 节点
 *  - expression
 *  - itemName
 *  - indexName
 */

import NodeInterface from './getter'
import _ from '../util'

class Basic extends NodeInterface {
  constructor (source, options = {}) {
    super(source, options)

    this._source = source
    this._index = options.index
    this.isVirtualNode = true
    this.isNewTemplate = false
    this.args = []
    this.nodeType = 'ET'

    this.options = options
    this.parent = options.parent
    this.previous = options.previous
    this.next = null
    this.isRoot = !this.parent

    this.children = []
    this.parse(source)
  }
  getNewTemplateDoms () {
    var results = []
    var eachHandler = (dom) => {
      if ((dom.isRoot || dom.isNewTemplate) && dom.checkIsCompile()) {
        results.push(dom)
      }
    }
    this.each(eachHandler)
    return results
  }
  getArguments () {
    var re = ['it']

    var lastRoot = this.getLastRoot()
    if (lastRoot) {
      _.concat(re, lastRoot.getArguments())
    }
    if (this.args) {
      _.concat(re, this.args)
    }
    re = _.uniq(re)
    return _.clearArraySpace(re)
  }
  saveArgument (...list) {
    _.concat(this.args, list)
    return this
  }

  checkRoot () {
    var parent = this.parent
    if (!parent || parent.isRoot || parent.isNewTemplate) return true
    if (parent.isVirtualNode && parent.checkRoot()) return true
    return false
  }
  each (callback) {
    if (typeof callback !== 'function') return
    if (callback(this) === false) return

    if (this.children.length) {
      this.children[0].each(callback)
    }
    if (this.next) {
      this.next.each(callback)
    }
  }

  initAll () {
    var eachHandler = (dom) => {
      dom.init()
    }
    this.each(eachHandler)
  }
  getAllRequire () {
    var re = []
    var eachHandler = (dom) => {
      _.concat(re, dom.deliverRequire())
    }
    this.each(eachHandler)
    return re
  }
  getChildrenCreate () {
    var re = []
    _.each(this.children, (child) => {
      _.concat(re, child.deliverCreate())
    })
    return re
  }
  getChildrenAppend () {
    var re = []
    _.each(this.children, (child) => {
      _.concat(re, child.deliverAppend())
    })
    return re
  }
  getChildrenUpdate () {
    var re = []
    _.each(this.children, (child) => {
      _.concat(re, child.deliverUpdate())
    })
    return re
  }
  getChildrenRemove () {
    var re = []
    _.each(this.children, (child) => {
      _.concat(re, child.deliverRemove())
    })
    return re
  }

  // functions could be override
  parse (source) {}
  init () {}
  checkIsCompile () {
    return true
  }
  deliverRequire () {
    return []
  }
  deliverCreate () {
    return this.getChildrenCreate()
  }
  deliverAppend () {
    return this.getChildrenAppend()
  }
  deliverUpdate () {
    return this.getChildrenUpdate()
  }
  deliverRemove () {
    return this.getChildrenRemove()
  }
}

export default Basic
