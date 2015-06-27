'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var formatParser = require('./parsers/format');
var esformatter = require('esformatter');

var Formatter = (function () {
  function Formatter() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Formatter);

    this.options = options;
  }

  _createClass(Formatter, [{
    key: 'format',
    value: function format(str) {
      str = formatParser.parse(str);
      return esformatter.format(str, this.options);
    }
  }]);

  return Formatter;
})();

module.exports = Formatter;