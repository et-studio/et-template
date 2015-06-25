'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Basic = require('./basic');
var _ = require('../util');
var worker = require('../worker');
var conditionParser = require('../parsers/condition');

var IfNode = (function (_Basic) {
  function IfNode(source, options) {
    _classCallCheck(this, IfNode);

    _get(Object.getPrototypeOf(IfNode.prototype), 'constructor', this).call(this, source, options);
    this.isNewTemplate = true;
  }

  _inherits(IfNode, _Basic);

  _createClass(IfNode, [{
    key: 'parse',
    value: function parse(source) {
      var tmp = conditionParser.parse(source, {
        expectNodeName: '#if'
      });
      this.nodeName = tmp.nodeName;
      this.condition = tmp.condition;
    }
  }, {
    key: 'init',
    value: function init() {
      // 调整elseif 和 else的树形关系
      var children = this.children;
      this.children = [];

      var currentNode = this;
      _.each(children, function (child) {
        if (child.nodeName === '#elseif' || child.nodeName === '#else') {
          currentNode.after(child);
          currentNode = child;
        } else {
          currentNode.appendChild(child);
        }
      });
    }
  }, {
    key: 'deliverCreate',
    value: function deliverCreate() {
      var it = {
        id: this.getId(),
        isRoot: this.checkRoot(),
        lineId: this.getLineId(),
        parentId: this.getParentId()
      };
      var re = [];
      re.push(worker.createNull(it));
      re.push(worker.createLine(it));
      return re;
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var lastRoot = this.getLastRoot();
      var it = {
        id: this.getId(),
        lineId: this.getLineId(),
        isRoot: this.checkRoot(),
        indexValueId: lastRoot.getValueId(),
        doms: this.getConditionDoms()
      };
      return [worker.updateIf(it)];
    }
  }, {
    key: 'getConditionDoms',
    value: function getConditionDoms() {
      var re = [this.translateDom(this)];

      var hasElse = false;
      var next = this;
      while (next = next.next) {
        if (next.nodeName === '#elseif' || next.nodeName === '#else') {
          re.push(this.translateDom(next));
        }
        if (next.nodeName === '#else') {
          hasElse = true;
        }
        if (next.nodeName !== '#elseif') {
          break;
        }
      }
      if (!hasElse) {
        var defaultElse = {
          tag: 'else',
          isDefaultElse: true
        };
        defaultElse.siblings = _.concat([], re);
        re.push(defaultElse);
      }

      var self = this;
      _.each(re, function (dom) {
        dom.siblings = self.pickSiblings(re, dom);
      });
      return re;
    }
  }, {
    key: 'translateDom',
    value: function translateDom(dom) {
      return {
        id: dom.getId(),
        isRoot: dom.checkRoot(),
        lineId: dom.getLineId(),
        parentId: dom.getParentId(),
        templateName: dom.getTemplateName(),
        args: dom.getArguments(),
        condition: dom.condition,
        tag: this.getTag(dom.nodeName)
      };
    }
  }, {
    key: 'pickSiblings',
    value: function pickSiblings(doms, current) {
      var siblings = [];
      _.each(doms, function (dom) {
        if (dom.id && dom.id !== current.id) {
          siblings.push(dom);
        }
      });
      return siblings;
    }
  }, {
    key: 'getTag',
    value: function getTag(nodeName) {
      switch (nodeName) {
        case '#if':
          return 'if';
        case '#elseif':
          return 'else if';
        default:
          return 'else';
      }
    }
  }]);

  return IfNode;
})(Basic);

module.exports = IfNode;