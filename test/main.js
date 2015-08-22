'use strict'
// @ignore

require.config({
  paths: {
    // 依赖
    jquery: './bower_components/jquery/dist/jquery',
    underscore: './bower_components/underscore/underscore',
    mocha: './bower_components/mocha/mocha',
    chai: './bower_components/chai/chai',
    jsFormatter: './bower_components/js-beautify/js/lib/beautify',
    bootstrap: './bower_components/bootstrap/dist/js/bootstrap',
    babel: '/node_modules/babel-core/browser',
    // 资源文件夹
    template: './template',
    spec: './spec',
    src: './src',
    etDependency: './src/dependency',
    etRuntime: './es5/et-runtime',
    design: './design'
  }
})

require([
  window.location.pathname + 'test.js',
  'chai',
  'jquery',
  'underscore',
  'mocha',
  'etDependency',
  'etRuntime',
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

  window.testCompile = function (left, right) {
    left = left.trim().replace(/\n{2}/g, '\n')
    right = right.trim().replace(/\n{2}/g, '\n')

    var hasError = false
    var errorLeft = ''
    var errorRight = ''
    var leftList = left.split('\n')
    var rightList = right.split('\n')
    var len = Math.max(leftList.length, rightList.length)
    for (var i = 0; i < len; i++) {
      var leftStr = leftList[i] || ''
      leftStr = leftStr.trim()
      var rightStr = rightList[i] || ''
      rightStr = rightStr.trim()

      if (leftStr === rightStr) {
        console.log(`${i}:${leftStr}`)
        console.log(`${i}:${rightStr}`)
      } else {
        console.error(`${i}:${leftStr}`)
        console.error(`${i}:${rightStr}`)
        if (!hasError) {
          hasError = true
          errorLeft = leftStr
          errorRight = rightStr
        }
      }
    }

    window.assert.equal(errorLeft, errorRight)
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
