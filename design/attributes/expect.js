'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;

var _util_extend = _util.extend;
var _util_createElement = _util.createElement;

function Template_et0(options) {
  this.init(options);
}

_util_extend(Template_et0.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;
    var _rootIds = this.rootIds;

    var _et = _util_createElement('DIV', {
      "id": "test",
      "data-title": "Sorry, you can't do it."
    });
    _doms.et1 = _et;
    _roots.et1 = _et;
    _rootIds.push('et1');

    var _et = _util_createElement('BR');
    _doms.et2 = _et;
    _roots.et2 = _et;
    _rootIds.push('et2');
  }
});

module.exports = Template_et0;
