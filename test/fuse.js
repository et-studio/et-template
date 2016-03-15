'use strict'

const root = process.cwd()
const path = require('path')
const glob = require('glob')
const files = glob.sync('**/*_spec.js')
files.forEach(function (file) { require(path.resolve(root, file)) })
