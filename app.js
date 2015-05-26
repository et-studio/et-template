'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var babel = require('babel');
var port = 3000;

function getFile(path, callback) {
  fs.readFile(path, 'utf-8', function(err, content){
    if (!err && path.lastIndexOf('.js') + '.js'.length ===  path.length && content.indexOf('// @ignore') < 0) {
      content = `
        define(function(require, exports, module){
          ${content}
        });
      `;
      content = babel.transform(content).code;
    }
    callback(err, content);
  });
}
app.use('/node_modules', express.static('node_modules'));
app.use('/bower_components', express.static('bower_components'));
app.use('/src', function(req, res){
  var path = 'src' + req.path;
  getFile(path, function(err, content){
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(content);
    }
  });
});
app.use(function(req, res){
  var path = 'test' + req.path;
  if (path.lastIndexOf('/') === path.length - 1) {
    path += 'index.html';
  }
  getFile(path, function(err, content){
    if (err) {
      console.log('not found:' + path);
      res.status(404).send(err);
    } else {
      res.send(content);
    }
  });
});


// function formatJs(next) {
//   console.log(this.request.path);
//   var content = this.body;
//   content = 'define(function(require, exports, module){\n' + content + '\n});';
//   content = babel.transform(content).code;
//   this.body = content;
//   next();
// }
//
// var toa = require('toa');
// var Router = require('toa-router');
// var staticRouter = new Router();
// var app = toa();
// var toaStatic = require('toa-static');
//
// //app.use(toaStatic('test'));
// staticRouter.get('/src/*', toaStatic('.'), formatJs);
// staticRouter.get('/node_modules/*', toaStatic('.'));
// staticRouter.get('/bower_components/*', toaStatic('.'));
//
// staticRouter.get('/spec/*', toaStatic('test'), formatJs);
// staticRouter.get('/inex.html', toaStatic('test'));
// staticRouter.get('/main.js', toaStatic('test'));
// staticRouter.get('/main.css', toaStatic('test'));
//
// app.use(function*() {
//   yield staticRouter.route(this);
//   console.log(this.request.path);
// });
// app.use(function () {
//   return this.thunk.all.call(this, staticRouter.route(this));
// });
// app.use(function(next){
//   console.log(this.request.path);
//   if (!/^\/src|^\/spec/.test(this.request.path)) {
//     return next();
//   }
//   if (!/\.js$/.test(this.request.path)) {
//     return next();
//   }
//   if (this.body.inexOf('// @ignore') >= 0) {
//     return next();
//   }
//   var content = this.body;
//   content = 'define(function(require, exports, module){\n' + content + '\n});';
//   content = babel.transform(content).code;
//   this.body = content;
//   next();
// });

app.listen(port, function(){
  port = (port !== '80' ? ':' + port : '');
  var url = 'http://localhost'  + port + '/';
  console.log('Running at ' + url);
});
