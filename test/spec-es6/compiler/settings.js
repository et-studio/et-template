'use strict';
define(function (require, exports, module) {
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
          var _prototype = _et.prototype;
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
          var _prototype = _et.prototype;
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
        var _prototype = _et.prototype;
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
          var _prototype = _et.prototype;
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
          var _prototype = _et.prototype;
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
        var _prototype = _et.prototype;
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
            condition: '',
            attributes: {
              'id': '{{=it.id}}0'
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
        var _et = require('_et');
        var _util = _et._util;
        var _prototype = _et.prototype;
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
            if (last.value_0 !== it.id) {
              last.value_0 = it.id;
              _util.setAttribute('id', it.id + '0');
            }
            if (last.value_1 !== it.isTrue) {
              last.value_1 = it.isTrue;
              if (it.isTrue) {
                _util.setAttribute('class', 'class-true');
              } else {
                _util.removeAttribute('class');
              }
            }

          }
        });
        module.exports = Template_et0;
      `
    }
  ];
});
