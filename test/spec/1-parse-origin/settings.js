module.exports = [
  {
    title: '<div>123456',
    html: '<div id="test" data-type=xxxx class="{{it.class}}" diabled\r\n></div>123456',
    expect: {
      children: [{
        source: '<div id="test" data-type=xxxx class="{{it.class}}" diabled >'
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
      }, {
        source: '123456'
      }, {
        source: '<div>'
      }]
    }
  },
  {
    title: 'ET if node.',
    html: '[#if it.isTrue]It is true.[#elseif it.num > 10]It is elseTrue.[#else]It is else.[/#if]',
    expect: {
      source: '',
      children: [{
        source: '[#if it.isTrue]',
        children: [{
          source: 'It is true.'
        }, {
          source: '[#elseif it.num > 10]'
        }, {
          source: 'It is elseTrue.'
        }, {
          source: '[#else]'
        }, {
          source: 'It is else.'
        }]
      }]
    }
  },
  {
    title: 'attribute if',
    html: '<div id="{{it.id}}" [#if it.isTrue]class="test"[/#if] disabled ></div>123456',
    expect: {
      source: '',
      children: [{
        source: '<div id="{{it.id}}" disabled >',
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
        source: '<div id="{{it.id}}"',
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
  },
  {
    title: 'space',
    html: `
    aaaaa

    bbbbb
    `,
    expect: {
      children: [{
        source: `aaaaa bbbbb`
      }]
    }
  },
  {
    title: 'test2',
    html: `
    [{{__markdown.helper.A}}]
    `,
    expect: {
      children: [{
        source: `[{{__markdown.helper.A}}]`
      }]
    }
  },
  {
    title: 'test3',
    html: `
    [#for item,index in it.matrix[data[1]] ]
      It is {{index}}.
    [/#for]
    `,
    expect: {
      children: [{
        source: '[#for item,index in it.matrix[data[1]] ]',
        children: [{
          source: 'It is {{index}}.'
        }]
      }]
    }
  }
]
