'use strict'

var settings = require('./settings.js')
var originParser = require('src/parsers/origin')

exports.register = function () {
  window.describe('Compiler test', function () {
    settings.forEach(function (setting) {
      window.it(setting.title, function () {
        var node = originParser.parse(setting.html)
        var expect = setting.expect

        console.log(node)
        window.testAll(expect, node)
      })
    })
  })
}
