'use strict';
// @ignore

function assemble(dbs){
  var str = '<table class="table table-striped latest-data"><tbody>';
  for(var i = 0, len1 = dbs.length; i < len1 ; i++) {
    var item = dbs[i];
    str = str + `
        <tr>
          <td class="dbname">${item.name}</td>
          <td class="query-count">
            <span class="${item.countClassName}">
              ${item.queries.length}
            </span>
          </td>
        `;
    var topFiveQueries = item.topFiveQueries;
    for(var j = 0, len2 = topFiveQueries.length; j < len2 ; j++){
      var item2 = topFiveQueries[j];
      str = str + `
          <td class="Query ${item2.className}">
            ${item2.elapsed}
            <div class="popover left">
              <div class="popover-content">${item2.query}</div>
              <div class="arrow"></div>
            </div>
          </td>
        `;
    }
    str = str + '</tr>';
  }
  str = str + '</tbody></table>';
  return str;
}
var content = document.getElementById('test');

function redraw() {
  content.innerHTML = assemble(getDatabases());
  setTimeout(redraw, TIMEOUT);
}
redraw();
