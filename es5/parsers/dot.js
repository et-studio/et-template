'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var settings = {
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  encode: /\{\{!([\s\S]+?)\}\}/g,
  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
  use: /\{\{#([\s\S]+?)\}\}/g,
  useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
  define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  defineParams: /^\s*([\w$]+):([\s\S]+)/
};

var DotParser = (function () {
  function DotParser() {
    _classCallCheck(this, DotParser);
  }

  _createClass(DotParser, [{
    key: 'parse',
    value: function parse(str) {
      var c = settings;
      return str.replace(c.interpolate, function (m, code) {
        return '{{' + code + '}}';
      }).replace(c.encode, function (m, code) {
        return '{{' + code + '}}';
      }).replace(c.conditional, function (m, elsecase, code) {
        if (elsecase) {
          return code ? '[#elseif ' + code + ']' : '[#else]';
        } else {
          return code ? '[#if ' + code + ']' : '[/#if]';
        }
      }).replace(c.iterate, function (m, iterate, vname, iname) {
        if (iterate) {
          return iname ? '[#for ' + vname + ', ' + iname + ' in ' + iterate + ']' : '[#for ' + vname + ' in ' + iterate + ']';
        } else {
          return '[/#for]';
        }
      });
    }
  }]);

  return DotParser;
})();

exports['default'] = new DotParser();
module.exports = exports['default'];