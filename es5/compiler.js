'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('./util');
var CWorker = require('./worker');
var Factory = require('./factory');

/**
 * Dom 的结构
 *  - nodeName        {String}
 *  - children        {Array[Dom]}
 *  - expressions     {Array[Expression]} 在属性上面的表达式数组
 *  - parent          {Dom}
 *  - previousSibling {Dom}
 *  - nextSibling     {Dom}
 *  - attributes      {Map<String, String>}
 *  - textContent     {String}
 *  - nodeType        {number} root: root dom, 1: element, 3:textNode, 8:commentNode
 *
 * Expression
 *  - condition       {String} 触发条件，如果没有条件就认为一直有
 *  - attributes      {Map<String, String>}
 *
 * #if 节点
 *  - condition       {String} 判断条件
 *
 * #elseif
 *  - condition
 *
 * #for 节点
 *  - condition
 *  - itemName
 *  - indexName
 */

var Compiler = (function () {
  function Compiler(options) {
    _classCallCheck(this, Compiler);

    this.options = options;
  }

  _createClass(Compiler, [{
    key: 'getList',
    value: function getList(dom) {
      var re = [];
      var scan = function scan(current) {
        if (current) {
          re.push(current);
          _.each(current.children, null, function (child) {
            scan(child);
          });
        }
      };
      scan(dom);
      return re;
    }
  }, {
    key: 'initAllDoms',
    value: function initAllDoms(dom) {
      _.each(this.getList(dom), null, function (dom) {
        if (dom && typeof dom.init === 'function') {
          dom.init();
        }
      });
    }
  }, {
    key: 'getFactory',
    value: function getFactory() {
      if (!this.factory) {
        this.factory = new Factory(this.options);
      }
      return this.factory;
    }
  }, {
    key: 'getWorker',
    value: function getWorker() {
      if (!this.CWorker) {
        this.worker = new CWorker(this.options);
      }
      return this.worker;
    }
  }, {
    key: 'compile',
    value: function compile(originDom) {
      var dom, factory, worker, newDoms, options, cOptions;

      factory = this.getFactory();
      worker = this.getWorker();

      options = this.options;
      dom = factory.create(originDom);
      this.initAllDoms(dom);
      newDoms = dom.getNewTemplateDoms();

      cOptions = {
        templateName: dom.templateName,
        delareString: this.getDelareString(newDoms),
        extendString: this.getExtendString(newDoms),
        moduleId: options.moduleId
      };
      return worker.compile(cOptions, options);
    }
  }, {
    key: 'getDelareString',
    value: function getDelareString(newDoms) {
      var re = '';
      var worker = this.getWorker();
      _.each(newDoms, null, function (dom) {
        re += worker.delare({
          templateName: dom.templateName
        });
      });
      return re;
    }
  }, {
    key: 'getExtendString',
    value: function getExtendString(newDoms) {
      var re = '';
      var worker = this.getWorker();
      _.each(newDoms, null, function (dom) {
        re += worker.extend({
          templateName: dom.templateName,
          args: dom.getArguments(),
          createString: dom.getCreateString(),
          updateString: dom.getUpdateString()
        });
      });
      return re;
    }
  }]);

  return Compiler;
})();

module.exports = Compiler;