'use strict'

var settings = require('./settings.js')
var middlewareGetter = require('src/middlewares/middleware-getter')

function parse (str, options) {
  var middlewares = middlewareGetter.getList('origin-parser', 'source-translator')
  console.log();
  var result = str
  middlewares.map((middleware) => {
    result = middleware.run(result, options)
  })
  return result
}

exports.register = function () {
  window.describe('Compiler test', function () {
    settings.forEach(function (setting) {
      window.it(setting.title, function () {
        var node = parse(setting.html)
        var expect = setting.expect

        console.log(node)
        window.testAll(expect, node)
      })
    })
  })
}
