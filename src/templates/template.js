
if (it.hasFor) {
  // {{
  function Template_for(options) {
    this.init(options);
  }
  // }}
}
for (var i = 0; i < it.newDoms.length; i++) {
  var dom = it.newDoms[i];
  // {{
  function ${dom.templateName}(options) {
    this.init(options);
  }
  // }}
}

if (it.hasFor) {
  // {{
  _util.extend(Template_for.prototype, _prototype);
  // }}
}
for (var i = 0; i < it.newDoms.length; i++) {
  var dom = it.newDoms[i];
  if (dom.createList.length && dom.updateList.length) {
    // {{
    _util.extend(${dom.templateName}.prototype, _prototype, {
      create: function create() {
        var _doms = this.doms;
        var _roots = this.roots;
        var _rootIds = this.rootIds;
        ${dom.createList.join('\n')}
      }${dom.updateList.length?',':''}
    // }}

      if (dom.updateList.length) {
      // {{
      update: function update(${dom.args.join(',')}) {
        var _doms = this.doms;
        var _roots = this.roots;
        var _last = this.last;
        ${dom.updateList.join('\n')}
      }
      // }}
      }
    // {{
    }
    // }}
  }
}

// {{
module.exports = ${it.templateName};
// }}
