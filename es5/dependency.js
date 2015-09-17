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

  function tp_createElement(elements, id, tag, attributes, properties) {
    var element = document.createElement(tag)
    for (var attrName in attributes) {
      element.setAttribute(attrName, attributes[attrName])
    }
    for (var propName in properties) {
      element[propName] = properties[propName]
    }
    elements[id] = element
  }

  function tp_createFragment(elements, id) {
    elements[id] = document.createDocumentFragment()
  }

  function tp_createLine(elements, id) {
    elements[id] = document.createComment(id)
  }

  function tp_createText(elements, id, text) {
    elements[id] = document.createTextNode(text)
  }

  function tp_before(elements, nextId, id) {
    var next = elements[nextId]
    var current = elements[id]

    if (next.parentNode) {
      if (current.isET) {
        next.parentNode.insertBefore(current.get(), next)
      } else {
        next.parentNode.insertBefore(current, next)
      }
    }
  }

  function tp_after(elements, prevId, id) {
    var prev = elements[prevId]
    var current = elements[id]

    if (prev.parentNode) {
      if (current.isET) {
        prev.parentNode.insertBefore(current.get(), prev.nextSibling)
      } else {
        prev.parentNode.insertBefore(current, prev.nextSibling)
      }
    }
  }

  function tp_append(elements, parentId, id) {
    var parent = elements[parentId]
    var current = elements[id]

    if (current.isET) {
      parent.appendChild(current.get())
    } else {
      parent.appendChild(current)
    }
  }

  function tp_bind(template, id, eventString, callback) {
    template._eventsLogger[id] = true

    var element = template.elements[id]
    var eventNames = eventString.split(EVENT_SPLITTER)
    for (var i = 0, len = eventNames.length; i < len; i++) {
      element.addEventListener(eventNames[i], callback)
    }
  }

  function tp_html(elements, id, html) {
    elements[id].innerHTML = html
  }

  function tp_text(elements, id, text) {
    elements[id].textContent = text
  }

  function tp_setAttribute(elements, id, attrName, attrValue) {
    elements[id].setAttribute(attrName, attrValue)
  }

  function tp_getProperty(elements, id, propName) {
    return elements[id][propName]
  }

  function tp_setProperty(elements, id, propName, propValue) {
    elements[id][propName] = propValue
  }

  function tp_remove(elements, id) {
    var element = elements[id]
    if (element && element.isET) {
      element.remove()
    } else if (element && element.parentNode) {
      element.parentNode.removeChild(element)
    }
  }

  function tp_removeAttribute(elements, id, attrName) {
    elements[id].removeAttribute(attrName)
  }

  function tp_removeAttributes(elements, id) {
    var element = elements[id]
    for (var i = 2, len = arguments.length; i < len; i++) {
      element.removeAttribute(arguments[i])
    }
  }

  function tp_getTemplate(elements, id, Constructor, options) {
    var et = elements[id]
    if (!et) {
      et = elements[id] = new Constructor(options)
    }
    return et
  }

  function tp_removeRoot(template, id) {
    template.roots[id] = false
  }

  function tp_setRoot(template, id, length) {
    if (length >= 0) {
      template.roots[id] = length
    } else {
      template.roots[id] = true
    }
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

      this._rootFrag = document.createDocumentFragment()
      this._eventsLogger = {} // 纪录那些绑定了事件的id

      this.options = options
      this.roots = {} // 记录某个id是不是root，如果纪录的是数字，那么认为是一个所属集合
      this.elements = {} // 记录所有的节点对象
      this.last = {} // 记录上一次判断是什么值，用于差异更新
      this.events = {} // 纪录模板事件
      this.create()
    },
    get: function get() {
      var result = this._rootFrag
      var elements = this.elements
      var roots = this.roots
      var ids = Object.keys(roots).map(function(key) {
        return +key
      }).sort()

      for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i]
        var isRoot = roots[id]
        if (!isRoot) continue

        if (isRoot === true) {
          var element = elements[id]
          if (element.isET) {
            result.appendChild(element.get())
          } else {
            result.appendChild(element)
          }
        } else {
          for (var j = 0, childrenLength = isRoot; j < childrenLength; j++) {
            var elementId = id + '_' + j
            var forElement = elements[elementId]
            if (forElement.isET) {
              result.appendChild(forElement.get())
            } else {
              result.appendChild(forElement)
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
      var args = []
      for (var j = 1, argLen = arguments.length; j < argLen; j++) {
        args.push(arguments[j])
      }

      var root = this.root || this
      var callbacks = root.events[eventName] || []
      for (var i = 0, len = callbacks.length; i < len; i++) {
        var callback = callbacks[i]
        callback.apply(null, args)
      }
    },

    remove: function remove() {
      var elements = this.elements
      var roots = this.roots
      var ids = Object.keys(roots)

      for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i]
        var isRoot = roots[id]
        if (!isRoot) continue

        if (isRoot === true) {
          tp_remove(elements, id)
        } else {
          for (var j = 0, childrenLength = isRoot; j < childrenLength; j++) {
            tp_remove(elements, id + '_' + j)
          }
        }
      }
      return this
    },
    destroy: function destroy() {
      // remove elements
      this.remove()
      // off events
      var ids = Object.keys(this._eventsLogger)
      var elements = this.elements
      for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i]
        var element = elements[id]
        if (!element.isET) element.removeEventListener()
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
    tp_before: tp_before,
    tp_after: tp_after,
    tp_append: tp_append,
    tp_bind: tp_bind,
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
    tp_setAttribute: tp_setAttribute,
    tp_getProperty: tp_getProperty,
    tp_setProperty: tp_setProperty,
    tp_setRoot: tp_setRoot,
    tp_text: tp_text,

    extend: extend,
    template: template
  }
  module.exports = exports['default']

});