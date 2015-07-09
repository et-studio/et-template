'use strict'

var parser = require('src/parsers/dot')
var settings = require('./settings.js')

exports.register = function () {
  window.describe('Compiler test', function () {
    settings.forEach(function (setting) {
      window.it(setting.title, function () {
        var left = parser.parse(setting.dot)
        var right = setting.expect
        console.log(left)
        window.testCompile(left, right)
      })
    })
  })
}
