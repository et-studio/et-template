'use strict';

var _et = require('_et');
var _util = _et._util;
var _prototype = _et._prototype;

function Template_for(options) {
  this.init(options);
}
function Template_et0(options) {
  this.init(options);
}
function Template_et1(options) {
  this.init(options);
}

_util.extend(Template_for.prototype, _prototype);
_util.extend(Template_et0.prototype, _prototype, {
  create: function create() {
    var _doms, _roots, _rootIds, _et, _line;

    _doms = this.doms;
    _roots = this.roots;
    _rootIds = this.rootIds;

    _et = new Template_for();
    _doms.et1 = _et;
    _roots.et1 = _et;
    _rootIds.push('et1');

    _line = _util.createLine();
    _doms.et1_line = _line;
    _roots.et1_line = _line;
    _rootIds.push('et1_line');
  },
  update: function update(it) {
    var _doms, _roots, _last, _line, _lastLength, _list, _i, _len, _et, _item, index, item;

    _doms = this.doms;
    _roots = this.roots;
    _last = this.last;

    _line = _doms.et1_line;
    _lastLength = _last.value_1;
    _list = it.list;
    for (_i = 0, _len = _list.length; _i < _len; _i++) {
      _et = _doms['et1_' + _i];
      _item = _list[i];
      index = _i;
      item = _item;

      if (!_et) {
        _doms['et1_' + _i] = _et = new Template_et1();
      }
      if (!_lastLength || _lastLength < _i) {
        _util.before(_line, _et.get());
      }
      _et.update(it, item, index);
    }

    _last.value_1 = _i;
    for (; _i < _lastLength; _i++) {
      et = _doms['et1_' + _i];
      et.remove();
    }

    _lastLength = _last.value_1;
    _et = _doms.et1;
    _et.rootIds = [];
    for (_i = 0; _i < _lastLength; _i++) {
      _et.rootIds.push('et1_' + _i);
      _et._doms['et1_' + _i] = _doms['et1_' + _i];
    }
  }
});
_util.extend(Template_et1.prototype, _prototype, {
  create: function create() {
    var _doms, _roots, _rootIds, _et;

    _doms = this.doms;
    _roots = this.roots;
    _rootIds = this.rootIds;

    _et = _util.createTextNode('');
    _doms.et2 = _et;
    _roots.et2 = _et;
    _rootIds.push('et2');
  },
  update: function update(it, item, index) {
    var _doms, _roots, _last, _et, _tmp;

    _doms = this.doms;
    _roots = this.roots;
    _last = this.last;

    _et = doms.et2;
    var _tmp = 'it is for loop ' + index;
    if (_last.value_1 !== _tmp) {
      _last.value_1 = _tmp;
      _util.text(_et, _tmp);
    }
  }
});

module.exports = Template_et0;
