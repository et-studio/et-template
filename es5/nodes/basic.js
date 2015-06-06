'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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

var NodeInterface = require('../interfaces/getter-cache');
var _ = require('../util');

var CONFIG = {
  'templateFunctionPrefix': 'Template',
  'spilitMark': '_',
  'lineSuffix': 'line',
  'idPrefix': 'et',
  'valuePrefix': 'value'
};

var Basic = (function (_NodeInterface) {
  function Basic(dom, options) {
    _classCallCheck(this, Basic);

    _get(Object.getPrototypeOf(Basic.prototype), 'constructor', this).call(this, dom, options);

    _.extend(this, dom);
    this.config = CONFIG;
    this.options = options;
    this.parent = options.parent;
    this.previousSibling = options.previousSibling;
    this.nextSibling = options.nextSibling;
    if (options.children) {
      this.children = options.children;
    } else {
      this.children = [];
    }

    var config = this.config;
    this.id = '' + config.idPrefix + '' + options.index;
    this.templateName = '' + config.templateFunctionPrefix + '' + config.spilitMark + '' + this.id;
  }

  _inherits(Basic, _NodeInterface);

  _createClass(Basic, [{
    key: 'getNewTemplateDoms',
    value: function getNewTemplateDoms() {
      var re, cacheKey, cacheValue;

      cacheKey = 'getNewTemplateDoms';
      cacheValue = this.getCache(cacheKey);
      if (cacheValue) {
        re = cacheValue;
      } else {
        re = [this];
        _.each(this.getPosterity(), null, function (dom) {
          if (dom && dom.isNewTemplate) {
            re.push(dom);
          }
        });
        this.saveCache(cacheKey, re);
      }
      return re;
    }
  }, {
    key: 'getCreateString',
    value: function getCreateString() {
      return this.getCreateDeliverys().join('\n');
    }
  }, {
    key: 'getUpdateString',
    value: function getUpdateString() {
      return this.getUpdateDeliverys().join('\n');
    }
  }, {
    key: 'getArguments',
    value: function getArguments() {
      var re = ['it'];

      var lastRoot = this.getLastRoot();
      if (lastRoot) {
        _.concat(re, lastRoot.getArguments());
      }
      if (this.args) {
        _.concat(re, this.args);
      }
      return _.uniq(re);
    }
  }, {
    key: 'getCreateDeliverys',
    value: function getCreateDeliverys() {
      var re = [];
      _.each(this.children, null, function (child) {
        _.concat(re, child.deliverCreate());
        if (!child.isNewTemplate) {
          _.concat(re, child.getCreateDeliverys());
        }
      });
      return re;
    }
  }, {
    key: 'getUpdateDeliverys',
    value: function getUpdateDeliverys() {
      var re = [];
      _.each(this.children, null, function (child) {
        _.concat(re, child.deliverUpdate());
        if (!child.isNewTemplate) {
          _.concat(re, child.getUpdateDeliverys());
        }
      });
      return re;
    }
  }, {
    key: 'checkRoot',
    value: function checkRoot() {
      var parent = this.parent;
      // 当不存在nodeType的时候也认为是root
      if (!parent || !parent.nodeType || parent.nodeType === 'root' || parent.isNewTemplate) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'saveArgument',
    value: function saveArgument(arg) {
      if (!this.args) {
        this.args = [];
      }
      this.args.push(arg);
      return this;
    }
  }, {
    key: 'init',
    value: function init() {
      return this;
    }
  }, {
    key: 'deliverCreate',
    value: function deliverCreate() {
      return [];
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      return [];
    }
  }, {
    key: 'isNewTemplate',

    // attributes or functions could be override
    get: function () {
      return false;
    }
  }]);

  return Basic;
})(NodeInterface);

module.exports = Basic;