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

import NodeInterface from './interface'
import _ from '../util'
import worker from '../worker'

class Basic extends NodeInterface {
  constructor (source, options) {
    super(source, options)

    this._source = source
    this.options = options

    this.isNewTemplate = false
    this.args = []
    this.nodeType = 'ET'

    this.children = []
    this.parse(source)
  }
  getNewTemplateDoms () {
    var results = []
    this.each((dom) => {
      if (!dom.parent || dom.isNewTemplate) {
        results.push(dom)
      }
    })
    return results
  }
  getCreateList () {
    var results = []
    _.each(this.children, (child) => {
      var tmp = child.deliverCreate()
      if (tmp) results.push(tmp)

      if (!child.isNewTemplate) {
        _.concat(results, child.getCreateList())
      }
    })
    return results
  }
  getUpdateList () {
    var results = []
    _.each(this.children, (child) => {
      var tmp = child.deliverUpdate()
      if (tmp) results.push(tmp)

      if (!child.isNewTemplate) {
        _.concat(results, child.getUpdateList())
      }
    })
    return results
  }
  getDependencies () {
    var re = []
    this.each((dom) => {
      _.concat(re, dom.deliverDependencies())
    })
    return re
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



  // functions could be override
  parse (source) {}
  init () {}
  assembleWorkerData () {
    return {}
  }
  deliverDependencies () {
    return []
  }
  deliverCreate () {
    var method = `${this.namespace}_create`
    var it = this.assembleWorkerData()
    if (typeof worker[method] === 'function') {
      return worker[method](it)
    }
  }
  deliverUpdate () {
    var method = `${this.namespace}_update`
    var it = this.assembleWorkerData()
    if (typeof worker[method] === 'function') {
      return worker[method](it)
    }
  }
}

export default Basic
