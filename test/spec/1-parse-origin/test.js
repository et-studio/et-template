'use strict';

var _ = require('underscore');
var settings = require('./settings.js');
var Parser = require('src/parser');

exports.register = function(){
  describe('Compiler test', function(){
    settings.forEach(function(setting){
      it(setting.title, function(){
        var parser = new Parser(setting.options);
        var node = parser.tranlateToOriginNode(setting.html);
        var expect = setting.expect;

        console.log(node);
        function testAll(left, right) {
          if(_.isArray(right)) {
            testArray(left, right);
          } else if (_.isObject(right)) {
            testObject(left, right)
          } else {
            assert.equal(left, right);
          }
        }
        function testArray(left, right) {
          assert.equal(left.length, right.length);
          right.forEach(function(item, i){
            testAll(left[i], item);
          });
        }
        function testObject(left, right) {
          for (var key in right) {
            testAll(left[key], right[key]);
          }
        }
        testAll(node, expect);
      });
    });
  });
};
