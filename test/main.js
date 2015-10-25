'use strict'
// @ignore

require.config({
  paths: {
    // 依赖
    'jquery': './bower_components/jquery/dist/jquery',
    'underscore': './bower_components/underscore/underscore',
    'mocha': './bower_components/mocha/mocha',
    'chai': './bower_components/chai/chai',
    'jsFormatter': './bower_components/js-beautify/js/lib/beautify',
    'bootstrap': './bower_components/bootstrap/dist/js/bootstrap',
    'babel': '/node_modules/babel-core/browser',
    // 资源文件夹
    'template': './template',
    'spec': './spec',
    'src': './src',
    'et-dependency': './src/dependency',
    'et-runtime': './es5/et-runtime',
    'design': './design'
  }
})

require([
  window.location.pathname + 'test.js',
  'chai',
  'jquery',
  'underscore',
  'mocha',
  'et-dependency',
  'et-runtime',
  'babel',
  'jsFormatter'
], function (test, chai, $, _) {
  var mocha = window.mocha

  window.testAll = (function () {
    function testAll (expect, result) {
      if (_.isArray(expect)) {
        testArray(expect, result)
      } else if (_.isObject(expect)) {
        testObject(expect, result)
      } else {
        window.assert.equal(expect, result)
      }
    }
    function testArray (expect, result) {
      window.assert.equal(expect.length, result.length)
      expect.forEach(function (item, i) {
        testAll(item, result[i])
      })
    }
    function testObject (expect, result) {
      for (var key in expect) {
        testAll(expect[key], result[key])
      }
    }
    return testAll
  })()

  window.testCompile = function (expect, result, withoutMocha) {
    expect = expect.trim().replace(/\n\s*\n/g, '\n')
    result = result.trim().replace(/\n\s*\n/g, '\n')

    var hasError = false
    var expectError = ''
    var resultError = ''
    var expectList = expect.split('\n')
    var resultList = result.split('\n')
    var len = Math.max(expectList.length, resultList.length)
    for (var i = 0; i < len; i++) {
      var expectStr = expectList[i] || ''
      expectStr = expectStr.trim()
      var resultStr = resultList[i] || ''
      resultStr = resultStr.trim()

      if (expectStr === resultStr) {
        console.log(`${i}:${expectStr}`)
        console.log(`${i}:${resultStr}`)
      } else {
        console.error(`${i}:${expectStr}`)
        console.error(`${i}:${resultStr}`)
        if (!hasError) {
          hasError = true
          expectError = expectStr
          resultError = resultStr
        }
      }
    }
    if (!withoutMocha) window.assert.equal(expectError, resultError)
  }

  if (window.location.pathname !== '/') {
    mocha.setup('bdd')

    window.assert = chai.assert
    window.expect = chai.expect
    window.should = chai.should()

    if (test.register() !== false) {
      mocha.run()
    }
  }
})
