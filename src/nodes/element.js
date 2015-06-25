'use strict';

var Basic = require('./basic');

var _ = require('../util');
var worker = require('../worker');
var elementParser = require('../parsers/element');
var valueParser = require('../parsers/value');
var conditionParser = require('../parsers/condition');

class Element extends Basic {
  constructor(source, options = {}) {
    super(source, options);
    this.nodeType = 1;
    this.expressions = [];
    this.parseExpresions(options.expressions);
  }
  parse(source) {
    var tinyNode = elementParser.parse(source);
    this.attributes = tinyNode.attributes;
    this.nodeName = tinyNode.nodeName;
  }
  parseExpresions(expressions) {
    var newExpressions = [];
    var self = this;
    _.each(expressions, (expression) => {
      var child = expression.children[0];
      var source = (child && child.source) || '';
      var tinyNode = elementParser.parse(`<div ${source}>`);
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
      if (this.isErraticValue(value)) {
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
        isErratic: this.isErraticValue(value),
        value: value,
        valueString: valueParser.parse(value)
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
