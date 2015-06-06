'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Cache = require('./cache');
var _ = require('../util');

var Getter = (function (_Cache) {
  function Getter() {
    _classCallCheck(this, Getter);

    if (_Cache != null) {
      _Cache.apply(this, arguments);
    }
  }

  _inherits(Getter, _Cache);

  _createClass(Getter, [{
    key: 'getId',
    value: function getId() {
      return this.id;
    }
  }, {
    key: 'getLineId',
    value: function getLineId() {
      var config = this.config || {};
      return '' + this.id + '' + config.spilitMark + '' + config.lineSuffix;
    }
  }, {
    key: 'getValueId',
    value: function getValueId() {
      var config = this.config || {};
      if (!this.valueId) {
        this.valueId = 0;
      }
      this.valueId++;
      return '' + config.valuePrefix + '' + config.spilitMark + '' + this.valueId;
    }
  }, {
    key: 'getParentId',
    value: function getParentId() {
      return this.parent && this.parent.getId();
    }
  }, {
    key: 'getNodeName',
    value: function getNodeName() {
      return this.nodeName && this.nodeName.toUpperCase();
    }
  }, {
    key: 'getTextContent',
    value: function getTextContent() {
      return this.textContent || this.content;
    }
  }, {
    key: 'getPosterity',
    value: function getPosterity() {
      var doms, children, child, i, len, cacheValue, cacheKey;

      cacheKey = 'getPosterity';
      cacheValue = this.getCache(cacheKey);
      if (cacheValue) {
        return cacheValue;
      }

      doms = [];
      children = this.children || [];
      for (i = 0, len = children.length; i < len; i++) {
        child = children[i];
        if (child) {
          doms.push(child);
          _.concat(doms, child.getPosterity());
        }
      }

      this.saveCache(cacheKey, doms);
      return doms;
    }
  }, {
    key: 'getLastRoot',
    value: function getLastRoot() {
      var current = this.parent;
      while (current) {
        if (current.isNewTemplate) {
          return current;
        }
        if (!current.parent) {
          return current;
        }
        current = current.parent;
      }
      return null;
    }
  }]);

  return Getter;
})(Cache);

module.exports = Getter;