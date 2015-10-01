
// {{
// 默认认为_dep对象已经存在了
var _prototype = _dep.template
var _extend = _dep.extend
// __bodyStart__
// }}

_.each(it.newDoms, (dom) => {
  // {{
  function ${dom.templateName} (options) {
    this.init(options)
  }
  // }}
})

_.each(it.newDoms, (dom) => {
  // {{
  _extend(${dom.templateName}.prototype, _prototype, {
    create: function create () {
      var _elements = this.elements
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
      ${dom.createList.join('\n')}
      ${dom.appendList.join('\n')}
    }${dom.updateList.length?',':''}
    // }}

    if (dom.updateList.length) {
      // {{
      update: function update (${dom.args.join(', ')}) {
        var _elements = this.elements
        var _last = this.last

        ${dom.updateList.join('\n')}
      }
      // }}
    }

  // {{
  })
  // }}
})
