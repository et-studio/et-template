'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Basic = require('./basic');

var _ = require('../util');
var worker = require('../worker');
var elementParser = require('../parsers/element');
var valueParser = require('../parsers/value');
var conditionParser = require('../parsers/condition');

var Element = (function (_Basic) {
  function Element(source) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Element);

    _get(Object.getPrototypeOf(Element.prototype), 'constructor', this).call(this, source, options);
    this.nodeType = 1;
    this.expressions = [];
    this.parseExpresions(options.expressions);
  }

  _inherits(Element, _Basic);

  _createClass(Element, [{
    key: 'parse',
    value: function parse(source) {
      var tinyNode = elementParser.parse(source);
      this.attributes = tinyNode.attributes;
      this.nodeName = tinyNode.nodeName;
    }
  }, {
    key: 'parseExpresions',
    value: function parseExpresions(expressions) {
      var newExpressions = [];
      var self = this;
      _.each(expressions, function (expression) {
        var child = expression.children[0];
        var source = child && child.source || '';
        var tinyNode = elementParser.parse('<div ' + source + '>');
        var conditionNode = conditionParser.parse(expression.source);

        if (!_.isEmpty(tinyNode.attributes)) {
          newExpressions.push({
            condition: conditionNode.condition,
            attributes: tinyNode.attributes
          });
        }
      });
      this.expressions = newExpressions;
    }
  }, {
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
        if (!this.isErraticValue(value)) {
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
        if (this.isErraticValue(value)) {
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
          isErratic: this.isErraticValue(value),
          value: value,
          valueString: valueParser.parse(value)
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