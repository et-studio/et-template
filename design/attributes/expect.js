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

    _doms = this.doms;
    _roots = this.roots;
    _rootIds = this.rootIds;

    _et = _util.createElement('DIV', {'id': 'test'});
    _doms.et1 = _et;
    _roots.et1 = _et;
    _rootIds.push('et1');
  }
});

module.exports = Template_et0;
