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

    var _et = _util_createElement('DIV');
    _doms.et1 = _et;
    _roots.et1 = _et;
    _rootIds.push('et1');
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _et = _doms.et1;
    var _tmp = 'aaa' + it.html + 'bbb';
    if (_last.value_0 !== _tmp) {
      _last.value_0 = _tmp;
      _et.innerHTML = _tmp;
    }
  }
});

module.exports = Template_et0;
