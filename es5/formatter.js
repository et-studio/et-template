'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _parsersFormat = require('./parsers/format');

var _parsersFormat2 = _interopRequireDefault(_parsersFormat);

var Formatter = (function () {
  function Formatter() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Formatter);

    this.options = options;
  }

  _createClass(Formatter, [{
    key: 'format',
    value: function format(str) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      str = _parsersFormat2['default'].parse(str);
      switch (this.options.modules) {
        case 'cmd':
          str = this.wrapCMD(str);
          break;
        case 'amd':
          str = this.wrapAMD(str, options.moduleId, options.moduleIds);
          break;
        case 'global':
          str = this.wrapGlobal(str, options.moduleId);
          break;
      }
      return str;
    }
  }, {
    key: 'wrapCMD',
    value: function wrapCMD(str) {
      return 'define(function(require, exports, module){\n      ' + str + '\n    });';
    }
  }, {
    key: 'wrapAMD',
    value: function wrapAMD(str) {
      var moduleId = arguments.length <= 1 || arguments[1] === undefined ? 'Template' : arguments[1];
      var moduleIds = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      var ids = moduleIds.map(function (item) {
        return '\'' + item + '\'';
      });
      return 'define(\'' + moduleId + '\', [' + ids.join(',') + '], function([' + moduleIds.join(',') + ']){\n      var module = {};\n      ' + str + '\n      return module.exports;\n    });';
    }
  }, {
    key: 'wrapGlobal',
    value: function wrapGlobal(str) {
      var moduleId = arguments.length <= 1 || arguments[1] === undefined ? 'Template' : arguments[1];

      return ';(function(global){\n      var module = {};\n      ' + str + '\n      global.' + moduleId + ' = module.exports;\n    })(window);';
    }
  }]);

  return Formatter;
})();

exports['default'] = Formatter;
module.exports = exports['default'];