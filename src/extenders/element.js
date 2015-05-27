'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');
var valueHandler = require('./value');

module.exports = _.extend({}, _prototype, {
  deliverCreate: function compileCreate() {
    var re = [];
    var attributes = this.attributes;
    var nodeName = this.nodeName.toUpperCase();
    var id = this.getId();

    if (!nodeName) {
      throw new Error('The nodeName of dom is not found.');
    }

    if (!attributes || _.isEmpty(attributes)) {
      re.push(`var ${id} = _util.createElement('${nodeName}');`);
    } else {
      re.push(`var ${id} = _util.createElement('${nodeName}', ${JSON.stringify(attributes)});`);
    }
    re.push(`doms.${id} = ${id};`);

    if (this.checkRoot()) {
      re.push(`rootIds.push('${id}');`);
      re.push(`root.${id} = ${id};`);
    }
    return re;
  },
  deliverUpdate: function compileUpdate() {
    var re = [];
    var id = this.getId();
    var expressions = this.expressions || [];
    var lastRoot = this.getLastRoot();
    var valueId, setList, removeList, attributes, i, len, key, attrValue, expression, valueString;

    if (!lastRoot) {
      throw new Error('Could not found the root dom.');
    }

    if (expressions.length) {
      re.push(`var ${id} = doms.${id};`);
      for (i = 0, len = expressions.length; i < len; i++) {
        expression = expressions[i];
        attributes = expression.attributes || {};


        setList = [];
        removeList = [];
        for (key in attributes) {
          attrValue = attributes[key];
          valueId = lastRoot.getValueId();
          valueString = valueHandler.compileValue(attrValue);

          setList.push(`
            var tmpValue = ${valueString};
            if (last.${valueId} !== tmpValue) {
              last.${valueId} = tmpValue;
              _util.setAttribute(${id}, '${key}', tmpValue);
            }
          `);
          removeList.push(`
            _util.removeAttribute(${id}, '${key}');
          `);
        }

        if (expression.condition) {
          // 处理带条件的属性
          valueId = lastRoot.getValueId();
          re.push(`
            if (${expression.condition}) {
              last.${valueId} = 0;
              ${setList.join('\n')}
            } else {
              if (last.${valueId} !== 1) {
                last.${valueId} = 1;
                ${removeList.join('\n')}
              }
            }
          `);
        } else {
          re = re.concat(setList);
        }
      }
    }

    return re;
  }
});
