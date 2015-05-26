'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');

module.exports = _.extend({}, _prototype, {
  deliverCreate: function compileCreate() {
    var re = [''];
    var attributes = this.attributes;
    var nodeName = this.nodeName.toUpperCase();
    var id = this.getId();

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
      re.push('root.' + id + ' = ' + id + ';');
    }
    return re;
  },
  deliverUpdate: function compileUpdate() {
    var re = [];
    var id = this.getId();
    var expressions = this.expressions || [];
    var lastRoot = this.getLastRoot();
    var valueId, setList, removeList, attributes, i, len, key, attrValue, expression;

    if (!lastRoot) {
      throw new Error('Could not found the root dom.');
    }

    if (expressions.length) {
      re.push('var ' + id + ' = doms.' + id + ';');
      for (i = 0, len = expressions.length; i < len; i++) {
        expression = expressions[i];
        attributes = expression.attributes || {};

        setList = [];
        removeList = [];
        for (key in attributes) {
          attrValue = attributes[key];
          valueId = this.getValueId();

          setList.push('\n            if (last.' + valueId + ' !== \'' + attrValue + '\') {\n              last.' + valueId + ' = \'' + attrValue + '\';\n              _util.setAttribute(' + id + ', \'' + key + '\', last.' + valueId + ');\n            }\n          ');
          removeList.push('\n            _util.removeAttribute(' + id + ', \'' + key + '\');\n          ');
        }

        if (expression.condition) {
          // 处理带条件的属性
          valueId = this.getValueId();
          re.push('\n            if (' + expression.condition + ') {\n              last.' + valueId + ' = 0;\n              ' + setList.join('\n') + '\n            } else {\n              if (last.' + valueId + ' !== 1) {\n                last.' + valueId + ' = 1;\n                ' + removeList.join('\n') + '\n              }\n            }\n          ');
        } else {
          // TODO: 处理直接值
          re = re.concat(setList);
        }
      }
    }

    return re;
  }
});