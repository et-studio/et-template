'use strict';
define(function (require, exports, module) {
  var compiler = require('src/compiler');
  var babel = require('babel');
  var options = {modules: 'common'};

  exports.register = function(){

    describe('Basic test', function(){
      it('source.origin', function(){
        var dom = {
          children: [{nodeName: 'DIV'}]
        };
        var expectString = `
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
          var util = _et.util;
          var _prototype = _et.prototype;
          function Template_et0(options) {
            this.init(options);
          }
          util.extend(Template_et0.prototype, _prototype, {
            create: function create() {
              var roots = this.roots;
              var doms = this.doms;
            },
            update: function update(it) {
              var roots = this.roots;
              var doms = this.doms;
              var last = this.last;
            }
          });
          module.exports = Template_et0;
        });
        `;
        var left = babel.transform(compiler.compile(dom), options).code;
        var right = babel.transform(expectString, options).code;
        left = left.trim().replace(/\n{2}/g, '\n');
        right = right.trim().replace(/\n{2}/g, '\n');
        assert.equal(left, right);
      });
    });

  };
});
