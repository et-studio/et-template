;(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('etDependency', factory)
  } else {
    var require = function() {}
    var module = {}
    var exports = {}
    factory(require, exports, module)
    global.etDependency = module.exports
  }
})(window, function(require, exports, module) {
  'use strict'

  var LOOP = function LOOP() {}
  var EVENT_SPLITTER = /\s+/

  var _util = {
    extend: function extend() {
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
    },
    createElement: function createElement(tag, attributes) {
      var re = document.createElement(tag)
      for (var key in attributes) {
        _util.setAttribute(re, key, attributes[key])
      }
      return re
    },
    createTextNode: function createTextNode(text) {
      return document.createTextNode(text)
    },
    createComment: function createComment(text) {
      return document.createComment(text)
    },
    createLine: function createLine(text) {
      return _util.createComment(text || 'line')
    },
    remove: function remove(element, isKeeyData) {
      if (element.parentNode) {
        element.parentNode.removeChild(element)
      }
      if (!isKeeyData) {
        element.removeEventListener()
      }
    },
    text: function text(element, _text) {
      element.textContent = _text
    },
    setAttribute: function setAttribute(element, attrName, attrValue) {
      element.setAttribute(attrName, attrValue)
    },
    removeAttribute: function removeAttribute(element, attrName) {
      element.removeAttribute(attrName)
    },
    removeAttributes: function removeAttributes(element, attrNames) {
      for (var i = 0, len = attrNames.length; i < len; i++) {
        var attrName = attrNames[i]
        element.removeAttribute(attrName)
      }
    },
    appendChild: function appendChild(elementA, elementB) {
      elementA.appendChild(elementB)
    },
    before: function before(elementA, elementB) {
      if (elementA.parentNode) {
        elementA.parentNode.insertBefore(elementB, elementA)
      }
    },
    after: function after(elementA, elementB) {
      if (elementA.parentNode) {
        elementA.parentNode.insertBefore(elementB, elementA.nextSibling)
      }
    },
    on: function on(element, eventString, callback) {
      var eventNames = eventString.split(EVENT_SPLITTER)
      for (var i = 0, len = eventNames.length; i < len; i++) {
        var eventName = eventNames[i]
        element.addEventListener(eventName, callback)
      }
    }
  }
  var _prototype = {
    isET: true,
    init: function init(options) {
      this.options = options || {}
      this.roots = {} // 记录是root的节点对象，如果那个节点被移除应该从这里移除
      this.doms = {} // 记录所有的节点对象
      this.last = {} // 记录上一次判断是什么值，用于差异更新
      this.events = {} // 纪录模板事件
      this.create()
    },
    get: function get() {
      // 每次进行 get 都会进行 dom 组合  应该少用
      var re = document.createDocumentFragment()
      var roots = this.roots
      var ids = Object.keys(roots).map(function(key) {
        return +key
      }).sort()

      for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i]
        var dom = roots[id]
        if (dom && dom.isET) {
          _util.appendChild(re, dom.get())
        } else if (dom) {
          _util.appendChild(re, dom)
        }
      }
      return re
    },
    create: function create() {},
    update: function update() {},
    remove: function remove() {
      // 从页面中移除掉，不进行事件解绑，相当于 jQuery 中的 detach
      var roots = this.roots
      var ids = Object.keys(roots)
      for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i]
        var dom = roots[id]
        if (dom && dom.isET) {
          dom.remove()
        } else if (dom) {
          _util.remove(dom, true)
        }
      }
      return this
    },

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
      var args = Array.prototype.slice.call(arguments, 1)
      var callbacks = this.events[eventName] || []
      for (var i = 0, len = callbacks.length; i < len; i++) {
        var callback = callbacks[i]
        callback.apply(null, args)
      }
    },

    destroy: function destroy() {
      this._destroyDoms()
      this._destroyAttributes()
      return null
    },
    _destroyDoms: function _destroyDoms() {
      var doms = this.doms
      var ids = Object.keys(doms)
      for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i]
        var dom = doms[id]
        if (dom && dom.isET) {
          dom.destroy()
        } else if (dom) {
          _util.remove(dom, false)
        }
      }
    },
    _destroyAttributes: function _destroyAttributes() {
      var keys = Object.keys(this)
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i]
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
    _util: _util,
    _prototype: _prototype
  }
  module.exports = exports['default']

});