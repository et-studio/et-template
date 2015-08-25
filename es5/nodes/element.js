'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _basic = require('./basic');

var _basic2 = _interopRequireDefault(_basic);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _worker = require('../worker');

var _worker2 = _interopRequireDefault(_worker);

var _parsersElement = require('../parsers/element');

var _parsersElement2 = _interopRequireDefault(_parsersElement);

var _parsersValue = require('../parsers/value');

var _parsersValue2 = _interopRequireDefault(_parsersValue);

var _parsersCondition = require('../parsers/condition');

var _parsersCondition2 = _interopRequireDefault(_parsersCondition);

var ET_MODEL = 'et-model';

var Element = (function (_Basic) {
  _inherits(Element, _Basic);

  function Element(source) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Element);

    _get(Object.getPrototypeOf(Element.prototype), 'constructor', this).call(this, source, options);
    this.nodeType = 1;
    this.expressions = [];
    this.parseExpresions(options.expressions);
  }

  _createClass(Element, [{
    key: 'parse',
    value: function parse(source) {
      var tinyNode = _parsersElement2['default'].parse(source, this.options);
      this.modelKey = tinyNode.attributes[ET_MODEL];
      if (this.modelKey) delete tinyNode.attributes[ET_MODEL];
      this.attributes = tinyNode.attributes;
      this.nodeName = tinyNode.nodeName;
    }
  }, {
    key: 'parseExpresions',
    value: function parseExpresions(expressions) {
      var newExpressions = [];
      var _this = this;
      _util2['default'].each(expressions, function (expression) {
        if (expression.children.length === 1) {
          var items1 = _this.parseSingleExpresion(expression);
          if (items1.length) newExpressions.push(items1);
        } else if (expression.children.length > 1) {
          var items2 = _this.parseMultipleExpresion(expression);
          if (items2.length) newExpressions.push(items2);
        }
      });
      this.expressions = newExpressions;
    }
  }, {
    key: 'parseSingleExpresion',
    value: function parseSingleExpresion(expression) {
      var items = [];
      var child = expression.children[0];
      var source = child && child.source || '';
      var tinyNode = _parsersElement2['default'].parse('<div ' + source + '>', this.options);
      var conditionNode = _parsersCondition2['default'].parse(expression.source);

      if (!_util2['default'].isEmpty(tinyNode.attributes)) {
        items.push({
          tag: 'if',
          condition: conditionNode.condition,
          attributes: tinyNode.attributes
        });
        items.push({
          tag: 'else',
          exclusions: Object.keys(tinyNode.attributes)
        });
      }
      return items;
    }
  }, {
    key: 'parseMultipleExpresion',
    value: function parseMultipleExpresion(expression) {
      var items = [];
      var hasElse = false;
      var allAttributes = {};

      var source = null;
      var tinyNode = null;
      var conditionNode = _parsersCondition2['default'].parse(expression.source);
      _util2['default'].each(expression.children, function (child, i) {
        if (i % 2) {
          conditionNode = _parsersCondition2['default'].parse(child.source);
        } else {
          source = child && child.source || '';
          tinyNode = _parsersElement2['default'].parse('<div ' + source + '>');
          _util2['default'].extend(allAttributes, tinyNode.attributes);

          if (conditionNode.tag === 'else') hasElse = true;
          items.push({
            tag: conditionNode.tag,
            condition: conditionNode.condition,
            attributes: tinyNode.attributes
          });
        }
      });
      _util2['default'].each(items, function (item) {
        item.exclusions = Object.keys(_util2['default'].omit(allAttributes, item.attributes));
      });
      if (!hasElse) {
        items.push({
          tag: 'else',
          exclusions: allAttributes
        });
      }
      return items;
    }
  }, {
    key: 'deliverCreate',
    value: function deliverCreate() {
      var it = {
        id: this.getId(),
        isRoot: this.checkRoot(),
        parentId: this.getParentId(),
        nodeName: this.getNodeName(),
        attributes: this.getAttributesMap(),
        modelKey: this.modelKey,
        modelType: this.options.modelType
      };
      return [_worker2['default'].createElement(it)];
    }
  }, {
    key: 'getAttributesMap',
    value: function getAttributesMap() {
      var re = {};
      var isEmpty = true;
      var attrs = this.attributes;
      for (var key in attrs) {
        var value = attrs[key];
        if (!_parsersValue2['default'].isErratic(value)) {
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
      return [_worker2['default'].updateAttributes(it)];
    }
  }, {
    key: 'getErraticAttributes',
    value: function getErraticAttributes() {
      var attrs = this.attributes;
      var erracticMap = {};
      for (var key in attrs) {
        var value = attrs[key];
        if (_parsersValue2['default'].isErratic(value)) {
          erracticMap[key] = value;
        }
      }
      return this.translateAttributesToExpressions(erracticMap);
    }
  }, {
    key: 'translateExpressions',
    value: function translateExpressions() {
      var re = [];
      var _this = this;
      _util2['default'].each(this.expressions, function (items) {
        var newItems = [];
        var valueId = _this.getRootValueId();
        _util2['default'].each(items, function (item) {
          var obj = _util2['default'].pick(item, 'tag', 'exclusions', 'condition');
          obj.valueId = valueId;
          obj.attributes = _this.translateAttributesToExpressions(item.attributes);
          newItems.push(obj);
        });
        re.push(newItems);
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
          isErratic: _parsersValue2['default'].isErratic(value),
          value: value,
          valueString: _parsersValue2['default'].parse(value)
        };
        if (tmp.isErratic) {
          tmp.valueId = this.getRootValueId();
        }
        re.push(tmp);
      }
      return re;
    }
  }, {
    key: 'hasModelKey',
    value: function hasModelKey() {
      return !!this.modelKey;
    }
  }]);

  return Element;
})(_basic2['default']);

exports['default'] = Element;
module.exports = exports['default'];