'use strict';

var compiler = require('src/compiler');
var babel = require('babel');
var settings = require('./settings.js');

exports.register = function(){

  describe('Compiler test', function(){
    settings.forEach(function(setting){
      it(setting.title, function(){
        var left = compiler.compile(setting.dom, setting.options);
        var right = setting.expect;

        // console.log(left);
        left = babel.transform(left).code;
        left = left.trim().replace(/\n{2}/g, '\n');
        right = babel.transform(right).code;
        right = right.trim().replace(/\n{2}/g, '\n');
        console.log(left);
        console.log(right);
        assert.equal(left, right);
      });
    });
  });
};
