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
  compiledTemplate: null, // ['dot', null]
  modules: 'common', // ['common', 'cmd', 'amd', 'global', 'angular']
  dependencyName: '_dep',
  dependencyPath: 'et-dependency',
  modelType: 'event' // ['model', 'object', 'event']
};

var DEFAULT_COMPILE_OPTIONS = {
  moduleId: 'Template'
};

var ET = (function () {
  function ET(options) {
    _classCallCheck(this, ET);

    options = _util2['default'].extend({}, DEFAULTS, options);
    this.options = options;
    this.parser = new _parser2['default'](options);
    this.compiler = new _compiler2['default'](options);
    this.formatter = new _formatter2['default'](options);
  }

  _createClass(ET, [{
    key: 'compile',
    value: function compile(str, compileOptions) {
      compileOptions = _util2['default'].extend({}, DEFAULT_COMPILE_OPTIONS, compileOptions);
      switch (this.options.compiledTemplate) {
        case 'dot':
          return this.compileDot(str, compileOptions);
        default:
          return this.compileET(str, compileOptions);
      }
    }
  }, {
    key: 'compileET',
    value: function compileET(str, compileOptions) {
      var dom = this.parser.parse(str);
      var result = this.compiler.compile(dom, compileOptions);
      return this.formatter.format(result);
    }
  }, {
    key: 'compileDot',
    value: function compileDot(str, compileOptions) {
      var dom = this.parser.parseDot(str);
      var result = this.compiler.compile(dom, compileOptions);
      return this.formatter.format(result);
    }
  }]);

  return ET;
})();

exports['default'] = ET;
module.exports = exports['default'];