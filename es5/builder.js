'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var Builder = (function () {
  function Builder() {
    _classCallCheck(this, Builder);
  }

  _createClass(Builder, [{
    key: 'rebuild',
    value: function rebuild(node) {
      while (this.rebuildAll(node)) {}
      return node;
    }
  }, {
    key: 'rebuildAll',
    value: function rebuildAll(node) {
      var _this = this;

      var isChangeConstructor = false;
      node.each(function (currentNode) {
        switch (currentNode.nodeName) {
          case '#if':
            isChangeConstructor = _this.rebuildIfNode(currentNode);
            if (isChangeConstructor) return false; // break each loop
            break;
        }
      });
      return isChangeConstructor;
    }
  }, {
    key: 'rebuildIfNode',
    value: function rebuildIfNode(node) {
      var isChangeConstructor = false;

      var children = node.children;
      node.children = [];
      var currentNode = node;
      _util2['default'].each(children, function (child) {
        if (child.nodeName === '#elseif' || child.nodeName === '#else') {
          currentNode.after(child);
          currentNode = child;
          isChangeConstructor = true;
        } else {
          currentNode.append(child);
        }
      });
      return isChangeConstructor;
    }
  }]);

  return Builder;
})();

exports['default'] = new Builder();
module.exports = exports['default'];