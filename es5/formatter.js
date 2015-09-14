'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _parsersFormat = require('./parsers/format');

var _parsersFormat2 = _interopRequireDefault(_parsersFormat);

var _worker = require('./worker');

var _worker2 = _interopRequireDefault(_worker);

var DEFAULT_TEMPLATE_ID = 'Template';

var Formatter = (function () {
  function Formatter() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Formatter);

    this.options = options;
  }

  _createClass(Formatter, [{
    key: 'format',
    value: function format(content) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      content = _parsersFormat2['default'].parse(content);
      return this.wrap(content, this.options.modules, options);
    }
  }, {
    key: 'wrap',
    value: function wrap(content, modules, options) {
      var it = {
        content: content,
        moduleId: options.moduleId || DEFAULT_TEMPLATE_ID,
        moduleIds: options.moduleIds || []
      };
      switch (modules) {
        case 'cmd':
          return _worker2['default'].format_cmd(it);
        case 'amd':
          return _worker2['default'].format_amd(it);
        case 'global':
          return _worker2['default'].format_global(it);
      }
      return content;
    }
  }]);

  return Formatter;
})();

exports['default'] = Formatter;
module.exports = exports['default'];