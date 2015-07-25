'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _worker = require('./worker');

var _worker2 = _interopRequireDefault(_worker);

var Compiler = (function () {
  function Compiler() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Compiler);

    this.options = options;
  }

  _createClass(Compiler, [{
    key: 'pickData',
    value: function pickData(root) {
      var newDoms = root.getNewTemplateDoms();
      var re = {
        templateName: root.getTemplateName(),
        hasFor: false,
        newDoms: []
      };
      _util2['default'].each(newDoms, function (dom) {
        if (dom.nodeName === '#for') {
          re.hasFor = true;
        }
        re.newDoms.push({
          templateName: dom.getTemplateName(),
          createList: dom.getCreateList(),
          updateList: dom.getUpdateList(),
          args: dom.getArguments()
        });
      });
      return re;
    }
  }, {
    key: 'compile',
    value: function compile(dom) {
      var it = this.pickData(dom);
      return _worker2['default'].template(it);
    }
  }]);

  return Compiler;
})();

exports['default'] = Compiler;
module.exports = exports['default'];