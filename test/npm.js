'use strict'

var rootDir = process.cwd()
var assert = require('assert')
var fs = require('fs')
var formatter = require('esformatter')
var ET = require('../es5/et')

function testCompile (expect, result) {
  expect = expect.trim().replace(/\n\s*\n/g, '\n')
  result = result.trim().replace(/\n\s*\n/g, '\n')

  var expectList = expect.split('\n')
  var resultList = result.split('\n')
  var len = Math.max(expectList.length, resultList.length)
  for (var i = 0; i < len; i++) {
    var expectStr = expectList[i] || ''
    var resultStr = resultList[i] || ''
    assert.equal(expectStr.trim(), resultStr.trim())
  }
}

var pathList = ['/design/et']
pathList.forEach(function (path) {
  global.describe(path, function () {
    var exist = fs.existsSync(rootDir + path)
    if (!exist) {
      return
    }
    var designDirs = fs.readdirSync(rootDir + path)
    designDirs.forEach(function (folder) {
      global.it(folder, function () {
        var expect = fs.readFileSync(rootDir + path + '/' + folder + '/expect.js', 'utf-8')
        var html = fs.readFileSync(rootDir + path + '/' + folder + '/source.html', 'utf-8')

        var optionsPath = rootDir + path + '/' + folder + '/options.json'
        var options = {}
        if (fs.existsSync(optionsPath)) options = require(optionsPath)
        var et = new ET(options)
        var result = et.compile(html)

        expect = formatter.format(expect)
        result = formatter.format(result)
        testCompile(expect, result)
      })
    })
  })
})

var dotPaths = ['/design/dot']
dotPaths.forEach(function (path) {
  global.describe(path, function () {
    var exist = fs.existsSync(rootDir + path)
    if (!exist) {
      return
    }
    var designDirs = fs.readdirSync(rootDir + path)
    designDirs.forEach(function (folder) {
      global.it(folder, function () {
        var expect = fs.readFileSync(rootDir + path + '/' + folder + '/expect.js', 'utf-8')
        var html = fs.readFileSync(rootDir + path + '/' + folder + '/source.html', 'utf-8')

        var optionsPath = rootDir + path + '/' + folder + '/options.json'
        var options = {}
        if (fs.existsSync(optionsPath)) options = require(optionsPath)
        var et = new ET(options)
        var result = et.compileDot(html)

        expect = formatter.format(expect)
        result = formatter.format(result)

        testCompile(expect, result)
      })
    })
  })
})
