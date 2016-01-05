'use strict'

var parser = require('../../../es5/parsers/element')
var it = global.it

module.exports = function () {
  var testString1 = '<div id="test" data-xxx=xxx data-type="{{it.type}}" autofocus>'
  it(testString1, function () {
    parser.parse(testString1).should.eql({
      nodeName: 'DIV',
      attributes: {
        'id': 'test',
        'data-xxx': 'xxx',
        'data-type': '{{it.type}}',
        'autofocus': ''
      }
    })
  })

  var testString2 = '<a class="[#if it.test]test[/#if]">'
  it(testString2, function () {
    parser.parse(testString2).should.eql({
      nodeName: 'A',
      attributes: {
        'class': '[#if it.test]test[/#if]'
      }
    })
  })

  var testString3 = '<br [#if it.test]class="test"[/#if]>'
  it(testString3, function () {
    parser.parse(testString3).should.eql({
      nodeName: 'BR',
      attributes: {
        '[#if': '',
        'it.test]class': 'test',
        '[/#if]': ''
      }
    })
  })

  var testString4 = '<strong data-msg=" data-type=\'type\' ">'
  it(testString4, function () {
    parser.parse(testString4).should.eql({
      nodeName: 'STRONG',
      attributes: {
        'data-msg': 'data-type=\'type\''
      }
    })
  })

  var testString5 = 'test data-type="type"'
  it(testString5, function () {
    (function () {
      parser.parse(testString5)
    }).should.throw(' ===> ' + testString5)
  })
}
