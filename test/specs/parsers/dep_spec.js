'use strict'

require('should')
require('mocha')

const rootDir = process.cwd()
const parseDep = require(`${rootDir}/es5/parsers/dep`).parseDep
const describe = global.describe
const it = global.it

describe('parsers/dep', function () {
  it('normal parse', function () {
    let source = [
      '_dep.createTemplate({',
      'create: function () {',
      '_dep.createText(null, 2, \'It is text\')',
      '}',
      '})'
    ].join('\n')

    let expect = [
      'var _dep_createTemplate = _dep.createTemplate;',
      'var _dep_createText = _dep.createText;',
      '_dep_createTemplate({',
      'create: function () {',
      '_dep_createText(null, 2, \'It is text\')',
      '}',
      '})'
    ].join('\n')

    parseDep(source).should.eql(expect)
  })

  it('method in string', function () {
    let source = [
      '_dep.createTemplate({',
      'create: function () {',
      '_dep.createText(null, 2, \'_dep.createElement("div")\')',
      '}',
      '})'
    ].join('\n')

    let expect = [
      'var _dep_createTemplate = _dep.createTemplate;',
      'var _dep_createText = _dep.createText;',
      '_dep_createTemplate({',
      'create: function () {',
      '_dep_createText(null, 2, \'_dep.createElement("div")\')',
      '}',
      '})'
    ].join('\n')

    parseDep(source).should.eql(expect)
  })
})
