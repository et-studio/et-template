'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ = require('../util');
var valueHandler = require('./value');
var Basic = require('./basic');

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
      var re = [''];
      var attributes = this.attributes;
      var nodeName = this.getNodeName();
      var id = this.getId();
      var parentId = this.getParentId();

      if (!nodeName) {
        throw new Error('The nodeName of dom is not found.');
      }

      if (!attributes || _.isEmpty(attributes)) {
        re.push('var ' + id + ' = _util.createElement(\'' + nodeName + '\');');
      } else {
        re.push('var ' + id + ' = _util.createElement(\'' + nodeName + '\', ' + JSON.stringify(attributes) + ');');
      }
      re.push('doms.' + id + ' = ' + id + ';');

      if (this.checkRoot()) {
        re.push('rootIds.push(\'' + id + '\');');
        re.push('roots.' + id + ' = ' + id + ';');
      } else {
        re.push('_util.appendChild(' + parentId + ', ' + id + ');');
      }
      return re;
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var _this = this;

      var re = [''];
      var id = this.getId();
      var expressions = this.expressions || [];
      var lastRoot = this.getLastRoot();

      if (!lastRoot) {
        throw new Error('Could not found the root dom.');
      }

      if (expressions.length) {
        re.push('var ' + id + ' = doms.' + id + ';');
        _.each(expressions, this, function (expression) {
          var set, valueId;

          set = _this.getListSet(expression.attributes, id, lastRoot);
          if (expression.condition) {
            // 处理带条件的属性
            valueId = lastRoot.getValueId();
            re.push('\n            if (' + expression.condition + ') {\n              ' + _this.assembleSetString(valueId, 0, set.setList) + '\n              ' + set.updateList.join('\n') + '\n            } else {\n              if (last.' + valueId + ' !== 1) {\n                last.' + valueId + ' = 1;\n                ' + set.removeList.join('\n') + '\n              }\n            }\n          ');
          } else {
            _.concat(re, set.updateList);
          }
        });
      }
      return re;
    }
  }, {
    key: 'assembleSetString',
    value: function assembleSetString(valueId, valueIndex, setList) {
      var re = '';
      if (setList.length) {
        return 'if (last.' + valueId + ' !== ' + valueIndex + '){\n        last.' + valueId + ' = ' + valueIndex + ';\n        ' + setList.join('\n') + '\n      }';
      }
      return re;
    }
  }, {
    key: 'getListSet',
    value: function getListSet(attributes, id, lastRoot) {
      var setList, updateList, removeList, valueId, attrValue, valueString, key;

      setList = [];
      updateList = [];
      removeList = [];

      for (key in attributes) {
        attrValue = attributes[key];
        if (valueHandler.isErraticValue(attrValue)) {
          valueId = lastRoot.getValueId();
          valueString = valueHandler.compileValue(attrValue);
          updateList.push('\n          var tmpValue = ' + valueString + ';\n          if (last.' + valueId + ' !== tmpValue) {\n            last.' + valueId + ' = tmpValue;\n            _util.setAttribute(' + id + ', \'' + key + '\', tmpValue);\n          }\n        ');
        } else {
          setList.push('\n          _util.setAttribute(' + id + ', \'' + key + '\', \'' + attrValue + '\');\n        ');
        }
        removeList.push('\n        _util.removeAttribute(' + id + ', \'' + key + '\');\n      ');
      }

      return {
        setList: setList,
        updateList: updateList,
        removeList: removeList
      };
    }
  }]);

  return Element;
})(Basic);

module.exports = Element;