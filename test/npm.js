'use strict'

var rootDir = process.cwd()
var assert = require('assert')
var fs = require('fs')
var ET = require('../es5/et')
var et = new ET()

function testCompile (left, right) {
  left = left.trim().replace(/\n{2}/g, '\n')
  right = right.trim().replace(/\n{2}/g, '\n')

  var leftList = left.split('\n')
  var rightList = right.split('\n')
  var len = Math.max(leftList.length, rightList.length)
  for (var i = 0; i < len; i++) {
    var leftStr = leftList[i] || ''
    var rightStr = rightList[i] || ''
    assert.equal(leftStr.trim(), rightStr.trim())
  }
}

var pathList = ['/design', '/test/design']
pathList.forEach(function (path) {
  global.describe(path, function () {
    var exist = fs.existsSync(rootDir + path)
    if (!exist) {
      return
    }
    var designDirs = fs.readdirSync(rootDir + path)
    designDirs.forEach(function (folder) {
      global.it(folder, function () {
        var html = fs.readFileSync(rootDir + path + '/' + folder + '/source.html', 'utf-8')
        var left = et.compile(html)
        var right = fs.readFileSync(rootDir + path + '/' + folder + '/expect.js', 'utf-8')
        testCompile(left, right)
      })
    })
  })
})

var dotPaths = ['/test/design-dot']
dotPaths.forEach(function (path) {
  global.describe(path, function () {
    var exist = fs.existsSync(rootDir + path)
    if (!exist) {
      return
    }
    var designDirs = fs.readdirSync(rootDir + path)
    designDirs.forEach(function (folder) {
      global.it(folder, function () {
        var html = fs.readFileSync(rootDir + path + '/' + folder + '/source.html', 'utf-8')
        var left = et.compileDot(html)
        var right = fs.readFileSync(rootDir + path + '/' + folder + '/expect.js', 'utf-8')
        testCompile(left, right)
      })
    })
  })
})
