'use strict';
define(function (require, exports, module) {
  var test, dom;

  dom = require('./dom');

  exports.register = function(){
    dom.register();
  };
});
