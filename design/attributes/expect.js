'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;

var _util_extend = _util.extend;
var _util_createElement = _util.createElement;
var _util_setAttributes = _util.setAttributes;

function Template_0(options) {
  this.init(options);
}

_util_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;

    var _et = _util_createElement('DIV');
    _util_setAttributes(_et, {
      "id": "test",
      "data-title": "Sorry, you can't do it."
    });

    _doms[2] = _et;
    _roots[2] = _et;

    var _et = _util_createElement('BR');
    _doms[4] = _et;
    _roots[4] = _et;
  }
});

module.exports = Template_0;
