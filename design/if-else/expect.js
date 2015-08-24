'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;

var _util_extend = _util.extend;
var _util_createElement = _util.createElement;
var _util_createLine = _util.createLine;
var _util_appendChild = _util.appendChild;
var _util_after = _util.after;
var _util_createTextNode = _util.createTextNode;

function Template_0(options) {
  this.init(options);
}
function Template_4(options) {
  this.init(options);
}
function Template_8(options) {
  this.init(options);
}
function Template_12(options) {
  this.init(options);
}

_util_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;

    var _et = _util_createElement('DIV');
    _doms[2] = _et;
    _roots[2] = _et;

    var _line = _util_createLine();
    _doms[3] = _line;
    _util_appendChild(_doms[2], _line);
    _doms[4] = null;

    _doms[8] = null;
    _doms[12] = null;
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _line = _doms[3];
    if (it.isTrue) {
      if (_last[0] !== 0) {
        _last[0] = 0;
        var _et = _doms[4];
        if (!_et) {
          _doms[4] = _et = new Template_4();
        }
        _util_after(_line, _et.get());

        var _et = _doms[8];
        if (_et) {
          _et.remove();
        }
        var _et = _doms[12];
        if (_et) {
          _et.remove();
        }
      }
      _doms[4].update(it);
    } else if (it.elseTrue) {
      if (_last[0] !== 1) {
        _last[0] = 1;
        var _et = _doms[8];
        if (!_et) {
          _doms[8] = _et = new Template_8();
        }
        _util_after(_line, _et.get());

        var _et = _doms[4];
        if (_et) {
          _et.remove();
        }
        var _et = _doms[12];
        if (_et) {
          _et.remove();
        }
      }
      _doms[8].update(it);
    } else {
      if (_last[0] !== 2) {
        _last[0] = 2;
        var _et = _doms[12];
        if (!_et) {
          _doms[12] = _et = new Template_12();
        }
        _util_after(_line, _et.get());

        var _et = _doms[4];
        if (_et) {
          _et.remove();
        }
        var _et = _doms[8];
        if (_et) {
          _et.remove();
        }
      }
      _doms[12].update(it);
    }
  }
});

_util_extend(Template_4.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;

    var _et = _util_createTextNode('It is true.');
    _doms[6] = _et;
    _roots[6] = _et;
  }
});
_util_extend(Template_8.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;

    var _et = _util_createTextNode('It is elseTrue.');
    _doms[10] = _et;
    _roots[10] = _et;
  }
});
_util_extend(Template_12.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;

    var _et = _util_createTextNode('It is else.');
    _doms[14] = _et;
    _roots[14] = _et;
  }
});
module.exports = Template_0;
