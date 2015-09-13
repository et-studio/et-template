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

var _elementHandler = require('./element-handler');

var _elementHandler2 = _interopRequireDefault(_elementHandler);

var ET_MODEL = 'et-model';
var PROPERTIY_SET = {
  'INPUT': ['value'],
  'TEXTAREA': ['value']
};

var Element = (function (_Basic) {
  _inherits(Element, _Basic);

  function Element(source) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Element);

    _get(Object.getPrototypeOf(Element.prototype), 'constructor', this).call(this, source, options);

    this.nodeType = 1;
    this.isVirtualNode = false;
    this.expressions = _elementHandler2['default'].parse(options.expressions);
  }

  // 这部分方法和代码是为初始化的时候写的

  _createClass(Element, [{
    key: 'parse',
    value: function parse(source) {
      var tinyNode = _parsersElement2['default'].parse(source, this.options);
      this.modelKey = tinyNode.attributes[ET_MODEL];
      if (this.modelKey) {
        var isObject = this.options.modelType === 'object';
        var isMiddleBrackets = this.modelKey[0] === '[' && this.modelKey[this.modelKey.lenth - 1] === ']';

        if (isObject && !isMiddleBrackets) {
          this.modelKey = '.' + this.modelKey;
        }
      }

      if (this.modelKey) delete tinyNode.attributes[ET_MODEL];
      this.attributes = tinyNode.attributes;
      this.nodeName = tinyNode.nodeName.toUpperCase();
    }

    // 接下来的方法都是一些外部或者内部使用的辅助方法
  }, {
    key: 'getResidentAttributes',
    value: function getResidentAttributes() {
      // 获取那些固定的 不是动态的属性
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
  }, {
    key: 'getErraticAttributes',
    value: function getErraticAttributes() {
      // 获取那些动态的属性
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
  }, {
    key: 'translateExpressions',
    value: function translateExpressions() {
      // 将条件表达式转换成为work对象使用的数据
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
  }, {
    key: 'translateAttributesToCode',
    value: function translateAttributesToCode(attrs) {
      // 判断动态属性 并且添加函数判断和设置
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

    // 这部分代码是为编译的时候写的
  }, {
    key: 'assembleWrokerData',
    value: function assembleWrokerData() {
      var it = this._workerData;
      if (it) return it;

      var set = this.getResidentAttributes();
      this._workerData = it = {
        id: this.getId(),
        isRoot: this.checkRoot(),
        parentId: this.parentId,
        nodeName: this.getNodeName(),
        modelKey: this.modelKey,
        modelType: this.options.modelType,

        attributes: set.attributes,
        properties: set.properties,
        erraticAttributes: this.getErraticAttributes(),
        expressions: this.translateExpressions()
      };
      return it;
    }
  }, {
    key: 'deliverCreate',
    value: function deliverCreate() {
      var results = this.getChildrenCreate();
      var it = this.assembleWrokerData();
      results.unshift(_worker2['default'].element_create(it));
      return results;
    }
  }, {
    key: 'deliverAppend',
    value: function deliverAppend() {
      var results = this.getChildrenAppend();
      var it = this.assembleWrokerData();
      results.unshift(_worker2['default'].element_append(it));
      return results;
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var results = this.getChildrenUpdate();
      var it = this.assembleWrokerData();
      var updateStr = _worker2['default'].element_update(it);
      if (updateStr) results.unshift(updateStr);
      return results;
    }
  }, {
    key: 'deliverRemove',
    value: function deliverRemove() {
      var it = this.assembleWrokerData();
      return [_worker2['default'].element_remove(it)];
    }
  }]);

  return Element;
})(_basic2['default']);

exports['default'] = Element;
module.exports = exports['default'];