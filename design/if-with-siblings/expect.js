'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;

var _util_extend = _util.extend;
var _util_createTextNode = _util.createTextNode;
var _util_createLine = _util.createLine;
var _util_before = _util.before;

function Template_et0(options) {
  this.init(options);
}
function Template_et2(options) {
  this.init(options);
}

_util_extend(Template_et0.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;
    var _rootIds = this.rootIds;

    var _et = _util_createTextNode('It is before.');
    _doms.et1 = _et;
    _roots.et1 = _et;
    _rootIds.push('et1');

    _doms.et2 = null;
    _roots.et2 = null;
    _rootIds.push('et2');

    var _line = _util_createLine();
    _doms.et2_line = _line;
    _roots.et2_line = _line;
    _rootIds.push('et2_line');
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _line = _doms.et2_line;
    if (it.isNumber && it.isEven) {
      if (_last.value_0 !== 0) {
        _last.value_0 = 0;
        var _et = _doms.et2;
        if (!_et) {
          _doms.et2 = _et = new Template_et2();
        }
        _util_before(_line, _et.get());
        _roots.et2 = _et;
      }
      _doms.et2.update(it);
    } else {
      if (_last.value_0 !== 1) {
        _last.value_0 = 1;
        var _et = _doms.et2;
        if (_et) {
          _et.remove();
          _roots.et2 = null;
        }
      }
    }
  }
});
_util_extend(Template_et2.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;
    var _rootIds = this.rootIds;

    var _et = _util_createTextNode('It is number and is even');
    _doms.et3 = _et;
    _roots.et3 = _et;
    _rootIds.push('et3');
  }
});

module.exports = Template_et0;
