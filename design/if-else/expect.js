'use strict';
var _et = require('_et');
var _util = _et._util;
var _prototype = _et._prototype;

var _util_extend = _util.extend;
var _util_createElement = _util.createElement;
var _util_createLine = _util.createLine;
var _util_appendChild = _util.appendChild;
var _util_before = _util.before;
var _util_createTextNode = _util.createTextNode;

function Template_et0(options) {
  this.init(options);
}
function Template_et2(options) {
  this.init(options);
}
function Template_et4(options) {
  this.init(options);
}
function Template_et6(options) {
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

    _doms.et2 = null;
    var _line = _util_createLine();
    _doms.et2_line = _line;
    _util_appendChild(_doms.et1, _line);

    _doms.et4 = null;
    _doms.et6 = null;
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _line = _doms.et2_line;
    if (it.isTrue) {
      if (_last.value_0 !== 0) {
        _last.value_0 = 0;
        var _et = _doms.et2;
        if (!_et) {
          _doms.et2 = _et = new Template_et2();
        }
        _util_before(_line, _et.get());

        var _et = _doms.et4;
        if (_et) {
          _et.remove();
        }
        var _et = _doms.et6;
        if (_et) {
          _et.remove();
        }
      }
      _doms.et2.update(it);
    } else if (it.elseTrue) {
      if (_last.value_0 !== 1) {
        _last.value_0 = 1;
        var _et = _doms.et4;
        if (!_et) {
          _doms.et4 = _et = new Template_et4();
        }
        _util_before(_line, _et.get());

        var _et = _doms.et2;
        if (_et) {
          _et.remove();
        }
        var _et = _doms.et6;
        if (_et) {
          _et.remove();
        }
      }
      _doms.et4.update(it);
    } else {
      if (_last.value_0 !== 2) {
        _last.value_0 = 2;
        var _et = _doms.et6;
        if (!_et) {
          _doms.et6 = _et = new Template_et6();
        }
        _util_before(_line, _et.get());

        var _et = _doms.et2;
        if (_et) {
          _et.remove();
        }
        var _et = _doms.et4;
        if (_et) {
          _et.remove();
        }
      }
      _doms.et6.update(it);
    }
  }
});

_util_extend(Template_et2.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;
    var _rootIds = this.rootIds;

    var _et = _util_createTextNode('It is true.');
    _doms.et3 = _et;
    _roots.et3 = _et;
    _rootIds.push('et3');
  }
});
_util_extend(Template_et4.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;
    var _rootIds = this.rootIds;

    var _et = _util_createTextNode('It is elseTrue.');
    _doms.et5 = _et;
    _roots.et5 = _et;
    _rootIds.push('et5');
  }
});
_util_extend(Template_et6.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;
    var _rootIds = this.rootIds;

    var _et = _util_createTextNode('It is else.');
    _doms.et7 = _et;
    _roots.et7 = _et;
    _rootIds.push('et7');
  }
});
module.exports = Template_et0;
