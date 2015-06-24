module.exports = [
  {
    title: '<div>123456',
    html: '<div id="test" data-type=xxxx class="{{it.class}}"></div>123456',
    expect: {
      children: [{
        nodeType: 1,
        nodeName: 'DIV',
        attributes: {
          'id': 'test',
          'data-type': 'xxxx',
          'class': '{{it.class}}'
        }
      }, {
        nodeType: 3,
        textContent: '123456',
      }]
    }
  },
  {
    title: '<img>123456<div>',
    html: '<img>123456<div></div>',
    expect: {
      children: [{
        nodeType: 1,
        nodeName: 'IMG'
      },{
        nodeType: 3,
        textContent: '123456',
      }, {
        nodeType: 1,
        nodeName: 'DIV'
      }]
    }
  },
  {
    title: 'attribute if',
    html: '<div id="{{it.id}}" [#if it.isTrue]class="test"[/#if]></div>123456',
    expect: {
      children: [{
        nodeType: 1,
        nodeName: 'DIV',
        attributes: {
          id: '{{it.id}}'
        },
        expressions: [{
          condition: 'it.isTrue',
          attributes: {
            'class': 'test'
          }
        }]
      }, {
        nodeType: 3,
        textContent: '123456'
      }]
    }
  },
  {
    title: 'ET if node.',
    html: '[#if it.isTrue]It is true.[#elseif it.elseTrue]It is elseTrue.[#else]It is else.[/#if]',
    expect: {
      children: [{
        nodeName: '#if',
        condition: 'it.isTrue',
        children: [{
          nodeType: 3,
          textContent: 'It is true.'
        }]
      }, {
        nodeName: '#elseif',
        condition: 'it.elseTrue',
        children: [{
          nodeType: 3,
          textContent: 'It is elseTrue.'
        }]
      }, {
        nodeName: '#else',
        children: [{
          nodeType: 3,
          textContent: 'It is else.'
        }]
      }]
    }
  },
  {
    title: 'ET for node.',
    html: '[#for item, index in it.list]It is for loop {{index}}[/#for]',
    expect: {
      children: [{
        nodeType: 'ET',
        nodeName: '#for',
        itemName: 'item',
        indexName: 'index',
        expression: 'it.list',
        children: [{
          nodeType: 3,
          textContent: 'It is for loop {{index}}'
        }]
      }]
    }
  },
  {
    title: 'error test',
    html: '<div id="{{it.id}}" [#if it.isTrue]class="test" </div>123456',
    expect: {}
  },
  {
    title: 'test1',
    html: `<div id="aaa{{it.id}}bbb{{it.getSrc()}}" data-type="{{(function(){return it.a + it.b;})()}}" [#if it.isTrue]class="class-true"[/#if]></div>`,
    expect: {
      children: [{
        nodeType: 1,
        nodeName: 'DIV',
        attributes: {
          'id': 'aaa{{it.id}}bbb{{it.getSrc()}}',
          'data-type': '{{(function(){return it.a + it.b;})()}}'
        },
        expressions: [{
          condition: 'it.isTrue',
          attributes: {
            'class': 'class-true'
          }
        }]
      }]
    }
  }
];
