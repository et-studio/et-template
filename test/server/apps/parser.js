'use strict'

const STORE_KEY = 'parser'

const parser = require('src/parsers')
const $select = document.querySelector('#parsers')
const $input = document.querySelector('#input')
const $btn = document.querySelector('#btn')

let opts = ''
for (let key in parser) {
  opts += `<option value='${key}'>${key}</option>`
}
$select.innerHTML = opts

$select.value = (window.localStorage.getItem(`${STORE_KEY}.option`) || '').trim() || 'parseOrigin'
let parse = parser[$select.value]
$select.addEventListener('change', function () {
  window.localStorage.setItem(`${STORE_KEY}.option`, this.value)
  parse = parser[this.value]
})

const oldInput = window.localStorage.getItem(`${STORE_KEY}.input`)
if (oldInput) $input.value = oldInput
$input.addEventListener('input', function () {
  window.localStorage.setItem(`${STORE_KEY}.input`, this.value)
})

$btn.addEventListener('click', function () {
  console.clear()

  var source = $input.value
  var result = parse(source)
  console.log(result)
})

