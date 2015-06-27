'use strict'

window.ROWS = 100
window.TIMEOUT = 0

var getDatabases = require('./db.js')
var Template = require('template/dbmonster-table.html')

exports.register = function () {
  var content = document.getElementById('test')
  var t = new Template()
  content.appendChild(t.get())

  function redraw () {
    t.update({dbs: getDatabases()})
    setTimeout(redraw, window.TIMEOUT)
  }
  redraw()

  return false
}
