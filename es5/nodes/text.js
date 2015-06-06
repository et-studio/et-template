'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var valueHandler = require('./value');
var Basic = require('./basic');

var TextNode = (function (_Basic) {
  function TextNode() {
    _classCallCheck(this, TextNode);

    if (_Basic != null) {
      _Basic.apply(this, arguments);
    }
  }

  _inherits(TextNode, _Basic);

  _createClass(TextNode, [{
    key: 'deliverCreate',
    value: function deliverCreate() {
      var re = [];
      var id = this.getId();
      var text = this.getTextContent();
      var parentId = this.parent && this.parent.getId();

      if (valueHandler.isErraticValue(text)) {
        re.push('var ' + id + ' = _util.createTextNode(\'\');');
      } else {
        re.push('var ' + id + ' = _util.createTextNode(\'' + text + '\');');
      }
      re.push('doms.' + id + ' = ' + id + ';');

      if (this.checkRoot()) {
        re.push('rootIds.push(\'' + id + '\');');
        re.push('roots.' + id + ' = ' + id + ';');
      } else {
        re.push('_util.appendChild(' + parentId + ', ' + id + ');');
      }
      return re;
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var re = [];
      var lastRoot = this.getLastRoot();
      var text = this.getTextContent();
      var id = this.getId();

      if (valueHandler.isErraticValue(text)) {
        var valueId = lastRoot.getValueId();
        var valueString = valueHandler.compileValue(text);
        re.push('\n        var ' + id + ' = doms.' + id + ';\n        var tmpValue = ' + valueString + ';\n        if (last.' + valueId + ' !== tmpValue) {\n          last.' + valueId + ' = tmpValue;\n          _util.text(' + id + ', tmpValue);\n        }\n      ');
      }
      return re;
    }
  }]);

  return TextNode;
})(Basic);

module.exports = TextNode;