'use strict'

var EVENT_SPLITTER = /\s+/

function LOOP () {}

function extend () {
  var len = arguments.length
  if (len <= 1) {
    return arguments[0]
  } else {
    var re = arguments[0] || {}
    for (var i = 1; i < len; i++) {
      var item = arguments[i]
      for (var key in item) {
        re[key] = item[key]
      }
    }
    return re
  }
}

// about element
function tp_createElement (template, id, tag, attributes, properties) {
  var elememt = document.createElement(tag)
  template.doms[id] = elememt

  for (var key in attributes) {
    element.setAttribute(key, attributes[key])
  }
  for (var key in properties) {
    elememt[key] = properties[key]
  }
}

function tp_createFragment (template, id) {
  template.doms[id] = document.createDocumentFragment()
}

function tp_createLine (template, id) {
  template.doms[id] = document.createComment('line')
}

function tp_createText (template, id, text) {
  template.doms[id] = document.createTextNode(text)
}

function tp_after (template, prevId, id) {
  var doms = template.doms
  var prevDom = doms[prevId]
  var dom = doms[id]

  if (prevDom.parentNode) {
    prevDom.parentNode.insertBefore(dom, prevDom.nextSibling)
  }
}

function tp_append (template, parentId, id) {
  var doms = template.doms
  var parentDom = doms[parentId]
  var dom = doms[id]
  parentDom.appendChild(dom)
}

function tp_bind (template, id, eventString, callback) {
  template._eventDoms[id] = true

  var dom = template.doms[id]
  var eventNames = eventString.split(EVENT_SPLITTER)
  for (var i = 0, len = eventNames.length; i < len; i++) {
    dom.addEventListener(eventNames[i], callback)
  }
}

function tp_html (template, id, html) {
  template.doms[id].innerHTML = html
}

function tp_text (template, id, text) {
  template.doms[id].textContent = text
}

function tp_setAttribute (template, id, attrName, attrValue) {
  template.doms[id].setAttribute(attrName, attrValue)
}

function tp_setProperty (template, id, propName, propValue) {
  template.doms[id][propName] = propValue
}

function tp_remove (template, id) {
  var dom = template.doms[id]
  if (dom && dom.parentNode) {
    dom.parentNode.removeChild(dom)
  }
}

function tp_removeAttribute (template, id, attrName) {
  template.doms[id].removeAttribute(attrName)
}

function tp_removeAttributes (template, id) {
  var dom = template.doms[id]
  for (var i = 2, len = arguments.length; i < len; i++) {
    dom.removeAttribute(arguments[i])
  }
}

// about template
function tp_afterTemplate (template, prevId, id) {
  var doms = template.doms
  var prevDom = doms[prevId]
  var dom = doms[id]

  if (prevDom.parentNode) {
    prevDom.parentNode.insertBefore(dom.get(), prevDom.nextSibling)
  }
}

function tp_appendTemplate (template, parentId, id) {
  var doms = template.doms
  var parentDom = doms[parentId]
  var dom = doms[id]
  parentDom.appendChild(dom.get())
}

function tp_bindTemplate (template, id, eventString, callback) {
  template._eventDoms[id] = true

  var dom = template.doms[id]
  var eventNames = eventString.split(EVENT_SPLITTER)
  for (var i = 0, len = eventNames.length; i < len; i++) {
    dom.addEventListener(eventNames[i], callback)
  }
}

function tp_getTemplate (template, id, Constructor) {
  var template = template.doms[id]
  if (!template) {
    template = template.doms[id] = new Constructor(template.options)
  }
  return template
}

function tp_removeTemplate (template, id) {
  var et = template.doms[id]
  if (et) et.remove()
}

function tp_removeRoot (template, id) {
  template.roots[id] = false
}

function tp_setRoot (template, id, length) {
  if (length >= 0) {
    template.roots[id] = length
  } else {
    template.roots[id] = true
  }
}

var template = {
  isET: true,
  init: function init (options) {
    if (!options) options = {}

    if (!options.root) options.root = this
    else this.root = options.root

    this._rootFrag = document.createDocumentFragment()
    this._eventDoms = {} // 纪录那些绑定了事件的id

    this.options = options
    this.roots = {}  // 记录某个id是不是root，如果纪录的是数字，那么认为是一个所属集合
    this.doms = {}   // 记录所有的节点对象
    this.last = {}   // 记录上一次判断是什么值，用于差异更新
    this.events = {} // 纪录模板事件
    this.create()
  },
  get: function get () {
    var result = this._rootFrag
    var doms = this.doms
    var roots = this.roots
    var ids = Object.keys(roots).map(function (key) { return +key }).sort()

    for (var i = 0, len = ids.length; i < len; i++) {
      var id = ids[i]
      var isRoot = roots[id]
      if (!isRoot) continue

      if (isRoot === true) {
        var dom = doms[id]
        if (dom.isET) {
          result.appendChild(dom.get())
        } else {
          result.appendChild(dom)
        }
      } else {
        for (var j = 0, childrenLength = isRoot; j < childrenLength; j++) {
          var domId = id + '_' + j
          var dom2 = doms[domId]
          if (dom2.isET) {
            result.appendChild(dom2.get())
          } else {
            result.appendChild(dom2)
          }
        }
      }
    }
    return result
  },
  create: function create () {},
  update: function update () {},

  on: function on (eventString, callback) {
    var eventNames = eventString.split(EVENT_SPLITTER)
    var events = this.events
    for (var i = 0, len = eventNames.length; i < len; i++) {
      var eventName = eventNames[i]
      if (!events[eventName]) events[eventName] = []
      events[eventName].push(callback)
    }
    return this
  },
  trigger: function trigger (eventName) {
    var args = new Array(arguments.length - 1)
    for (var j = 0, argLen = arguments.length; j < argLen; j++) {
      args[i] = arguments[i]
    }

    var root = this.root || this
    var callbacks = root.events[eventName] || []
    for (var i = 0, len = callbacks.length; i < len; i++) {
      var callback = callbacks[i]
      callback.apply(null, args)
    }
  },

  remove: function remove () {
    var doms = this.doms
    var roots = this.roots
    var ids = Object.keys(roots)

    for (var i = 0, len = ids.length; i < len; i++) {
      var id = ids[i]
      var isRoot = roots[id]
      if (!isRoot) continue

      if (isRoot === true) {
        var dom = doms[id]
        if (dom.isET) {
          dom.remove()
        } else if (dom.parentNode) {
          dom.parentNode.removeChild(dom)
        }
      } else {
        for (var j = 0, childrenLength = isRoot; j < childrenLength; j++) {
          var domId = id + '_' + j
          var dom2 = doms[domId]
          if (dom2.isET) {
            dom2.remove()
          } else  if (dom.parentNode) {
            dom.parentNode.removeChild(dom)
          }
        }
      }
    }
    return this
  },
  destroy: function destroy () {
    // remove doms
    this.remove()
    // off events
    var ids = Object.keys(this._eventDoms)
    var doms = this.doms
    for (var i = 0, len = ids.length; i < len; i++) {
      var id = ids[i]
      var dom = doms[id]
      if (!dom.isET) dom.removeEventListener()
    }

    // destroy attributes
    var keys = Object.keys(this)
    for (var p = 0, len2 = keys.length; p < len2; p++) {
      var key = keys[p]
      var item = this[key]
      if (typeof item !== 'function') {
        this[key] = null
      } else {
        this[key] = LOOP
      }
    }
  }
}

exports['default'] = {
  tp_after: tp_after,
  tp_afterTemplate: tp_afterTemplate,
  tp_append: tp_append,
  tp_appendTemplate: tp_appendTemplate,
  tp_bind: tp_bind,
  tp_bindTemplate: tp_bindTemplate,
  tp_createElement: tp_createElement,
  tp_createFragment: tp_createFragment,
  tp_createLine: tp_createLine,
  tp_createText: tp_createText,
  tp_getTemplate: tp_getTemplate,
  tp_html: tp_html,
  tp_remove: tp_remove,
  tp_removeAttribute: tp_removeAttribute,
  tp_removeAttributes: tp_removeAttributes,
  tp_removeRoot: tp_removeRoot,
  tp_removeTemplate: tp_removeTemplate,
  tp_setAttribute: tp_setAttribute,
  tp_setProperty: tp_setProperty,
  tp_setRoot: tp_setRoot,
  tp_text: tp_text,

  extend: extend,
  template: template
}
module.exports = exports['default']
