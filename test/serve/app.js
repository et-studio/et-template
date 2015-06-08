'use strict';

var express = require('express');
var fs = require('fs');
var babel = require('babel');
var et = require('../../es5/et');

var app = express();
var port = 3000;

var _ = {
  isStartWith: function(str, start) {
    if (!str) {
      return false;
    }
    return str.indexOf(start) === 0;
  },
  isEndWidth: function isEndWidth(str, end) {
    if (!str) {
      return false;
    }
    return str.lastIndexOf(end) + end.length ===  str.length;
  },
  isIgnore: function isIgnore(str) {
    if (!str) {
      return false;
    }
    return str.indexOf('// @ignore') >= 0;
  },
  getFile: function getFile(path, callback) {
    fs.readFile(path, 'utf-8', function(err, content) {
      if (err) {
        return callback(err);
      }

      if(_.isEndWidth(path, '.js') && !_.isIgnore(content)) {
        content = ''
          + 'define(function(require, exports, module){\n'
          + content
          + '});';
        content = babel.transform(content).code;
      }

      callback(null, content);
    });
  },
  getDesignJs: function getDesignJs(path, callback) {
    fs.readFile(path, 'utf-8', function(err, content) {
      if (err) {
        return callback(err);
      }

      content = ''
        + 'define(function(require, exports, module){\n'
        +   'module.exports =`' + content + '`'
        + '});';
      content = babel.transform(content).code;

      callback(null, content);
    });
  },
  getDesignHtml: function getDesignHtml(path, callback) {
    fs.readFile(path, 'utf-8', function(err, content) {
      if (err) {
        return callback(err);
      }
      callback(null, et(content));
    });
  }
}

app.use('/node_modules', express.static('node_modules'));
app.use('/bower_components', express.static('bower_components'));

app.use('/design', function(req, res) {
  var path = 'design' + req.path;
  var method;
  if (_.isEndWidth(path, '.html.js')) {
    method = 'getDesignHtml';
    path = path.slice(0, path.length - 3);
  } else if (_.isEndWidth(path, '.js')) {
    method = 'getDesignJs';
  } else {
    method = 'getFile';
  }

  _[method](path, function(err, content) {
    if (err) {
      console.log('not found:' + path);
      res.status(404).send(err);
    } else {
      res.send(content);
    }
  });
});
app.use('/src', function(req, res) {
  var path = 'src' + req.path;
  _.getFile(path, function(err, content) {
    if (err) {
      console.log('not found:' + path);
      res.status(404).send(err);
    } else {
      res.send(content);
    }
  });
});
app.use(function(req, res) {
  var path = 'test' + req.path;
  if (_.isEndWidth(path, '/')) {
    path += 'index.html';
  }
  _.getFile(path, function(err, content) {
    if (err) {
      console.log('not found:' + path);
      res.status(404).send(err);
    } else {
      res.send(content);
    }
  });
});

module.exports = function() {
  app.listen(port, function(){
    port = (port !== '80' ? ':' + port : '');
    var url = 'http://localhost'  + port + '/';
    console.log('Running at ' + url);
  });
};