'use strict';

var _ = require('underscore');
var finder = require('./finder');
var CWorker = require('./worker');

var CONFIG = {
  'templateFunctionPrefix': 'Template',
  'spilitMark': '_',

  'doms.idPrefix': 'et',
  'doms.lineSuffix': 'line'
};

/**
 * Dom 的结构
 *  - nodeName        {String}
 *  - children        {Array[Dom]}
 *  - expressions     {Array[String]} 在属性上面的表达式数组
 *  - parent          {Dom}
 *  - previousSibling {Dom}
 *  - nextSibling     {Dom}
 *  - attributes      {Map<String, String>}
 *  - textContent     {String}
 */
module.exports = {
  getList: function getList(dom) {
    var re = [];
    var scan = function scan(current) {
      var children, i, len;
      if (current) {
        re.push(current);
        children = current.children || [];
        for (i = 0, len = children.length ; i < len ; i++){
          scan(children[i]);
        }
      }
    };
    scan(dom);
    return re;
  },
  extendDom: function extendDom(dom, options) {
    var doms, i, len, current, extender;

    doms = this.getList(dom);
    for (i = 0, len = doms.length; i < len; i++){
      current = doms[i];
      current.id = `${options['doms.idPrefix']}${i}`;
      current.templateName = `${options.templateFunctionPrefix}${options.spilitMark}${current.id}`;

      extender = finder.findExtender(current, options);
      _.extend(current, extender);
    }

    for (i = 0, len = doms.length; i < len; i++){
      // after the tree is ready init all doms
      current = doms[i];
      current.init();
    }
    return dom;
  },
  compile: function compile(dom, options) {
    var worker, delareString, extendString, newDoms, i, domItem;

    options = _.extend(CONFIG, options);
    this.extendDom(dom, options);
    worker = new CWorker(options);
    newDoms = dom.getNewTemplateDoms();

    delareString = '';
    for(i = 0; i < newDoms.length; i++) {
      domItem = newDoms[i];
      delareString += worker.delare({
        templateName: domItem.templateName
      }, options);
    }

    extendString = '';
    for(i = 0; i < newDoms.length; i++) {
      domItem = newDoms[i];
      delareString += worker.extend({
        templateName: domItem.templateName,
        args: domItem.getArguments(),
        createString: domItem.getCreateString(),
        updateString: domItem.getUpdateString()
      }, options);
    }

    return worker.compile({
      templateName: dom.templateName,
      delareString: delareString,
      extendString: extendString,
      moduleId: options.moduleId
    }, options);
  }
};
