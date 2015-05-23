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
