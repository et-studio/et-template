'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var config = {
  'templateFunctionPrefix': 'Template',
  'spilitMark': '_',
  'lineSuffix': 'line',
  'idPrefix': 'et',
  'valuePrefix': 'value'
};

var Getter = (function () {
  function Getter() {
    _classCallCheck(this, Getter);

    this.valueId = 0;
  }

  _createClass(Getter, [{
    key: 'getId',
    value: function getId() {
      if (this._index >= 0) {
        return '' + config.idPrefix + this._index;
      } else {
        return null;
      }
    }
  }, {
    key: 'getLineNumber',
    value: function getLineNumber() {
      return this._lineNumber;
    }
  }, {
    key: 'getTemplateName',
    value: function getTemplateName() {
      var id = this.getId();
      return '' + config.templateFunctionPrefix + config.spilitMark + id;
    }
  }, {
    key: 'getLineId',
    value: function getLineId() {
      var id = this.getId();
      return '' + id + config.spilitMark + config.lineSuffix;
    }
  }, {
    key: 'getValueId',
    value: function getValueId() {
      var valueId = this.valueId++;
      return '' + config.valuePrefix + config.spilitMark + valueId;
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
      return this.textContent || this.content || '';
    }
  }, {
    key: 'getRootValueId',
    value: function getRootValueId() {
      var lastRoot = this.getLastRoot();
      if (lastRoot) {
        return lastRoot.getValueId();
      } else {
        return null;
      }
    }
  }, {
    key: 'getLastRoot',
    value: function getLastRoot() {
      var parent = this.parent;
      while (parent) {
        if (parent.isNewTemplate || !parent.parent) {
          return parent;
        }
        parent = parent.parent;
      }
      return null;
    }
  }]);

  return Getter;
})();

exports['default'] = Getter;
module.exports = exports['default'];