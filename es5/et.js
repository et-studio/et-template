'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Parser = require('./parser');
var Compiler = require('./compiler');
var formatter = require('./formatter');

var ET = (function () {
  function ET() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ET);

    this.options = options;
    this.parser = new Parser(options.parser);
    this.compiler = new Compiler(options.compiler);
  }

  _createClass(ET, [{
    key: 'translate',
    value: function translate(str) {
      var dom = this.parse(str);
      var result = this.compile(dom);
      return this.format(result);
    }
  }, {
    key: 'parse',
    value: function parse(str) {
      return this.parser.parse(str);
    }
  }, {
    key: 'compile',
    value: function compile(dom) {
      return this.compiler.compile(dom);
    }
  }, {
    key: 'format',
    value: function format(str) {
      return formatter.format(str);
    }
  }]);

  return ET;
})();

module.exports = ET;