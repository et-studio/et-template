;(function(global) {
  var _dep = global['et-dependency'];

  var _dep_template = _dep.template;
  var _dep_element = _dep.element;
  var _dep_text = _dep.text;

  var Template_0 = _dep_template(function(_template) {
      _dep_element(_template, 0, 1, 'DIV');
      _dep_text(_template, 1, 2, 'test');
  });

  global['Template'] = Template_0;
})(window);
