'use strict'

require('should')
require('mocha')

const rootDir = process.cwd()
const parseFor = require(`${rootDir}/es5/parsers/for`).parseFor
const describe = global.describe
const it = global.it

describe('parsers/for', function () {
  it('normal parse', function () {
    parseFor('item, index in it.list').should.eql({
      item: 'item',
      index: 'index',
      expression: 'it.list',
      trackBy: ''
    })
  })

  it('without indexName', function () {
    parseFor('item in it.list').should.eql({
      item: 'item',
      index: '_index',
      expression: 'it.list',
      trackBy: ''
    })
  })

  it('with trackBy', function () {
    parseFor('item in it.list track by item.id').should.eql({
      item: 'item',
      index: '_index',
      expression: 'it.list',
      trackBy: 'item.id'
    })
  })

  it('space between item and index', function () {
    parseFor('item index in it.list').should.eql({
      item: 'item',
      index: 'index',
      expression: 'it.list',
      trackBy: ''
    })
  })

  it('set item to in', function () {
    parseFor(' in in it.list').should.eql({
      item: 'in',
      index: '_index',
      expression: 'it.list',
      trackBy: ''
    })
  })

  it('" track by " in expression', function () {
    parseFor('item index in it.getList(" track by ") track by item.id').should.eql({
      item: 'item',
      index: 'index',
      expression: 'it.getList(" track by ")',
      trackBy: 'item.id'
    })
  })

  it('error1', function () {
    (function () {
      parseFor(', item in it.list')
    }).should.throw('parse_for_error1')
  })

  it('error2', function () {
    (function () {
      parseFor('item index test in it.list')
    }).should.throw('parse_for_error2')
  })
})
