'use strict'

var parser = require('src/parsers/dot')
var settings = require('./settings.js')

exports.register = function () {
  window.describe('Compiler test', function () {
    settings.forEach(function (setting) {
      window.it(setting.title, function () {
        var source = parser.parse(setting.dot)
        var expect = setting.expect
        console.log(source)
        window.testCompile(expect, source)
      })
    })
  })
}
