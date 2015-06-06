'use strict';

var _ = require('./util');
var CWorker = require('./worker');
var Factory = require('./factory');

class Compiler {
  constructor(options) {
    this.options = options;
  }
  getList(dom) {
    var re = [];
    var scan = (current) => {
      if (current) {
        re.push(current);
        _.each(current.children, null, (child) => {
          scan(child);
        });
      }
    };
    scan(dom);
    return re;
  }
  initAllDoms(dom) {
    _.each(this.getList(dom), null, (dom) => {
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
  getWorker() {
    if (!this.CWorker) {
      this.worker = new CWorker(this.options);
    }
    return this.worker;
  }
  compile(originDom) {
    var dom, factory, worker, newDoms, options, cOptions;

    factory = this.getFactory();
    worker = this.getWorker();

    options = this.options;
    dom = factory.create(originDom);
    this.initAllDoms(dom);
    newDoms = dom.getNewTemplateDoms();

    cOptions = {
      templateName: dom.templateName,
      delareString: this.getDelareString(newDoms),
      extendString: this.getExtendString(newDoms),
      moduleId: options.moduleId
    };
    return worker.compile(cOptions, options);
  }
  getDelareString(newDoms) {
    var re = '';
    var worker = this.getWorker();
    _.each(newDoms, null, (dom) => {
      re += worker.delare({
        templateName: dom.templateName
      });
    });
    return re;
  }
  getExtendString(newDoms) {
    var re = '';
    var worker = this.getWorker();
    _.each(newDoms, null, (dom) => {
      re += worker.extend({
        templateName: dom.templateName,
        args: dom.getArguments(),
        createString: dom.getCreateString(),
        updateString: dom.getUpdateString()
      });
    });
    return re;
  }
}

module.exports = Compiler;
