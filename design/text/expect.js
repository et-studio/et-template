'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;

var _util_extend = _util.extend;
var _util_createElement = _util.createElement;
var _util_createTextNode = _util.createTextNode;
var _util_appendChild = _util.appendChild;
var _util_text = _util.text;

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

    var _et = _util_createTextNode('');
    _doms.et2 = _et;
    _util_appendChild(_doms.et1, _et);

    var _et = _util_createElement('P');
    _doms.et3 = _et;
    _roots.et3 = _et;
    _rootIds.push('et3');

    var _et = _util_createTextNode('Sorry, you can\'t do it. bbbbbbbbb');
    _doms.et4 = _et;
    _util_appendChild(_doms.et3, _et);

    var _et = _util_createElement('P');
    _doms.et5 = _et;
    _roots.et5 = _et;
    _rootIds.push('et5');

    var _et = _util_createTextNode('');
    _doms.et6 = _et;
    _util_appendChild(_doms.et5, _et);
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _et = _doms.et2;
    var _tmp = 'aaaa[' + it.src + ']';
    if (_last.value_0 !== _tmp) {
      _last.value_0 = _tmp;
      _util_text(_et, _tmp);
    }

    var _et = _doms.et6;
    var _tmp = it.unreadCount > 99 ? '99+' : it.unreadCount;
    if (_last.value_1 !== _tmp) {
      _last.value_1 = _tmp;
      _util_text(_et, _tmp);
    }
  }
});

module.exports = Template_et0;
