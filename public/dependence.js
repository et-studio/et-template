// ignore
'use strict';
(function(global, factory) {

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    global._et = factory();
  }
})(window, function factory() {
  var LOOP = function LOOP() {};
  var util = {
    extend: function extend() {
      var len = arguments.length;
      if (len <= 1) {
        return arguments[0];
      } else {
        var re = arguments[0] || {};
        for (var i = 1; i < len; i++) {
          var item = arguments[i];
          for (var key in item) {
            re[key] = item[key];
          }
        }
        return re;
      }
    },
    createElement: function createElement(tag) {
      return document.createElement(tag);
    },
    createTextNode: function createTextNode(text) {
      return document.createTextNode(text);
    },
    remove: function remove(element, isKeeyData) {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      if (!isKeeyData) {
        element.removeEventListener();
      }
    },
    text: function text(element, _text) {
      element.textContent = _text;
    },
    setAttribute: function setAttribute(element, attrName, attrValue) {
      element.setAttribute(attrName, attrValue);
    },
    removeAttribute: function removeAttribute(element, attrName) {
      element.removeAttribute(attrName);
    },
    appendChild: function appendChild(elementA, elementB) {
      elementA.appendChild(elementB);
    },
    before: function before(elementA, elementB) {
      if (elementA.parentNode) {
        elementA.parentNode.insertBefore(elementB, elementA);
      }
    },
    append: function append(elementA, elementB) {
      elementA.appendChild(elementB);
    },
    after: function after(elementA, elementB) {
      if (elementA.parentNode) {
        elementA.parentNode.insertBefore(elementB, elementA.nextSibling);
      }
    }
  };
  var _prototype = {
    isET: true,
    init: function init(options) {
      this.options = options || {};
      this.roots = []; // 记录哪些对象是 root 对象
      this.doms = {}; // 记录所有的节点对象
      this.last = {}; // 记录上一次判断是什么值，用于差异更新
      this.createElements();
    },
    get: function get() {
      // 每次进行 get 都会进行 dom 组合  应该少用
      var list = this.roots;
      if (list.length === 1) {
        var tmp = list[0];
        if (tmp && tmp.isET) {
          return tmp.get();
        } else if (tmp) {
          return tmp;
        } else {
          return document.createDocumentFragment();
        }
      } else {
        var re = document.createDocumentFragment();
        for (var i = 0, len = list.length; i < len; i++) {
          var item = list[i];
          if (item && item.isET) {
            util.append(re, item.get());
          } else if (item) {
            util.append(re, item);
          }
        }
        return re;
      }
    },
    createElements: function createElements() {},
    update: function update() {},
    remove: function remove() {
      // 从页面中移除掉，不进行事件解绑，相当于 jQuery 中的 detach
      var list = this.roots;
      for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        if (item && item.isET) {
          item.remove();
        } else if (item) {
          // 移除节点对象
          util.remove(item, true);
        }
      }
      return this;
    },
    destroy: function destroy() {
      // 销毁对象，解绑所有事件，相当于 jQuery 中的 remove
      var list = this.roots;
      for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        if (item && item.isET) {
          item.destroy();
        } else if (item) {
          // 销毁节点对象
          util.remove(item, false);
        }
      }
      // 销毁所有的属性
      for (var key in this) {
        if (typeof this[key] !== 'function') {
          if (typeof this[key].destroy === 'function') {
            this[key].destroy();
          }
          // 设置所有对象为 null
          this[key] = null;
        } else {
          // 设置所有函数为空函数
          this[key] = LOOP;
        }
      }
      return this;
    }
  };
  return {
    util: util,
    _prototype: _prototype
  };
});