'use strict';

var _et = require('_et');
var _util = _et._util;
var _prototype = _et._prototype;

var _util_extend = _util.extend;
var _util_createElement = _util.createElement;
var _util_setAttribute = _util.setAttribute;
var _util_removeAttribute = _util.removeAttribute;

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
    var _tmp = 'aaa' + it.id + 'bbb' + it.getSrc();
    if (_last.value_0 !== _tmp) {
      _last.value_0 = _tmp;
      _util_setAttribute(_et, 'id', _tmp);
    }

    var _tmp = (function(){return it.a + it.b;})();
    if (_last.value_1 !== _tmp) {
      _last.value_1 = _tmp;
      _util_setAttribute(_et, 'data-type', _tmp);
    }

    if (it.isTrue) {
      if (_last.value_2 !== 0) {
        _last.value_2 = 0;
        _util_setAttribute(_et, 'class', 'class-true');
      }
    } else {
      if (_last.value_2 !== 1) {
        _last.value_2 = 1;
        _util_removeAttribute(_et, 'class');
      }
    }
  }
});

module.exports = Template_et0;
