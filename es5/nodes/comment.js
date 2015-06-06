'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Basic = require('./basic');

var Comment = (function (_Basic) {
  function Comment() {
    _classCallCheck(this, Comment);

    if (_Basic != null) {
      _Basic.apply(this, arguments);
    }
  }

  _inherits(Comment, _Basic);

  _createClass(Comment, [{
    key: 'deliverCreate',
    value: function deliverCreate() {
      var re = [''];
      var id = this.getId();
      var text = this.textContent;
      var parentId = this.getParentId();

      re.push('var ' + id + ' = _util.createComment(\'' + text + '\');');
      re.push('doms.' + id + ' = ' + id);

      if (this.checkRoot()) {
        re.push('rootIds.push(\'' + id + '\');');
        re.push('roots.' + id + ' = ' + id);
      } else {
        re.push('_util.appendChild(' + parentId + ', ' + id + ');');
      }
      return re;
    }
  }]);

  return Comment;
})(Basic);

module.exports = Comment;