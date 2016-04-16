'use strict'

require('should')
require('mocha')

const rootDir = process.cwd()
const parseAttributes = require(`${rootDir}/es5/parsers/attributes`).parseAttributes
const describe = global.describe
const it = global.it

describe('parsers/attributes', function () {
  it('normal parse', function () {
    let result = new Map()
    result.set('id', 'element')
    result.set('class', 'title')

    parseAttributes('id=element class="title"').should.eql(result)
  })

  it('normal parse single quotation', function () {
    let result = new Map()
    result.set('id', 'element')
    result.set('class', 'title')

    parseAttributes("id=element class='title'").should.eql(result)
  })

  it('with erratic value', function () {
    let result = new Map()
    result.set('class', '{{it.class}}')

    parseAttributes('class="{{it.class}}"').should.eql(result)
  })

  it('start with =', function () {
    let result = new Map()
    result.set('="test"', '')

    parseAttributes('="test"').should.eql(result)
  })

  it('space arround =', function () {
    let result = new Map()
    result.set('id', 'test')

    parseAttributes('id = "test"').should.eql(result)
  })

  it('space arround = ', function () {
    let result = new Map()
    result.set('id', '123')
    result.set('"test"', '')

    parseAttributes('id = 123 "test"').should.eql(result)
  })

  it('erratic value', function () {
    let result = new Map()
    result.set('id', '{{it.id + it.name}}')

    parseAttributes('id={{it.id + it.name}}').should.eql(result)
  })

  it('erratic value in double quotation', function () {
    let result = new Map()
    result.set('id', '{{it.id + it.name}}')

    parseAttributes('id="{{it.id + it.name}}"').should.eql(result)
  })
})
