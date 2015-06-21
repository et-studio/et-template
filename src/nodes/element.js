'use strict';

var _ = require('../util');
var Basic = require('./basic');
var Machine = require('../machine');
var valueHandler = require('./value');
var worker = require('../worker');

// @tableStart: element
var elementTableOptions = {
  states: ['start', 'name', 'scan', 'key', 'valueStart', 'value', 'value\'', 'value\"', '_str', 'valueStr', 'end'],
  symbols: ['<', '>', '\\\"', '\"', '\\\'', '\'', '=', ' ', '{{', '}}'],
  table: [
    {
      '0': 'start',
      '1': '',
      '2': '',
      '3': '',
      '4': '',
      '5': '',
      '6': '',
      '7': '',
      '8': '',
      '9': '',
      '-1': 'name'
    },
    {
      '0': '',
      '1': 'end',
      '2': '',
      '3': '',
      '4': '',
      '5': '',
      '6': '',
      '7': 'scan',
      '8': '',
      '9': '',
      '-1': 'name'
    },
    {
      '0': '',
      '1': 'end',
      '2': '',
      '3': '',
      '4': '',
      '5': '',
      '6': 'valueStart',
      '7': 'scan',
      '8': '',
      '9': '',
      '-1': 'key'
    },
    {
      '0': '',
      '1': '',
      '2': '',
      '3': '',
      '4': '',
      '5': '',
      '6': 'valueStart',
      '7': '',
      '8': '',
      '9': '',
      '-1': 'key'
    },
    {
      '0': '',
      '1': '',
      '2': '',
      '3': 'value\"',
      '4': '',
      '5': 'value\'',
      '6': '',
      '7': 'valueStart',
      '8': 'valueStr',
      '9': '',
      '-1': 'value'
    },
    {
      '0': 'value',
      '1': 'end',
      '2': 'value',
      '3': 'value',
      '4': 'value',
      '5': 'value',
      '6': 'value',
      '7': 'scan',
      '8': '_str',
      '9': 'value',
      '-1': 'value'
    },
    {
      '0': 'value\'',
      '1': 'value\'',
      '2': 'value\'',
      '3': 'value\'',
      '4': 'value\'',
      '5': 'scan',
      '6': 'value\'',
      '7': 'value\'',
      '8': '_str',
      '9': 'value\'',
      '-1': 'value\''
    },
    {
      '0': 'value\"',
      '1': 'value\"',
      '2': 'value\"',
      '3': 'scan',
      '4': 'value\"',
      '5': 'value\"',
      '6': 'value\"',
      '7': 'value\"',
      '8': '_str',
      '9': 'value\"',
      '-1': 'value\"'
    },
    {
      '0': '_str',
      '1': '_str',
      '2': '_str',
      '3': '_str',
      '4': '_str',
      '5': '_str',
      '6': '_str',
      '7': '_str',
      '8': '_str',
      '9': '_last',
      '-1': '_str'
    },
    {
      '0': 'valueStr',
      '1': 'valueStr',
      '2': 'valueStr',
      '3': 'valueStr',
      '4': 'valueStr',
      '5': 'valueStr',
      '6': 'valueStr',
      '7': 'valueStr',
      '8': 'valueStr',
      '9': 'value',
      '-1': 'valueStr'
    },
    {
      '0': '',
      '1': '',
      '2': '',
      '3': '',
      '4': '',
      '5': '',
      '6': '',
      '7': '',
      '8': '',
      '9': '',
      '-1': ''
    }
  ]
};
// @tableStart: condition
var conditionTableOptions = {
  states: ['start', 'name', 'condition'],
  symbols: ['[', ' '],
  table: [
    {
      '0': 'start',
      '1': '',
      '-1': 'name'
    },
    {
      '0': '',
      '1': 'condition',
      '-1': 'name'
    },
    {
      '0': 'condition',
      '1': 'condition',
      '-1': 'condition'
    }
  ]
};
// @tableEnd

var elementMachine = new Machine(elementTableOptions);
var conditionMachine = new Machine(conditionTableOptions);

class Element extends Basic {
  constructor(source, options = {}) {
    super(source, options);
    this.parseExpresions(options.expressions);
    this.nodeType = 1;
  }
  parseSource(source) {
    var tinyNode = this.translateSource(source);
    this.attributes = tinyNode.attributes;
    this.nodeName = tinyNode.nodeName;
  }
  parseExpresions(expressions) {
    var newExpressions = [];
    var self = this;
    _.each(expressions, (expression) => {
      var result = {};

      if (!expression || !expression.children || expression.children.length !== 1) {
        self.throwError();
      }
      var child = expression.children[0];
      if (child.children.length !== 0) {
        self.throwError();
      }
      var source = child.source;
      if (source) {
        var tinyNode = self.translateSource(`<div ${source}>`);
        result.attributes = tinyNode.attributes;
      }

      if (_.isEmpty(result.attributes)) {
        return;
      }

      var nodeName = '';
      var condition = '';
      var lastToken = '';
      conditionMachine.each(expression.source, (state, token) => {
        lastToken = token;
        switch (state) {
          case 'start':
            break;
          case 'name':
            nodeName += token;
            break;
          case 'condition':
            condition += token;
            break;
          default:
            self.throwError();
        }
      });
      if (lastToken !== ']') {
        self.throwError();
      }
      if (nodeName.toLowerCase() !== '#if') {
        self.throwError();
      }
      condition = condition.substr(0, condition.length - 1);
      condition = condition.trim();
      if (!condition) {
        self.throwError();
      }
      result.condition = condition;

      newExpressions.push(result);
    });
    this.expressions = newExpressions;
  }
  translateSource(source) {
    var self = this;
    var lastState;

    var attrs = [];
    var attrKey = '';
    var attrValue = '';
    var str = '';
    var nodeName = '';
    elementMachine.each(source, (state, token) => {
      lastState = state;
      switch (state) {
        case 'start':
        case 'end':
          break;
        case 'name':
          nodeName += token;
          break;
        case 'scan':
          if (attrKey) {
            attrs.push({
              key: attrKey
            });
            attrKey = '';
          }
          if (attrValue) {
            var attr = attrs.pop();
            if (!attr || !attr.key || attr.value) {
              self.throwError();
            }
            attr.value = attrValue;
            attrs.push(attr);
            attrValue = '';
          }
          break;
        case 'key':
          attrKey += token;
          break;
        case 'valueStart':
          if (attrKey) {
            attrs.push({
              key: attrKey
            });
            attrKey = '';
          }
          break;
        case 'value':
          if (str) {
            attrValue += str;
            str = '';
          }
          attrValue += token;
          break;
        case 'value\'':
          if (str) {
            attrValue += str;
            str = '';
          }
          attrValue += token;
          if (attrValue.indexOf('\'') === 0) {
            attrValue = attrValue.substr(1);
          }
          break;
        case 'value\"':
          if (str) {
            attrValue += str;
            str = '';
          }
          attrValue += token;
          if (attrValue.indexOf('\"') === 0) {
            attrValue = attrValue.substr(1);
          }
          break;
        case 'valueStr':
        case '_str':
          str += token;
          break;
        default:
          self.throwError(state);
      }
    });
    if (lastState !== 'end') {
      self.throwError();
    }
    if (attrKey) {
      attrs.push({
        key: attrKey
      });
      attrKey = '';
    }
    if (attrValue) {
      var attr = attrs.pop();
      if (!attr || !attr.key || attr.value) {
        self.throwError();
      }
      attr.value = attrValue;
      attrs.push(attr);
    }

    var attrMap = {};
    attrs.forEach((attr) => {
      if (!attr.key) {
        self.throwError();
      }
      attrMap[attr.key] = attr.value || '';
    });

    return {
      nodeName: nodeName.toUpperCase(),
      attributes: attrMap
    }
  }
  throwError(code) {
    var line = this.getLineNumber();
    throw new Error(`Unrecognized element format at line: ${line}.`);
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
