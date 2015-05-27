module.exports = [
  {
    title: 'options.modules: default || umd',
    dom: {
      children: [{nodeName: 'DIV'}]
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
            var root = this.roots;
            var rootIds = this.rootIds;
            var doms = this.doms;
            var et1 = _util.createElement('DIV');
            doms.et1 = et1;
            rootIds.push('et1');
            root.et1 = et1;
          }
        });
        module.exports = Template_et0;
      });
    `
  },
  {
    title: 'options.modules: amd',
    dom: {
      children: [{nodeName: 'DIV'}]
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
            var root = this.roots;
            var rootIds = this.rootIds;
            var doms = this.doms;
            var et1 = _util.createElement('DIV');
            doms.et1 = et1;
            rootIds.push('et1');
            root.et1 = et1;
          }
        });
        module.exports = Template_et0;
      });
    `
  },
  {
    title: 'options.modules: common',
    dom: {
      children: [{nodeName: 'DIV'}]
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
          var root = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;
          var et1 = _util.createElement('DIV');
          doms.et1 = et1;
          rootIds.push('et1');
          root.et1 = et1;
        }
      });
      module.exports = Template_et0;
    `
  },
  {
    title: 'options.modules: global',
    dom: {
      children: [{nodeName: 'DIV'}]
    },
    options: {
      modules: 'global'
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
            var root = this.roots;
            var rootIds = this.rootIds;
            var doms = this.doms;
            var et1 = _util.createElement('DIV');
            doms.et1 = et1;
            rootIds.push('et1');
            root.et1 = et1;
          }
        });
        global.test = Template_et0;
      })(window);
    `
  },
  {
    title: 'options.modules: cmd',
    dom: {
      children: [{nodeName: 'DIV'}]
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
            var root = this.roots;
            var rootIds = this.rootIds;
            var doms = this.doms;
            var et1 = _util.createElement('DIV');
            doms.et1 = et1;
            rootIds.push('et1');
            root.et1 = et1;
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
          var root = this.roots;
          var rootIds = this.rootIds;
          var doms = this.doms;
          var et1 = _util.createElement('DIV', {'id': 'test'});
          doms.et1 = et1;
          rootIds.push('et1');
          root.et1 = et1;
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
        var root = this.roots;
        var rootIds = this.rootIds;
        var doms = this.doms;
        var et1 = _util.createElement('DIV');
        doms.et1 = et1;
        rootIds.push('et1');
        root.et1 = et1;
      },
      update: function update(it) {
        var root = this.root;
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
          last.value_4 = 0;
          var tmpValue = 'class-true';
          if (last.value_3 !== tmpValue) {
            last.value_3 = tmpValue;
            _util.setAttribute(et1, 'class', tmpValue);
          }
        } else {
          if (last.value_4 !== 1) {
            last.value_4 = 1;
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
        children: [{
          textContent: 'aaaa{{it.src}}'
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
        var root = this.roots;
        var rootIds = this.rootIds;
        var doms = this.doms;

        var et1 = _util.createElement('DIV');
        doms.et1 = et1;
        rootIds.push('et1');
        root.et1 = et1;

        var et2 = _util.createTextNode('');
        doms.et2 = et2;
      },
      update: function update(it) {
        var root = this.root;
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
        textContent: 'It is before.'
      },{
        nodeName: '#if',
        condition: 'it.isNumber && it.isEven',
        children: [{
          textContent: 'it is number and is even'
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
        var root = this.roots;
        var rootIds = this.rootIds;
        var doms = this.doms;

        var et1 = _util.createElement('DIV');
        doms.et1 = et1;
        rootIds.push('et1');
        root.et1 = et1;

        var et2 = _util.createTextNode('');
        doms.et2 = et2;
      },
      update: function update(it) {
        var root = this.root;
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
  }
];
