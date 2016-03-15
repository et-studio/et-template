'use strict'

require('mocha')

const rootDir = process.cwd()
const parseOrigin = require(`${rootDir}/es5/parsers/origin`).parseOrigin
const describe = global.describe
const it = global.it
const should = require('should')
const _ = require('lodash')

describe('parsers/origin', function () {
  it('test root', function () {
    parseOrigin('').should.eql({
      nodeType: 'ET',
      nodeName: '',
      source: '',
      header: '',
      html: '',
      tail: '',

      parent: null,
      previous: null,
      next: null,
      expressions: [],
      children: []
    })
  })

  it('normal div', function () {
    let root = parseOrigin('<div id="normal"></div>')
    let div = root.children[0]

    div.should.eql({
      nodeType: 1,
      nodeName: 'div',
      source: 'id="normal"',
      header: '<div id="normal">',
      tail: '</div>',
      html: '',

      parent: root,
      previous: null,
      next: null,
      expressions: [],
      children: []
    })
  })

  it('close node', function () {
    let root = parseOrigin('<img src="avatar.png">')
    let img = root.children[0]
    img.should.eql({
      nodeType: 1,
      nodeName: 'img',
      source: 'src="avatar.png"',
      header: '<img src="avatar.png">',
      tail: '',
      html: '',

      parent: root,
      previous: null,
      next: null,
      expressions: [],
      children: []
    })
  })

  it('normal text', function () {
    let root = parseOrigin('This is a text\n!\n')
    let text = root.children[0]
    text.should.eql({
      nodeType: 3,
      nodeName: '',
      source: 'This is a text\n!',
      header: '',
      html: '',
      tail: '',

      parent: root,
      previous: null,
      next: null,
      expressions: [],
      children: []
    })
  })

  it('normal div and text', function () {
    let root = parseOrigin('<div id="normal"></div>This is a text!')
    let div = root.children[0]
    let text = root.children[1]

    div.should.eql({
      nodeType: 1,
      nodeName: 'div',
      source: 'id="normal"',
      header: '<div id="normal">',
      html: '',
      tail: '</div>',

      parent: root,
      previous: null,
      next: text,
      expressions: [],
      children: []
    })

    text.should.eql({
      nodeType: 3,
      nodeName: '',
      source: 'This is a text!',
      header: '',
      html: '',
      tail: '',

      parent: root,
      previous: div,
      next: null,
      expressions: [],
      children: []
    })
  })

  it('complex attributes', function () {
    let root = parseOrigin('<div id="complex" data-type=xxxx class="{{it.class}}" diabled\r\n></div>')
    let div = root.children[0]
    div.should.eql({
      nodeType: 1,
      nodeName: 'div',
      source: 'id="complex" data-type=xxxx class="{{it.class}}" diabled',
      header: '<div id="complex" data-type=xxxx class="{{it.class}}" diabled\r\n>',
      html: '',
      tail: '</div>',

      parent: root,
      previous: null,
      next: null,
      expressions: [],
      children: []
    })
  })

  it('node with expressions', function () {
    let root = parseOrigin('<div id="complex" [#if it.isActive]class="on-active"[/#if]></div>')
    let div = root.children[0]
    let ifItem = div.expressions[0]

    // 比较属性
    let props = ['nodeType', 'nodeName', 'source', 'header', 'html', 'tail']
    _.pick(div, props).should.eql({
      nodeType: 1,
      nodeName: 'div',
      source: 'id="complex"',
      header: '<div id="complex" >',
      html: '',
      tail: '</div>'
    })

    _.pick(ifItem, props).should.eql({
      nodeType: 'ET',
      nodeName: '#if',
      source: 'it.isActive',
      header: '[#if it.isActive]',
      html: 'class="on-active"',
      tail: '[/#if]'
    })
  })

  it('if else-if else', function () {
    let root = parseOrigin('[#if one]1[#elseif two]2[#else]3[/#if]')
    let ifNode = root.children[0]
    let text1 = ifNode.children[0]
    let elseIfNode = ifNode.children[1]
    let text2 = ifNode.children[2]
    let elseNode = ifNode.children[3]
    let text3 = ifNode.children[4]

    // 比较结构
    should.equal(text1.parent, ifNode)
    should.equal(text1.previous, null)
    should.equal(text1.next, elseIfNode)

    should.equal(elseIfNode.parent, ifNode)
    should.equal(elseIfNode.previous, text1)
    should.equal(elseIfNode.next, text2)

    should.equal(text2.parent, ifNode)
    should.equal(text2.previous, elseIfNode)
    should.equal(text2.next, elseNode)

    should.equal(elseNode.parent, ifNode)
    should.equal(elseNode.previous, text2)
    should.equal(elseNode.next, text3)

    should.equal(text3.parent, ifNode)
    should.equal(text3.previous, elseNode)
    should.equal(text3.next, null)

    // 比较属性
    let props = ['nodeType', 'nodeName', 'source', 'header', 'html', 'tail']
    _.pick(ifNode, props).should.eql({
      nodeType: 'ET',
      nodeName: '#if',
      source: 'one',
      header: '[#if one]',
      html: '1[#elseif two]2[#else]3',
      tail: '[/#if]'
    })

    _.pick(elseIfNode, props).should.eql({
      nodeType: 'ET',
      nodeName: '#elseif',
      source: 'two',
      header: '[#elseif two]',
      html: '',
      tail: ''
    })

    _.pick(elseNode, props).should.eql({
      nodeType: 'ET',
      nodeName: '#else',
      source: '',
      header: '[#else]',
      html: '',
      tail: ''
    })

    _.pick(text1, props).should.eql({
      nodeType: 3,
      nodeName: '',
      source: '1',
      header: '',
      html: '',
      tail: ''
    })

    _.pick(text2, props).should.eql({
      nodeType: 3,
      nodeName: '',
      source: '2',
      header: '',
      html: '',
      tail: ''
    })

    _.pick(text3, props).should.eql({
      nodeType: 3,
      nodeName: '',
      source: '3',
      header: '',
      html: '',
      tail: ''
    })
  })

  it('with break', function () {
    let root = parseOrigin(`
      <div>
        <a>111</a>
        <b>222</b>
      </div>
    `)
    let div = root.children[0]
    let a = div.children[0]
    let b = div.children[1]
    // 比较结构
    should.equal(a.parent, div)
    should.equal(a.previous, null)
    should.equal(a.next, b)

    should.equal(b.parent, div)
    should.equal(b.previous, a)
    should.equal(b.next, null)

    // 比较属性
    let props = ['nodeType', 'nodeName', 'source', 'header', 'html', 'tail']
    _.pick(div, props).should.eql({
      nodeType: 1,
      nodeName: 'div',
      source: '',
      header: '<div>',
      html: '<a>111</a><b>222</b>',
      tail: '</div>'
    })

    _.pick(a, props).should.eql({
      nodeType: 1,
      nodeName: 'a',
      source: '',
      header: '<a>',
      html: '111',
      tail: '</a>'
    })

    _.pick(b, props).should.eql({
      nodeType: 1,
      nodeName: 'b',
      source: '',
      header: '<b>',
      html: '222',
      tail: '</b>'
    })
  })

  it('custom node', function () {
    let root = parseOrigin('<my-node></my-node><my_node></my_node>')
    let one = root.children[0]
    let two = root.children[1]

    // 比较属性
    let props = ['nodeType', 'nodeName', 'source', 'header', 'html', 'tail']
    _.pick(one, props).should.eql({
      nodeType: 1,
      nodeName: 'my-node',
      source: '',
      header: '<my-node>',
      html: '',
      tail: '</my-node>'
    })

    _.pick(two, props).should.eql({
      nodeType: 1,
      nodeName: 'my_node',
      source: '',
      header: '<my_node>',
      html: '',
      tail: '</my_node>'
    })
  })
})
