'use strict';

var NewNode = require('./new');
var _ = require('../util');
var worker = require('../worker');
var conditionParser = require('../parsers/condition');

class IfNode extends NewNode {
  parseSource(source) {
    var tmp = conditionParser.parse(source, {
      expectNodeName: '#if'
    });
    this.nodeName = tmp.nodeName;
    this.condition = tmp.condition;
  }
  addSilbling(node) {
    var parent = this.parent;
    var last = parent.children
  }
  init() {
    // 调整elseif 和 else的树形关系
    var children = this.children;
    this.children = [];

    var currentNode = this;
    _.each(children, (child) => {
      if (child.nodeName === '#elseif' || child.nodeName === '#else') {
        currentNode.after(child);
        currentNode = child;
      } else {
        currentNode.appendChild(child);
      }
    });
  }
  deliverUpdate() {
    var lastRoot = this.getLastRoot();
    var it = {
      id: this.getId(),
      lineId: this.getLineId(),
      isRoot: this.checkRoot(),
      indexValueId: lastRoot.getValueId(),
      doms: this.getConditionDoms()
    }
    return [worker.updateIf(it)];
  }
  getConditionDoms() {
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
    _.each(re, (dom) => {
      dom.siblings = self.pickSiblings(re, dom);
    });
    return re;
  }
  translateDom(dom) {
    return {
      id: dom.getId(),
      templateName: dom.getTemplateName(),
      args: dom.getArguments(),
      tag: this.getTag(dom.nodeName),
      condition: dom.condition
    }
  }
  pickSiblings(doms, current) {
    var siblings = [];
    _.each(doms, (dom) => {
      if (dom.id && dom.id !== current.id) {
        siblings.push(dom);
      }
    });
    return siblings;
  }
  getTag(nodeName) {
    switch (nodeName) {
      case '#if':
        return 'if';
      case '#elseif':
        return 'else if';
      default:
        return 'else';
    }
  }
}
module.exports = IfNode;
