'use strict'

var parser = require('../../../es5/parsers/origin')
var it = global.it

module.exports = function () {
  var testString1 = '<div id="test" data-type=xxxx class="{{it.class}}" diabled\r\n></div>123456'
  it(testString1, function () {
    parser.parse(testString1).should.eql({
      children: [{
        nodeType: 1,
        header: 'id="test" data-type=xxxx class="{{it.class}}" diabled',
        source: '<div id="test" data-type=xxxx class="{{it.class}}" diabled >'
      }, {
        nodeType: 3,
        header: '',
        source: '123456'
      }]
    })
  })
}
