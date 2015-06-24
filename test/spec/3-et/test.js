'use strict';

var compiler = require('src/compiler');
var babel = require('babel');

var settings = [
  {
    title: 'attributes',
    source: require('design/attributes/source.html'),
    expect: require('design/attributes/expect')
  },
  {
    title: 'attrs-with-expression',
    source: require('design/attributes-with-expression/source.html'),
    expect: require('design/attributes-with-expression/expect')
  },
  {
    title: 'for',
    source: require('design/for/source.html'),
    expect: require('design/for/expect')
  },
  {
    title: 'if-with-siblings',
    source: require('design/if-with-siblings/source.html'),
    expect: require('design/if-with-siblings/expect')
  },
  {
    title: 'text',
    source: require('design/text/source.html'),
    expect: require('design/text/expect')
  },
  {
    title: 'if-else',
    source: require('design/if-else/source.html'),
    expect: require('design/if-else/expect')
  }
];

exports.register = function(){

  describe('Compiler test', function(){
    settings.forEach(function(setting){
      it(setting.title, function(){
        var left = setting.source;
        var right = setting.expect;

        // console.log(left);
        left = babel.transform(left).code;
        left = left.trim().replace(/\n{2}/g, '\n');
        right = babel.transform(right).code;
        right = right.trim().replace(/\n{2}/g, '\n');
        console.log(left);

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
      });
    });
  });

};
