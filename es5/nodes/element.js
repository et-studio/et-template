'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ = require('../util');
var valueHandler = require('./value');
var Basic = require('./basic');
var worker = require('../worker');

var Element = (function (_Basic) {
  function Element() {
    _classCallCheck(this, Element);

    if (_Basic != null) {
      _Basic.apply(this, arguments);
    }
  }

  _inherits(Element, _Basic);

  _createClass(Element, [{
    key: 'deliverCreate',
    value: function deliverCreate() {
      var it = {
        id: this.getId(),
        isRoot: this.checkRoot(),
        parentId: this.getParentId(),
        nodeName: this.getNodeName(),
        attributes: this.getAttributesMap()
      };
      return [worker.createElement(it)];
    }
  }, {
    key: 'getAttributesMap',
    value: function getAttributesMap() {
      var re = {};
      var isEmpty = true;
      var attrs = this.attributes;
      for (var key in attrs) {
        var value = attrs[key];
        if (!valueHandler.isErraticValue(value)) {
          re[key] = value;
          isEmpty = false;
        }
      }
      if (isEmpty) {
        return null;
      } else {
        return re;
      }
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var it = {
        id: this.getId(),
        erraticAttributes: this.getErraticAttributes(),
        expressions: this.translateExpressions()
      };
      return [worker.updateAttributes(it)];
    }
  }, {
    key: 'getErraticAttributes',
    value: function getErraticAttributes() {
      var attrs = this.attributes;
      var erracticMap = {};
      for (var key in attrs) {
        var value = attrs[key];
        if (valueHandler.isErraticValue(value)) {
          erracticMap[key] = value;
        }
      }
      return this.translateAttributesToExpressions(erracticMap);
    }
  }, {
    key: 'translateExpressions',
    value: function translateExpressions() {
      var re = [];
      var self = this;
      _.each(this.expressions, function (expression) {
        re.push({
          condition: expression.condition,
          valueId: self.getRootValueId(),
          attributes: self.translateAttributesToExpressions(expression.attributes)
        });
      });
      return re;
    }
  }, {
    key: 'translateAttributesToExpressions',
    value: function translateAttributesToExpressions(attrs) {
      var re = [];
      for (var key in attrs) {
        var value = attrs[key];
        var tmp = {
          key: key,
          isErratic: valueHandler.isErraticValue(value),
          value: value,
          valueString: valueHandler.compileValue(value)
        };
        if (tmp.isErratic) {
          tmp.valueId = this.getRootValueId();
        }
        re.push(tmp);
      }
      return re;
    }
  }]);

  return Element;
})(Basic);

module.exports = Element;