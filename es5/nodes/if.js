'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var NewNode = require('./new');
var _ = require('../util');
var worker = require('../worker');
var conditionParser = require('../parsers/condition');

var IfNode = (function (_NewNode) {
  function IfNode() {
    _classCallCheck(this, IfNode);

    if (_NewNode != null) {
      _NewNode.apply(this, arguments);
    }
  }

  _inherits(IfNode, _NewNode);

  _createClass(IfNode, [{
    key: 'parseSource',
    value: function parseSource(source) {
      var tmp = conditionParser.parse(source, {
        expectNodeName: '#if'
      });
      this.nodeName = tmp.nodeName;
      this.condition = tmp.condition;
    }
  }, {
    key: 'addSilbling',
    value: function addSilbling(node) {
      var parent = this.parent;
      var last = parent.children;
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
        templateName: dom.getTemplateName(),
        args: dom.getArguments(),
        tag: this.getTag(dom.nodeName),
        condition: dom.condition
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
})(NewNode);

module.exports = IfNode;