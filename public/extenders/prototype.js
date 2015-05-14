'use strict';

module.exports = {
  init: function init(dom, id, options) {
    this.options = options;
    if (id) {
      this.id = id;
    } else {
      this.id = _.uniqueId(options.domIdPrefix);
    }
    this.templateName = '' + options.templateFunctionPrefix + '' + options.spilitMark + '' + this.id;
  },
  compile: function compile() {
    var list, doms, dom, i, len;

    list = [];
    doms = this.getNewTemplateDoms();

    // 1. before actions
    list = list.concat(this.compileBeforeActions());

    // 2. delare all templates should be created
    for (i = 0, len = doms.length; i < len; i++) {
      dom = doms[i];
      list = list.concat(dom.delareTemplate());
    }

    // 3. init all templates
    for (i = 0, len = doms.length; i < len; i++) {
      dom = doms[i];
      list = list.concat(dom.extendPrototype());
    }

    // 4. after actions
    list = list.concat(this.compileAfterActions());

    return list.join('\n');
  },

  compileBeforeActions: function compileBeforeActions() {
    var options = this.options;
    var re = ['\n      ;(function(root, factory){\n\n        if ( typeof module === "object" && typeof module.exports === "object" ) {\n          var _et = require(\'' + options.etRequireMark + '\');\n          module.exports = factory(_et.' + options.etUtil + ', _et.' + options.etPrototype + ');\n        } else {\n          var _et = root.' + options.windowEt + ';\n          root.' + this.templateName + ' = factory(_et.' + options.etUtil + ', _et.' + options.etPrototype + ');\n        }\n\n      })(window, function factory(util, _prototype) {\n    '];
    return re;
  },
  compileAfterActions: function compileAfterActions() {
    var re = ['\n        return ' + this.templateName + ';\n      });\n    '];
    return re;
  },

  delareTemplate: function delareTemplate() {
    var options = this.options;
    return ['\n      function ' + this.templateName + '(options) {\n        this.' + options.templateInit + '(options);\n      }\n    '];
  },
  extendPrototype: function extendPrototype() {
    var options = this.options;
    var args = this.getArguments();
    var re = ['\n      util.' + options.utilExtend + '(' + this.templateName + '.prototype, _prototype, {\n        ' + options.templateCreate + ': function ' + options.templateCreate + '() {\n          ' + this.getCreateDeliverys().join('\n') + '\n        },\n        ' + options.templateUpdate + ': function ' + options.templateUpdate + '(' + args.join(',') + ') {\n          ' + this.getUpdateDeliverys().join('\n') + '\n        },\n      })\n    '];
    return re;
  },
  getCreateDeliverys: function getCreateDeliverys() {
    var re, children, child, i, len;

    re = [];
    children = this.children || [];
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      re = re.concat(child.deliverCreate());
    }

    return re;
  },
  getUpdateDeliverys: function getUpdateDeliverys() {
    var re, children, child, i, len;

    re = [];
    children = this.children || [];
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      re = re.concat(child.deliverUpdate());
    }

    return re;
  },

  checkRoot: function checkRoot() {
    var current = this.parent;
    while (current && !current.isNewTemplate) {
      if (current.nodeName.indexOf('#') !== 0) {
        return false;
      }
      current = current.parent;
    }
    return true;
  },
  getNewTemplateDoms: function getNewTemplateDoms() {
    var re, doms, i, len, dom, cacheKey, cacheValue;

    cacheKey = 'getNewTemplateDoms';
    cacheValue = this.getCache(cacheKey);
    if (cacheValue) {
      return cacheValue;
    }

    re = [this];
    doms = this.getPosterity();

    for (i = 0, len = doms.length; i < len; i++) {
      dom = doms[i];
      if (dom.isNewTemplate) {
        re.push(dom);
      }
    }

    this.saveCache(cacheKey, re);
    return re;
  },
  getPosterity: function getPosterity() {
    var doms, children, child, i, len, cacheValue, cacheKey;

    cacheKey = 'getPosterity';
    cacheValue = this.getCache(cacheKey);
    if (cacheValue) {
      return cacheValue;
    }

    doms = [];
    children = this.children || [];
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      if (child) {
        doms.push(child);
        doms = doms.concat(child.getPosterity());
      }
    }

    this.saveCache(cacheKey, doms);
    return doms;
  },

  getArguments: function getArguments() {
    var re = ['it'];
    var lastRoot = this.getLastRoot();
    if (lastRoot === this) {
      if (this.args) {
        re = re.concat(lastRoot.args);
      }
    } else {
      re = re.concat(lastRoot.getArguments());
    }
    return re;
  },
  getLastRoot: function getLastRoot() {
    var current = this;
    while (current.parent) {
      if (current.parent.isNewTemplate) {
        return current.parent;
      }
      current = current.parent;
    }
    return current;
  },
  saveArgument: function saveArguments(arg) {
    if (!this.args) {
      this.args = [];
    }
    this.args.push(arg);
    return this;
  },

  saveCache: function saveCache(key, value) {
    if (!this.cache) {
      this.cache = {};
    }
    this.cache[key] = value;
    return this;
  },
  getCache: function getCache(key) {
    if (this.cache) {
      return this.cache[key];
    }
    return null;
  },

  // attributes or functions could be override
  isNewTemplate: false,
  deliverCreate: function compileCreate() {
    return this.getCreateDeliverys();
  },
  deliverUpdate: function compileUpdate() {
    return this.getUpdateDeliverys();
  }
};