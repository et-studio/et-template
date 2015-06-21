'use strict';

var _ = require('./util');
var worker = require('./worker');
var Factory = require('./nodes/factory');

class Compiler {
  pickData(root) {
    var newDoms = root.getNewTemplateDoms();
    var re = {
      templateName: root.getTemplateName(),
      hasFor: false,
      newDoms: []
    };
    _.each(newDoms, (dom) => {
      if (dom.nodeName === '#for') {
        re.hasFor = true;
      }
      re.newDoms.push({
        templateName: dom.getTemplateName(),
        createList: dom.getCreateList(),
        updateList: dom.getUpdateList(),
        args: dom.getArguments()
      });
    });
    return re;
  }
  compile(dom) {
    var it = this.pickData(dom);
    return worker.template(it);
  }
}

module.exports = Compiler;
