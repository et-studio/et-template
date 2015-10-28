'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _middlewaresMiddlewareGetter = require('./middlewares/middleware-getter');

var _middlewaresMiddlewareGetter2 = _interopRequireDefault(_middlewaresMiddlewareGetter);

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

var DEFAULT_MIDDLEWARES = ['origin-parser', 'source-translator', 'node-creator', 'attributes', 'rebuilder', 'ng-rebuilder', 'checker', 'compiler', 'formatter'];

var ET = (function () {
  function ET(options) {
    _classCallCheck(this, ET);

    this.options = _util2['default'].extend({}, DEFAULTS, options);
  }

  _createClass(ET, [{
    key: 'compile',
    value: function compile(str, runtimeOptions) {
      var options = _util2['default'].extend({}, DEFAULT_COMPILE_OPTIONS, runtimeOptions);
      var middlewares = [];
      switch (this.options.compiledTemplate) {
        case 'dot':
          middlewares = this.getMiddlewares(['dot']);
          break;
        default:
          middlewares = this.getMiddlewares([]);
      }
      return this.runMiddlewares(str, middlewares, options);
    }
  }, {
    key: 'runMiddlewares',
    value: function runMiddlewares(str, middlewares, runtimeOptions) {
      var options = _util2['default'].extend({}, this.options, runtimeOptions);
      var result = str;
      middlewares.map(function (name) {
        var middleware = _middlewaresMiddlewareGetter2['default'].get(name);
        result = middleware.run(result, options);
      });
      return result;
    }
  }, {
    key: 'getMiddlewares',
    value: function getMiddlewares() {
      var array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      return _util2['default'].concat(array, DEFAULT_MIDDLEWARES);
    }
  }]);

  return ET;
})();

exports['default'] = ET;
module.exports = exports['default'];