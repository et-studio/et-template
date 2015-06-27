'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var nodes = {};
nodes._element = require('./element');
nodes._text = require('./text');
nodes._comment = require('./comment');
nodes._base = require('./basic');
nodes['#if'] = require('./if');
nodes['#elseif'] = require('./elseif');
nodes['#else'] = require('./else');
nodes['#for'] = require('./for');

var Factory = (function () {
  function Factory() {
    _classCallCheck(this, Factory);
  }

  _createClass(Factory, [{
    key: 'create',

    /**
     * options
     * - index
     * - parent
     * - previous
     * - expressions
     * - lineNumber
     */
    value: function create(source) {
      var options = arguments[1] === undefined ? {} : arguments[1];

      var parent = options.parent;
      var previous = options.previous;

      var Constructor = this.findConstuctor(source);
      var node = new Constructor(source, options);

      if (parent) {
        parent.children.push(node);
      }
      if (previous) {
        previous.next = node;
      }
      return node;
    }
  }, {
    key: 'getNodeName',
    value: function getNodeName(source) {
      if (!source) {
        return '';
      } else if (source.indexOf('<!--') === 0) {
        return '!--';
      } else if (source.indexOf('<') === 0) {
        var regHtml = /^<(\S*)[ >]/;
        return regHtml.exec(source)[1] || '';
      } else if (source.indexOf('[') === 0) {
        var regET = /^\[(\S*)[ \]]/;
        return regET.exec(source)[1] || '';
      }
      return '';
    }
  }, {
    key: 'findConstuctor',
    value: function findConstuctor(source) {
      var nodeName = this.getNodeName(source).toLowerCase();
      var Constructor = null;

      if (!source) {
        Constructor = nodes._base;
      } else if (!nodeName) {
        Constructor = nodes._text;
      } else if (nodeName === '!--') {
        Constructor = nodes._comment;
      } else if (nodeName.indexOf('#') === 0) {
        Constructor = nodes[nodeName];
      } else {
        Constructor = nodes._element;
      }

      if (!Constructor) {
        Constructor = nodes._base;
      }
      return Constructor;
    }
  }]);

  return Factory;
})();

module.exports = new Factory();