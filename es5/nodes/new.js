'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Basic = require('./basic');
var worker = require('../worker');

var NewNode = (function (_Basic) {
  function NewNode() {
    _classCallCheck(this, NewNode);

    if (_Basic != null) {
      _Basic.apply(this, arguments);
    }
  }

  _inherits(NewNode, _Basic);

  _createClass(NewNode, [{
    key: 'deliverCreate',
    value: function deliverCreate() {
      var it = {
        id: this.getId(),
        isRoot: this.checkRoot(),
        lineId: this.getLineId(),
        parentId: this.getParentId()
      };
      var re = [];
      re.push(worker.createNull(it));
      re.push(worker.createLine(it));
      return re;
    }
  }, {
    key: 'isNewTemplate',
    get: function () {
      return true;
    }
  }]);

  return NewNode;
})(Basic);

module.exports = NewNode;