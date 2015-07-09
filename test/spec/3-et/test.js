'use strict'

var babel = require('babel')
var settings = [
  {
    title: 'attributes',
    source: require('design/attributes/source.html'),
    expect: require('design/attributes/expect')
  },
  {
    title: 'attrs-with-expression',
    source: require('design/attributes-with-expression/source.html'),
    expect: require('design/attributes-with-expression/expect')
  },
  {
    title: 'for',
    source: require('design/for/source.html'),
    expect: require('design/for/expect')
  },
  {
    title: 'if-with-siblings',
    source: require('design/if-with-siblings/source.html'),
    expect: require('design/if-with-siblings/expect')
  },
  {
    title: 'text',
    source: require('design/text/source.html'),
    expect: require('design/text/expect')
  },
  {
    title: 'if-else',
    source: require('design/if-else/source.html'),
    expect: require('design/if-else/expect')
  }
]

exports.register = function () {
  window.describe('Compiler test', function () {
    settings.forEach(function (setting) {
      window.it(setting.title, function () {
        var left = setting.source
        var right = setting.expect
        left = babel.transform(left).code
        right = babel.transform(right).code
        console.log(left)
        window.testCompile(left, right)
      })
    })
  })

}
