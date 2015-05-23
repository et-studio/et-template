'use strict';
define(function (require, exports, module) {
  var compiler = require('src/compiler');
  var babel = require('babel');
  var options = { modules: 'common' };

  exports.register = function () {

    describe('Basic test', function () {
      it('source.origin', function () {
        var dom = {
          children: [{ nodeName: 'DIV' }]
        };
        var expectString = '\n        \'use strict\';\n        ;(function (global, factory) {\n          if (typeof define === \'function\' && define.amd) {\n            define(factory);\n          } else {\n            var _require = function _require(key) {\n              return global[key];\n            };\n            var _exports = {};\n            var _module = {\n              exports: _exports\n            };\n            factory(_require, _exports, _module);\n            global.Template_et0 = _module.exports;\n          }\n        })(window, function factory(require, exports, module) {\n          var _et = require(\'_et\');\n          var util = _et.util;\n          var _prototype = _et.prototype;\n          function Template_et0(options) {\n            this.init(options);\n          }\n          util.extend(Template_et0.prototype, _prototype, {\n            create: function create() {\n              var roots = this.roots;\n              var doms = this.doms;\n            },\n            update: function update(it) {\n              var roots = this.roots;\n              var doms = this.doms;\n              var last = this.last;\n            }\n          });\n          module.exports = Template_et0;\n        });\n        ';
        var left = babel.transform(compiler.compile(dom), options).code;
        var right = babel.transform(expectString, options).code;
        left = left.trim().replace(/\n{2}/g, '\n');
        right = right.trim().replace(/\n{2}/g, '\n');
        assert.equal(left, right);
      });
    });
  };
});