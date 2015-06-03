module.exports = [
  {
    title: 'options.modules: default || umd',
    dom: {
      children: [{nodeName: 'DIV', nodeType: 1}]
    },
    options: {

    },
    expect: `
      'use strict';
      ;(function (global, factory) {
        if (typeof define === 'function' && define.amd) {
          define(factory);
        } else {
          var _require = function _require(key) {
            return global[key];
          };
          var _exports = {};
          var _module = {
            exports: _exports
          };
          factory(_require, _exports, _module);
          global.Template_et0 = _module.exports;
        }
      })(window, function factory(require, exports, module) {
        var _et = require('_et');
        var _util = _et._util;
        var _prototype = _et._prototype;

        function Template_et0(options) {
          this.init(options);
        }

        _util.extend(Template_et0.prototype, _prototype, {
          create: function create() {
            var roots = this.roots;
            var rootIds = this.rootIds;
            var doms = this.doms;

            var et1 = _util.createElement('DIV');
            doms.et1 = et1;
            rootIds.push('et1');
            roots.et1 = et1;
          }
        });

        module.exports = Template_et0;
      });
    `
  },
  {
    title: 'options.modules: amd',
    dom: {
      children: [{nodeName: 'DIV', nodeType: 1}]
    },
    options: {
      modules: 'amd',
      moduleId: 'test'
    },
    expect: `
      'use strict';
      ;define('test', function (require, exports, module) {
        var _et = require('_et');
        var _util = _et._util;
        var _prototype = _et._prototype;

        function Template_et0(options) {
          this.init(options);
        }

        _util.extend(Template_et0.prototype, _prototype, {
          create: function create() {
            var roots = this.roots;
            var rootIds = this.rootIds;
            var doms = this.doms;

            var et1 = _util.createElement('DIV');
            doms.et1 = et1;
            rootIds.push('et1');
            roots.et1 = et1;
          }
        });

        module.exports = Template_et0;
      });
    `
  },
  {
    title: 'options.modules: common',
    dom: {
      children: [{nodeName: 'DIV', nodeType: 1}]
    },
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
          var roots = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;

          var et1 = _util.createElement('DIV');
          doms.et1 = et1;
          rootIds.push('et1');
          roots.et1 = et1;
        }
      });

      module.exports = Template_et0;
    `
  },
  {
    title: 'options.modules: global',
    dom: {
      children: [{nodeName: 'DIV', nodeType: 1}]
    },
    options: {
      modules: 'global',
      moduleId: 'test'
    },
    expect: `
      'use strict';
      ;(function (global) {
        var _et = global._et;
        var _util = _et._util;
        var _prototype = _et._prototype;

        function Template_et0(options) {
          this.init(options);
        }

        _util.extend(Template_et0.prototype, _prototype, {
          create: function create() {
            var roots = this.roots;
            var rootIds = this.rootIds;
            var doms = this.doms;

            var et1 = _util.createElement('DIV');
            doms.et1 = et1;
            rootIds.push('et1');
            roots.et1 = et1;
          }
        });

        global.test = Template_et0;
      })(window);
    `
  },
  {
    title: 'options.modules: cmd',
    dom: {
      children: [{nodeName: 'DIV', nodeType: 1}]
    },
    options: {
      modules: 'cmd'
    },
    expect: `
      'use strict';
      ;define(function (require, exports, module) {
        var _et = require('_et');
        var _util = _et._util;
        var _prototype = _et._prototype;

        function Template_et0(options) {
          this.init(options);
        }

        _util.extend(Template_et0.prototype, _prototype, {
          create: function create() {
            var roots = this.roots;
            var rootIds = this.rootIds;
            var doms = this.doms;

            var et1 = _util.createElement('DIV');
            doms.et1 = et1;
            rootIds.push('et1');
            roots.et1 = et1;
          }
        });

        module.exports = Template_et0;
      });
    `
  },
  {
    title: 'attributes',
    dom: {
      children: [{
        nodeName: 'DIV',
        nodeType: 1,
        attributes: {
          id: 'test'
        }
      }]
    },
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
          var roots = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;

          var et1 = _util.createElement('DIV', {'id': 'test'});
          doms.et1 = et1;
          rootIds.push('et1');
          roots.et1 = et1;
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
            'data-type': `{{
              (function(){
                var re = it.getSrc();
                re += 'test';
                return re;
              })()
            }}`
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
          var roots = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;

          var et1 = _util.createElement('DIV');
          doms.et1 = et1;
          rootIds.push('et1');
          roots.et1 = et1;
        },
        update: function update(it) {
          var roots = this.roots;
          var doms = this.doms;
          var last = this.last;

          var et1 = doms.et1;
          var tmpValue = 'aaa' + it.id + 'bbb' + it.getSrc();
          if (last.value_1 !== tmpValue) {
            last.value_1 = tmpValue;
            _util.setAttribute(et1, 'id', tmpValue);
          }

          var tmpValue = (function () {
            var re = it.getSrc();
            re += 'test';
            return re;
          })();
          if (last.value_2 !== tmpValue) {
            last.value_2 = tmpValue;
            _util.setAttribute(et1, 'data-type', tmpValue);
          }

          if (it.isTure) {
            if (last.value_3 !== 0) {
              last.value_3 = 0;
              _util.setAttribute(et1, 'class', 'class-true');
            }
          } else {
            if (last.value_3 !== 1) {
              last.value_3 = 1;
              _util.removeAttribute(et1, 'class');
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
          var roots = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;

          var et1 = _util.createElement('DIV');
          doms.et1 = et1;
          rootIds.push('et1');
          roots.et1 = et1;

          var et2 = _util.createTextNode('');
          doms.et2 = et2;
          _util.appendChild(et1, et2);
        },
        update: function update(it) {
          var roots = this.roots;
          var doms = this.doms;
          var last = this.last;

          var et2 = doms.et2;
          var tmpValue = 'aaaa' + it.src;
          if (last.value_1 !== tmpValue) {
            last.value_1 = tmpValue;
            _util.text(et2, tmpValue);
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
          var roots = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;

          var et1 = _util.createTextNode('It is before.');
          doms.et1 = et1;
          rootIds.push('et1');
          roots.et1 = et1;

          var et2 = null;
          doms.et2 = et2;
          rootIds.push('et2');
          roots.et2 = et2;

          var et2_line = _util.createLine();
          doms.et2_line = et2_line;
          rootIds.push('et2_line');
          roots.et2_line = et2_line;
        },
        update: function update(it) {
          var roots = this.roots;
          var doms = this.doms;
          var last = this.last;

          var $line = doms.et2_line;
          if (it.isNumber && it.isEven) {
            var et = doms.et2;
            if (last.value_1 !== 0) {
              last.value_1 = 0;
              if (!et) {
                doms.et2 = et = new Template_et2();
              }
              _util.before($line, et.get());
            }
            et.update(it);
          } else {
            if (last.value_1 !== 1) {
              last.value_1 = 1;
              var et = doms.et2;
              if (et) {
                et.remove();
              }
            }
          }
        }
      });
      _util.extend(Template_et2.prototype, _prototype, {
        create: function create() {
          var roots = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;

          var et3 = _util.createTextNode('It is number and is even');
          doms.et3 = et3;
          rootIds.push('et3');
          roots.et3 = et3;
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

      function Template_et0(options) {
        this.init(options);
      }
      function Template_et1(options) {
        this.init(options);
      }

      _util.extend(Template_et0.prototype, _prototype, {
        create: function create() {
          var roots = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;

          var et1 = null;
          doms.et1 = et1;
          rootIds.push('et1');
          roots.et1 = et1;

          var et1_line = _util.createLine();
          doms.et1_line = et1_line;
          rootIds.push('et1_line');
          roots.et1_line = et1_line;
        },
        update: function update(it) {
          var roots = this.roots;
          var doms = this.doms;
          var last = this.last;

          var $line = doms.et1_line;
          var lastLength = last.value_1;
          var list = it.list;
          var index = 0;
          var len = list.length;
          var item, et;
          for (; index < len; index++) {
            item = list[index];
            et = doms['et1_' + index];
            if (!et) {
              doms['et1_' + index] = et = new Template_et1();
            }
            if (!lastLength || lastLength < index) {
              _util.before($line, et.get());
            }
            et.update(it, item, index);
          }
          last.value_1 = index;
          for (; index < lastLength; index++) {
            et = doms['et1_' + index];
            et.remove();
          }
        }
      });
      _util.extend(Template_et1.prototype, _prototype, {
        create: function create() {
          var roots = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;

          var et2 = _util.createTextNode('');
          doms.et2 = et2;
          rootIds.push('et2');
          roots.et2 = et2;
        },
        update: function update(it, item, index) {
          var roots = this.roots;
          var doms = this.doms;
          var last = this.last;

          var et2 = doms.et2;
          var tmpValue = 'it is for loop ' + index;
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
