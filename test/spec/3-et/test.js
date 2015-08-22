'use strict'

var ET = require('src/et')

var jsFormatter = require('jsFormatter')
var et = new ET()

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
        var source = setting.source
        var expect = setting.expect

        source = et.compile(source)
        source = jsFormatter.js_beautify(source)
        console.log(source)

        window.testCompile(expect, source)
      })
    })
  })

}
