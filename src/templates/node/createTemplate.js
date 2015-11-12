
// {{
var ${it.templateName} = _dep_createTemplate({
  create: function () {
    var _this = this
    ${it.createList.join('\n')}
  }${it.updateList.length?',':''}
  // }}
  if (it.updateList.length) {
    // {{
    update: function (${it.args.join(', ')}) {
      var _this = this
      var _last = this.last

      ${it.updateList.join('\n')}
    }
    // }}
  }
  // {{
})
// }}
