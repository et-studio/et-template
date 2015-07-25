'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;

var _util_extend = _util.extend;
var _util_createElement = _util.createElement;
var _util_appendChild = _util.appendChild;
var _util_createTextNode = _util.createTextNode;

function Template_et0(options) {
  this.init(options);
}

_util_extend(Template_et0.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;
    var _rootIds = this.rootIds;

    var _et = _util_createElement('DIV');
    _doms.et1 = _et;
    _roots.et1 = _et;
    _rootIds.push('et1');

    var _ET = require('./models/user');
    var _et = new _ET();
    _doms.et2 = _et;
    _util_appendChild(_doms.et1, _et.get());

    var _et = _util_createTextNode('1234567890');
    _doms.et3 = _et;
    _util_appendChild(_doms.et1, _et);
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _et = _doms.et2;
    _et.update(it, it.test);
  }
});

module.exports = Template_et0;
