'use strict'

var settings = require('./settings.js')
var middlewareGetter = require('src/middlewares/middleware-getter')

function parse (str, options) {
  var middlewares = middlewareGetter.getList(
    'origin-parser',
    'source-translator',
    'node-creator',
    'attributes',
    'rebuilder',
    'ng-rebuilder',
    'checker')
  var result = str
  middlewares.map((middleware) => {
    result = middleware.run(result, options)
  })
  return result
}

exports.register = function () {
  window.describe('Compiler test', function () {
    settings.forEach(function (setting) {
      window.it(setting.title, function (done) {
        if (setting.title.indexOf('error') >= 0) {
          try {
            parse(setting.html, setting.options)
          } catch (e) {
            done()
          } finally {
            return
          }
        }

        var node = parse(setting.html, setting.options)
        var expect = setting.expect

        console.log(node)
        window.testAll(expect, node)
        done()
      })
    })
  })
}
