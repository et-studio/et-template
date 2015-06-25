'use strict';

window.ROWS = 100;
window.TIMEOUT = 0;

var getDatabases = require('./db.js');
var Template = require('template/dbmonster-table.html');

exports.register = function(){
  var content = document.getElementById('test');
  var t = new Template();
  content.appendChild(t.get());

  function redraw() {
    // 1. init in loop
    // content.textContent = '';
    // var t = new Template();
    // content.appendChild(t.get());

    // 2. global change
    // t.remove();
    // t.update({dbs: getDatabases()})
    // content.appendChild(t.get())

    // 3. attribute change
    t.update({dbs: getDatabases()});

    setTimeout(redraw, TIMEOUT);
  }
  redraw();

  return false;
};
