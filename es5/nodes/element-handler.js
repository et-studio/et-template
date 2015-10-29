'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _parsersCondition = require('../parsers/condition');

var _parsersCondition2 = _interopRequireDefault(_parsersCondition);

var _parsersElement = require('../parsers/element');

var _parsersElement2 = _interopRequireDefault(_parsersElement);

// It is just support the if expression.
var handler = {
  parse: function parse(expressions) {
    var results = [];
    var _this = this;
    _util2['default'].each(expressions, function (expression) {
      var cNode = _parsersCondition2['default'].parse(expression.source);

      if (expression.children.length === 1) {
        var items1 = _this.parseSingle(cNode.condition, expression.children[0]);
        if (items1.length) results.push(items1);
      } else if (expression.children.length > 1) {
        var items2 = _this.parseMultiple(cNode.condition, expression.children);
        if (items2.length) results.push(items2);
      }
    });
    return results;
  },
  createItem: function createItem(tag, condition, attributes, exclusions) {
    return {
      tag: tag,
      condition: condition || '',
      attributes: attributes || {},
      exclusions: exclusions || []
    };
  },
  parseSingle: function parseSingle(condition, node) {
    var items = [];
    var source = node.source || '';
    var tNode = _parsersElement2['default'].parse('<div ' + source + '>', this.options);

    var attrs = tNode.attributes;
    var attrKeys = Object.keys(attrs);
    if (attrKeys.length) {
      items.push(this.createItem('if', condition, attrs));
      items.push(this.createItem('else', null, null, attrKeys));
    }
    return items;
  },
  parseMultiple: function parseMultiple(condition, nodes) {
    var _this2 = this;

    var results = [];
    var hasElse = false;
    var allAttributes = {};

    // parse all attributes
    var item = this.createItem('if', condition);
    results.push(item);
    var parseHandler = function parseHandler(node) {
      if (node.source.indexOf('[#') === 0) {
        var cNode = _parsersCondition2['default'].parse(node.source);
        if (cNode.tag === 'else') {
          item = _this2.createItem(cNode.tag);
          hasElse = true;
        } else {
          item = _this2.createItem(cNode.tag, cNode.condition);
        }
        results.push(item);
      } else {
        var tNode = _parsersElement2['default'].parse('<div ' + node.source + '>');
        _util2['default'].extend(allAttributes, tNode.attributes);
        _util2['default'].extend(item.attributes, tNode.attributes);
      }
    };
    _util2['default'].each(nodes, parseHandler);
    if (!hasElse) item.push(this.createItem('else'));

    // calculete exclusions
    var exclusionHandler = function exclusionHandler(item) {
      item.exclusions = Object.keys(_util2['default'].omit(allAttributes, item.attributes));
    };
    _util2['default'].each(results, exclusionHandler);
    return results;
  }
};

exports['default'] = handler;
module.exports = exports['default'];