'use strict'

var RUN_MOCHA = false

exports.register = function () {
  var content = document.getElementById('content')
  var Template = require('template/hello-world.html')
  var scope = {name: 'world', index: 0}
  var t

  var events = {
    'add': function (e) {
      scope.index++
      t.update(scope)
    },
    'subtract': function (e) {
      scope.index--
      t.update(scope)
    },
    'setName': function (e) {
      var value = e.target.value
      scope.name = value
      t.update(scope)
    }
  }

  t = new Template({events: events})
  content.appendChild(t.get())
  t.update(scope)

  return RUN_MOCHA
}
