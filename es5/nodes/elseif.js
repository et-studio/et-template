'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _basic = require('./basic');

var _basic2 = _interopRequireDefault(_basic);

var _worker = require('../worker');

var _worker2 = _interopRequireDefault(_worker);

var _parsersCondition = require('../parsers/condition');

var _parsersCondition2 = _interopRequireDefault(_parsersCondition);

var ElseIfNode = (function (_Basic) {
  function ElseIfNode(source, options) {
    _classCallCheck(this, ElseIfNode);

    _get(Object.getPrototypeOf(ElseIfNode.prototype), 'constructor', this).call(this, source, options);
    this.isNewTemplate = true;
  }

  _inherits(ElseIfNode, _Basic);

  _createClass(ElseIfNode, [{
    key: 'parse',
    value: function parse(source) {
      var tmp = _parsersCondition2['default'].parse(source, {
        expectNodeName: '#elseif'
      });
      this.nodeName = tmp.nodeName;
      this.condition = tmp.condition;
    }
  }, {
    key: 'deliverCreate',
    value: function deliverCreate() {
      var it = {
        id: this.getId(),
        isRoot: this.checkRoot()
      };
      return [_worker2['default'].createNull(it)];
    }
  }]);

  return ElseIfNode;
})(_basic2['default']);

exports['default'] = ElseIfNode;
module.exports = exports['default'];