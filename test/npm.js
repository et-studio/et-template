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

function test (path) {
  var exist = fs.existsSync(rootDir + path)
  if (!exist) return
  var designDirs = fs.readdirSync(rootDir + path)
  designDirs.forEach(function (folder) {
    var folderPath = path + '/' + folder
    var stats = fs.statSync(rootDir + folderPath)
    if (stats.isDirectory()) test(folderPath)
  })

  var expectPath = rootDir + path + '/expect.js'
  var htmlPath = rootDir + path + '/source.html'
  var isExpectExist = fs.existsSync(expectPath)
  var isHtmlExist = fs.existsSync(htmlPath)
  if (!isExpectExist || !isHtmlExist) return

  global.it(path, function () {
    var expect = fs.readFileSync(expectPath, 'utf-8')
    var html = fs.readFileSync(htmlPath, 'utf-8')
    var optionsPath = rootDir + path + '/options.json'
    var options = {}
    if (fs.existsSync(optionsPath)) options = require(optionsPath)
    var et = new ET(options)
    var result = et.compile(html, options)

    expect = formatter.format(expect)
    result = formatter.format(result)
    testCompile(expect, result)
  })
}

test('/design')
