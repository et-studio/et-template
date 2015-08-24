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

var _worker = require('../worker');

var _worker2 = _interopRequireDefault(_worker);

var _parsersFor = require('../parsers/for');

var _parsersFor2 = _interopRequireDefault(_parsersFor);

var defaults = {
  itemName: 'item',
  indexName: 'i',
  lengthName: 'len'
};

var ForNode = (function (_Basic) {
  _inherits(ForNode, _Basic);

  function ForNode(source, options) {
    _classCallCheck(this, ForNode);

    _get(Object.getPrototypeOf(ForNode.prototype), 'constructor', this).call(this, source, options);
    this.isNewTemplate = true;
    this.nodeName = '#for';
  }

  _createClass(ForNode, [{
    key: 'parse',
    value: function parse(source) {
      var tmp = _parsersFor2['default'].parse(source);

      this.itemName = tmp.itemName;
      this.indexName = tmp.indexName;
      this.expression = tmp.expression;
      if (tmp.indexName) {
        this.saveArgument(tmp.itemName, tmp.indexName);
      } else {
        this.saveArgument(tmp.itemName);
      }
    }
  }, {
    key: 'deliverCreate',
    value: function deliverCreate() {
      var it = {
        id: this.getId(),
        isRoot: this.checkRoot(),
        lineId: this.getLineId(),
        parentId: this.getParentId()
      };
      var re = [];
      re.push(_worker2['default'].createLine(it));
      re.push(_worker2['default'].createFor(it));
      return re;
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var it = {
        id: this.getId(),
        parentId: this.getParentId(),
        lineId: this.getLineId(),
        isRoot: this.checkRoot(),
        valueId: this.getRootValueId(),
        args: this.getArguments(),
        expression: this.getExpression(),
        templateName: this.getTemplateName(),
        indexName: this.getIndexName(),
        itemName: this.getItemName(),
        condition: this.condition
      };
      return [_worker2['default'].updateFor(it)];
    }
  }, {
    key: 'getExpression',
    value: function getExpression() {
      return this.expression || this.condition;
    }
  }, {
    key: 'getItemName',
    value: function getItemName() {
      return this.itemName || defaults.itemName;
    }
  }, {
    key: 'getLengthName',
    value: function getLengthName() {
      return this.lengthName || defaults.lengthName;
    }
  }, {
    key: 'getIndexName',
    value: function getIndexName() {
      return this.indexName || defaults.indexName;
    }
  }]);

  return ForNode;
})(_basic2['default']);

exports['default'] = ForNode;
module.exports = exports['default'];