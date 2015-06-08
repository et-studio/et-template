'use strict';

var _et = require('_et');
var _util = _et._util;
var _prototype = _et._prototype;

function Template_et0(options) {
  this.init(options);
}

_util.extend(Template_et0.prototype, _prototype, {
  create: function create() {
    var _doms, _roots, _rootIds, _et;

    _doms = this.doms;
    _roots = this.roots;
    _rootIds = this.rootIds;

    _et = _util.createElement('DIV');
    _doms.et1 = _et;
    _roots.et1 = _et;
    _rootIds.push('et1');
  },
  update: function update(it) {
    var _doms, _roots, _last, _et, _tmp;

    _doms = this.doms;
    _roots = this.roots;
    _last = this.last;

    _et = _doms.et1;
    _tmp = 'aaa' + it.id + 'bbb' + it.getSrc();
    if (_last.value_1 !== _tmp) {
      _last.value_1 = _tmp;
      _util.setAttribute(_et, 'id', _tmp);
    }

    _tmp = (function(){return it.a + it.b;})();
    if (_last.value_2 !== _tmp) {
      _last.value_2 = _tmp;
      _util.setAttribute(_et, 'data-type', _tmp);
    }

    if (it.isTure) {
      if (_last.value_3 !== 0) {
        _last.value_3 = 0;
        _util.setAttribute(_et, 'class', 'class-true');
      }
    } else {
      if (_last.value_3 !== 1) {
        _last.value_3 = 1;
        _util.removeAttribute(_et, 'class');
      }
    }
  }
});

module.exports = Template_et0;
