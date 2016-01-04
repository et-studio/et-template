'use strict'

var util = require('./util');
var util1 = require('./util1');
var util2 = require('./util2');

var _dep = require('et-dependency');
var _dep_createTemplate = _dep.dep_createTemplate;
var _tp_createElement = _dep.tp_createElement;
var _tp_createText = _dep.tp_createText;
var _tp_text = _dep.tp_text;

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this;
    var it = _this.context;
    _tp_createElement(_this, null, 8, 'A');
    _tp_createText(_this, 8, 10, '');
  },
  update: function() {
    var _this = this;
    var _last = _this.last;
    var it = _this.context;

    var _tmp = (util.add(it.a, it.b));
    if (_last[0] !== _tmp) {
      _last[0] = _tmp;
      _tp_text(_this, 10, _tmp);
    }
  }
});
module.exports = exports['default'] = Template_0;
