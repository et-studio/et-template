'use strict';
// base 接口对象，为dom定义基本的接口函数

var _ = require('underscore');
var FUNCTION_CONCAT = 'Template_';
var SPACE_SIZE = 2;
var LINE_CONCAT = 'line_';
var ATTRIBUTE_ID = 'id';
var ELEMENT_LINE = '$line_';
var ELEMENT_DOM = '$dom_';

module.exports = {
  initCompiler: function(options){
    var attribute;
    options = options || {};
    this.compilerSave('functionConcat', options.compilerConcat || FUNCTION_CONCAT);
    this.compilerSave('spaceSize', options.spaceSize || SPACE_SIZE);
    this.compilerSave('lineConcat', options.lineConcat || LINE_CONCAT);
    this.compilerSave('elementLine', options.elementLine || ELEMENT_LINE);
    this.compilerSave('elementDom', options.elementDom || ELEMENT_DOM);
    var attributeId = ATTRIBUTE_ID;
    if(options.attributeId) {
      attribute = options.attributeId.toString().toLowerCase();
    }
    this.compilerSave('attributeId', attributeId);
  },
  // add namespace to avoid attribute covered.
  compilerSave: function(key, value){
    if(!this.compilerData) {
      this.compilerData = {};
    }
    this.compilerData[key] = value;
    return this;
  },
  compilerGet: function(key){
    if(!this.compilerData) {
      this.compilerData = {};
    }
    return this.compilerData[key];
  },
  // compile the dom to ET class
  compile: function(options){
    options = options || {};
    var _options = _.extend({}, options, {
      isInit: true,
      root: this
    });
    var re = [''];
    var name = this.getTemplateName();

    // start: init
    re.push(`function ${name}(options){`);
    re.push('this.init(options);');
    re.push('}');
    re.push(`${name}.prototype = _.extend({}, ETBASE, {`);

    // start: createElments
    re.push('createElments: function(){');
    re.push('var rootStr = "" +');
    var rootList = this.getRootList(_options);
    for(var i = 0; i<rootList.length; i++){
      var str = rootList[i];
      re.push(`"${str}" +`);
    }
    re.push('"";');
    re.push('this.$root = $(rootStr);');

    re = re.concat(this.getFlagList(_options));
    re.push('}');
    // end: createElments

    // start: update
    var updateList = this.getUpdateList(_options);
    if(updateList.length){
      var updateArguments = this.getUpdateArguments(_options);
      re.push(`,update: function(${updateArguments.join(',')}){`);
      re.push('var last = this.last;');

      re = re.concat(updateList);
      re.push('');
      // save last
      re.push('this.last = {');
      for(var j = 0 ; j < updateArguments.length ; j++){
        var key = updateArguments[j];
        re.push(`${key}: ${key}`);
      }
      re.push('}');
      re.push('return this.$root;');
      re.push('}');
    }
    // end: update

    re.push('});');
    // end: init

    re = re.concat(this.scanTemplates(_options));
    return re;
  },
  // get the uniqued name with id
  getTemplateName: function(){
    var t = this.compilerGet('functionConcat');
    return `${t}${this.id}`;
  },
  getFrontSpaces: function(){
    var num = this.compilerGet('spaceSize');
    var n = this.depth || 0;
    if(this.type === 'et') {
      n += 1;
    }
    num = num * n || 0;

    var re = '';
    for(var i = 0; i < num ; i++){
      re += ' ';
    }
    return re;
  },
  getLine: function(){
    var attributeId = this.compilerGet('attributeId');
    var lineId = `${this.compilerGet('lineConcat')}${this.id}`;
    return `<div ${attributeId}='${lineId}' style='display:none'></div>`;
  },
  checkRoot: function(){
    var parent = this.parent;
    while(parent && !parent.isNewTemplate) {
      if(parent.type === 'html') {
        return false;
      }
    }
    return true;
  },
  getSelector: function(){
    var re = 'filter';
    var parent = this.parent;
    while(parent && !parent.isNewTemplate){
      if(parent.type === 'html'){
        re = 'find';
        break;
      }
      parent = parent.parent;
    }
    return re;
  },
  scanTemplates: function(){
    var re = [];
    var children = this.children;
    for(var i = 0; i < children.length ; i++){
      var child = children[i];
      if(child.isNewTemplate){
        re = re.concat(child.compile());
      }else{
        re = re.concat(child.scanTemplates());
      }
    }
    return re;
  },
  scanRootList: function(){
    var re = [];
    var children = this.children;
    for(var i = 0; i < children.length ; i++){
      var child = children[i];
      re = re.concat(child.deliverRootList());
    }
    return re;
  },
  scanFlagList: function(){
    var re = [];
    var children = this.children;
    for(var i = 0; i < children.length ; i++){
      var child = children[i];
      re = re.concat(child.deliverFlagList());
    }
    return re;
  },
  scanUpdateList: function(){
    var re = [];
    var children = this.children;
    for(var i = 0; i < children.length ; i++){
      var child = children[i];
      re = re.concat(child.deliverUpdateList());
    }
    return re;
  },

  // start: functions should be override
  isNewTemplate: false,
  deliverRootList: function(){
    var re = [];
    re = re.concat(this.getRootList());
    return re;
  },
  deliverFlagList: function(){
    var re = [];
    re = re.concat(this.getFlagList());
    return re;
  },
  deliverUpdateList: function(){
    var re = [];
    re = re.concat(this.getUpdateList());
    return re;
  },
  getRootList: function(){// for root string
    var re = [];
    var source = this.source;
    if(source.tag){
      re = re.concat(this.scanRootList());
      re.unshift(this.getFrontSpaces() + source.beginTag);
      re.push(this.getFrontSpaces() + source.endTag);
    }else{
      re.push(this.getFrontSpaces() + source.text);
    }
    return re;
  },
  getFlagList: function(){// flag the dom for ET
    var re = [];
    re = re.concat(this.scanFlagList());
    return re;
  },
  getUpdateList: function(){// update string list
    var re = [];
    re = re.concat(this.scanUpdateList());
    return re;
  },
  getUpdateArguments: function(){// arguments of update function
    var re =['it'];
    return re;
  }
  // end: functions should be override
};