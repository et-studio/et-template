
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
