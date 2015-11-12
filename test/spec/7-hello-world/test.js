'use strict'

var RUN_MOCHA = false

exports.register = function () {
  var content = document.getElementById('content')
  var Template = require('template/hello-world.html')

  var view = {
    template: null,
    name: 'world',
    index: 0,
    add: function (e) {
      this.index++
      this.update()
    },
    subtract: function (e) {
      this.index--
      this.update()
    },
    setName: function (e) {
      var value = e.target.value
      this.name = value
      this.update()
    },
    update: function () {
      if (this.template) {
        this.template.update(this)
      }
    }
  }

  view.template = new Template(view)
  view.update()
  content.appendChild(view.template.get())

  return RUN_MOCHA
}
