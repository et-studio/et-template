'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;

var _util_extend = _util.extend;
var _util_createLine = _util.createLine;
var _util_before = _util.before;
var _util_createTextNode = _util.createTextNode;
var _util_text = _util.text;

function Template_for(options) {
  this.init(options);
}
function Template_et0(options) {
  this.init(options);
}
function Template_et1(options) {
  this.init(options);
}

_util_extend(Template_for.prototype, _prototype);
_util_extend(Template_et0.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;
    var _rootIds = this.rootIds;

    var _et = new Template_for();
    _doms.et1 = _et;
    _roots.et1 = _et;
    _rootIds.push('et1');

    var _line = _util_createLine();
    _doms.et1_line = _line;
    _roots.et1_line = _line;
    _rootIds.push('et1_line');
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _line = _doms.et1_line;
    var _lastLength = _last.value_0;
    var _list = it.matrix[it.members[1]];
    var _i = 0;
    var _len = _list.length;
    for (; _i < _len; _i++) {
      var _et = _doms['et1_' + _i];
      var _item = _list[_i];
      var index = _i;
      var item = _item;

      if (!_et) {
        _doms['et1_' + _i] = _et = new Template_et1();
      }
      if (!_lastLength || _lastLength < _i) {
        _util_before(_line, _et.get());
      }
      _et.update(it, item, index);
    }

    _last.value_0 = _i;
    for (; _i < _lastLength; _i++) {
      var _et = _doms['et1_' + _i];
      _et.remove();
    }

    var _lastLength = _last.value_0;
    var _et = _doms.et1;
    _et.rootIds = [];
    for (_i = 0; _i < _lastLength; _i++) {
      _et.rootIds.push('et1_' + _i);
      _et.doms['et1_' + _i] = _doms['et1_' + _i];
    }
  }
});
_util_extend(Template_et1.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;
    var _rootIds = this.rootIds;

    var _et = _util_createTextNode('');
    _doms.et2 = _et;
    _roots.et2 = _et;
    _rootIds.push('et2');
  },
  update: function update(it, item, index) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _et = _doms.et2;
    var _tmp = 'it is for loop ' + index;
    if (_last.value_0 !== _tmp) {
      _last.value_0 = _tmp;
      _util_text(_et, _tmp);
    }
  }
});

module.exports = Template_et0;
