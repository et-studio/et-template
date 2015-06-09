'use strict';
var _et = require('_et');
var _util = _et._util;
var _prototype = _et._prototype;

function Template_et0(options) {
  this.init(options);
}
function Template_et2(options) {
  this.init(options);
}

_util.extend(Template_et0.prototype, _prototype, {
  create: function create() {
    var _doms, _roots, _rootIds, _et, _line;

    _doms = this.doms;
    _roots = this.roots;
    _rootIds = this.rootIds;

    _et = _util.createTextNode('It is before.');
    _doms.et1 = _et;
    _roots.et1 = _et;
    _rootIds.push('et1');

    _et = null;
    _doms.et2 = _et;
    _roots.et2 = _et;
    _rootIds.push('et2');

    _line = _util.createLine();
    _doms.et2_line = _line;
    _roots.et2_line = _line;
    _rootIds.push('et2_line');
  },
  update: function update(it) {
    var _doms, _roots, _last, _et, _line;

    _doms = this.doms;
    _roots = this.roots;
    _last = this.last;

    _et = _doms.et2;
    _line = _doms.et2_line;
    if (it.isNumber && it.isEven) {
      if (_last.value_1 !== 0) {
        _last.value_1 = 0;
        if (!_et) {
          _doms.et2 = _et = new Template_et2();
        }
        _util.before(_line, _et.get());
      }
      _et.update(it);
    } else {
      if (_last.value_1 !== 1) {
        _et = _doms.et2;
        if (_et) {
          _et.remove();
          _roots.et2 = null;
        }
      }
    }
  }
});
_util.extend(Template_et2.prototype, _prototype, {
  create: function create() {
    var _doms, _roots, _rootIds, _et;

    _doms = this.doms;
    _roots = this.roots;
    _rootIds = this.rootIds;

    _et = _util.createTextNode('It is number and is even');
    _doms.et3 = _et;
    _roots.et3 = _et;
    _rootIds.push('et3');
  }
});

module.exports = Template_et0;
