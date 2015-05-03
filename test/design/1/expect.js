'use strict';
var _ = require('underscore');
var dep = require('dep');

function Template_ET_0(options){
  this.init(options);
}

function Template_ET_3(options) {
  this.init(options);
}

_.extend(Template_ET_0.prototype, dep, {
  createElments: function(){
    var roots = this.roots;
    var doms = this.doms;

    var et_1 = $('<div>It is always in before.</div>');
    doms.et_1 = et_1;
    roots.push('et_1');

    var line_3 = $('<span>line</span>');
    doms.line_3 = line_3;
    roots.push('line_3');
    var et_3 =  null;
    doms.et_3 = et_3;
    roots.push('et_3');

    var et_6 = $('<div>It is always after.</div>');
    doms.et_6 = et_6;
    roots.push('et_6');
  },
  update: function(it){
    var doms = this.doms;
    var records = this.records;
    var et_3;

    if(it.isTrue) {
      et_3 = doms.et_3;
      if(records.et_3 !== 0) { // 这个数字是遍历的index
        var line_3 = doms.line_3;
        records.et_3 = 0;
        if(!et_3) {
          doms.et_3 = et_3 = new Template_ET_3(this.options);
        }

        et_3.update(it);
        line_3.before(et_3.get());
        et_3.activate();

        // 当发生root节点变化的时候$root失效
        this.clearRoot();
      }else{
        et_3.update(it);
      }
    }else{
      et_3 = doms.et_3;
      if(et_3 && records.et_3 !== 1){
        records.et_3 = 1;
        et_3.detach();
      }
    }

    this.last = {
      it: it
    };
    return this;
  },
  checkInsert: function(it){
    // 检测是否产生dom的插入，通常在update函数之前调用
    var re = false;
    var records = this.records;

    if(it.isTrue && records.et_3 !== 0){
      re = true;
    }

    return re;
  }
});

_.extend(Template_ET_3.prototype, dep, {
  createElments: function(){
    var roots = this.roots;
    var doms = this.doms;

    var et_4 = $('<div>It is true.</div>');
    doms.et_4 = et_4;
    roots.push('et_4');
  }
});

module.exports = Template_ET_0;
