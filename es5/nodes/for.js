'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var NewNode = require('./new');

var ForNode = (function (_NewNode) {
  function ForNode(dom, options) {
    _classCallCheck(this, ForNode);

    _get(Object.getPrototypeOf(ForNode.prototype), 'constructor', this).call(this, dom, options);

    if (!this.itemName) {
      throw new Error('there must have itemName in #for.');
    }
    this.saveArgument(dom.itemName);

    if (this.indexName) {
      this.saveArgument(this.indexName);
    } else {
      this.indexName = 'i';
    }

    if (this.lengthName) {
      this.saveArgument(this.lengthName);
    } else {
      this.lengthName = 'len';
    }
  }

  _inherits(ForNode, _NewNode);

  _createClass(ForNode, [{
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var re = [];
      var lastRoot = this.getLastRoot();
      var itemName = this.itemName;
      var indexName = this.indexName;
      var lengthName = this.lengthName;
      var condition = this.condition;

      var args = this.getArguments();
      var id = this.getId();
      var lineId = this.getLineId();
      var valueId = lastRoot.getValueId();

      re.push('\n      var $line = doms.' + lineId + ';\n      var lastLength = last.' + valueId + ';\n      var list = ' + condition + ';\n      var ' + indexName + ' = 0;\n      var ' + lengthName + ' = list.length;\n      var item, et;\n      for (; ' + indexName + ' < ' + lengthName + '; ' + indexName + '++) {\n        ' + itemName + ' = list[' + indexName + '];\n        et = doms[\'' + id + '_\' + ' + indexName + '];\n        if (!et) {\n          doms[\'' + id + '_\' + ' + indexName + '] = et = new ' + this.templateName + '();\n        }\n        if (!lastLength || lastLength < ' + indexName + ') {\n          _util.before($line, et.get());\n        }\n        et.update(' + args.join(',') + ');\n      }\n      last.' + valueId + ' = ' + indexName + ';\n      for (; ' + indexName + ' < lastLength; ' + indexName + '++) {\n        et = doms[\'' + id + '_\' + ' + indexName + '];\n        et.remove();\n      }\n    ');
      return re;
    }
  }]);

  return ForNode;
})(NewNode);

module.exports = ForNode;