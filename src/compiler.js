'use strict';

var _ = require('underscore');
var finder = require('./finder');

var DEFAULTS = require('./config/defaults.json');
var DEFAULTS_MIN = require('./config/defaults.min.json');

/**
 * Dom 的结构
 *  - nodeName        {Sting}
 *  - children        {Array[Dom]}
 *  - expressions     {Array[String]} 在属性上面的表达式数组
 *  - parent          {Dom}
 *  - previousSibling {previousSibling}
 *  - nextSibling     {nextSibling}
 *  - attributes      {Map<String: String>}
 *  - textContent     {String}
 *  - isClose         {Boolean}  是否是闭合标签
 */
module.exports = {
  getList: function(dom) {
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
  extendDom: function extend (dom, options) {
    var doms, i, len, current, extender, id;

    if (options && options.isCompress) {
      options = _.extend(DEFAULTS_MIN, options);
    } else {
      options = _.extend(DEFAULTS, options);
    }

    doms = this.getList(dom);
    for (i = 0, len = doms.length; i < len; i++){
      current = doms[i];
      id = `${options.domsIdPrefix}${i}`;

      extender = finder.findExtender(current, id, options);
      _.extend(current, extender);
    }
    return dom;
  },
  compile: function(dom, options) {
    this.extendDom(dom, options);
    return dom.compile();
  }
};

