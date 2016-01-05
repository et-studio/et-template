'use strict'

var RUN_MOCHA = false
var WITHOUT_MOCHA = true
var ET = require('src/et')
var jsFormatter = require('jsFormatter')

exports.register = function () {
  var $expect = document.querySelector('#expect')
  var $options = document.querySelector('#options')
  var $input = document.querySelector('#input')
  var $btn = document.querySelector('#btn')

  var expect = window.localStorage.getItem('expect')
  if (expect) $expect.value = expect
  $expect.addEventListener('input', function (e) {
    window.localStorage.setItem('expect', e.target.value)
  })

  var oldOpts = window.localStorage.getItem('options')
  if (oldOpts) $options.value = oldOpts
  $options.addEventListener('input', function (e) {
    window.localStorage.setItem('options', e.target.value)
  })

  var oldInput = window.localStorage.getItem('input')
  if (oldInput) $input.value = oldInput
  $input.addEventListener('input', function (e) {
    window.localStorage.setItem('input', e.target.value)
  })

  $btn.addEventListener('click', function () {
    console.clear()

    var opsStr = $options.value || '{}'
    var opts = JSON.parse(opsStr)
    var html = $input.value
    var et = new ET(opts)

    var result = ''
    if (opts.useDot) result = et.compileDot(html)
    else result = et.compile(html)

    result = jsFormatter.js_beautify(result)
    result = result.trim().replace(/\n\s*\n/g, '\n')
    console.log(result)

    var expect = jsFormatter.js_beautify($expect.value)
    window.testCompile(expect, result, WITHOUT_MOCHA)
  })

  return RUN_MOCHA
}
