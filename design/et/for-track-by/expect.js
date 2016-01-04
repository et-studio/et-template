'use strict'

var _dep = require('et-dependency');
var _dep_createTemplate = _dep.dep_createTemplate;
var _tp_createLine = _dep.tp_createLine;
var _tp_getConditionTemplate = _dep.tp_getConditionTemplate;
var _tp_getTemplate = _dep.tp_getTemplate;
var _tp_after = _dep.tp_after;
var _tp_remove = _dep.tp_remove;
var _tp_setRoot = _dep.tp_setRoot;
var _tp_createElement = _dep.tp_createElement;
var _tp_createText = _dep.tp_createText;
var _tp_text = _dep.tp_text;

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this;
    var it = _this.context;
    _tp_createLine(_this, null, 1);
  },
  update: function() {
    var _this = this;
    var _last = _this.last;
    var it = _this.context;

    var _lastLength = _last[0] || 0;
    var _list = it.users || [];
    var _index = 0;
    var _len = _last[0] = _list.length;
    var _savedCache = [];
    for (; _index < _len; _index++) {
      var index = _index;
      var user = _list[_index];
      var _itemId = '2_' + user.id;
      var _template = _tp_getConditionTemplate(_this, _itemId, Template_2);
      var _isTemplateChanged = false;
      var _lastItemId = _last['for_item_id_' + '2_' + _index];
      _last['for_item_id_' + '2_' + _index] = _itemId;
      if (_lastItemId && _lastItemId !== _itemId) {
        var _lastTemplate = _tp_getTemplate(_this, _lastItemId);
        if (_lastTemplate && !~_savedCache.indexOf(_lastItemId)) _lastTemplate.remove();
        _isTemplateChanged = true;
      }
      if (_index >= _lastLength || _isTemplateChanged) {
        var _prevId = _index ? (_last['for_item_id_' + '2_' + (_index - 1)]) : 1;
        _tp_after(_this, _prevId, _itemId);
      }
      _savedCache.push(_itemId);
      _template.update(user, index);
    }
    for (; _index < _lastLength; _index++) {
      var _tmpItemId = _last['for_item_id_' + '2_' + _index];
      _last['for_item_id_' + '2_' + _index] = null;
      if (!~_savedCache.indexOf(_tmpItemId)) {
        _tp_remove(_this, _tmpItemId);
      }
    }
    _tp_setRoot(this, 2, _len);
  }
});
var Template_2 = _dep_createTemplate({
  create: function() {
    var _this = this;
    var it = _this.context;
    _tp_createElement(_this, null, 4, 'H1');
    _tp_createText(_this, 4, 6, '');
    _tp_createElement(_this, null, 8, 'P');
    _tp_createText(_this, 8, 10, '');
  },
  update: function(user, index) {
    var _this = this;
    var _last = _this.last;
    var it = _this.context;
    var _tmp = (user.id) + ': ' + (user.name);
    if (_last[0] !== _tmp) {
      _last[0] = _tmp;
      _tp_text(_this, 6, _tmp);
    }
    var _tmp = (user.description);
    if (_last[1] !== _tmp) {
      _last[1] = _tmp;
      _tp_text(_this, 10, _tmp);
    }
  }
});
module.exports = exports['default'] = Template_0;
