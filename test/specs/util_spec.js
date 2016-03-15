'use strict'

require('mocha')
require('should')

const rootDir = process.cwd()
const util = require(`${rootDir}/es5/util`)
const describe = global.describe
const it = global.it

describe('util.removeAt', function () {
  it('remove at 0', function () {
    let list1 = ['a', 'b', 'c', 'd']
    let list2 = ['b', 'c', 'd']
    util.removeAt(list1, 'a')

    list1.should.eql(list2)
  })

  it('remove at 1', function () {
    let list1 = ['a', 'b', 'c', 'd']
    let list2 = ['a', 'c', 'd']
    util.removeAt(list1, 'b')

    list1.should.eql(list2)
  })

  it('remove at 3', function () {
    let list1 = ['a', 'b', 'c', 'd']
    let list2 = ['a', 'b', 'c']
    util.removeAt(list1, 'd')

    list1.should.eql(list2)
  })
})

describe('util.insertBefore', function () {
  it('insertBefore at 0', function () {
    let list1 = ['a', 'b', 'c', 'd']
    let list2 = ['1', 'a', 'b', 'c', 'd']
    util.insertBefore(list1, 'a', '1')

    list1.should.eql(list2)
  })

  it('insertBefore at 1', function () {
    let list1 = ['a', 'b', 'c', 'd']
    let list2 = ['a', '1', 'b', 'c', 'd']
    util.insertBefore(list1, 'b', '1')

    list1.should.eql(list2)
  })

  it('insertBefore at last', function () {
    let list1 = ['a', 'b', 'c', 'd']
    let list2 = ['a', 'b', 'c', '1', 'd']
    util.insertBefore(list1, 'd', '1')

    list1.should.eql(list2)
  })

  it('null', function () {
    let list1 = ['a', 'b', 'c', 'd']
    let list2 = ['a', 'b', 'c', 'd']
    util.insertBefore(list1, 'e', '1')

    list1.should.eql(list2)
  })
})

describe('util.insertAfter', function () {
  it('insertAfter at 0', function () {
    let list1 = ['a', 'b', 'c', 'd']
    let list2 = ['a', '1', 'b', 'c', 'd']
    util.insertAfter(list1, 'a', '1')

    list1.should.eql(list2)
  })

  it('insertAfter at 1', function () {
    let list1 = ['a', 'b', 'c', 'd']
    let list2 = ['a', 'b', '1', 'c', 'd']
    util.insertAfter(list1, 'b', '1')

    list1.should.eql(list2)
  })

  it('insertAfter at last', function () {
    let list1 = ['a', 'b', 'c', 'd']
    let list2 = ['a', 'b', 'c', 'd', '1']
    util.insertAfter(list1, 'd', '1')

    list1.should.eql(list2)
  })

  it('null', function () {
    let list1 = ['a', 'b', 'c', 'd']
    let list2 = ['a', 'b', 'c', 'd']
    util.insertAfter(list1, 'e', '1')

    list1.should.eql(list2)
  })
})
