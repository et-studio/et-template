'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Parser = require('./parser');
var Compiler = require('./compiler');
var Formatter = require('./formatter');

var ET = (function () {
  function ET() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ET);

    this.options = options;
    this.parser = new Parser(options.parser);
    this.compiler = new Compiler(options.compiler);
    this.formatter = new Formatter(options.formatter);
  }

  _createClass(ET, [{
    key: 'compile',
    value: function compile(str) {
      var dom = this.parser.parse(str);
      var result = this.compiler.compile(dom);
      return this.formatter.format(result);
    }
  }]);

  return ET;
})();

module.exports = ET;