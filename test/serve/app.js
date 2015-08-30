'use strict'

var rootDir = process.cwd()
var express = require('express')
var fs = require('fs')
var nodePath = require('path')
var babel = require('babel-core')
var esformatter = require('esformatter')
var ET = require(`${rootDir}/es5/et`)
var Formatter = require(`${rootDir}/es5/formatter`)

var et = new ET()
var formatter = new Formatter()
var app = express()
var port = 3000

var _ = {
  isStartWith: function (str, start) {
    if (!str) {
      return false
    }
    return str.indexOf(start) === 0
  },
  isEndWidth: function isEndWidth (str, end) {
    if (!str) {
      return false
    }
    return str.lastIndexOf(end) + end.length === str.length
  },
  isIgnore: function isIgnore (str) {
    if (!str) {
      return false
    }
    return str.indexOf('// @ignore') >= 0
  },
  getFile: function getFile (path, callback) {
    fs.readFile(`${rootDir}/${path}`, 'utf-8', function (err, content) {
      if (err) {
        return callback(err)
      }

      if (_.isEndWidth(path, '.js') && !_.isIgnore(content)) {
        content = babel.transform(content).code
        content = formatter.wrapCMD(content)
        content = esformatter.format(content)
      }

      callback(null, content)
    })
  },
  getHtml: function getHtml (path, callback) {
    fs.readFile(`${rootDir}/${path}`, 'utf-8', function (err, content) {
      if (err) {
        return callback(err)
      }

      content = et.compile(content)
      content = babel.transform(content).code
      content = formatter.wrapCMD(content)
      content = esformatter.format(content)

      callback(null, content)
    })
  },
  getDesignFile: function getDesignJs (path, callback) {
    fs.readFile(`${rootDir}/${path}`, 'utf-8', function (err, content) {
      if (err) {
        return callback(err)
      }
      content = content.replace(/\\/, '\\\\')
      content = `module.exports = \`${content}\``
      content = babel.transform(content).code
      content = formatter.wrapCMD(content)
      content = esformatter.format(content)

      callback(null, content)
    })
  }
}

app.use('/node_modules', express.static('node_modules'))
app.use('/bower_components', express.static('bower_components'))
app.use('/es5', express.static('es5'))

app.use('/template', function (req, res) {
  var path = 'test/template' + req.path
  path = path.slice(0, path.length - 3)
  _.getHtml(path, function (err, content) {
    if (err) {
      console.log(err.toString())
      res.status(404).send(err)
    } else {
      res.send(content)
    }
  })
})

app.use('/design', function (req, res) {
  var path = 'design' + req.path
  var method
  if (_.isEndWidth(path, '.html.js')) {
    method = 'getDesignFile'
    path = path.slice(0, path.length - 3)
  } else if (_.isEndWidth(path, '.js')) {
    method = 'getDesignFile'
  } else {
    method = 'getFile'
  }

  _[method](path, function (err, content) {
    if (err) {
      console.log(err.toString())
      res.status(404).send(err)
    } else {
      res.send(content)
    }
  })
})
app.use('/test/design', function (req, res) {
  var path = 'test/design' + req.path
  var method
  if (_.isEndWidth(path, '.html.js')) {
    method = 'getDesignFile'
    path = path.slice(0, path.length - 3)
  } else if (_.isEndWidth(path, '.js')) {
    method = 'getDesignFile'
  } else {
    method = 'getFile'
  }

  _[method](path, function (err, content) {
    if (err) {
      console.log(err.toString())
      res.status(404).send(err)
    } else {
      res.send(content)
    }
  })
})

app.use('/src', function (req, res) {
  var path = 'src' + req.path
  _.getFile(path, function (err, content) {
    if (err) {
      console.log(err.toString())
      res.status(404).send(err)
    } else {
      res.send(content)
    }
  })
})
app.use(function (req, res) {
  var path = 'test' + req.path
  if (_.isEndWidth(path, '/')) {
    path += 'index.html'
    if (!fs.existsSync(path)) path = 'test/spec/index.html'
  }
  _.getFile(path, function (err, content) {
    if (err) {
      console.log(err.toString())
      res.status(404).send(err)
    } else {
      res.type(nodePath.extname(path)).send(content)
    }
  })
})

module.exports = function () {
  app.listen(port, function () {
    port = (port !== '80' ? ':' + port : '')
    var url = 'http://localhost' + port + '/'
    console.log('Running at ' + url)
  })
}
