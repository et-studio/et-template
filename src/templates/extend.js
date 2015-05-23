util.extend(${it.templateName}.prototype, _prototype, {
  create: function create(){
    var roots = this.roots;
    var doms = this.doms;

    ${it.createString}
  },
  update: function update(${it.args.join(',')}) {
    var roots = this.roots;
    var doms = this.doms;
    var last = this.last;

    ${it.updateString}
  }
});
