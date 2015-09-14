'use strict'

window.ROWS = 100
window.TIMEOUT = 0

var getDatabases = require('./db.js')
var Template = require('template/dbmonster-table.html')
var MAX_COUNT = Math.pow(10, 2)

function testET () {
  var content = document.getElementById('test')
  var t = new Template()
  content.appendChild(t.get())
  var count = 0
  var startTime = new Date().valueOf()

  function redraw () {
    t.update({dbs: getDatabases()})
    if (count < MAX_COUNT) {
      count++
      setTimeout(redraw, window.TIMEOUT)
    } else {
      content.textContent = ''
      var endTime = new Date().valueOf()
      content.innerHTML = '<h1>' + MAX_COUNT + ' times: ' + (endTime - startTime) + ' ms</h1>'
    }
  }
  redraw()
}
exports.register = function () {
  testET()
  return false
}
