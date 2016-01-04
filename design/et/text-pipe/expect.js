'use strict'

var util = require('./util');
var _dep = require('et-dependency');

var _dep_createTemplate = _dep.dep_createTemplate;
var _tp_createElement = _dep.tp_createElement;
var _tp_createText = _dep.tp_createText;
var _tp_text = _dep.tp_text;

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this;
    var it = _this.context;
    _tp_createElement(_this, null, 4, 'A');
    _tp_createText(_this, 4, 6, '');
  },
  update: function() {
    var _this = this;
    var _last = _this.last;
    var it = _this.context;
    var _tmp = (util.trim(util.format(it.isMe ? 'ME' : 'YOU | HE'), ' | ', ' , '));
    if (_last[0] !== _tmp) {
      _last[0] = _tmp;
      _tp_text(_this, 6, _tmp);
    }
  }
});

module.exports = exports['default'] = Template_0;
