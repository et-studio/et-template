'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;

var _util_extend = _util.extend;
var _util_createElement = _util.createElement;
var _util_setAttributes = _util.setAttributes;
var _util_setAttribute = _util.setAttribute;
var _util_removeAttribute = _util.removeAttribute;

function Template_0(options) {
  this.init(options);
}

_util_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _doms = this.doms;
    var _roots = this.roots;

    var _et = _util_createElement('DIV');
    _util_setAttributes(_et, {
      "disabled": ""
    });
    _doms[2] = _et;
    _roots[2] = _et;
  },
  update: function update(it) {
    var _doms = this.doms;
    var _roots = this.roots;
    var _last = this.last;

    var _et = _doms[2];
    var _tmp = 'aaa' + it.id + 'bbb' + it.getSrc();
    if (_last[0] !== _tmp) {
      _last[0] = _tmp;
      _util_setAttribute(_et, 'id', _tmp);
    }

    var _tmp = (function() {
      return it.a + it.b;
    })();
    if (_last[1] !== _tmp) {
      _last[1] = _tmp;
      _util_setAttribute(_et, 'data-type', _tmp);
    }

    if (it.isTrue) {
      if (_last[2] !== 0) {
        _last[2] = 0;
        _util_setAttribute(_et, 'class', 'class-true');
      }
    } else {
      if (_last[2] !== 1) {
        _last[2] = 1;
        _util_removeAttribute(_et, 'class');
      }
    }
  }
});

module.exports = Template_0;
