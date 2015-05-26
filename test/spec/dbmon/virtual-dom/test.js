// @ignore

var virtualDom = window.virtualDom;

var h = virtualDom.h;
var diff = virtualDom.diff;
var patch = virtualDom.patch;
var createElement = virtualDom.create;

function renderQuery(query) {
  var td_div_div1 = h('div', {
    attributes: {
      'class': 'popover-content'
    }
  }, [String(query.query)])

  var td_div_div2 = h('div', {
    attributes: {
      'class': 'arrow'
    }
  }, []);

  var td_divChildren = [];
  td_divChildren.push(td_div_div1);
  td_divChildren.push(td_div_div2);

  var td_div = h('div', {
    attributes: {
      'class': 'popover left'
    }
  }, td_divChildren);

  var tdChidren = [];
  tdChidren.push(String(query.elapsed));

  var td = h('td', {
    attributes: {
      'class': 'Query ' + query.className
    }
  }, tdChidren);
  return td;
}
function renderItem(item) {
  var tr_td2_span = h('span', {
    attributes: {
      'class': item.countClassName
    }
  }, [String(item.queries.length)]);

  var tr_td1 = h('td', {
    attributes: {
      'class': 'dbname'
    }
  }, [String(item.name)]);

  var tr_td2 = h('td', {
    attributes: {
      'class': 'query-count'
    }
  }, [tr_td2_span]);

  var trChildren = [];
  trChildren.push(tr_td1);
  trChildren.push(tr_td2);

  var topFiveQueries = item.topFiveQueries;
  for (var i = 0; i < topFiveQueries.length; i++) {
    var query = topFiveQueries[i];
    trChildren.push(renderQuery(query));
  }
  var tr = h('tr', {}, trChildren);
  return tr;
}
function render(dbs)  {
  var table_tbodyChildren = [];
  for (var i = 0; i < dbs.length; i++) {
    table_tbodyChildren.push(renderItem(dbs[i]));
  }

  var table_tbody = h ('tbody', {}, table_tbodyChildren);
  var table = h('table', {
    attributes: {
      'class': 'table table-striped latest-data'
    }
  }, [table_tbody]);
  return table;
}

var tree = render(getDatabases());
var rootNode = createElement(tree);
var content = document.getElementById('test');
content.appendChild(rootNode);

function redraw() {
  var newTree = render(getDatabases());
  var patches = diff(tree, newTree);
  rootNode = patch(rootNode, patches);
  tree = newTree;

  setTimeout(redraw, TIMEOUT);
}
redraw();
