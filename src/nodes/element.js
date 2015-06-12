'use strict';

var _ = require('../util');
var valueHandler = require('./value');
var Basic = require('./basic');
var worker = require('../worker');

class Element extends Basic {
  deliverCreate() {
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      parentId: this.getParentId(),
      nodeName: this.getNodeName(),
      attributes: this.getAttributesMap()
    }
    return [worker.createElement(it)];
  }
  getAttributesMap() {
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
  deliverUpdate() {
    var it = {
      id: this.getId(),
      erraticAttributes: this.getErraticAttributes(),
      expressions: this.translateExpressions()
    }
    return [worker.updateAttributes(it)];
  }
  getErraticAttributes() {
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
  translateExpressions() {
    var re = [];
    var self = this;
    _.each(this.expressions, (expression) => {
      re.push({
        condition: expression.condition,
        valueId: self.getRootValueId(),
        attributes: self.translateAttributesToExpressions(expression.attributes)
      })
    });
    return re;
  }
  translateAttributesToExpressions(attrs) {
    var re = [];
    for (var key in attrs) {
      var value = attrs[key];
      var tmp = {
        key: key,
        isErratic: valueHandler.isErraticValue(value),
        value: value,
        valueString: valueHandler.compileValue(value)
      }
      if (tmp.isErratic) {
        tmp.valueId = this.getRootValueId();
      }
      re.push(tmp);
    }
    return re;
  }
}

module.exports = Element;
