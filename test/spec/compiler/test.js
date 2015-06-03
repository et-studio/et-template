'use strict';

var Compiler = require('src/compiler');
var babel = require('babel');
var settings = require('./settings.js');
var _et = require('_et');

exports.register = function(){

  describe('Compiler test', function(){
    settings.forEach(function(setting){
      it(setting.title, function(){
        var compiler = new Compiler(setting.options);
        var left = compiler.compile(setting.dom);
        var right = setting.expect;

        // console.log(left);
        left = babel.transform(left).code;
        left = left.trim().replace(/\n{2}/g, '\n');
        right = babel.transform(right).code;
        right = right.trim().replace(/\n{2}/g, '\n');
        console.log(left);
        // console.log(right);
        var leftList = left.split('\n');
        var rightList = right.split('\n');
        var len = Math.max(leftList.length, rightList.length);
        for (var i = 0; i < len; i++) {
          var leftStr = leftList[i] || '';
          var rightStr = rightList[i] || '';

          if (leftStr === rightStr) {
            console.log(`${i}:${leftStr}`);
            console.log(`${i}:${rightStr}`);
          } else {
            console.error(`${i}:${leftStr}`);
            console.error(`${i}:${rightStr}`);
          }
        }
        assert.equal(left, right);

        if (setting.options.modules === 'common') {
          var module = {};
          eval(left);
          var Template = module.exports;
          var t = new Template();
          $('#test').html(t.get());
          if (setting.updateOptions) {
            t.update(setting.updateOptions)
          }
        }
      });
    });
  });
};
