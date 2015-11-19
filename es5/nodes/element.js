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

var _parsersElement = require('../parsers/element');

var _parsersElement2 = _interopRequireDefault(_parsersElement);

var _parsersValue = require('../parsers/value');

var _parsersValue2 = _interopRequireDefault(_parsersValue);

var _elementHandler = require('./element-handler');

var _elementHandler2 = _interopRequireDefault(_elementHandler);

var NAME_SPACE = 'element';
var PROPERTIY_SET = {
  'INPUT': ['value', 'checked'],
  'TEXTAREA': ['value']
};

var Element = (function (_Basic) {
  _inherits(Element, _Basic);

  function Element(origin, options) {
    _classCallCheck(this, Element);

    _get(Object.getPrototypeOf(Element.prototype), 'constructor', this).call(this, origin, options);

    this.namespace = NAME_SPACE;
    this.output = null;
    this.events = [];
    this.nodeType = 1;
    this.expressions = _elementHandler2['default'].parse(origin.expressions);
  }

  // 这部分方法和代码是为初始化的时候写的

  _createClass(Element, [{
    key: 'parse',
    value: function parse(source) {
      var tinyNode = _parsersElement2['default'].parse(source, this.options);
      this.attributes = tinyNode.attributes;
      this.nodeName = tinyNode.nodeName.toUpperCase();
    }

    // 接下来的方法都是一些外部或者内部使用的辅助方法
    // 获取那些固定的 不是动态的属性
  }, {
    key: 'getResidentAttributes',
    value: function getResidentAttributes() {
      var attributes = {};
      var properties = {};
      var propertiesList = PROPERTIY_SET[this.nodeName] || [];

      var attrs = this.attributes;
      for (var key in attrs) {
        var value = attrs[key];
        var isProperty = propertiesList.indexOf(key) >= 0;
        if (!_parsersValue2['default'].isErratic(value)) {
          if (isProperty) {
            properties[key] = value;
          } else {
            attributes[key] = value;
          }
        }
      }

      return { attributes: attributes, properties: properties };
    }

    // 获取那些动态的属性
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
      return this.translateAttributesToCode(erracticMap);
    }

    // 将条件表达式转换成为work对象使用的数据
  }, {
    key: 'translateExpressions',
    value: function translateExpressions() {
      var results = [];
      var _this = this;
      _util2['default'].each(this.expressions, function (items) {
        var newItems = [];
        var valueId = _this.getRootValueId();
        _util2['default'].each(items, function (item) {
          var obj = _util2['default'].pick(item, 'tag', 'exclusions', 'condition');
          var attrs = _this.translateAttributesToCode(item.attributes);

          obj.valueId = valueId;
          obj.residentAttributes = attrs.filter(function (attr) {
            return !attr.isErratic;
          });
          obj.erraticAttributes = attrs.filter(function (attr) {
            return attr.isErratic;
          });
          newItems.push(obj);
        });
        results.push(newItems);
      });
      return results;
    }

    // 判断动态属性 并且添加函数判断和设置
  }, {
    key: 'translateAttributesToCode',
    value: function translateAttributesToCode(attrs) {
      var results = [];
      var propertis = PROPERTIY_SET[this.nodeName] || [];

      for (var key in attrs) {
        var value = attrs[key];
        var tmp = {
          key: key,
          isErratic: _parsersValue2['default'].isErratic(value),
          isProperty: propertis.indexOf(key) >= 0,
          value: value,
          valueString: _parsersValue2['default'].parse(value)
        };
        if (tmp.isErratic && !tmp.isProperty) {
          tmp.valueId = this.getRootValueId();
        }
        results.push(tmp);
      }
      return results;
    }

    // functions for value output
  }, {
    key: 'setOutput',
    value: function setOutput(expression) {
      this.output = expression;
    }
  }, {
    key: 'getOutput',
    value: function getOutput() {
      return this.output;
    }

    // functions for events
  }, {
    key: 'setEvents',
    value: function setEvents(newEventsMap) {
      _util2['default'].extend(this.events, newEventsMap);
    }
  }, {
    key: 'setEvent',
    value: function setEvent(eventName, expression) {
      var args = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      this.events[eventName] = {
        expression: expression,
        args: args
      };
    }
  }, {
    key: 'getEvents',
    value: function getEvents() {
      return this.events;
    }
  }, {
    key: 'assembleWorkerData',
    value: function assembleWorkerData() {
      var it = this._workerData;
      if (it) return it;

      var set = this.getResidentAttributes();
      this._workerData = it = {
        id: this.getId(),
        isRoot: this.checkRoot(),
        parentId: this.getParentId(),
        nodeName: this.getNodeName(),
        events: this.getEvents(),
        output: this.getOutput(),

        attributes: set.attributes,
        properties: set.properties,
        erraticAttributes: this.getErraticAttributes(),
        expressions: this.translateExpressions()
      };
      return it;
    }
  }]);

  return Element;
})(_basic2['default']);

exports['default'] = Element;
module.exports = exports['default'];