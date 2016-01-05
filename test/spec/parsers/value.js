'use strict'

var parser = require('../../../es5/parsers/value')
var it = global.it

module.exports = function () {
  var testString1 = 'aaa{{it.value}}bbb'
  it(testString1, function () {
    parser.isErratic(testString1).should.equal(true)
  })

  var testString2 = 'aaaaaa'
  it(testString2, function () {
    parser.isErratic(testString2).should.equal(false)
  })

  var testString3 = '111{{it.isOne?\'one\':\'two\'}}222'
  it(testString3, function () {
    parser.parse(testString3).should.equal("'111' + (it.isOne?'one':'two') + '222'")
  })

  var testString4 = '111{{it.getValue()}}222'
  it(testString4, function () {
    parser.parse(testString4).should.equal("'111' + (it.getValue()) + '222'")
  })

  var testString5 = '111{{it.getValue() + \'{{it.value}}\'}}222'
  it(testString5, function () {
    parser.parse(testString5).should.equal("'111' + (it.getValue() + '{{it.value}}') + '222'")
  })

  var testString6 = '111{{(function(){ return \'aaa\'})()}}222'
  it(testString6, function () {
    parser.parse(testString6).should.equal("'111' + ((function(){ return 'aaa'})()) + '222'")
  })

  var testString7 = '111[#if it.one]one[#else]{{two}}[/#if]222'
  it(testString7, function () {
    parser.parse(testString7).should.equal("'111' + (it.one?'one':two) + '222'")
  })

  var testString8 = '111[#if it.one]one[#elseif it.two]{{two}}[#else]three[/#if]222'
  it(testString8, function () {
    parser.parse(testString8).should.equal("'111' + ((function(){if(it.one){return 'one'} else if (it.two){return two} else {return 'three'}})()) + '222'")
  })
}
