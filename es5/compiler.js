'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('./util');
var worker = require('./worker');
var Factory = require('./nodes/factory');

var Compiler = (function () {
  function Compiler() {
    _classCallCheck(this, Compiler);
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
      _.each(newDoms, function (dom) {
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
      return worker.template(it);
    }
  }]);

  return Compiler;
})();

module.exports = Compiler;