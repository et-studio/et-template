'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _dot = require('./00-dot');

var _dot2 = _interopRequireDefault(_dot);

var _originParser = require('./01-origin-parser');

var _originParser2 = _interopRequireDefault(_originParser);

var _sourceTranslator = require('./02-source-translator');

var _sourceTranslator2 = _interopRequireDefault(_sourceTranslator);

var _nodeCreator = require('./03-node-creator');

var _nodeCreator2 = _interopRequireDefault(_nodeCreator);

var _attributes = require('./04-attributes');

var _attributes2 = _interopRequireDefault(_attributes);

var _rebuilder = require('./05-rebuilder');

var _rebuilder2 = _interopRequireDefault(_rebuilder);

var _ngRebuilder = require('./06-ng-rebuilder');

var _ngRebuilder2 = _interopRequireDefault(_ngRebuilder);

var _checker = require('./07-checker');

var _checker2 = _interopRequireDefault(_checker);

var _compiler = require('./08-compiler');

var _compiler2 = _interopRequireDefault(_compiler);

var _formatter = require('./09-formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var MIDDLEWARES = {
  'dot': _dot2['default'],
  'origin-parser': _originParser2['default'],
  'source-translator': _sourceTranslator2['default'],
  'node-creator': _nodeCreator2['default'],
  'attributes': _attributes2['default'],
  'rebuilder': _rebuilder2['default'],
  'ng-rebuilder': _ngRebuilder2['default'],
  'checker': _checker2['default'],
  'compiler': _compiler2['default'],
  'formatter': _formatter2['default']
};

var MiddlewareGetter = (function () {
  function MiddlewareGetter() {
    _classCallCheck(this, MiddlewareGetter);
  }

  _createClass(MiddlewareGetter, [{
    key: 'get',
    value: function get(key) {
      var middleware = MIDDLEWARES[key];
      if (!middleware) {
        throw new Error('not found middleware: ' + key);
      }
      return middleware;
    }
  }, {
    key: 'getList',
    value: function getList() {
      var _this = this;

      var results = [];

      for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
        arr[_key] = arguments[_key];
      }

      arr.map(function (key) {
        results.push(_this.get(key));
      });
      return results;
    }
  }]);

  return MiddlewareGetter;
})();

exports['default'] = new MiddlewareGetter();
module.exports = exports['default'];