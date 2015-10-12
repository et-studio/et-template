
// {{
var ${it.templateName} = _dep_createTemplate({
  create: function () {
    var _this = this
    // }}
    if (it.modelType === 'model' || it.modelType === 'object') {
      // {{
      var _scope = this.options.scope
      // }}
    } else {
      // {{
      var _scope = this
      // }}
    }
    // {{
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
