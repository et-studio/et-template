'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _parsersFormat = require('./parsers/format');

var _parsersFormat2 = _interopRequireDefault(_parsersFormat);

var LINE_SPLIT = '\n';

var Formatter = (function () {
  function Formatter(options) {
    _classCallCheck(this, Formatter);

    this.options = options;
  }

  _createClass(Formatter, [{
    key: 'format',
    value: function format(content) {
      content = _parsersFormat2['default'].parse(content);
      content = this.removeComments(content);
      return content;
    }
  }, {
    key: 'removeComments',
    value: function removeComments(content) {
      var list = content.split(LINE_SPLIT);
      var results = [];
      for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i].trim();
        if (!item.startsWith('//')) results.push(item);
      }
      return results.join(LINE_SPLIT);
    }
  }]);

  return Formatter;
})();

exports['default'] = Formatter;
module.exports = exports['default'];