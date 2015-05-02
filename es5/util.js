'use strict';
var id = 1;
module.exports = {
  getId: function getId(str) {
    if (!str) {
      str = '';
    }
    return '' + str + '' + id++;
  },
  extend: function extend() {
    var re = arguments[0] || {};
    for (var i = 1; i < arguments.length; i++) {
      var object = arguments[i];
      for (var key in object) {
        re[key] = object[key];
      }
    }
    return re;
  }
};