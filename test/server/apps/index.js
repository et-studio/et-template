'use strict'

const beautify = require('js-beautify')
const et = require('src/et')

const $expect = document.querySelector('#expect')
const $options = document.querySelector('#options')
const $input = document.querySelector('#input')
const $btn = document.querySelector('#btn')

const expect = window.localStorage.getItem('expect')
if (expect) $expect.value = expect
$expect.addEventListener('input', function (e) {
  window.localStorage.setItem('expect', e.target.value)
})

const oldOpts = window.localStorage.getItem('options')
if (oldOpts) $options.value = oldOpts
$options.addEventListener('input', function (e) {
  window.localStorage.setItem('options', e.target.value)
})

const oldInput = window.localStorage.getItem('input')
if (oldInput) $input.value = oldInput
$input.addEventListener('input', function (e) {
  window.localStorage.setItem('input', e.target.value)
})

$btn.addEventListener('click', function () {
  console.clear()

  let opsStr = $options.value || '{}'
  let opts = JSON.parse(opsStr)
  let html = $input.value
  test($expect.value, et.compile(html, opts))
})

function test (expect, result) {
  expect = beautify(expect || '').trim().replace(/\n\s*\n/g, '\n')
  result = beautify(result || '').trim().replace(/\n\s*\n/g, '\n')
  console.log(result)

  let expectList = expect.split('\n')
  let resultList = result.split('\n')
  let len = Math.max(expectList.length, resultList.length)
  for (let i = 0; i < len; i++) {
    let expectStr = expectList[i] || ''
    expectStr = expectStr.trim()
    let resultStr = resultList[i] || ''
    resultStr = resultStr.trim()

    if (expectStr === resultStr) {
      console.log(`${i}:${expectStr}`)
      console.log(`${i}:${resultStr}`)
    } else {
      console.error(`${i}:${expectStr}`)
      console.error(`${i}:${resultStr}`)
    }
  }
}
