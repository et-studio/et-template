'use strict'

var parser = require('../../../es5/parsers/for')
var it = global.it

module.exports = function () {
  var testString1 = '[#for item, index in it.list track by item.id]'
  it(testString1, function () {
    parser.parse(testString1).should.eql({
      nodeName: '#for',
      itemName: 'item',
      indexName: 'index',
      expression: 'it.list',
      trackBy: 'item.id'
    })
  })

  var testString2 = '[#for item, index in it.list]'
  it(testString2, function () {
    parser.parse(testString2).should.eql({
      nodeName: '#for',
      itemName: 'item',
      indexName: 'index',
      expression: 'it.list',
      trackBy: ''
    })
  })

  var testString3 = '[#for item in it.getList()]'
  it(testString3, function () {
    parser.parse(testString3).should.eql({
      nodeName: '#for',
      itemName: 'item',
      indexName: '',
      expression: 'it.getList()',
      trackBy: ''
    })
  })

  var testString4 = '[#for item]'
  it(testString4, function () {
    (function () {
      parser.parse(testString4)
    }).should.throw(' ===> ' + testString4)
  })

  var testString5 = '[xxxxx]'
  it(testString5, function () {
    (function () {
      parser.parse(testString5)
    }).should.throw(' ===> ' + testString5)
  })
}
