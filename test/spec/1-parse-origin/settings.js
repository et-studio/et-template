module.exports = [
  {
    title: '<div>123456',
    html: '<div id="test" data-type=xxxx class="{{it.class}}"></div>123456',
    expect: {
      children: [{
        source: '<div id="test" data-type=xxxx class="{{it.class}}">'
      }, {
        source: '123456'
      }]
    }
  },
  {
    title: '<img>123456<div>',
    html: '<img>123456<div></div>',
    expect: {
      children: [{
        source: '<img>'
      },{
        source: '123456'
      }, {
        source: '<div>'
      }]
    }
  },
  {
    title: 'ET if node.',
    html: '[#if it.isTrue]It is true.[#elseif it.elseTrue]It is elseTrue.[#else]It is else.[/#if]',
    expect: {
      source: '',
      children: [{
        source: '[#if it.isTrue]',
        children: [{
          source: "It is true."
        },{
          source: "[#elseif it.elseTrue]"
        },{
          source: "It is elseTrue."
        },{
          source: "[#else]"
        },{
          source: "It is else."
        }]
      }]
    }
  },
  {
    title: 'attribute if',
    html: '<div id="{{it.id}}" [#if it.isTrue]class="test"[/#if]></div>123456',
    expect: {
      source: '',
      children: [{
        source: '<div id="{{it.id}}" >',
        expressions: [{
          source: '[#if it.isTrue]',
          children: [{
            source: 'class="test"'
          }]
        }]
      }, {
        source: '123456'
      }]
    }
  },
  {
    title: 'error test',
    html: '<div id="{{it.id}}" [#if it.isTrue]class="test" </div>123456',
    expect: {
      children: [{
        source: '<div id="{{it.id}}" ',
        children: [{
          source: '[#if it.isTrue]'
        }, {
          source: 'class="test"'
        }]
      }, {
        source: '123456'
      }]
    }
  },
  {
    title: 'test1',
    html: `<div id="aaa{{it.id}}bbb{{it.getSrc()}}" data-type="{{(function(){return it.a + it.b;})()}}" [#if it.isTrue]class="class-true"[/#if]></div>`,
    expect: {
      children: [{
        source: `<div id="aaa{{it.id}}bbb{{it.getSrc()}}" data-type="{{(function(){return it.a + it.b;})()}}" >`,
        expressions: [{
          source: '[#if it.isTrue]',
          children: [{
            source: 'class="class-true"'
          }]
        }]
      }]
    }
  }
];
