'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _compiler = require('./compiler');

var _compiler2 = _interopRequireDefault(_compiler);

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var DEFAULTS = {
  modules: 'common', // ['common', 'cmd', 'amd', 'global', 'angular']
  dependency: 'et-dependency',
  modelType: 'event', // ['model', 'object', 'event']
  moduleId: 'Template',
  angularModuleName: 'moduleName'
};

var ET = (function () {
  function ET() {
    var initOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ET);

    this.initOptions = _util2['default'].extend({}, DEFAULTS, initOptions);
    this.parser = new _parser2['default'](this.initOptions);
    this.compiler = new _compiler2['default'](this.initOptions);
    this.formatter = new _formatter2['default'](this.initOptions);
  }

  _createClass(ET, [{
    key: 'compile',
    value: function compile(str, compileOptions) {
      var options = _util2['default'].extend({}, this.initOptions, compileOptions);
      var dom = this.parser.parse(str, options);
      var result = this.compiler.compile(dom, options);
      return this.formatter.format(result, options);
    }
  }, {
    key: 'compileDot',
    value: function compileDot(str, compileOptions) {
      var options = _util2['default'].extend({}, this.initOptions, compileOptions);
      var dom = this.parser.parseDot(str, options);
      var result = this.compiler.compile(dom, options);
      return this.formatter.format(result, options);
    }
  }]);

  return ET;
})();

exports['default'] = ET;
module.exports = exports['default'];