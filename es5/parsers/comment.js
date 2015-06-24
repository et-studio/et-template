'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

// @tableStart: comment
var commentTableOptions = {
  states: ['start', 'header', 'text', 'end'],
  symbols: ['<!--', '-->'],
  table: [{
    '0': 'header',
    '1': '',
    '-1': ''
  }, {
    '0': '',
    '1': '',
    '-1': 'text'
  }, {
    '0': 'text',
    '1': 'end',
    '-1': 'text'
  }, {
    '0': '',
    '1': '',
    '-1': ''
  }]
};
// @tableEnd

var Parser = require('./parser');
var Machine = require('./machine');
var _ = require('../util');

var commentMachine = new Machine(commentTableOptions);

var CommentParser = (function (_Parser) {
  function CommentParser() {
    _classCallCheck(this, CommentParser);

    if (_Parser != null) {
      _Parser.apply(this, arguments);
    }
  }

  _inherits(CommentParser, _Parser);

  _createClass(CommentParser, [{
    key: 'parse',
    value: function parse(source, options) {
      this.set('comment', source, options);

      var _this = this;
      var text = '';
      machine.each(source, function (state, token) {
        switch (state) {
          case 'header':
          case 'end':
            break;
          case 'text':
            text += token;
            break;
          default:
            _this.throwError(state);
        }
      });

      return text;
    }
  }]);

  return CommentParser;
})(Parser);

module.exports = new CommentParser();