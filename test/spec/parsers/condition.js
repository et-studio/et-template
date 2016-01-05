'use strict'

var parser = require('../../../es5/parsers/condition')
var it = global.it

module.exports = function () {
  var testString1 = '[#if it.condition]'
  it(testString1, function () {
    parser.parse(testString1).should.eql({
      tag: 'if',
      nodeName: '#if',
      condition: 'it.condition'
    })
  })

  var testString2 = '[#elseif it.condition]'
  it(testString2, function () {
    parser.parse(testString2).should.eql({
      tag: 'else if',
      nodeName: '#elseif',
      condition: 'it.condition'
    })
  })

  var testString3 = '[#other it.condition]'
  it(testString3, function () {
    parser.parse(testString3).should.eql({
      tag: 'other',
      nodeName: '#other',
      condition: 'it.condition'
    })
  })

  var testString4 = '[#other "#[]string"]'
  it(testString4, function () {
    parser.parse(testString4).should.eql({
      tag: 'other',
      nodeName: '#other',
      condition: '"#[]string"'
    })
  })

  var testString5 = '#error'
  it(testString5, function () {
    (function () {
      parser.parse(testString5)
    }).should.throw(' ===> ' + testString5)
  })
}
