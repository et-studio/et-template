'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// @tableStart: format
var formatTableOptions = {
  states: ['header', 'body', 'methodName', 'methodEnd'],
  symbols: ['function', '_util.', '('],
  table: [{ '0': 'body', '1': 'header', '2': 'header', '-1': 'header' }, { '0': 'body', '1': 'methodName', '2': 'body', '-1': 'body' }, { '0': 'methodName', '1': 'methodName', '2': 'methodEnd', '-1': 'methodName' }, { '0': 'body', '1': 'body', '2': 'body', '-1': 'body' }]
};
// @tableEnd

var Machine = require('./machine');
var _ = require('../util');

var formatMachine = new Machine(formatTableOptions);

var FormatParser = (function () {
  function FormatParser() {
    _classCallCheck(this, FormatParser);
  }

  _createClass(FormatParser, [{
    key: 'parse',
    value: function parse(str) {
      var _this = this;

      var header = '';
      var methods = [];
      var body = '';

      var tmp = '';
      formatMachine.each(str, function (state, token) {
        switch (state) {
          case 'header':
            header += token;
            break;
          case 'body':
            body += token;
            break;
          case 'methodName':
            tmp += token;
            break;
          case 'methodEnd':
            methods.push(_this.declareUtilMethod(tmp));
            body = body + _this.translateUtilMethod(tmp) + token;
            tmp = '';
            break;
        }
      });
      methods = _.uniq(methods);
      return '' + header + methods.join('') + body;
    }
  }, {
    key: 'translateUtilMethod',
    value: function translateUtilMethod(tmpStr) {
      var re = '';
      _.each(tmpStr, function (char) {
        if (char === '.') {
          re += '_';
        } else {
          re += char;
        }
      });
      return re.trim();
    }
  }, {
    key: 'declareUtilMethod',
    value: function declareUtilMethod(tmpStr) {
      var methodName = this.translateUtilMethod(tmpStr);
      return 'var ' + methodName + ' = ' + tmpStr + ';\n';
    }
  }]);

  return FormatParser;
})();

module.exports = new FormatParser();