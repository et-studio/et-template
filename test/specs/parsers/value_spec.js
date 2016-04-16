'use strict'

require('should')
require('mocha')

const rootDir = process.cwd()
const parseValue = require(`${rootDir}/es5/parsers/value`).parseValue

const describe = global.describe
const it = global.it

describe('parsers/value', function () {
  it('resident value', function () {
    parseValue('aaa').should.eql({
      isDynamic: false,
      hasPipe: false,
      values: ['aaa']
    })
  })

  it('dynamic value', function () {
    parseValue('aaa{{it.value}}').should.eql({
      isDynamic: true,
      hasPipe: false,
      values: [
        'aaa',
        {expression: 'it.value', pipes: []}
      ]
    })
  })

  it('pipe value', function () {
    parseValue('aaa{{it.time | formatTime}}').values.should.eql([
      'aaa',
      {expression: 'it.time', pipes: [['formatTime']]}
    ])
  })

  it('expression with more args', function () {
    parseValue('aaa{{util.add(it.a, it.b)}}bbb').values.should.eql([
      'aaa',
      {expression: 'util.add(it.a, it.b)', pipes: []},
      'bbb'
    ])
  })

  it('direct value', function () {
    parseValue('aaa{{"123"}}bbb').values.should.eql([
      'aaa',
      {expression: '"123"', pipes: []},
      'bbb'
    ])
  })

  it('empty insert', function () {
    parseValue('aaa{{}}bbb').values.should.eql([
      'aaa{{}}bbb'
    ])
  })

  it('not close', function () {
    parseValue('aaa{{it.value').values.should.eql([
      'aaa{{it.value'
    ])
  })

  it('double left', function () {
    parseValue("a'a{{it.v1{{it.v2}}").values.should.eql([
      "a'a{{it.v1",
      {expression: 'it.v2', pipes: []}
    ])
  })

  it('normal value with switch', function () {
    parseValue('aaa{{it.isEven ? 0 : 1}}bbb').values.should.eql([
      'aaa',
      {expression: 'it.isEven ? 0 : 1', pipes: []},
      'bbb'
    ])
  })

  it('normal value with function', function () {
    parseValue('aaa{{(function(it){return it.name + it.address})(it)}}bbb').values.should.eql([
      'aaa',
      {expression: '(function(it){return it.name + it.address})(it)', pipes: []},
      'bbb'
    ])
  })

  it('more value', function () {
    parseValue('111{{it.value1}}222{{it.value2}}333').values.should.eql([
      '111',
      {expression: 'it.value1', pipes: []},
      '222',
      {expression: 'it.value2', pipes: []},
      '333'
    ])
  })
})

describe('parsers/value:pipe', function () {
  it('pipe with shout line string', function () {
    parseValue('{{it.getInput() | split, "|"}}').values[0].should.eql({
      expression: 'it.getInput()',
      pipes: [
        ['split', '"|"']
      ]
    })
  })

  it('more pipes', function () {
    parseValue('{{it.now | moment | formatTime, "YYYY:DD:MM"}}').values[0].should.eql({
      expression: 'it.now',
      pipes: [
        ['moment'],
        ['formatTime', '"YYYY:DD:MM"']
      ]
    })
  })
})
