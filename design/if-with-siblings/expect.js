'use strict';

// umd
;(function(global) {

  function factory(util, _prototype) {
    function Template_ET_0(options){
      this.init(options);
    }
    function Template_ET_4(options) {
      this.init(options);
    }
    util.extend(Template_ET_0.prototype, _prototype, {
      createElements: function(){
        var roots = this.roots;
        var doms = this.doms;

        var et2 = util.createElement('div');
        doms.et2 = et2;
        roots[0] = et2;

        var et3 = util.createTextNode('It is before.');
        doms.et3 = et3;
        util.appendChild(et2, et3);

        var et4 = null;
        doms.et4 = et4;
        roots[1] = et4;

        var et4_line = util.createElement('span');
        util.setAttribute(et4_line, 'style', 'display:none');
        roots[2] = et4_line;
        doms.et4_line = et4_line;

        var et7 = util.createElement('div');
        doms.et7 = et7;
        roots[3] = et7;

        var et8 = util.createTextNode('It is after.');
        doms.et8 = et8;
        util.appendChild(et7, et8);
      },
      update: function(it){
        var doms = this.doms;
        var roots = this.roots;
        var last = this.last;

        var et4 = doms.et4;
        if(it.isTrue){
          if(last.et4_index !== 0){
            last.et4_index = 0;
            if(!et4){
              doms.et4 = et4 = new Template_ET_4();
            }
            util.before(doms.et4_line, et4.get());
            roots[1] = et4;
          }else{
            et4.update(it);
          }
        }else{
          if(last.et4_index !== 1){
            last.et4_index = 1;
            if(et4){
              et4.remove();
            }
            roots[1] = null;
          }
        }
        return this;
      }
    });
    util.extend(Template_ET_4.prototype, _prototype, {
      createElements: function(){
        var roots = this.roots;
        var doms = this.doms;

        var et5 = util.createElement('div');
        doms.et5 = et5;
        roots[0] = et5;

        var et6 = util.createTextNode('It is true.');
        doms.et6 = et6;
        util.appendChild(et5, et6);

      }
    });
    return Template_ET_0;
  }


  if ( typeof module === "object" && typeof module.exports === "object" ) {
    var _et = require('_et');
    module.exports = factory(_et.util, _et._prototype);
  } else {
    var _et = root._et;
    root.Template_ET_0 = factory(_et.util, _et._prototype);
  }

})(window);


// cmd
;define(function(require, exports, module) {
  function factory(util, _prototype) {
    function Template_ET_0(options){
      this.init(options);
    }
    function Template_ET_4(options) {
      this.init(options);
    }
    util.extend(Template_ET_0.prototype, _prototype, {
      createElements: function(){
        var roots = this.roots;
        var doms = this.doms;

        var et2 = util.createElement('div');
        doms.et2 = et2;
        roots[0] = et2;

        var et3 = util.createTextNode('It is before.');
        doms.et3 = et3;
        util.appendChild(et2, et3);

        var et4 = null;
        doms.et4 = et4;
        roots[1] = et4;

        var et4_line = util.createElement('span');
        util.setAttribute(et4_line, 'style', 'display:none');
        roots[2] = et4_line;
        doms.et4_line = et4_line;

        var et7 = util.createElement('div');
        doms.et7 = et7;
        roots[3] = et7;

        var et8 = util.createTextNode('It is after.');
        doms.et8 = et8;
        util.appendChild(et7, et8);
      },
      update: function(it){
        var doms = this.doms;
        var roots = this.roots;
        var last = this.last;

        var et4 = doms.et4;
        if(it.isTrue){
          if(last.et4_index !== 0){
            last.et4_index = 0;
            if(!et4){
              doms.et4 = et4 = new Template_ET_4();
            }
            util.before(doms.et4_line, et4.get());
            roots[1] = et4;
          }else{
            et4.update(it);
          }
        }else{
          if(last.et4_index !== 1){
            last.et4_index = 1;
            if(et4){
              et4.remove();
            }
            roots[1] = null;
          }
        }
        return this;
      }
    });
    util.extend(Template_ET_4.prototype, _prototype, {
      createElements: function(){
        var roots = this.roots;
        var doms = this.doms;

        var et5 = util.createElement('div');
        doms.et5 = et5;
        roots[0] = et5;

        var et6 = util.createTextNode('It is true.');
        doms.et6 = et6;
        util.appendChild(et5, et6);

      }
    });
    return Template_ET_0;
  }

  var _et = require('_et');
  module.exports = factory(_et.util, _et.);
})

// global
;(function(global, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    var _require = function(key) {
      return global[key];
    };
    var _exports = {};
    var _module = {
      exports: _exports
    };
    factory(_require, _exports, _module);
    global.Template_ET_0 = module.exports;
  }
})(window, function factory(require, exports, module) {
  var _et = require('_et');
  var util = _et.util;
  var _prototype = _et.prototype;

  function Template_ET_0(options){
    this.init(options);
  }
  function Template_ET_4(options) {
    this.init(options);
  }
  util.extend(Template_ET_0.prototype, _prototype, {
    createElements: function(){
      var roots = this.roots;
      var doms = this.doms;

      var et2 = util.createElement('div');
      doms.et2 = et2;
      roots[0] = et2;

      var et3 = util.createTextNode('It is before.');
      doms.et3 = et3;
      util.appendChild(et2, et3);

      var et4 = null;
      doms.et4 = et4;
      roots[1] = et4;

      var et4_line = util.createElement('span');
      util.setAttribute(et4_line, 'style', 'display:none');
      roots[2] = et4_line;
      doms.et4_line = et4_line;

      var et7 = util.createElement('div');
      doms.et7 = et7;
      roots[3] = et7;

      var et8 = util.createTextNode('It is after.');
      doms.et8 = et8;
      util.appendChild(et7, et8);
    },
    update: function(it){
      var doms = this.doms;
      var roots = this.roots;
      var last = this.last;

      var et4 = doms.et4;
      if(it.isTrue){
        if(last.et4_index !== 0){
          last.et4_index = 0;
          if(!et4){
            doms.et4 = et4 = new Template_ET_4();
          }
          util.before(doms.et4_line, et4.get());
          roots[1] = et4;
        }else{
          et4.update(it);
        }
      }else{
        if(last.et4_index !== 1){
          last.et4_index = 1;
          if(et4){
            et4.remove();
          }
          roots[1] = null;
        }
      }
      return this;
    }
  });
  util.extend(Template_ET_4.prototype, _prototype, {
    createElements: function(){
      var roots = this.roots;
      var doms = this.doms;

      var et5 = util.createElement('div');
      doms.et5 = et5;
      roots[0] = et5;

      var et6 = util.createTextNode('It is true.');
      doms.et6 = et6;
      util.appendChild(et5, et6);

    }
  });
  module.exports = Template_ET_0;
});

// commonJS
var _et = require('_et');
var util = _et.util;
var _prototype = _et.prototype;

function Template_ET_0(options){
  this.init(options);
}
function Template_ET_4(options) {
  this.init(options);
}
util.extend(Template_ET_0.prototype, _prototype, {
  createElements: function(){
    var roots = this.roots;
    var doms = this.doms;

    var et2 = util.createElement('div');
    doms.et2 = et2;
    roots[0] = et2;

    var et3 = util.createTextNode('It is before.');
    doms.et3 = et3;
    util.appendChild(et2, et3);

    var et4 = null;
    doms.et4 = et4;
    roots[1] = et4;

    var et4_line = util.createElement('span');
    util.setAttribute(et4_line, 'style', 'display:none');
    roots[2] = et4_line;
    doms.et4_line = et4_line;

    var et7 = util.createElement('div');
    doms.et7 = et7;
    roots[3] = et7;

    var et8 = util.createTextNode('It is after.');
    doms.et8 = et8;
    util.appendChild(et7, et8);
  },
  update: function(it){
    var doms = this.doms;
    var roots = this.roots;
    var last = this.last;

    var et4 = doms.et4;
    if(it.isTrue){
      if(last.et4_index !== 0){
        last.et4_index = 0;
        if(!et4){
          doms.et4 = et4 = new Template_ET_4();
        }
        util.before(doms.et4_line, et4.get());
        roots[1] = et4;
      }else{
        et4.update(it);
      }
    }else{
      if(last.et4_index !== 1){
        last.et4_index = 1;
        if(et4){
          et4.remove();
        }
        roots[1] = null;
      }
    }
    return this;
  }
});
util.extend(Template_ET_4.prototype, _prototype, {
  createElements: function(){
    var roots = this.roots;
    var doms = this.doms;

    var et5 = util.createElement('div');
    doms.et5 = et5;
    roots[0] = et5;

    var et6 = util.createTextNode('It is true.');
    doms.et6 = et6;
    util.appendChild(et5, et6);

  }
});
module.exports = Template_ET_0;
