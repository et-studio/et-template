'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _machine = require('./machine');

var _machine2 = _interopRequireDefault(_machine);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _worker = require('../worker');

var _worker2 = _interopRequireDefault(_worker);

// @tableStart: format
var formatTableOptions = {
  states: ['header', 'body', 'prev', 'start', 'method', '_h1', '_h2', '_h3', '_str1', '_str2', '_str3'],
  symbols: [/\s/, '@.', '\\\'', '\\"', '\\`', '\'', '"', '`', '(', 'function', /\w/],
  table: [{ '0': 'header', '1': 'header', '2': 'header', '3': 'header', '4': 'header', '5': '_h1', '6': '_h2', '7': '_h3', '8': 'header', '9': 'body', '10': 'header', '-1': 'header' }, { '0': 'prev', '1': 'body', '2': 'body', '3': 'body', '4': 'body', '5': '_str1', '6': '_str2', '7': '_str3', '8': 'body', '9': 'body', '10': 'body', '-1': 'body' }, { '0': 'prev', '1': 'start', '2': 'body', '3': 'body', '4': 'body', '5': '_str1', '6': '_str2', '7': '_str3', '8': 'body', '9': 'body', '10': 'body', '-1': 'body' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': 'method', '10': 'method', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': 'end:body', '9': 'method', '10': 'method', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '_last', '6': '', '7': '', '8': '', '9': '', '10': '', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '_last', '7': '', '8': '', '9': '', '10': '', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '_last', '8': '', '9': '', '10': '', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '_last', '6': '', '7': '', '8': '', '9': '', '10': '', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '_last', '7': '', '8': '', '9': '', '10': '', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '_last', '8': '', '9': '', '10': '', '-1': '' }]
};
// @tableEnd
var formatMachine = new _machine2['default'](formatTableOptions);

var FormatParser = (function () {
  function FormatParser() {
    _classCallCheck(this, FormatParser);
  }

  _createClass(FormatParser, [{
    key: 'parse',
    value: function parse(str) {
      var header = '';
      var methods = [];
      var body = '';

      var method = '';
      var _this = this;
      formatMachine.each(str, function (state, token) {
        switch (state) {
          case 'header':
          case '_h1':
          case '_h2':
          case '_h3':
            header += token;
            break;
          case 'body':
          case 'prev':
          case '_str1':
          case '_str2':
          case '_str3':
            body += token;
            break;
          case 'start':
            method = '';
            break;
          case 'method':
            method += token;
            break;
          case 'end':
            methods.push(method);
            body = body + '_tp_' + method + token + '_this, ';
            break;
          default:
            _this.throwError(state);
        }
      });

      var it = {
        header: header,
        methods: _util2['default'].uniq(methods),
        body: body
      };
      return _worker2['default'].format_tp(it);
    }
  }]);

  return FormatParser;
})();

exports['default'] = new FormatParser();
module.exports = exports['default'];