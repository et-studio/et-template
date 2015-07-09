'use strict'

var Parser = require('src/parser')
var settings = require('./settings.js')

exports.register = function () {
  window.describe('Compiler test', function () {
    settings.forEach(function (setting) {
      window.it(setting.title, function (done) {
        if (setting.title.indexOf('error') >= 0) {
          try {
            var errParser = new Parser(setting.options)
            errParser.parse(setting.html)
          } catch (e) {
            done()
          } finally {
            return
          }
        }

        var parser = new Parser(setting.options)
        var node = parser.parse(setting.html)
        var expect = setting.expect

        console.log(node)
        window.testAll(node, expect)
        done()
      })
    })
  })
}
