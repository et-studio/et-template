'use strict'

var RUN_MOCHA = false

exports.register = function () {
  var content = document.getElementById('content')
  var Template = require('template/hello-world.html')
  var t = new Template()
  var scope = {name: 'world'}

  t.on('et-model', function (key, value) {
    scope[key] = value
    t.update(scope)
  })

  content.appendChild(t.get())
  t.update(scope)

  return RUN_MOCHA
}
