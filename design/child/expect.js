'use strict'

var Template_2 = require('./models/user');
var _dep = require('et-dependency');

var _dep_template = _dep.template;
var _dep_element = _dep.element;
var _dep_child = _dep.child;
var _dep_text = _dep.text;

var Template_0 = _dep_template(function(_template) {
  _dep_element(_template, 0, 1, 'DIV');
  _dep_child(_template, 1, 2, Template_2, function (it, _args) {
    return it.userContext;
  });
  _dep_text(_template, 1, 3, '1234567890');
});

module.exports = Template_0;
