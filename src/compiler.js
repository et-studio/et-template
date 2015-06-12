'use strict';

var _ = require('./util');
var worker = require('./worker');
var Factory = require('./nodes/factory');

class Compiler {
  constructor(options) {
    this.options = options;
  }
  getList(dom) {
    var re = [];
    var scan = (current) => {
      if (current) {
        re.push(current);
        _.each(current.children, (child) => {
          scan(child);
        });
      }
    };
    scan(dom);
    return re;
  }
  initAllDoms(dom) {
    _.each(this.getList(dom), (dom) => {
      if (dom && typeof dom.init === 'function') {
        dom.init();
      }
    });
  }
  getFactory() {
    if (!this.factory) {
      this.factory = new Factory(this.options);
    }
    return this.factory;
  }
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
  compile(origin) {
    var factory = this.getFactory();
    var dom = factory.create(origin);
    this.initAllDoms(dom);
    var it = this.pickData(dom);
    return worker.template(it);
  }
}

module.exports = Compiler;
