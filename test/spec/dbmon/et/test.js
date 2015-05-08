
var content = document.getElementById('test');
var t = new Template();
content.appendChild(t.get());

function redraw() {
  t.update({dbs: getDatabases()});
  setTimeout(redraw, TIMEOUT);
}
redraw();

