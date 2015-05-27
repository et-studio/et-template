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
    return `
    ;define('${it.moduleId}', function(require, exports, module){
      var _et = require('_et');
      var _util = _et._util;
      var _prototype = _et._prototype;

      ${it.delareString}

      ${it.extendString}

      module.exports = ${it.templateName};
    });
    `;
  // @end: amd
  },
  compileCMD: function compileCMD(it) {
    //var options = this.options;
    // @start: cmd
    return `
    ;define(function(require, exports, module){
      var _et = require('_et');
      var _util = _et._util;
      var _prototype = _et._prototype;

      ${it.delareString}

      ${it.extendString}

      module.exports = ${it.templateName};
    });
    `;
  // @end: cmd
  },
  compileCommon: function compileCommon(it) {
    //var options = this.options;
    // @start: common
    return `
    var _et = require('_et');
    var _util = _et._util;
    var _prototype = _et._prototype;

    ${it.delareString}

    ${it.extendString}

    module.exports = ${it.templateName};
    `;
  // @end: common
  },
  compileGlobal: function compileGlobal(it) {
    //var options = this.options;
    // @start: global
    return `
    ;(function(global){
      var _et = global._et;
      var _util = _et._util;
      var _prototype = _et._prototype;

      ${it.delareString}

      ${it.extendString}

      global.${it.moduleId} = ${it.templateName};
    })(window);
    `;
  // @end: global
  },
  compileUMD: function compileUMD(it) {
    //var options = this.options;
    // @start: umd
    return `
    ;(function(global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(factory);
      } else {
        var _require = function(key) {
          return global[key];
        };
        var _exports = {};
        var _module = {
          exports: _exports
        };
        factory(_require, _exports, _module);
        global.${it.templateName} = _module.exports;
      }
    })(window, function factory(require, exports, module) {

      var _et = require('_et');
      var _util = _et._util;
      var _prototype = _et._prototype;

      ${it.delareString}

      ${it.extendString}

      module.exports = ${it.templateName};
    });
    `;
  // @end: umd
  },
  delare: function delare(it) {
    //var options = this.options;
    // @start: delare
    return `
    function ${it.templateName}(options) {
      this.init(options);
    }
    `;
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
    return `
    _util.extend(${it.templateName}.prototype, _prototype, {
      ${it.createString}
      ${it.updateString}
    });
    `;
  // @end: extend
  },
  create: function create(it) {
    if (!it.createString) {
      return '';
    }
    // @start: create
    return `
    create: function create(){
      var root = this.roots;
      var rootIds = this.rootIds;
      var doms = this.doms;

      ${it.createString}
    }
    `;
  // @end: create
  },
  update: function update(it) {
    if (!it.updateString) {
      return '';
    }
    // @start: update
    return `
    update: function update(${it.args.join(',')}) {
      var root = this.root;
      var doms = this.doms;
      var last = this.last;

      ${it.updateString}
    }
    `;
  // @end: update
  }
});

module.exports = Worker;
