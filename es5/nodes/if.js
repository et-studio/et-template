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

var _parsersCondition = require('../parsers/condition');

var _parsersCondition2 = _interopRequireDefault(_parsersCondition);

var NAME_SPACE = 'if';
var NODE_NAME = '#' + NAME_SPACE;
var TAG = NAME_SPACE;

var IfNode = (function (_Basic) {
  _inherits(IfNode, _Basic);

  function IfNode(origin, options) {
    _classCallCheck(this, IfNode);

    _get(Object.getPrototypeOf(IfNode.prototype), 'constructor', this).call(this, origin, options);

    this.namespace = NAME_SPACE;
    this.isNewTemplate = true;
    this.nodeName = NODE_NAME;
  }

  _createClass(IfNode, [{
    key: 'parse',
    value: function parse(source) {
      var tmp = _parsersCondition2['default'].parse(source, { expectNodeName: NODE_NAME });
      this.condition = tmp.condition;
    }
  }, {
    key: 'getTag',
    value: function getTag() {
      return TAG;
    }
  }, {
    key: 'getConditionDoms',
    value: function getConditionDoms() {
      var results = [this.translateDom(this)];

      var hasElse = false;
      var current = this.next;
      while (current) {
        var nodeName = current.getNodeName();
        if (nodeName === '#ELSEIF') {
          results.push(this.translateDom(current));
          current = current.next;
        } else if (nodeName === '#ELSE') {
          results.push(this.translateDom(current));
          hasElse = true;
          break;
        } else {
          break;
        }
      }
      if (!hasElse) results.push(this.translateDom(null));
      return results;
    }
  }, {
    key: 'translateDom',
    value: function translateDom(dom) {
      if (dom) {
        return {
          id: dom.getId(),
          templateName: dom.getTemplateName(),
          args: dom.getArguments(),
          tag: dom.getTag(),
          condition: dom.condition
        };
      } else {
        return {
          tag: 'else',
          condition: '',
          isDefaultElse: true
        };
      }
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
        valueId: this.getRootValueId(),
        saveId: this.getRootValueId(),
        isRoot: this.checkRoot(),
        doms: this.getConditionDoms(),
        args: this.getArguments()
      };
      return it;
    }
  }]);

  return IfNode;
})(_basic2['default']);

exports['default'] = IfNode;
module.exports = exports['default'];