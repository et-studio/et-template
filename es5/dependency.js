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

  var EVENT_SPLITTER = /\s+|,/
  var EVENT_PREFIX = 'on-'

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

  function tp_create_parentHander(template, parentId, id) {
    if (parentId) {
      tp_append(template, parentId, id)
    } else {
      tp_setRoot(template, id)
    }
  }
  function tp_createElement(template, parentId, id, tag, attributes, properties) {
    template.elements[id] = document.createElement(tag)
    for (var attrName in attributes) {
      tp_setAttribute(template, id, attrName, attributes[attrName])
    }
    for (var propName in properties) {
      tp_setProperty(template, id, propName, properties[propName])
    }
    tp_create_parentHander(template, parentId, id)
  }

  function tp_createLine(template, parentId, id) {
    var elements = template.elements
    elements[id] = document.createComment(id)
    tp_create_parentHander(template, parentId, id)
  }

  function tp_createText(template, parentId, id, text) {
    var elements = template.elements
    elements[id] = document.createTextNode(text)
    tp_create_parentHander(template, parentId, id)
  }

  function tp_createTemplate(template, parentId, id, Constructor, options) {
    var elements = template.elements
    var et = elements[id] = new Constructor(template.context, template)
    if (!parentId) tp_setRoot(template, id)
    return et
  }

  function tp_getTemplate(template, id) {
    return template.elements[id]
  }

  function tp_getConditionTemplate(template, id, Constructor, options) {
    var et = tp_getTemplate(template, id)
    if (!et) {
      var elements = template.elements
      et = elements[id] = new Constructor(template.context, template)
    }
    return et
  }

  function tp_before(template, nextId, id) {
    var elements = template.elements
    var next = elements[nextId]
    var current = elements[id]

    if (next.isET)
      next = next.templateStart
    if (current.isET)
      current = current.get()
    if (next.parentNode) next.parentNode.insertBefore(current, next)
  }

  function tp_after(template, prevId, id) {
    var elements = template.elements
    var prev = elements[prevId]
    var current = elements[id]

    if (prev.isET)
      prev = prev.templateEnd
    if (current.isET)
      current = current.get()
    if (prev.parentNode) prev.parentNode.insertBefore(current, prev.nextSibling)
  }

  function tp_append(template, parentId, id) {
    var elements = template.elements
    var parent = elements[parentId]
    var current = elements[id]

    if (current.isET)
      current = current.get()
    parent.appendChild(current)
  }

  function parseCallback(template, callback) {
    if (typeof callback !== 'function') {
      return template.context[callback]
    } else {
      return callback
    }
  }
  function wrapCallbackWithArguments(template, id, eventName, callback) {
    var context = template.context
    if (typeof callback != 'function')
      callback = context[callback]
    if (typeof callback != 'function') return null
    return function(e) {
      var args = tp_getEventArguments(template, id, eventName) || []
      args.unshift(e)
      callback.apply(context, args)
    }
  }
  function tp_bind(template, id, eventString, callback, withArguments) {
    var element = template.elements[id]
    if (!element.addEventListener) {
      // console.warning('The element has no addEventListener method', element)
      return
    }
    callback = parseCallback(template, callback)
    if (typeof callback !== 'function') {
      // console.warning('Could not find the listner handler', element)
      return
    }

    template._eventsLogger[id] = true
    var eventNames = eventString.split(EVENT_SPLITTER)
    for (var i = 0, len = eventNames.length; i < len; i++) {
      var eventName = eventNames[i]
      if (withArguments) {
        callback = wrapCallbackWithArguments(template, id, eventName, callback)
      } else {
        callback = callback.bind(template.context)
      }
      element.addEventListener(eventName, callback, false)
    }
  }
  function tp_bindEventsByMap(template, id, eventsMap) {
    for (var key in eventsMap) {
      var list = eventsMap[key]
      var fn = list[0]
      var withArguments = list[1]
      tp_bind(template, id, key, fn, withArguments)
    }
  }

  function tp_getEventArguments(template, id, eventName) {
    return template.last['event_' + id + '_' + eventName] || []
  }

  function tp_saveEventArguments(template, id, eventName, args) {
    template.last['event_' + id + '_' + eventName] = args
  }

  function tp_isArrayEqual(arrayA, arrayB) {
    if (arrayA === arrayB) return true
    if (arrayA == null && arrayA == arrayB) return true
    if (arrayA.length !== arrayB.length) return false

    for (var i = 0, len = arrayA.length; i < len; i++) {
      if (arrayA[i] !== arrayB[i]) return false
    }
    return true
  }

  function tp_html(template, id, html) {
    var elements = template.elements
    elements[id].innerHTML = html
  }

  function tp_text(template, id, text) {
    var elements = template.elements
    elements[id].textContent = text
  }

  function tp_setAttribute(template, id, attrName, attrValue) {
    var elements = template.elements
    if (attrName.indexOf(EVENT_PREFIX) === 0) {
      tp_bind(template, id, attrName.substr(EVENT_PREFIX.length), attrValue)
    }
    elements[id].setAttribute(attrName, attrValue)
  }

  function tp_getProperty(template, id, propName) {
    var elements = template.elements
    return elements[id][propName]
  }

  function tp_setProperty(template, id, propName, propValue) {
    var elements = template.elements
    elements[id][propName] = propValue
  }

  function tp_remove(template, id) {
    var elements = template.elements
    var element = elements[id]
    if (element && element.isET) {
      element.remove()
    } else if (element && element.parentNode) {
      element.parentNode.removeChild(element)
    }
  }

  function tp_removeAttribute(template, id, attrName) {
    var elements = template.elements
    elements[id].removeAttribute(attrName)
  }

  function tp_removeAttributes(template, id) {
    var elements = template.elements
    var element = elements[id]
    for (var i = 2, len = arguments.length; i < len; i++) {
      element.removeAttribute(arguments[i])
    }
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

  function tp_setContext(template, key, value) {
    template.context[key] = value
  }

  var template = {
    isET: true,
    init: function init(context, parent) {
      this.context = context || {}
      this.parent = parent

      this.rootFrag = document.createDocumentFragment()
      this.templateStart = document.createComment('Start Template')
      this.templateEnd = document.createComment('End Template')

      this._eventsLogger = {} // 纪录哪些id的节点绑定了事件
      this.roots = {} // 记录某个id是不是root，如果纪录的是数字，那么认为是一个所属集合
      this.elements = {} // 记录所有的节点对象
      this.last = {} // 记录上一次判断是什么值，用于差异更新
      this.create()
    },
    get: function get() {
      var result = this.rootFrag
      var elements = this.elements
      var roots = this.roots
      var ids = Object.keys(roots).sort(function(a, b) {
        return (+a) - (+b)
        })

        result.appendChild(this.templateStart)
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
        result.appendChild(this.templateEnd)
        return result
      },
      create: function create() {},
      update: function update() {},

      remove: function remove() {
        var roots = this.roots
        var ids = Object.keys(roots)

        for (var i = 0, len = ids.length; i < len; i++) {
          var id = ids[i]
          var isRoot = roots[id]
          if (!isRoot) continue

          if (isRoot === true) {
            tp_remove(this, id)
          } else {
            for (var j = 0, childrenLength = isRoot; j < childrenLength; j++) {
              tp_remove(this, id + '_' + j)
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
          else element.destroy()
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

    function dep_createTemplate(prop) {
      var Template = function(context, options) {
        this.init(context, options)
      }
      extend(Template.prototype, template, prop)
      return Template
    }

    var et_dependency = Object.create({})

    et_dependency.tp_before = tp_before
    et_dependency.tp_after = tp_after
    et_dependency.tp_append = tp_append
    et_dependency.tp_bind = tp_bind
    et_dependency.tp_createElement = tp_createElement
    et_dependency.tp_createLine = tp_createLine
    et_dependency.tp_createText = tp_createText
    et_dependency.tp_createTemplate = tp_createTemplate
    et_dependency.tp_getTemplate = tp_getTemplate
    et_dependency.tp_getConditionTemplate = tp_getConditionTemplate
    et_dependency.tp_html = tp_html
    et_dependency.tp_remove = tp_remove
    et_dependency.tp_removeAttribute = tp_removeAttribute
    et_dependency.tp_removeAttributes = tp_removeAttributes
    et_dependency.tp_removeRoot = tp_removeRoot
    et_dependency.tp_setAttribute = tp_setAttribute
    et_dependency.tp_getProperty = tp_getProperty
    et_dependency.tp_setProperty = tp_setProperty
    et_dependency.tp_setRoot = tp_setRoot
    et_dependency.tp_text = tp_text
    et_dependency.tp_setContext = tp_setContext
    et_dependency.dep_createTemplate = dep_createTemplate
    et_dependency.tp_bindEventsByMap = tp_bindEventsByMap
    et_dependency.tp_getEventArguments = tp_getEventArguments
    et_dependency.tp_saveEventArguments = tp_saveEventArguments
    et_dependency.tp_isArrayEqual = tp_isArrayEqual

    module.exports = et_dependency

  });