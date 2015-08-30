'use strict'

var RUN_MOCHA = false
var ET = require('src/et')
var jsFormatter = require('jsFormatter')

exports.register = function () {
  var $options = document.getElementById('options')
  var $input = document.getElementById('input')
  var $btn = document.getElementById('btn')

  $btn.addEventListener('click', function () {
    var opsStr = $options.value || '{}'
    var opts = JSON.parse(opsStr)
    var html = $input.value
    var et = new ET(opts)
    var result = et.compile(html)
    result = jsFormatter.js_beautify(result)
    result = result.trim().replace(/\n\s*\n/g, '\n')

    console.log(result)
  })

  return RUN_MOCHA
}
