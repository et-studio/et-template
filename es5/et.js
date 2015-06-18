'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// var Parser = require('./parser')
var Compiler = require('./compiler');
var formatter = require('./formatter');

var ET = (function () {
  function ET(options) {
    _classCallCheck(this, ET);

    this.options = options;
    // TODO: wait et-parser
    // this.parser = new Parser(options);
    this.compiler = new Compiler(options);
  }

  _createClass(ET, [{
    key: 'compile',
    value: function compile(str) {
      var dom = {};
      var result = this.compiler.compile(dom);
      return formatter.format(result);
    }
  }]);

  return ET;
})();

module.exports = ET;