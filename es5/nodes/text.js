'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Basic = require('./basic');
var worker = require('../worker');
var valueParser = require('../parsers/value');

var TextNode = (function (_Basic) {
  function TextNode(source) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, TextNode);

    _get(Object.getPrototypeOf(TextNode.prototype), 'constructor', this).call(this, source, options);
    this.nodeType = 3;
  }

  _inherits(TextNode, _Basic);

  _createClass(TextNode, [{
    key: 'parseSource',
    value: function parseSource(source) {
      this.textContent = source;
    }
  }, {
    key: 'deliverCreate',
    value: function deliverCreate() {
      var text = this.getTextContent();
      if (this.isErraticValue(text)) {
        text = '';
      }
      var it = {
        id: this.getId(),
        isRoot: this.checkRoot(),
        lineId: this.getLineId(),
        parentId: this.getParentId(),
        text: text
      };
      return [worker.createText(it)];
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var text = this.getTextContent();
      if (this.isErraticValue(text)) {
        var it = {
          id: this.getId(),
          isRoot: this.checkRoot(),
          lineId: this.getLineId(),
          parentId: this.getParentId(),
          valueId: this.getRootValueId(),
          valueString: valueParser.parse(text)
        };
        return [worker.updateText(it)];
      } else {
        return [];
      }
    }
  }]);

  return TextNode;
})(Basic);

module.exports = TextNode;