'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ = require('../util');
var worker = require('../worker');
var NewNode = require('./new');
var Machine = require('../machine');

// @tableStart: condition
var conditionTableOptions = {
  states: ['start', 'name', 'condition'],
  symbols: ['[', ' '],
  table: [{
    '0': 'start',
    '1': '',
    '-1': 'name'
  }, {
    '0': '',
    '1': 'condition',
    '-1': 'name'
  }, {
    '0': 'condition',
    '1': 'condition',
    '-1': 'condition'
  }]
};
// @tableEnd

var conditionMachine = new Machine(conditionTableOptions);

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
      var self = this;

      var nodeName = '';
      var condition = '';
      var lastToken = '';
      conditionMachine.each(source, function (state, token) {
        lastToken = token;
        switch (state) {
          case 'start':
            break;
          case 'name':
            nodeName += token;
            break;
          case 'condition':
            condition += token;
            break;
          default:
            self.throwError();
        }
      });
      if (lastToken !== ']') {
        self.throwError();
      }
      if (nodeName.toLowerCase() !== '#elseif') {
        self.throwError();
      }
      condition = condition.substr(0, condition.length - 1);
      condition = condition.trim();
      if (!condition) {
        self.throwError();
      }

      this.nodeName = nodeName.toLowerCase();
      this.condition = condition;
    }
  }, {
    key: 'throwError',
    value: function throwError(code) {
      var line = this.getLineNumber();
      throw new Error('Unrecognized #elseif at line: ' + line + '.');
    }
  }]);

  return IfNode;
})(NewNode);

module.exports = IfNode;