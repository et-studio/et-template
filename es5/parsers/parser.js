'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BasicParser = (function () {
  function BasicParser(source, options) {
    _classCallCheck(this, BasicParser);

    this.name = 'basic';
    this.source = source;
    this.rowNumber = 0;
    this.colNumber = 0;
  }

  _createClass(BasicParser, [{
    key: 'set',
    value: function set(name, source) {
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      this.name = name;
      this.source = source;
      this.rowNumber = options.rowNumber || 0;
      this.colNumber = options.colNumber || 0;
    }
  }, {
    key: 'getErrorMessage',
    value: function getErrorMessage(code) {
      return '';
    }
  }, {
    key: 'throwError',
    value: function throwError(code) {
      var source = this.source;
      var message = this.getErrorMessage(code);
      throw new Error(message + ' ===> ' + source);
    }
  }]);

  return BasicParser;
})();

exports['default'] = BasicParser;
module.exports = exports['default'];