module.exports = [
  {
    title: 'options.modules: common',
    dom: {
      children: [{nodeName: 'DIV', nodeType: 1}]
    },
    options: {
      modules: 'common'
    },
    expect: `
      'use strict';

      var _et = require('_et');
      var _util = _et._util;
      var _prototype = _et._prototype;

      function Template_et0(options) {
        this.init(options);
      }

      _util.extend(Template_et0.prototype, _prototype, {
        create: function create() {
          var _doms = this.doms;
          var _roots = this.roots;
          _rootIds = this.rootIds;

          var _et = _util.createElement('DIV', {'id': 'test'});
          var _doms.et1 = _et;
          var _roots.et1 = _et;
          var _rootIds.push('et1');
        }
      });

      module.exports = Template_et0;
    `
  },
  {
    title: 'attribute expression',
    dom: {
      children: [{
        nodeName: 'DIV',
        nodeType: 1,
        expressions: [{
          attributes: {
            'id': 'aaa{{it.id}}bbb{{it.getSrc()}}'
          }
        },{
          attributes: {
            'data-type': `(function(){return it.a + it.b;})()`
          }
        },{
          condition: 'it.isTure',
          attributes: {
            'class': 'class-true'
          }
        }]
      }]
    },
    options: {
      modules: 'common'
    },
    expect: `
      'use strict';

      var _et = require('_et');
      var _util = _et._util;
      var _prototype = _et._prototype;

      function Template_et0(options) {
        this.init(options);
      }

      _util.extend(Template_et0.prototype, _prototype, {
        create: function create() {
          var _doms = this.doms;
          var _roots = this.roots;
          var _rootIds = this.rootIds;

          var _et = _util.createElement('DIV');
          var _doms.et1 = _et;
          var _roots.et1 = _et;
          var _rootIds.push('et1');
        },
        update: function update(it) {
          var _doms, _roots, _last, _et, _tmp;

          var _doms = this.doms;
          var _roots = this.roots;
          var _last = this.last;

          var _et = _doms.et1;
          var _tmp = 'aaa' + it.id + 'bbb' + it.getSrc();
          if (_last.value_1 !== _tmp) {
            _last.value_1 = _tmp;
            _util.setAttribute(_et, 'id', _tmp);
          }

          var _tmp = (function(){return it.a + it.b;})();
          if (_last.value_2 !== _tmp) {
            _last.value_2 = _tmp;
            _util.setAttribute(_et, 'data-type', _tmp);
          }

          if (it.isTure) {
            if (_last.value_3 !== 0) {
              _last.value_3 = 0;
              _util.setAttribute(_et, 'class', 'class-true');
            }
          } else {
            if (_last.value_3 !== 1) {
              _last.value_3 = 1;
              _util.removeAttribute(_et, 'class');
            }
          }
        }
      });

      module.exports = Template_et0;
    `
  },
  {
    title: 'text test',
    dom: {
      children: [{
        nodeName: 'DIV',
        nodeType: 1,
        children: [{
          textContent: 'aaaa{{it.src}}',
          nodeType: 3
        }]
      }]
    },
    options: {
      modules: 'common'
    },
    expect: `
      'use strict';

      var _et = require('_et');
      var _util = _et._util;
      var _prototype = _et._prototype;

      function Template_et0(options) {
        this.init(options);
      }

      _util.extend(Template_et0.prototype, _prototype, {
        create: function create() {
          var _roots = this.roots;
          var _rootIds = this.rootIds;
          var _doms = this.doms;

          var _et = _util.createElement('DIV');
          _doms.et1 = _et;
          _roots.et1 = _et;
          _rootIds.push('et1');

          var _et = _util.createTextNode('');
          _doms.et2 = _et;
          _util.appendChild(_doms.et1, _et);
        },
        update: function update(it) {
          var _doms = this.doms;
          var _roots = this.roots;
          var _last = this.last;

          var _et = _doms.et2;
          var _tmp = 'aaaa' + it.src;
          if (_last.value_1 !== _tmp) {
            _last.value_1 = _tmp;
            _util.text(_et, _tmp);
          }
        }
      });

      module.exports = Template_et0;
    `
  },
  {
    title: 'if test',
    dom: {
      children: [{
        textContent: `It is before.`,
        nodeType: 3
      },{
        nodeName: '#if',
        condition: 'it.isNumber && it.isEven',
        nodeType: 'ET',
        children: [{
          textContent: 'It is number and is even',
          nodeType: 3
        }]
      }]
    },
    options: {
      modules: 'common'
    },
    updateOptions: {
      isNumber: true,
      isEven: true
    },
    expect: `
      'use strict';
      var _et = require('_et');
      var _util = _et._util;
      var _prototype = _et._prototype;

      function Template_et0(options) {
        this.init(options);
      }
      function Template_et2(options) {
        this.init(options);
      }

      _util.extend(Template_et0.prototype, _prototype, {
        create: function create() {
          var _doms = this.doms;
          var _roots = this.roots;
          var _rootIds = this.rootIds;

          var _et = _util.createTextNode('It is before.');
          _doms.et1 = _et;
          _roots.et1 = _et;
          _rootIds.push('et1');

          var _et = null;
          _doms.et2 = _et;
          _roots.et2 = _et;
          _rootIds.push('et2');

          var _line = _util.createLine();
          _doms.et2_line = _line;
          _roots.et2_line = _line;
          _rootIds.push('et2_line');
        },
        update: function update(it) {
          var _doms = this.doms;
          var _roots = this.roots;
          var _last = this.last;

          var _et = _doms.et2;
          var _line = _doms.et2_line;
          if (it.isNumber && it.isEven) {
            if (_last.value_1 !== 0) {
              _last.value_1 = 0;
              if (!_et) {
                _doms.et2 = _et = new Template_et2();
              }
              _util.before(_line, _et.get());
            }
            _et.update(it);
          } else {
            if (_last.value_1 !== 1) {
              _last.value_1 = 1;
              if (_et) {
                _et.remove();
                _roots.et2 = null;
              }
            }
          }
        }
      });
      _util.extend(Template_et2.prototype, _prototype, {
        create: function create() {
          var _doms = this.doms;
          var _roots = this.roots;
          var _rootIds = this.rootIds;

          var _et = _util.createTextNode('It is number and is even');
          _doms.et3 = _et;
          _roots.et3 = _et;
          _rootIds.push('et3');
        }
      });

      module.exports = Template_et0;
    `
  },
  {
    title: 'for test',
    dom: {
      children: [{
        nodeName: '#for',
        nodeType: 'ET',
        condition: 'it.list',
        itemName: 'item',
        indexName: 'index',
        children: [{
          textContent: 'it is for loop {{index}}',
          nodeType: 3
        }]
      }]
    },
    options: {
      modules: 'common'
    },
    updateOptions: {
      list: [{}, {}]
    },
    expect: `
      'use strict';

      var _et = require('_et');
      var _util = _et._util;
      var _prototype = _et._prototype;

      function Template_for(options) {
        this.init(options);
      }
      function Template_et0(options) {
        this.init(options);
      }
      function Template_et1(options) {
        this.init(options);
      }

      _util.extend(Template_for.prototype, _prototype);
      _util.extend(Template_et0.prototype, _prototype, {
        create: function create() {
          var _doms = this.doms;
          var _roots = this.roots;
          var _rootIds = this.rootIds;

          var _et = new Template_for();
          _doms.et1 = _et;
          _roots.et1 = _et;
          _rootIds.push('et1');

          var _line = _util.createLine();
          _doms.et1_line = _line;
          _roots.et1_line = _line;
          _rootIds.push('et1_line');
        },
        update: function update(it) {
          var _doms = this.doms;
          var _roots = this.roots;
          var _last = this.last;

          var _line = _doms.et1_line;
          var _lastLength = _last.value_1;
          var _list = it.list;
          for (var _i = 0, _len = _list.length; _i < _len; _i++) {
            var _et = _doms['et1_' + _i];
            var _item = _list[i];
            var index = _i;
            var item = _item;

            if (!_et) {
              _doms['et1_' + _i] = _et = new Template_et1();
            }
            if (!_lastLength || _lastLength < _i) {
              _util.before(_line, _et.get());
            }
            _et.update(it, item, index);
          }

          _last.value_1 = _i;
          for (; _i < _lastLength; _i++) {
            var _et = _doms['et1_' + _i];
            _et.remove();
          }

          var _lastLength = _last.value_1;
          var _et = _doms.et1;
          _et.rootIds = [];
          for (_i = 0; _i < _lastLength; _i++) {
            _et.rootIds.push('et1_' + _i);
            _et._doms['et1_' + _i] = _doms['et1_' + _i];
          }
        }
      });
      _util.extend(Template_et1.prototype, _prototype, {
        create: function create() {
          var _doms = this.doms;
          var _roots = this.roots;
          var _rootIds = this.rootIds;

          var _et = _util.createTextNode('');
          _doms.et2 = _et;
          _roots.et2 = _et;
          _rootIds.push('et2');
        },
        update: function update(it, item, index) {
          var _doms = this.doms;
          var _roots = this.roots;
          var _last = this.last;

          var _et = doms.et2;
          var _tmp = 'it is for loop ' + index;
          if (_last.value_1 !== _tmp) {
            _last.value_1 = _tmp;
            _util.text(_et, _tmp);
          }
        }
      });

      module.exports = Template_et0;
    `
  }
];
