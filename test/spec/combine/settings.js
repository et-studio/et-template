module.exports = [
  {
    title: 'combine test',
    string: '<div>test</div>',
    options: {
      modules: 'common'
    },
    expect: `
      var _et = require('_et');
      var _util = _et._util;
      var _prototype = _et._prototype;

      function Template_et0(options) {
        this.init(options);
      }

      _util.extend(Template_et0.prototype, _prototype, {
        create: function create() {
          var root = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;

          var et1 = _util.createElement('DIV');
          doms.et1 = et1;
          rootIds.push('et1');
          root.et1 = et1;

          var et2 = _util.createTextNode('test');
          doms.et2 = et2;
          _util.appendChild(et1, et2);
        }
      });

      module.exports = Template_et0;
    `
  },
  {
    title: 'combine attribute',
    string: '<div class="test1">{{it.content}}</div>',
    options: {
      modules: 'common'
    },
    expect: `
      var _et = require('_et');
      var _util = _et._util;
      var _prototype = _et._prototype;

      function Template_et0(options) {
        this.init(options);
      }

      _util.extend(Template_et0.prototype, _prototype, {
        create: function create() {
          var root = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;

          var et1 = _util.createElement('DIV', {'class': 'test1'});
          doms.et1 = et1;
          rootIds.push('et1');
          root.et1 = et1;

          var et2 = _util.createTextNode('');
          doms.et2 = et2;
          _util.appendChild(et1, et2);
        },
        update: function update(ot) {
          var root = this.root;
          var doms = this.doms;
          var last = this.last;

          var et2 = doms.et2;
          var tmpValue = it.content;
          if (last.value_1 !== tmpValue) {
            last.value_1 = tmpValue;
            _util.text(et2, tmpValue);
          }
        }
      });

      module.exports = Template_et0;
    `
  }
];
