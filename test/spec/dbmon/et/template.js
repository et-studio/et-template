/*
<table class="table table-striped latest-data">
  <tbody>
  {{#each dbs}}
    <tr>
      <td class="dbname">
        {{name}}
      </td>
      <td class="query-count">
        <span class="{{ countClassName }}">
          {{ queries.length }}
        </span>
      </td>
      {{#each topFiveQueries}}
        <td class="Query {{ className }}">
          {{ elapsed }}
          <div class="popover left">
            <div class="popover-content">{{ query }}</div>
            <div class="arrow"></div>
          </div>
        </td>
      {{/each}}
    </tr>
  {{/each}}
  </tbody>
</table>
*/
// @ignore
'use strict';

var _et = window._et;
var _util = _et._util;
var _prototype = _et._prototype;
function Template (options) {
  this.init(options);
}
function Template2 (options) {
  this.init(options);
}
function Template3 (options) {
  this.init(options);
}
_util.extend(Template.prototype, _prototype, {
  createElements: function(){
    var root = this.root;
    var doms = this.doms;
    var rootIds = this.rootIds;

    var et1 = _util.createElement('table');
    et1.className = 'table table-striped latest-data';
    doms.et1 = et1;
    root.et1 = et1;
    rootIds.push('et1');

    var et2 = _util.createElement('tbody');
    doms.et2 = et2;
    _util.appendChild(et1, et2);

    var et3_line = _util.createElement('span');
    et3_line.style.display = 'none';
    doms.et3_line = et3_line;
    _util.appendChild(et2, et3_line);

  },
  update: function(it){
    var doms = this.doms;
    var last = this.last;
    var et, key;

    var i, len = it.dbs.length, lastIndex = last.et3_for_index, line = doms.et3_line;
    for(i = 0; i < len ; i++){
      var index = i;
      var item = it.dbs[i];

      key = 'et3_for_' + i;
      et = last[key];
      if(!et) {
        last[key] = et = new Template2();
      }
      if(!lastIndex || i > lastIndex) { // 上次没有出现
        _util.before(line, et.get());
      }
      et.update(it, item, index);
    }
    last.et3_for_index = i;
    for(; i < lastIndex ; i++) {
      key = 'et3_for_' + i;
      et = last[key];
      if(et) {
        et.remove();
      }
    }
  }
});
_util.extend(Template2.prototype, _prototype, {
  createElements: function(){
    var root = this.root;
    var doms = this.doms;
    var rootIds = this.rootIds;
    /*
    <tr>
      <td class="dbname">
        {{name}}
      </td>
      <td class="query-count">
        <span class="{{ countClassName }}">
          {{ queries.length }}
        </span>
      </td>
      {{#each topFiveQueries}}
        <td class="Query {{ className }}">
          {{ elapsed }}
          <div class="popover left">
            <div class="popover-content">{{ query }}</div>
            <div class="arrow"></div>
          </div>
        </td>
      {{/each}}
    </tr>
    */
    var et1 = _util.createElement('tr');
    doms.et1 = et1;
    root.et1 = et1;
    rootIds.push('et1');

    var et2 = _util.createElement('td');
    et2.className = 'dbname';
    doms.et2 = et2;
    _util.appendChild(et1, et2);

    var et3 = _util.createTextNode('');
    doms.et3 = et3;
    _util.appendChild(et2, et3);

    var et4 = _util.createElement('td');
    et4.className = 'query-count';
    doms.et4 = et4;
    _util.appendChild(et1, et4);

    var et5 = _util.createElement('span');
    doms.et5 = et5;
    _util.appendChild(et4, et5);

    var et6 = _util.createTextNode('');
    doms.et6 = et6;
    _util.appendChild(et5, et6);

    var et7_line = _util.createElement('span');
    et7_line.style.display = 'none';
    doms.et7_line = et7_line;
    _util.appendChild(et1, et7_line);
  },
  update: function(it, item, index){
    var doms = this.doms;
    var last = this.last;
    var et;

    if(last.value_1 !== item.name) {
      last.value_1 = item.name;
      et = doms.et3;
      _util.text(et, item.name);
    }

    if(last.value_2 !== item.countClassName) {
      last.value_2 = item.countClassName;
      et = doms.et5;
      et.className = item.countClassName;
    }

    if(last.value_3 !== item.queries.length) {
      last.value_2 = item.queries.length;
      et = doms.et5;
      _util.text(et, item.queries.length);
    }

    var i, key, len = item.topFiveQueries.length, lastIndex = last.et7_for_index, line = doms.et7_line;
    for(i = 0; i < len ; i++){
      var index2 = i;
      var item2 = item.topFiveQueries[i];

      key = 'et7_for_' + i;
      et = last[key];
      if(!et) {
        last[key] = et = new Template3();
      }
      if(!lastIndex || i > lastIndex) { // 上次没有出现
        _util.before(line, et.get());
      }
      et.update(it, item, index, item2, index2);
    }
    last.et7_for_index = i;
    for(; i < lastIndex ; i++) {
      key = 'et7_for_' + i;
      et = last[key];
      if(et) {
        et.remove();
      }
    }
  }
});
_util.extend(Template3.prototype, _prototype, {
  createElements: function(){
    var root = this.root;
    var doms = this.doms;
    var rootIds = this.rootIds;
    /*
    <td class="Query {{ className }}">
      {{ elapsed }}
      <div class="popover left">
        <div class="popover-content">{{ query }}</div>
        <div class="arrow"></div>
      </div>
    </td>
    */
    var et1 = _util.createElement('td');
    doms.et1 = et1;
    root.et1 = et1;
    rootIds.push('et1');

    var et2 = _util.createTextNode('');
    doms.et2 = et2;
    _util.appendChild(et1, et2);

    var et3 = _util.createElement('div');
    et3.className = 'popover left';
    doms.et3 = et3;
    _util.appendChild(et1, et3);

    var et4 = _util.createElement('div');
    et4.className = 'popover-content';
    doms.et4 = et4;
    _util.appendChild(et3, et4);

    var et5 = _util.createTextNode('');
    doms.et5 = et5;
    _util.appendChild(et4, et5);

    var et6 = _util.createElement('div');
    et6.className = 'popover-content';
    doms.et6 = et6;
    _util.appendChild(et3, et6);

    var et7 = _util.createElement('div');
    et7.className = 'arrow';
    doms.et7 = et7;
    _util.appendChild(et3, et7);
  },
  update: function(it, item, index, item2, index2){
    var doms = this.doms;
    var last = this.last;
    var et;

    if(last.value_1 !== item2.className){
      last.value_1 = item2.className;
      et = doms.et1;
      et.className = 'Query ' + item2.className;
    }

    if(last.value_2 !== item2.elapsed){
      last.value_2 = item2.elapsed;
      et = doms.et2;
      _util.text(et, item2.elapsed);
    }

    if(last.value_3 !== item2.query){
      last.value_3 = item2.query;
      et = doms.et5;
      _util.text(et, item2.query);
    }
  }
});
