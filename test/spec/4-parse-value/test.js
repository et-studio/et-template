'use strict'

var parser = require('src/parsers/value')
var settings = require('./settings.js')

exports.register = function () {
  window.describe('Compiler test', function () {
    settings.forEach(function (setting) {
      window.it(setting.source, function () {
        var result = parser.parse(setting.source)
        var expect = setting.expect

        console.log(result)
        window.testCompile(result, expect)
      })
    })
  })
}
