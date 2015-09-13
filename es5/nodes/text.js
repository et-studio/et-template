'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _basic = require('./basic');

var _basic2 = _interopRequireDefault(_basic);

var _worker = require('../worker');

var _worker2 = _interopRequireDefault(_worker);

var _parsersValue = require('../parsers/value');

var _parsersValue2 = _interopRequireDefault(_parsersValue);

var TextNode = (function (_Basic) {
  _inherits(TextNode, _Basic);

  function TextNode(source) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, TextNode);

    _get(Object.getPrototypeOf(TextNode.prototype), 'constructor', this).call(this, source, options);

    this.nodeType = 3;
    this.isVirtualNode = false;
  }

  _createClass(TextNode, [{
    key: 'parse',
    value: function parse(source) {
      this.textContent = source;
    }
  }, {
    key: 'assembleWorkerData',
    value: function assembleWorkerData() {
      var it = this._workerData;
      if (it) return it;

      it = {
        id: this.getId(),
        isRoot: this.checkRoot(),
        parentId: this.getParentId(),
        text: ''
      };
      var text = this.getTextContent();
      if (_parsersValue2['default'].isErratic(text)) {
        it.valueId = this.getRootValueId();
        it.valueString = _parsersValue2['default'].parse(text);
      } else {
        it.text = text;
      }
      this._workerData = it;
      return it;
    }
  }, {
    key: 'deliverCreate',
    value: function deliverCreate() {
      var it = this.assembleWorkerData();
      return [_worker2['default'].text_create(it)];
    }
  }, {
    key: 'deliverAppend',
    value: function deliverAppend() {
      var it = this.assembleWorkerData();
      return [_worker2['default'].text_append(it)];
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var it = this.assembleWorkerData();
      if (it.valueString) {
        return [_worker2['default'].text_update(it)];
      } else {
        return [];
      }
    }
  }, {
    key: 'deliverRemove',
    value: function deliverRemove() {
      var it = this.assembleWorkerData();
      return [_worker2['default'].text_remove(it)];
    }
  }]);

  return TextNode;
})(_basic2['default']);

exports['default'] = TextNode;
module.exports = exports['default'];