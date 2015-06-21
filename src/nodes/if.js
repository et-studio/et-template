'use strict';

var _ = require('../util');
var worker = require('../worker');
var NewNode = require('./new');
var Machine = require('../machine');

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

var conditionMachine = new Machine(conditionTableOptions);

class IfNode extends NewNode {
  parseSource(source) {
    var self = this;

    var nodeName = '';
    var condition = '';
    var lastToken = '';
    conditionMachine.each(source, (state, token) => {
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

    this.nodeName = nodeName.toLowerCase();
    this.condition = condition;
  }
  throwError(code) {
    var line = this.getLineNumber();
    throw new Error(`Unrecognized #if at line: ${line}.`);
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
