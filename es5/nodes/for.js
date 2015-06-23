'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

// @tableStart: for
var forTableOptions = {
  states: ['start', 'header', 'headerEnd', 'itemName', 'itemEnd', 'indexName', 'indexEnd', 'exStart', 'expression'],
  symbols: ['[', ' in ', ' ', ',', ';'],
  table: [{
    '0': 'start',
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '-1': 'header'
  }, {
    '0': '',
    '1': '',
    '2': 'headerEnd',
    '3': '',
    '4': '',
    '-1': 'header'
  }, {
    '0': '',
    '1': '',
    '2': 'headerEnd',
    '3': '',
    '4': '',
    '-1': 'itemName'
  }, {
    '0': 'text',
    '1': 'exStart',
    '2': 'itemEnd',
    '3': 'itemEnd',
    '4': 'itemEnd',
    '-1': 'itemName'
  }, {
    '0': '',
    '1': 'exStart',
    '2': 'itemEnd',
    '3': '',
    '4': '',
    '-1': 'indexName'
  }, {
    '0': '',
    '1': 'exStart',
    '2': 'indexEnd',
    '3': 'indexEnd',
    '4': 'indexEnd',
    '-1': 'indexName'
  }, {
    '0': '',
    '1': 'exStart',
    '2': 'indexEnd',
    '3': '',
    '4': '',
    '-1': ''
  }, {
    '0': '',
    '1': '',
    '2': 'exStart',
    '3': '',
    '4': '',
    '-1': 'expression'
  }, {
    '0': 'expression',
    '1': 'expression',
    '2': 'expression',
    '3': 'expression',
    '4': 'expression',
    '-1': 'expression'
  }]
};
// @tableEnd

var worker = require('../worker');
var Basic = require('./basic');
var Machine = require('../machine');
var forMachine = new Machine(forTableOptions);

var defaults = {
  itemName: 'item',
  indexName: 'i',
  lengthName: 'len'
};

var ForNode = (function (_Basic) {
  function ForNode() {
    _classCallCheck(this, ForNode);

    if (_Basic != null) {
      _Basic.apply(this, arguments);
    }
  }

  _inherits(ForNode, _Basic);

  _createClass(ForNode, [{
    key: 'parseSource',
    value: function parseSource(source) {
      var _this = this;
      var nodeName = '';
      var itemName = '';
      var indexName = '';
      var expression = '';
      var lastToken = '';
      forMachine.each(source, function (state, token) {
        lastToken = token;
        switch (state) {
          case 'start':
          case 'headerEnd':
          case 'itemEnd':
          case 'indexEnd':
          case 'exStart':
            break;
          case 'header':
            nodeName += token;
            break;
          case 'itemName':
            itemName += token;
            break;
          case 'indexName':
            indexName += token;
            break;
          case 'expression':
            expression += token;
            break;
          default:
            _this.throwError(state);
        }
      });
      if (lastToken !== ']') {
        this.throwError();
      }
      nodeName = nodeName.trim().toLowerCase();
      itemName = itemName.trim();
      indexName = indexName.trim();
      expression = expression.substr(0, expression.length - 1).trim();

      if (nodeName !== '#for') {
        this.throwError();
      }
      if (!itemName) {
        this.throwError();
      }
      if (!expression) {
        this.throwError();
      }
      this.nodeName = nodeName;
      this.itemName = itemName;
      this.indexName = indexName;
      this.expression = expression;

      this.saveArgument(itemName, indexName);
    }
  }, {
    key: 'throwError',
    value: function throwError(code) {
      var line = this.getLineNumber();
      throw new Error('Unrecognized #for at line: ' + line + '.');
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
      re.push(worker.createFor(it));
      re.push(worker.createLine(it));
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
      return [worker.updateFor(it)];
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
  }, {
    key: 'isNewTemplate',
    get: function () {
      return true;
    }
  }]);

  return ForNode;
})(Basic);

module.exports = ForNode;