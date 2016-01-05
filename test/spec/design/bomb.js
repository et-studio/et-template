'use strict'

var formatter = require('esformatter')
var fs = require('fs')
var path = require('path')
var ET = require('../../../es5/et')

var rootDir = process.cwd()
var it = global.it

function pushArray (arr1, arr2) {
  arr2.map(function (item) {
    arr1.push(item)
  })
  return arr1
}

function findDesigns (dirPath) {
  var results = []
  var exist = fs.existsSync(dirPath)
  if (fs.existsSync(dirPath)) {
    var designDirs = fs.readdirSync(dirPath)
    designDirs.forEach(function (dir) {
      var childDirPath = dirPath + '/' + dir
      var stats = fs.statSync(childDirPath)
      if (stats.isDirectory()) {
        // find the child directorys
        pushArray(results, findDesigns(childDirPath))
      }
    })

    // find the design files
    var expectPath = dirPath + '/expect.js'
    var htmlPath = dirPath + '/source.html'
    var optionsPath = dirPath + '/options.json'
    var isExpectExist = fs.existsSync(expectPath)
    var isHtmlExist = fs.existsSync(htmlPath)
    var isOptionsExist = fs.existsSync(optionsPath)

    if (isExpectExist && isHtmlExist) {
      var expect = fs.readFileSync(expectPath, 'utf-8')
      var html = fs.readFileSync(htmlPath, 'utf-8')
      var options = {}
      if (isOptionsExist) {
        var jsonString = fs.readFileSync(optionsPath, 'utf-8')
        options = JSON.parse(jsonString)
      }

      results.push({
        path: path.relative(rootDir, dirPath),
        expect: expect,
        html: html,
        options: options
      })
    }
  }

  return results
}

function equal (expect, result) {
  expect = formatter.format(expect).trim().replace(/\n\s*\n/g, '\n')
  result = formatter.format(result).trim().replace(/\n\s*\n/g, '\n')

  var expectList = expect.split('\n')
  var resultList = result.split('\n')
  var len = Math.max(expectList.length, resultList.length)
  for (var i = 0; i < len; i++) {
    var expectStr = expectList[i] || ''
    var resultStr = resultList[i] || ''
    expectStr.trim().should.equal(resultStr.trim())
  }
}

module.exports = function () {
  findDesigns(rootDir + '/design').map(function (item) {
    it(item.path, function () {
      var et = new ET(item.options)
      equal(item.expect, et.compile(item.html))
    })
  })
}
