'use strict'

var RUN_MOCHA = false

exports.register = function () {
  var content = document.getElementById('content')
  var Template = require('template/hello-world.html')

  var view = {
    template: null,
    name: 'world',
    index: 0,
    add: function () {
      this.index++
      this.update()
    },
    subtract: function () {
      this.index--
      this.update()
    },
    onChange: function () {
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
