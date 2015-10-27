'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _middlewaresAttributes = require('./middlewares/attributes');

var _middlewaresAttributes2 = _interopRequireDefault(_middlewaresAttributes);

var _middlewaresChecker = require('./middlewares/checker');

var _middlewaresChecker2 = _interopRequireDefault(_middlewaresChecker);

var _middlewaresCompiler = require('./middlewares/compiler');

var _middlewaresCompiler2 = _interopRequireDefault(_middlewaresCompiler);

var _middlewaresDot = require('./middlewares/dot');

var _middlewaresDot2 = _interopRequireDefault(_middlewaresDot);

var _middlewaresFormatter = require('./middlewares/formatter');

var _middlewaresFormatter2 = _interopRequireDefault(_middlewaresFormatter);

var _middlewaresParser = require('./middlewares/parser');

var _middlewaresParser2 = _interopRequireDefault(_middlewaresParser);

var _middlewaresRebuilder = require('./middlewares/rebuilder');

var _middlewaresRebuilder2 = _interopRequireDefault(_middlewaresRebuilder);

var _middlewaresNgRebuilder = require('./middlewares/ng-rebuilder');

var _middlewaresNgRebuilder2 = _interopRequireDefault(_middlewaresNgRebuilder);

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

var DEFAULT_MIDDLEWARES = [_middlewaresParser2['default'], _middlewaresAttributes2['default'], _middlewaresRebuilder2['default'], _middlewaresNgRebuilder2['default'], _middlewaresChecker2['default'], _middlewaresCompiler2['default'], _middlewaresFormatter2['default']];

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
          middlewares = this.getMiddlewares([_middlewaresDot2['default']]);
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
      middlewares.map(function (middleware) {
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