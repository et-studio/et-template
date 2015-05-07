'use strict';
define(function (require, exports, module) {
  var Dom = require('dom');
  exports.register = function(){

    describe('One trim', function(){
      var str = '<a>123</a>\n';
      var dom = new Dom(str);
      it('source.origin', function(){
        assert.equal(str, dom.source.origin);
      });
    })

    describe('One text', function(){
      var str = 'test';
      var dom = new Dom(str);
      it('source.origin', function(){
        assert.equal(str, dom.source.origin);
      });
      it('source.text', function(){
        assert.equal(str, dom.source.text);
      });
      it('type', function(){
        assert.equal('text', dom.type);
      });
      it('depth', function(){
        assert.equal(1, dom.depth);
      });
      it('children.length', function(){
        assert.equal(0, dom.children.length);
      });
    })

    describe('One dom with text', function(){
      var str = '<a>123</a>';
      var dom = new Dom(str);
      var childDom = dom.children[0];

      it('source.origin', function(){
        assert.equal(str, dom.source.origin);
      });
      it('source.tag', function(){
        assert.equal('a', dom.source.tag);
      });
      it('source.beginTag', function(){
        assert.equal('<a>', dom.source.beginTag);
      });
      it('source.children', function(){
        assert.equal('123', dom.source.children);
      });
      it('source.endTag', function(){
        assert.equal('</a>', dom.source.endTag);
      });
      it('source.text', function(){
        assert.equal('', dom.source.text);
      });
      it('type', function(){
        assert.equal('html', dom.type);
      });
      it('depth', function(){
        assert.equal(1, dom.depth);
      });
      it('children.length', function(){
        assert.equal(1, dom.children.length);
      });
      it('children.depth', function(){
        assert.equal(2, childDom.depth);
      });
    })

    describe('One dom with text and dom', function(){
      var str = '<a>123<span>456</span>789</a>';
      var dom = new Dom(str);

      it('source.origin', function(){
        assert.equal(str, dom.source.origin);
      });
      it('source.tag', function(){
        assert.equal('a', dom.source.tag);
      });
      it('source.beginTag', function(){
        assert.equal('<a>', dom.source.beginTag);
      });
      it('source.children', function(){
        assert.equal('123<span>456</span>789', dom.source.children);
      });
      it('source.endTag', function(){
        assert.equal('</a>', dom.source.endTag);
      });
      it('source.text', function(){
        assert.equal('', dom.source.text);
      });
      it('type', function(){
        assert.equal('html', dom.type);
      });
      it('depth', function(){
        assert.equal(1, dom.depth);
      });
      it('children.length', function(){
        assert.equal(3, dom.children.length);
      });

      it('children.depth', function(){
        assert.equal(2, dom.children[0].depth);
      });
      it('children[0].source.origin', function(){
        assert.equal('123', dom.children[0].source.origin);
      });
      it('children[1].source.origin', function(){
        assert.equal('<span>456</span>', dom.children[1].source.origin);
      });
      it('children[2].source.origin', function(){
        assert.equal('789', dom.children[2].source.origin);
      });
    })

    describe('More dom in root', function(){
      var str = '<a>123</a><a>456</a><a>789</a>';
      var dom = new Dom(str);

      it('source.origin', function(){
        assert.equal(str, dom.source.origin);
      });
      it('type', function(){
        assert.equal('root', dom.type);
      });
      it('depth', function(){
        assert.equal(0, dom.depth);
      });
      it('children.length', function(){
        assert.equal(3, dom.children.length);
      });

      it('children.depth', function(){
        assert.equal(1, dom.children[0].depth);
      });
      it('children[0].source.origin', function(){
        assert.equal('<a>123</a>', dom.children[0].source.origin);
      });
      it('children[1].source.origin', function(){
        assert.equal('<a>456</a>', dom.children[1].source.origin);
      });
      it('children[2].source.origin', function(){
        assert.equal('<a>789</a>', dom.children[2].source.origin);
      });
    })

    describe('Dom with ET dom', function(){
      var str = '<a [#if]345[/#if]>123</a>';
      var dom = new Dom(str);

      it('source.origin', function(){
        assert.equal(str, dom.source.origin);
      });
      it('source.tag', function(){
        assert.equal('a', dom.source.tag);
      });
      it('source.beginTag', function(){
        assert.equal('<a [#if]345[/#if]>', dom.source.beginTag);
      });
      it('source.children', function(){
        assert.equal('123', dom.source.children);
      });
      it('source.endTag', function(){
        assert.equal('</a>', dom.source.endTag);
      });
    })

    describe('ET dom', function(){
      var str = '[#if]123[/#if]';
      var dom = new Dom(str);

      it('source.origin', function(){
        assert.equal(str, dom.source.origin);
      });
      it('source.tag', function(){
        assert.equal('#if', dom.source.tag);
      });
      it('source.beginTag', function(){
        assert.equal('[#if]', dom.source.beginTag);
      });
      it('source.children', function(){
        assert.equal('123', dom.source.children);
      });
      it('source.endTag', function(){
        assert.equal('[/#if]', dom.source.endTag);
      });
      it('depth', function(){
        assert.equal(0, dom.depth);
      });
    })

    describe('More labels dom', function(){
      var str = '\
        [#if it.type == "123"]\
          123\
        [/#if]\
        [/#elseif xxxxxxx]\
          elseif\
        [/#elseif]\
        [#else]\
          else\
        [/#else]\
      ';
      var dom = new Dom(str);

      it('source.origin', function(){
        assert.equal(str, dom.source.origin);
      });
      it('source.children', function(){
        assert.equal(str, dom.source.children);
      });
      it('children.length', function(){
        assert.equal(3, dom.children.length);
      });
    })
  };
});
