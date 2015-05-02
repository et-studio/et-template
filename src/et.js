'use strict';
var Dom = require('./dom');

function ET(options){
  this.options = options;
}
ET.prototype = {
  compile: function(str){
    var dom = new Dom(str);
    var list = [];
    list.push('var ETBASE = require("ETBASE");');
    list.push(`module.exports = ${dom.getTemplateName()};`);
    list = list.concat(dom.compile());
    return list.join('\n');
  }
};

module.exports = ET;
