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
;define(${it.moduleId}, function(require, exports, module){
  var _et = require('_et');
  var util = _et.util;
  var _prototype = _et.prototype;

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
  var util = _et.util;
  var _prototype = _et.prototype;

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
var util = _et.util;
var _prototype = _et.prototype;

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
  var util = _et.util;
  var _prototype = _et.prototype;

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
  var util = _et.util;
  var _prototype = _et.prototype;

  ${it.delareString}

  ${it.extendString}

  module.exports = ${it.templateName};
});
`;
  // @end: umd
  },
  delare: function compileUMD(it) {
    //var options = this.options;
    // @start: delare
    return `
function ${it.templateName}(options) {
  this.init(options);
}
`;
  // @end: delare
  },
  extend: function compileUMD(it) {
    //var options = this.options;
    // @start: extend
    return `
util.extend(${it.templateName}.prototype, _prototype, {
  create: function create(){
    var roots = this.roots;
    var doms = this.doms;

    ${it.createString}
  },
  update: function update(${it.args.join(',')}) {
    var roots = this.roots;
    var doms = this.doms;
    var last = this.last;

    ${it.updateString}
  }
});
`;
  // @end: extend
  }
});

module.exports = Worker;
