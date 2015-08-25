'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;

var _util_extend = _util.extend;
var _util_createTextNode = _util.createTextNode;
var _util_createLine = _util.createLine;
var _util_after = _util.after;

function Template_0(options) {
  this.init(options);
}
function Template_4(options) {
  this.init(options);
}

_util_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;

    var _et = _util_createTextNode('It is before.');
    _doms[2] = _et;
    _roots[2] = _et;

    var _line = _util_createLine();
    _doms[3] = _line;
    _roots[3] = _line;

    _doms[4] = null;
    _roots[4] = null;
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _line = _doms[3];
    if (it.isNumber && it.isEven) {
      if (_last[0] !== 0) {
        _last[0] = 0;
        var _et = _doms[4];
        if (!_et) {
          _doms[4] = _et = new Template_4(this.options);
        }
        _util_after(_line, _et.get());
        _roots[4] = _et;
      }
      _doms[4].update(it);
    } else {
      if (_last[0] !== 1) {
        _last[0] = 1;
        var _et = _doms[4];
        if (_et) {
          _et.remove();
          _roots[4] = null;
        }
      }
    }
  }
});
_util_extend(Template_4.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;

    var _et = _util_createTextNode('It is number and is even');
    _doms[6] = _et;
    _roots[6] = _et;
  }
});

module.exports = Template_0;
