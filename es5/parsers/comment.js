'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _machine = require('./machine');

// @tableStart: comment

var _machine2 = _interopRequireDefault(_machine);

var commentTableOptions = {
  states: ['start', 'header', 'text', 'end'],
  symbols: ['<!--', '-->'],
  table: [{ '0': 'header', '1': '', '-1': '' }, { '0': '', '1': '', '-1': 'text' }, { '0': 'text', '1': 'end', '-1': 'text' }, { '0': '', '1': '', '-1': '' }]
};
// @tableEnd

var commentMachine = new _machine2['default'](commentTableOptions);

var CommentParser = (function (_Parser) {
  _inherits(CommentParser, _Parser);

  function CommentParser() {
    _classCallCheck(this, CommentParser);

    _get(Object.getPrototypeOf(CommentParser.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(CommentParser, [{
    key: 'parse',
    value: function parse(source, options) {
      this.set('comment', source, options);
      var _this = this;
      var text = '';
      commentMachine.each(source, function (state, token) {
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
})(_parser2['default']);

exports['default'] = new CommentParser();
module.exports = exports['default'];