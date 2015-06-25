'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Basic = require('./basic');
var worker = require('../worker');
var conditionParser = require('../parsers/condition');

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
      var tmp = conditionParser.parse(source, {
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
      return [worker.createNull(it)];
    }
  }]);

  return ElseIfNode;
})(Basic);

module.exports = ElseIfNode;