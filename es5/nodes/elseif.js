'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var NewNode = require('./new');
var worker = require('../worker');
var conditionParser = require('../parsers/condition');

var IfNode = (function (_NewNode) {
  function IfNode() {
    _classCallCheck(this, IfNode);

    if (_NewNode != null) {
      _NewNode.apply(this, arguments);
    }
  }

  _inherits(IfNode, _NewNode);

  _createClass(IfNode, [{
    key: 'parseSource',
    value: function parseSource(source) {
      var tmp = conditionParser.parse(source, {
        expectNodeName: '#elseif'
      });
      this.nodeName = tmp.nodeName;
      this.condition = tmp.condition;
    }
  }]);

  return IfNode;
})(NewNode);

module.exports = IfNode;