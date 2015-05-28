'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');

module.exports = _.extend({}, _prototype, {
  isNewTemplate: true,
  deliverCreate: function compileCreate() {
    var re = [];
    var id = this.getId();
    var lineId = this.getLineId();

    re.push(`var ${id} = null;`);
    re.push(`var ${lineId} = _util.createLine();`);
    re.push(`doms.${id} = ${id};`);
    re.push(`dom.${lineId} = ${lineId};`);

    if (this.checkRoot()) {
      re.push(`rootIds.push('${id}');`);
      re.push(`root.${id} = ${id};`);
      re.push(`rootIds.push('${lineId}');`);
      re.push(`root.${lineId} = ${lineId};`);
    }
    return re;
  },
  deliverUpdate: function compileUpdate() {
    var re, hasElse, doms, lastRoot, i, len, dom, id, valueId,
    tag, condition, args, removeList, lineId;

    re = [];
    hasElse = false;
    doms = this.getConditionDoms();
    lastRoot = this.getLastRoot();
    valueId = lastRoot.getValueId();

    for (i = 0, len = doms.length; i < len; i++) {
      dom = doms[i];
      removeList = this.getRemoveList(doms, dom);
      id = dom.getId();
      condition = dom.condition;
      tag = this.getTag(dom.nodeName);
      args = this.getArguments();
      lineId = this.getLineId();

      re.push(`${tag} (${condition}) {
          var et = doms.${id};
          var $line = doms.${lineId};
          if (last.${valueId} !== ${i}) {
            last.${valueId} = ${i};
            if (!et) {
              doms.${id} = et = new ${dom.templateName}();
            }
            _util.before($line, et);
            removeList.join('');
          }
          et.update(${args.join(',')});
        }`);

      if (dom.nodeName === '#else') {
        hasElse = true;
      }
    }
    if (!hasElse) {
      this.pushDefaultElse(re, doms, valueId);
    }
    return re;
  },
  getConditionDoms: function getNextConditionDoms() {
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
  },
  pushDefaultElse: function(list, doms, valueId) {
    var removeList = this.getRemoveList(doms, null);
    var lastStr = list.pop();
    if (!lastStr) {
      throw new Error('there should has condition string.');
    }
    lastStr = `${lastStr} ${this.getTag('#else')} {
      if (last.${valueId} !== ${doms.length}) {
        last.${valueId} = ${doms.length};
        ${removeList.join('')}
      }
    }`;
    list.push(lastStr);
    return list;
  },
  getRemoveList: function(doms, current) {
    var re, i, len, dom, id;

    re = [];
    for (i = 0, len = doms.length; i < len; i++) {
      dom = doms[i];
      id = dom.getId();
      if (dom !== current) {
        re.push(`
          if (doms.${id}) {
            doms.${id}.remove();
          }
        `);
      }
    }
    return re;
  },
  getTag: function getTag(nodeName) {
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
});
