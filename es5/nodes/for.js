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
    key: 'getForValueId',
    value: function getForValueId() {
      var valueId = this._valueId;
      if (valueId >= 0) return valueId;

      valueId = this._valueId = this.getRootValueId();
      return valueId;
    }
  }, {
    key: 'checkIsImportTemplate',
    value: function checkIsImportTemplate() {
      return this.children.length === 1 && this.children[0].nodeName === '#import';
    }
  }, {
    key: 'checkIsCompile',
    value: function checkIsCompile() {
      return !this.checkIsImportTemplate();
    }
  }, {
    key: 'assembleWorkerData',
    value: function assembleWorkerData() {
      var it = this._workerData;
      if (it) return it;

      it = {
        id: this.getId(),
        lineId: this.getLineId(),
        parentId: this.getParentId(),
        valueId: this.getForValueId(),
        isRoot: this.checkRoot(),
        expression: this.expression || this.condition,
        indexName: this.indexName || defaults.indexName,
        itemName: this.itemName || defaults.itemName,
        templateName: this.getTemplateName(),
        args: this.getArguments()
      };

      if (this.checkIsImportTemplate()) {
        var child = this.children[0];
        it.templateName = child.getTemplateName();
        it.args = child.getArguments();
      }

      this._workerData = it;
      return it;
    }
  }, {
    key: 'deliverCreate',
    value: function deliverCreate() {
      var it = this.assembleWorkerData();
      return [_worker2['default'].for_create(it)];
    }
  }, {
    key: 'deliverAppend',
    value: function deliverAppend() {
      var it = this.assembleWorkerData();
      return [_worker2['default'].for_append(it)];
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var it = this.assembleWorkerData();
      return [_worker2['default'].for_update(it)];
    }
  }, {
    key: 'deliverRemove',
    value: function deliverRemove() {
      var it = this.assembleWorkerData();
      return [_worker2['default'].for_remove(it)];
    }
  }]);

  return ForNode;
})(_basic2['default']);

exports['default'] = ForNode;
module.exports = exports['default'];