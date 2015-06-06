'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('./util');

var Worker = (function () {
  function Worker(options) {
    _classCallCheck(this, Worker);

    this.options = _.extend({}, options);
    switch (options.modules) {
      case 'amd':
        this.compile = this.compileAMD;
        break;
      case 'cmd':
        this.compile = this.compileCMD;
        break;
      case 'common':
        this.compile = this.compileCommon;
        break;
      case 'global':
        this.compile = this.compileGlobal;
        break;
      default:
        this.compile = this.compileUMD;
    }
  }

  _createClass(Worker, [{
    key: 'compileAMD',
    value: function compileAMD(it) {
      //var options = this.options;
      // @start: amd
      return '\n    ;define(\'' + it.moduleId + '\', function(require, exports, module){\n      var _et = require(\'_et\');\n      var _util = _et._util;\n      var _prototype = _et._prototype;\n\n      ' + it.delareString + '\n\n      ' + it.extendString + '\n\n      module.exports = ' + it.templateName + ';\n    });\n    ';
      // @end: amd
    }
  }, {
    key: 'compileCMD',
    value: function compileCMD(it) {
      //var options = this.options;
      // @start: cmd
      return '\n    ;define(function(require, exports, module){\n      var _et = require(\'_et\');\n      var _util = _et._util;\n      var _prototype = _et._prototype;\n\n      ' + it.delareString + '\n\n      ' + it.extendString + '\n\n      module.exports = ' + it.templateName + ';\n    });\n    ';
      // @end: cmd
    }
  }, {
    key: 'compileCommon',
    value: function compileCommon(it) {
      //var options = this.options;
      // @start: common
      return '\n    var _et = require(\'_et\');\n    var _util = _et._util;\n    var _prototype = _et._prototype;\n\n    ' + it.delareString + '\n\n    ' + it.extendString + '\n\n    module.exports = ' + it.templateName + ';\n    ';
      // @end: common
    }
  }, {
    key: 'compileGlobal',
    value: function compileGlobal(it) {
      //var options = this.options;
      // @start: global
      return '\n    ;(function(global){\n      var _et = global._et;\n      var _util = _et._util;\n      var _prototype = _et._prototype;\n\n      ' + it.delareString + '\n\n      ' + it.extendString + '\n\n      global.' + it.moduleId + ' = ' + it.templateName + ';\n    })(window);\n    ';
      // @end: global
    }
  }, {
    key: 'compileUMD',
    value: function compileUMD(it) {
      //var options = this.options;
      // @start: umd
      return '\n    ;(function(global, factory) {\n      if (typeof define === \'function\' && define.amd) {\n        define(factory);\n      } else {\n        var _require = function(key) {\n          return global[key];\n        };\n        var _exports = {};\n        var _module = {\n          exports: _exports\n        };\n        factory(_require, _exports, _module);\n        global.' + it.templateName + ' = _module.exports;\n      }\n    })(window, function factory(require, exports, module) {\n\n      var _et = require(\'_et\');\n      var _util = _et._util;\n      var _prototype = _et._prototype;\n\n      ' + it.delareString + '\n\n      ' + it.extendString + '\n\n      module.exports = ' + it.templateName + ';\n    });\n    ';
      // @end: umd
    }
  }, {
    key: 'delare',
    value: function delare(it) {
      //var options = this.options;
      // @start: delare
      return '\n    function ' + it.templateName + '(options) {\n      this.init(options);\n    }\n    ';
      // @end: delare
    }
  }, {
    key: 'extend',
    value: function extend(it) {
      //var options = this.options;
      it.createString = this.create(it);
      it.updateString = this.update(it);
      if (!it.createString && !it.updateString) {
        return '';
      } else if (it.createString && it.updateString) {
        it.createString += ',';
      }

      // @start: extend
      return '\n    _util.extend(' + it.templateName + '.prototype, _prototype, {\n      ' + it.createString + '\n      ' + it.updateString + '\n    });\n    ';
      // @end: extend
    }
  }, {
    key: 'create',
    value: function create(it) {
      if (!it.createString) {
        return '';
      }
      // @start: create
      return '\n    create: function create(){\n      var roots = this.roots;\n      var rootIds = this.rootIds;\n      var doms = this.doms;\n\n      ' + it.createString + '\n    }\n    ';
      // @end: create
    }
  }, {
    key: 'update',
    value: function update(it) {
      if (!it.updateString) {
        return '';
      }
      // @start: update
      return '\n    update: function update(' + it.args.join(',') + ') {\n      var roots = this.roots;\n      var doms = this.doms;\n      var last = this.last;\n\n      ' + it.updateString + '\n    }\n    ';
      // @end: update
    }
  }]);

  return Worker;
})();

module.exports = Worker;