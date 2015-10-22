'use strict'

var RUN_MOCHA = false

exports.register = function () {
  var content = document.getElementById('content')
  var Template = require('template/hello-world.html')
  var scope = {name: 'world', index: 0}
  var events = {
    'add': function (e) {
      scope.index++
      t.update(scope)
    },
    'subtract': function (e) {
      scope.index--
      t.update(scope)
    }
  }
  var t = new Template({events: events})

  t.on('et-model', function (key, value) {
    scope[key] = value
    t.update(scope)
  })

  content.appendChild(t.get())
  t.update(scope)

  return RUN_MOCHA
}
