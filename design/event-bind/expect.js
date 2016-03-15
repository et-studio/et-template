'use strict'

var _dep = require('et-dependency');

var _dep_template = _dep.template;
var _dep_element = _dep.element;
var _dep_text = _dep.text;

var Template_0 = _dep_template(function (_template) {

  _dep_element(_template, 0, 1, 'DIV');

  _dep_element(_template, 1, 2, 'A', 0, [
    ['click', function ($event, it, _args) {
      return it.onClick(it.getName(), item, $event, index);
    }]
  ]);
  _dep_text(_template, 2, 3, 'on-click');

  _dep_element(_template, 1, 4, 'A', 0, [
    ['click', function ($event, it, _args) {
      return it.onClick();
    }]
  ]);
  _dep_text(_template, 4, 5, '(click)');
});

module.exports = Template_0;
