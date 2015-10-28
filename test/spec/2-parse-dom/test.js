'use strict'

var parser = require('src/middlewares/parser')
var settings = require('./settings.js')

exports.register = function () {
  window.describe('Compiler test', function () {
    settings.forEach(function (setting) {
      window.it(setting.title, function (done) {
        if (setting.title.indexOf('error') >= 0) {
          try {
            parser.run(setting.html, setting.options)
          } catch (e) {
            done()
          } finally {
            return
          }
        }

        var node = parser.run(setting.html, setting.options)
        var expect = setting.expect

        console.log(node)
        window.testAll(expect, node)
        done()
      })
    })
  })
}
