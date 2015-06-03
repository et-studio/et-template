'use strict';

var _ = require('../util');
var NewNode = require('./new');

class IfNode extends NewNode {
  deliverUpdate () {
    var re = [];
    var hasElse = false;
    var doms = this.getConditionDoms();
    var lastRoot = this.getLastRoot();
    var valueId = lastRoot.getValueId();
    var lineId = this.getLineId();

    re.push(`var $line = doms.${lineId};`);
    _.each(doms, this, (dom, i) => {
      var removeList = this.getRemoveList(doms, dom);
      var tag = this.getTag(dom.nodeName);
      var condition = dom.condition?`(${dom.condition})`:'';
      var id = dom.getId();
      var args = dom.getArguments();

      re.push(`${tag} ${condition} {
          var et = doms.${id};
          if (last.${valueId} !== ${i}) {
            last.${valueId} = ${i};
            if (!et) {
              doms.${id} = et = new ${dom.templateName}();
            }
            _util.before($line, et.get());

            ${removeList.join('')}
          }
          et.update(${args.join(',')});
        }`);

      if (tag === 'else') {
        hasElse = true;
      }
    });
    if (!hasElse) {
      this.pushDefaultElse(re, doms, valueId);
    }
    return re;
  }
  getConditionDoms () {
    var re = [this];
    var next = this.nextSibling;
    while (next) {
      if (next.nodeName === '#elseif') {
        re.push(next);
        next = next.nextSibling;
        continue;
      } else if (next.nodeName === '#else') {
        re.push(next);
      }
      break;
    }
    return re;
  }
  pushDefaultElse(list, doms, valueId) {
    var removeList = this.getRemoveList(doms, null);
    var lastStr = list.pop();
    if (!lastStr) {
      throw new Error('there should has condition string.');
    }
    lastStr = `${lastStr} else {
      if (last.${valueId} !== ${doms.length}) {
        last.${valueId} = ${doms.length};
        ${removeList.join('')}
      }
    }`;
    list.push(lastStr);
    return list;
  }
  getRemoveList(doms, current) {
    var re = [];
    _.each(doms, null, (dom) => {
      var id = dom.getId();
      var currentId = current && current.getId();
      if (dom !== current && id !== currentId) {
        re.push(`
          var et = doms.${id};
          if (et) {
            et.remove();
          }
        `);
      }
    });
    return re;
  }
  getTag(nodeName) {
    switch (nodeName) {
      case '#if':
        return 'if';
      case '#elseif':
        return 'else if';
      case '#else':
        return 'else';
      default:
        throw new Error(`Can't recognize ${nodeName} in if condition.`);
    }
  }
}
module.exports = IfNode;
