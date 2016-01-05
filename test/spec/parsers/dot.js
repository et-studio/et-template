'use strict'

var parser = require('../../../es5/parsers/dot')
var it = global.it

module.exports = function () {
  var testString1 = '{{?it.one}}one{{??it.two}}two{{??}}three{{?}}'
  it(testString1, function () {
    var result = '[#if it.one]one[#elseif it.two]two[#else]three[/#if]'
    parser.parse(testString1).should.equal(result)
  })

  var testString2 = '{{~it.list:item:index}}It is {{=item.name}}:{{=index}}{{~}}'
  it(testString2, function () {
    var result = '[#for item, index in it.list]It is {{item.name}}:{{index}}[/#for]'
    parser.parse(testString2).should.equal(result)
  })
}
