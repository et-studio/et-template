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

    _roots = this.roots;
    _rootIds = this.rootIds;
    _doms = this.doms;

    _et = _util.createElement('DIV');
    _doms.et1 = _et;
    _roots.et1 = _et;
    _rootIds.push('et1');

    _et = _util.createTextNode('');
    _doms.et2 = _et;
    _util.appendChild(_doms.et1, _et);
  },
  update: function update(it) {
    var _doms, _roots, _last, _et, _tmp;

    _doms = this.doms;
    _roots = this.roots;
    _last = this.last;

    _et = _doms.et2;
    _tmp = 'aaaa' + it.src;
    if (_last.value_1 !== _tmp) {
      _last.value_1 = _tmp;
      _util.text(_et, _tmp);
    }
  }
});

module.exports = Template_et0;
