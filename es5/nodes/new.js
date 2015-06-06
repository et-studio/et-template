'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Basic = require('./basic');

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
      var re = [''];
      var id = this.getId();
      var lineId = this.getLineId();
      var parentId = this.getParentId();

      re.push('var ' + id + ' = null;');
      re.push('doms.' + id + ' = ' + id + ';');
      if (this.checkRoot()) {
        re.push('rootIds.push(\'' + id + '\');');
        re.push('roots.' + id + ' = ' + id + ';');
      }

      re.push('');
      re.push('var ' + lineId + ' = _util.createLine();');
      re.push('doms.' + lineId + ' = ' + lineId + ';');
      if (this.checkRoot()) {
        re.push('rootIds.push(\'' + lineId + '\');');
        re.push('roots.' + lineId + ' = ' + lineId + ';');
      } else {
        re.push('_util.appendChild(' + parentId + ', ' + lineId + ');');
      }
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