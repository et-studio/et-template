'use strict';

var _et = require('_et');
var _util = _et._util;
var _prototype = _et._prototype;

var _util_extend = _util.extend;
var _util_createElement = _util.createElement;
var _util_createTextNode = _util.createTextNode;
var _util_appendChild = _util.appendChild;
var _util_text = _util.text;

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

    var _et = _util_createTextNode('');
    _doms.et2 = _et;
    _util_appendChild(_doms.et1, _et);
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _et = _doms.et2;
    var _tmp = 'aaaa' + it.src;
    if (_last.value_0 !== _tmp) {
      _last.value_0 = _tmp;
      _util_text(_et, _tmp);
    }
  }
});

module.exports = Template_et0;
