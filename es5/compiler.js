'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _worker = require('./worker');

var _worker2 = _interopRequireDefault(_worker);

var Compiler = (function () {
  function Compiler(options) {
    _classCallCheck(this, Compiler);

    this.options = options;
  }

  _createClass(Compiler, [{
    key: 'pickData',
    value: function pickData(root, compileOptions) {
      var options = this.options;
      var dependencies = root.getDependencies();
      dependencies.unshift({
        name: options.dependencyName,
        path: options.dependencyPath
      });
      return {
        templateName: root.getTemplateName(),
        dependencies: dependencies,
        moduleId: compileOptions.moduleId,
        angularModuleName: compileOptions.angularModuleName,
        modelType: options.modelType,
        newDoms: root.getNewTemplateDoms()
      };
    }
  }, {
    key: 'compile',
    value: function compile(dom, compileOptions) {
      var options = this.options;
      var it = this.pickData(dom, compileOptions);
      switch (options.modules) {
        case 'angular':
          return _worker2['default'].compile_angular(it);
        case 'cmd':
          return _worker2['default'].compile_cmd(it);
        case 'amd':
          return _worker2['default'].compile_amd(it);
        case 'global':
          return _worker2['default'].compile_global(it);
        default:
          return _worker2['default'].compile_common(it);
      }
    }
  }]);

  return Compiler;
})();

exports['default'] = Compiler;
module.exports = exports['default'];