'use strict'

require('should')
require('mocha')

const rootDir = process.cwd()
const beautify = require('js-beautify')
const fs = require('fs')
const path = require('path')
const compile = require(`${rootDir}/es5/et`).compile

const describe = global.describe
const it = global.it

describe('design', function () {
  findDesigns(rootDir + '/design').map(function (item) {
    it(item.path, function () {
      equal(item.expect, compile(item.html, item.options))
    })
  })
})

function pushArray (arr1, arr2) {
  arr2.map(function (item) {
    arr1.push(item)
  })
  return arr1
}

function findDesigns (dirPath) {
  let results = []
  if (fs.existsSync(dirPath)) {
    let designDirs = fs.readdirSync(dirPath)
    designDirs.forEach(function (dir) {
      let childDirPath = dirPath + '/' + dir
      let stats = fs.statSync(childDirPath)
      if (stats.isDirectory()) {
        // find the child directorys
        pushArray(results, findDesigns(childDirPath))
      }
    })

    // find the design files
    let expectPath = dirPath + '/expect.js'
    let htmlPath = dirPath + '/source.html'
    let optionsPath = dirPath + '/options.json'
    let isExpectExist = fs.existsSync(expectPath)
    let isHtmlExist = fs.existsSync(htmlPath)
    let isOptionsExist = fs.existsSync(optionsPath)

    if (isExpectExist && isHtmlExist) {
      let expect = fs.readFileSync(expectPath, 'utf-8')
      let html = fs.readFileSync(htmlPath, 'utf-8')
      let options = {}
      if (isOptionsExist) {
        let jsonString = fs.readFileSync(optionsPath, 'utf-8')
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
  expect = beautify(expect).trim().replace(/\n\s*\n/g, '\n')
  result = beautify(result).trim().replace(/\n\s*\n/g, '\n')

  let expectList = expect.split('\n')
  let resultList = result.split('\n')
  let len = Math.max(expectList.length, resultList.length)
  for (let i = 0; i < len; i++) {
    let expectStr = expectList[i] || ''
    let resultStr = resultList[i] || ''
    expectStr.trim().should.equal(resultStr.trim())
  }
}
