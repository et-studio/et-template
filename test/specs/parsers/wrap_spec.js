
'use strict'

require('should')
require('mocha')

const rootDir = process.cwd()
const wrap = require(`${rootDir}/es5/parsers/wrap`).wrap

const describe = global.describe
const it = global.it

describe('parsers/wrap', function () {
  it('single quotation', function () {
    wrap("aa'bb").should.eql("'aa\\'bb'")
  })

  it('break', function () {
    wrap('aa\nbb').should.eql("'aa\\nbb'")
  })
})
