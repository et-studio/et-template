'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;

var _util_extend = _util.extend;
var _util_createElement = _util.createElement;

function Template_0(options) {
  this.init(options);
}

_util_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;

    var _et = _util_createElement('DIV');
    _doms[2] = _et;
    _roots[2] = _et;
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _et = _doms[2];
    var _tmp = 'aaa' + it.html + 'bbb';
    if (_last[0] !== _tmp) {
      _last[0] = _tmp;
      _et.innerHTML = _tmp;
    }
  }
});

module.exports = Template_0;
