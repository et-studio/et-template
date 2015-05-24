'use strict';

var _ = require('underscore');

function Worker(options) {
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
_.extend(Worker.prototype, {
  compileAMD: function compileAMD(it) {
    //var options = this.options;
    // @start: amd
    return '\n    ;define(\'' + it.moduleId + '\', function(require, exports, module){\n      var _et = require(\'_et\');\n      var _util = _et._util;\n      var _prototype = _et.prototype;\n\n      ' + it.delareString + '\n\n      ' + it.extendString + '\n\n      module.exports = ' + it.templateName + ';\n    });\n    ';
  // @end: amd
  },
  compileCMD: function compileCMD(it) {
    //var options = this.options;
    // @start: cmd
    return '\n    ;define(function(require, exports, module){\n      var _et = require(\'_et\');\n      var _util = _et._util;\n      var _prototype = _et.prototype;\n\n      ' + it.delareString + '\n\n      ' + it.extendString + '\n\n      module.exports = ' + it.templateName + ';\n    });\n    ';
  // @end: cmd
  },
  compileCommon: function compileCommon(it) {
    //var options = this.options;
    // @start: common
    return '\n    var _et = require(\'_et\');\n    var _util = _et._util;\n    var _prototype = _et.prototype;\n\n    ' + it.delareString + '\n\n    ' + it.extendString + '\n\n    module.exports = ' + it.templateName + ';\n    ';
  // @end: common
  },
  compileGlobal: function compileGlobal(it) {
    //var options = this.options;
    // @start: global
    return '\n    ;(function(global){\n      var _et = global._et;\n      var _util = _et._util;\n      var _prototype = _et.prototype;\n\n      ' + it.delareString + '\n\n      ' + it.extendString + '\n\n      global.' + it.moduleId + ' = ' + it.templateName + ';\n    })(window);\n    ';
  // @end: global
  },
  compileUMD: function compileUMD(it) {
    //var options = this.options;
    // @start: umd
    return '\n    ;(function(global, factory) {\n      if (typeof define === \'function\' && define.amd) {\n        define(factory);\n      } else {\n        var _require = function(key) {\n          return global[key];\n        };\n        var _exports = {};\n        var _module = {\n          exports: _exports\n        };\n        factory(_require, _exports, _module);\n        global.' + it.templateName + ' = _module.exports;\n      }\n    })(window, function factory(require, exports, module) {\n\n      var _et = require(\'_et\');\n      var _util = _et._util;\n      var _prototype = _et.prototype;\n\n      ' + it.delareString + '\n\n      ' + it.extendString + '\n\n      module.exports = ' + it.templateName + ';\n    });\n    ';
  // @end: umd
  },
  delare: function delare(it) {
    //var options = this.options;
    // @start: delare
    return '\n    function ' + it.templateName + '(options) {\n      this.init(options);\n    }\n    ';
  // @end: delare
  },
  extend: function extend(it) {
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
  },
  create: function create(it) {
    if (!it.createString) {
      return '';
    }
    // @start: create
    return '\n    create: function create(){\n      var root = this.roots;\n      var rootIds = this.rootIds;\n      var doms = this.doms;\n\n      ' + it.createString + '\n    }\n    ';
  // @end: create
  },
  update: function update(it) {
    if (!it.updateString) {
      return '';
    }
    // @start: update
    return '\n    update: function update(' + it.args.join(',') + ') {\n      var root = this.root;\n      var doms = this.doms;\n      var last = this.last;\n\n      ' + it.updateString + '\n    }\n    ';
  // @end: update
  }
});

module.exports = Worker;