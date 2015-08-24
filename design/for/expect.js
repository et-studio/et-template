'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;

var _util_extend = _util.extend;
var _util_createLine = _util.createLine;
var _util_after = _util.after;
var _util_createTextNode = _util.createTextNode;
var _util_text = _util.text;

function Template_for(options) {
  this.init(options);
}
function Template_0(options) {
  this.init(options);
}
function Template_2(options) {
  this.init(options);
}

_util_extend(Template_for.prototype, _prototype);
_util_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;

    var _line = _util_createLine();
    _doms[1] = _line;
    _roots[1] = _line;

    var _et = new Template_for();
    _doms[2] = _et;
    _roots[2] = _et;
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _line = _doms[1];
    var _lastLength = _last[0] || 0;
    var _list = it.matrix[it.members[1]] || [];

    var _i = 0;
    var _len = _list.length;
    _last[0] = _len;
    for (; _i < _len; _i++) {
      var _et = _doms['2_' + _i];
      var _item = _list[_i];
      var index = _i;
      var item = _item;

      if (!_et) {
        _doms['2_' + _i] = _et = new Template_2();
      }
      if (_i >= _lastLength) {
        _util_after(_line, _et.get());
      }
      _et.update(it, item, index);
    }
    for (; _i < _lastLength; _i++) {
      var _et = _doms['2_' + _i];
      _et.remove();
    }

    var _lastLength = _last[0];
    var _et = _doms[2];
    _et.roots = {};
    for (_i = 0; _i < _lastLength; _i++) {
      _et.doms[_i] = _et.roots[_i] = _doms['2_' + _i];
    }
  }
});
_util_extend(Template_2.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;

    var _et = _util_createTextNode('');
    _doms[4] = _et;
    _roots[4] = _et;
  },
  update: function update(it, item, index) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _et = _doms[4];
    var _tmp = 'it is for loop ' + index;
    if (_last[0] !== _tmp) {
      _last[0] = _tmp;
      _util_text(_et, _tmp);
    }
  }
});

module.exports = Template_0;
