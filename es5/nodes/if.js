'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _basic = require('./basic');

var _basic2 = _interopRequireDefault(_basic);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _worker = require('../worker');

var _worker2 = _interopRequireDefault(_worker);

var _parsersCondition = require('../parsers/condition');

var _parsersCondition2 = _interopRequireDefault(_parsersCondition);

var NODE_NAME = '#if';
var TAG = 'if';

var createExpression = function createExpression(tag, condition, startIndex, endIndex, appendList, updateList, removeList) {
  return {
    tag: tag,
    condition: condition || '',
    startIndex: startIndex || 0,
    endIndex: endIndex || 0,
    appendList: appendList || [],
    updateList: updateList || [],
    removeList: removeList || []
  };
};

var IfNode = (function (_Basic) {
  _inherits(IfNode, _Basic);

  function IfNode(source, options) {
    _classCallCheck(this, IfNode);

    _get(Object.getPrototypeOf(IfNode.prototype), 'constructor', this).call(this, source, options);
    this.nodeName = NODE_NAME;
  }

  _createClass(IfNode, [{
    key: 'parse',
    value: function parse(source) {
      var tmp = _parsersCondition2['default'].parse(source, { expectNodeName: NODE_NAME });
      this.condition = tmp.condition;
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      // first check format
      var lastNodeName = this.nodeName;
      var checkHandler = function checkHandler(dom, i) {
        if (lastNodeName === '#else' && dom.nodeName === '#elseif') {
          _this2.throwError('The elseif node shouldn\'t show after else.');
        }
        lastNodeName = dom.nodeName;
      };
      _util2['default'].each(this.children, checkHandler);

      // second index the expressions
      var hasElse = false;
      var expressions = [];
      var expression = createExpression(TAG, this.condition);
      expressions.push(expression);

      var indexHandler = function indexHandler(dom, i) {
        if (dom.nodeName === '#elseif' || dom.nodeName === '#else') {
          var tag = dom.nodeName.substr(1);
          if (tag === 'elseif') tag = 'else if';else hasElse = true;

          expression = createExpression(tag, dom.condition, i, i);
          expressions.push(expression);
        }
        if (dom.nodeName !== '#elseif' && dom.nodeName !== '#else') {
          expression.endIndex++;
        }
      };
      _util2['default'].each(this.children, indexHandler);
      if (!hasElse) expressions.push(createExpression('else', '', 0, 0));

      // third get the worker list
      var _this = this;
      var workerHander = function workerHander(expression) {
        var exclusions = _this.children.filter(function () {
          return true;
        });
        var inclusions = exclusions.splice(expression.startIndex, expression.endIndex);

        _util2['default'].each(inclusions, function (dom) {
          _util2['default'].concat(expression.appendList, dom.deliverAppend());
          _util2['default'].concat(expression.updateList, dom.deliverUpdate());
        });
        _util2['default'].each(exclusions, function (dom) {
          _util2['default'].concat(expression.removeList, dom.deliverRemove());
        });
      };
      _util2['default'].each(expressions, workerHander);

      this.ifExpressions = expressions;
    }
  }, {
    key: 'getIfExpressions',
    value: function getIfExpressions() {
      return this.ifExpressions;
    }
  }, {
    key: 'getIfValueId',
    value: function getIfValueId() {
      var valueId = this._valueId;
      if (valueId >= 0) return valueId;

      valueId = this._valueId = this.getRootValueId();
      return valueId;
    }
  }, {
    key: 'assembleWorkerData',
    value: function assembleWorkerData() {
      var it = this._workerData;
      if (it) return it;

      this._workerData = it = {
        id: this.getId(),
        lineId: this.getLineId(),
        parentId: this.getParentId(),
        valueId: this.getIfValueId(),
        isRoot: this.checkRoot(),
        expressions: this.getIfExpressions()
      };
      return it;
    }
  }, {
    key: 'deliverCreate',
    value: function deliverCreate() {
      var results = this.getChildrenCreate();
      var it = this.assembleWorkerData();
      var tmp = _worker2['default'].if_create(it);
      if (tmp) results.unshift(tmp);
      return results;
    }
  }, {
    key: 'deliverAppend',
    value: function deliverAppend() {
      var results = [];
      var it = this.assembleWorkerData();
      var tmp = _worker2['default'].if_append(it);
      if (tmp) results.unshift(tmp);
      return results;
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var it = this.assembleWorkerData();
      return [_worker2['default'].if_update(it)];
    }
  }, {
    key: 'deliverRemove',
    value: function deliverRemove() {
      var it = this.assembleWorkerData();
      if (it.isRoot) {
        return [_worker2['default'].if_remove(it)];
      } else {
        return [];
      }
    }
  }]);

  return IfNode;
})(_basic2['default']);

exports['default'] = IfNode;
module.exports = exports['default'];