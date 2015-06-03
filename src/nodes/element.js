'use strict';

var _ = require('../util');
var valueHandler = require('./value');
var Basic = require('./basic');

class Element extends Basic {
  deliverCreate() {
    var re = [''];
    var attributes = this.attributes;
    var nodeName = this.getNodeName();
    var id = this.getId();
    var parentId = this.getParentId();

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
      re.push(`roots.${id} = ${id};`);
    } else {
      re.push(`_util.appendChild(${parentId}, ${id});`);
    }
    return re;
  }
  deliverUpdate() {
    var re = [''];
    var id = this.getId();
    var expressions = this.expressions || [];
    var lastRoot = this.getLastRoot();

    if (!lastRoot) {
      throw new Error('Could not found the root dom.');
    }

    if (expressions.length) {
      re.push(`var ${id} = doms.${id};`);
      _.each(expressions, this, (expression) => {
        var set, valueId;

        set = this.getListSet(expression.attributes, id, lastRoot);
        if (expression.condition) {
          // 处理带条件的属性
          valueId = lastRoot.getValueId();
          re.push(`
            if (${expression.condition}) {
              ${this.assembleSetString(valueId, 0, set.setList)}
              ${set.updateList.join('\n')}
            } else {
              if (last.${valueId} !== 1) {
                last.${valueId} = 1;
                ${set.removeList.join('\n')}
              }
            }
          `);
        } else {
          _.concat(re, set.updateList);
        }
      });
    }
    return re;
  }
  assembleSetString(valueId, valueIndex, setList) {
    var re = '';
    if (setList.length) {
      return `if (last.${valueId} !== ${valueIndex}){
        last.${valueId} = ${valueIndex};
        ${setList.join('\n')}
      }`;
    }
    return re;
  }
  getListSet(attributes, id, lastRoot) {
    var setList, updateList, removeList, valueId, attrValue, valueString, key;

    setList = [];
    updateList = [];
    removeList = [];
    
    for (key in attributes) {
      attrValue = attributes[key];
      if (valueHandler.isErraticValue(attrValue)) {
        valueId = lastRoot.getValueId();
        valueString = valueHandler.compileValue(attrValue);
        updateList.push(`
          var tmpValue = ${valueString};
          if (last.${valueId} !== tmpValue) {
            last.${valueId} = tmpValue;
            _util.setAttribute(${id}, '${key}', tmpValue);
          }
        `);
      } else {
        setList.push(`
          _util.setAttribute(${id}, '${key}', '${attrValue}');
        `);
      }
      removeList.push(`
        _util.removeAttribute(${id}, '${key}');
      `);
    }

    return {
      setList: setList,
      updateList: updateList,
      removeList: removeList
    };
  }
}

module.exports = Element;
