;(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('et-dependency', factory)
  } else {
    var require = function() {}
    var module = {}
    var exports = {}
    factory(require, exports, module)
    global['et-dependency'] = module.exports
  }
})(window, function(require, exports, module) {
  'use strict'

  var EVENT_SPLITTER = /\s+/

  function LOOP() {
  }

  function extend() {
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

  function util_createElement(tag) {
    return document.createElement(tag)
  }

  function util_createTextNode(text) {
    return document.createTextNode(text)
  }

  function util_createFragment() {
    return document.createDocumentFragment()
  }

  function util_createLine() {
    return document.createComment('line')
  }

  function util_remove(element) {
    if (element.parentNode) {
      element.parentNode.removeChild(element)
    }
  }

  function util_text(element, textContent) {
    element.textContent = textContent
  }

  function util_setAttribute(element, attrName, attrValue) {
    element.setAttribute(attrName, attrValue)
  }

  function util_setAttributes(element, attributes) {
    for (var key in attributes) {
      element.setAttribute(key, attributes[key])
    }
  }

  function util_removeAttribute(element, attrName) {
    element.removeAttribute(attrName)
  }

  function util_removeAttributes(element, attrNames) {
    for (var i = 0, len = attrNames.length; i < len; i++) {
      var attrName = attrNames[i]
      element.removeAttribute(attrName)
    }
  }

  function util_setProperties(element, properties) {
    for (var key in properties) {
      element[key] = properties[key]
    }
  }

  function util_appendChild(elementA, elementB) {
    elementA.appendChild(elementB)
  }

  function util_empty(element) {
    element.textContent = ''
  }

  function util_before(nextElement, element) {
    if (nextElement.parentNode) {
      nextElement.parentNode.insertBefore(element, nextElement)
    }
  }

  function util_after(prevElement, element) {
    if (prevElement.parentNode) {
      prevElement.parentNode.insertBefore(element, prevElement.nextSibling)
    }
  }

  function util_on(element, eventString, callback) {
    var eventNames = eventString.split(EVENT_SPLITTER)
    for (var i = 0, len = eventNames.length; i < len; i++) {
      var eventName = eventNames[i]
      element.addEventListener(eventName, callback)
    }
  }

  function util_off(element, eventName, callback) {
    element.removeEventListener(eventName, callback)
  }

  function tp_createElement(template, id, tag, attributes, properties) {
    var elememt = util_createElement(tag)
    template.doms[id] = elememt

    if (attributes) {
      util_setAttributes(elememt, attributes)
    }
    if (properties) {
      util_setProperties(elememt, properties)
    }
    return elememt
  }

  function tp_setRoot(template, id, length) {
    if (length >= 0) {
      template.roots[id] = length
    } else {
      template.roots[id] = true
    }
  }

  function tp_removeRoot(template, id) {
    template.roots[id] = false
  }

  function tp_bind(template, id, eventString, callback) {
    var dom = template.doms[id]
    if (dom && !dom.isET) {
      template._eventDoms[id] = true
      util_on(dom, eventString, callback)
    }
  }

  function tp_remove(template, id) {
    var dom = template.doms[id]
    util_remove(dom)
  }

  function tp_append(template, parentId, id) {
    var doms = template.doms
    var parentNode = doms[parentId]
    var dom = doms[id]
    util_appendChild(parentNode, dom)
  }

  function tp_after(template, prevId, id) {
    var doms = template.doms
    var prevDom = doms[prevId]
    var dom = doms[id]
    util_after(prevDom, dom)
  }

  var template = {
    isET: true,
    init: function init(options) {
      if (!options)
        options = {}

      if (!options.root)
        options.root = this
      else
        this.root = options.root

      this._rootFrag = util_createFragment()
      this._eventDoms = {} // 纪录那些绑定了事件的id

      this.options = options
      this.roots = {} // 记录某个id是不是root，如果纪录的是数字，那么认为是一个所属集合
      this.doms = {} // 记录所有的节点对象
      this.last = {} // 记录上一次判断是什么值，用于差异更新
      this.events = {} // 纪录模板事件
      this.create()
    },
    get: function get() {
      var result = this._rootFrag
      var doms = this.doms
      var roots = this.roots
      var ids = Object.keys(roots).map(function(key) {
        return +key
      }).sort()

      for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i]
        var isRoot = roots[id]
        if (!isRoot) continue

        if (isRoot === true) {
          var dom = doms[id]
          if (dom.isET) {
            util_appendChild(result, dom.get())
          } else {
            util_appendChild(result, dom)
          }
        } else {
          for (var j = 0, childrenLength = isRoot; j < childrenLength; j++) {
            var domId = id + '_' + j
            var dom2 = doms[domId]
            if (dom2.isET) {
              util_appendChild(result, dom2.get())
            } else {
              util_appendChild(result, dom2)
            }
          }
        }
      }
      return result
    },
    create: function create() {},
    update: function update() {},

    on: function on(eventString, callback) {
      var eventNames = eventString.split(EVENT_SPLITTER)
      var events = this.events
      for (var i = 0, len = eventNames.length; i < len; i++) {
        var eventName = eventNames[i]
        if (!events[eventName])
          events[eventName] = []
        events[eventName].push(callback)
      }
      return this
    },
    trigger: function trigger(eventName) {
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

    remove: function remove() {
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
          } else {
            util_remove(dom)
          }
        } else {
          for (var j = 0, childrenLength = isRoot; j < childrenLength; j++) {
            var domId = id + '_' + j
            var dom2 = doms[domId]
            if (dom2.isET) {
              dom2.remove()
            } else {
              util_remove(dom2)
            }
          }
        }
      }
      return this
    },
    destroy: function destroy() {
      // remove doms
      this.remove()
      // off events
      var ids = Object.keys(this._eventDoms)
      var doms = this.doms
      for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i]
        var dom = doms[id]
        if (!dom.isET) util_off(dom)
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
    util_createElement: util_createElement,
    util_createTextNode: util_createTextNode,
    util_createFragment: util_createFragment,
    util_createLine: util_createLine,
    util_remove: util_remove,
    util_text: util_text,
    util_setAttribute: util_setAttribute,
    util_setAttributes: util_setAttributes,
    util_removeAttribute: util_removeAttribute,
    util_removeAttributes: util_removeAttributes,
    util_setProperties: util_setProperties,
    util_appendChild: util_appendChild,
    util_empty: util_empty,
    util_before: util_before,
    util_after: util_after,
    util_on: util_on,
    util_off: util_off,

    tp_createElement: tp_createElement,
    tp_setRoot: tp_setRoot,
    tp_removeRoot: tp_removeRoot,
    tp_bind: tp_bind,
    tp_remove: tp_remove,
    tp_append: tp_append,
    tp_after: tp_after,

    extend: extend,
    template: template
  }
  module.exports = exports['default']

});