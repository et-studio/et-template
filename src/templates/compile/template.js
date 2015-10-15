
// {{
// 默认认为_dep对象已经存在了
var _dep_createTemplate = _dep.dep_createTemplate
// @_tp_mark
// }}

_.each(it.newDoms, (dom) => {
  var templateName = dom.getTemplateName()
  var createList = dom.getCreateList()
  var updateList = dom.getUpdateList()
  var args = dom.getArguments()

  // {{
  var ${templateName} = _dep_createTemplate({
    create: function () {
      var _this = this
      // }}
      if (it.hasModelKey && (it.modelType === 'model' || it.modelType === 'object')) {
        // {{
        var _scope = this.options.scope
        // }}
      } else if (it.hasModelKey) {
        // {{
        var _scope = this
        // }}
      }
      // {{
      ${createList.join('\n')}
    }${updateList.length?',':''}
    // }}
    if (updateList.length) {
      // {{
      update: function (${args.join(',')}) {
        var _this = this
        var _last = this.last
        ${updateList.join('\n')}
      }
      // }}
    }
    // {{
  })
  // }}
})
