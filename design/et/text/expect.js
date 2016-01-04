'use strict'

var _dep = require('et-dependency');
var _dep_createTemplate = _dep.dep_createTemplate;
var _tp_createElement = _dep.tp_createElement;
var _tp_createText = _dep.tp_createText;
var _tp_text = _dep.tp_text;

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this;
    var it = _this.context;

    _tp_createElement(_this, null, 2, 'DIV');
    _tp_createText(_this, 2, 4, '');
    _tp_createElement(_this, null, 6, 'P');
    _tp_createText(_this, 6, 8, 'Sorry, you can\'t do it. bbbbbbbbb');
    _tp_createElement(_this, null, 10, 'P');
    _tp_createText(_this, 10, 12, '');
  },
  update: function() {
    var _this = this;
    var _last = _this.last;
    var it = _this.context;

    var _tmp = 'aaaa[' + (it.src) + ']';
    if (_last[0] !== _tmp) {
      _last[0] = _tmp;
      _tp_text(_this, 4, _tmp);
    }

    var _tmp = (it.unreadCount > 99 ? '99+' : it.unreadCount);
    if (_last[1] !== _tmp) {
      _last[1] = _tmp;
      _tp_text(_this, 12, _tmp);
    }
  }
});
module.exports = exports['default'] = Template_0;
