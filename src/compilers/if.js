var _ = require('underscore');
var base = require('./base');

module.exports = _.extend({}, base, {
  isNewTemplate: true,
  deliverRootList: function(){
    var re = [];
    re.push(`${this.getFrontSpaces()}${this.getLine()}`);
    return re;
  },
  deliverFlagList: function(options){
    var re = [];
    var lineId = `${this.compilerGet('lineConcat')}${this.id}`;
    var attributeId = this.compilerGet('attributeId');
    var isIdFilter = attributeId === 'id';
    var isRoot = this.checkRoot();
    var selector = isRoot?'filter':'find';

    if(isIdFilter){
      re.push(`this.line["${this.id}"] = this.$root.${selector}("#${lineId}");`);
    }else{
      re.push(`this.line["${this.id}"] = this.$root.${selector}("[${attributeId}=${lineId}]");`);
    }
    re.push(`this.doms["${this.id}"] = new ${this.getTemplateName()}();`);
    return re;
  },
  deliverUpdateList: function(){
    var re = [''];
    var source = this.source;
    var isRoot = this.checkRoot();
    var line = `${this.compilerGet('elementLine')}${this.id}`;
    var dom = `${this.compilerGet('elementDom')}${this.id}`;
    // var tmpDom = `$tmp_${this.id}`;

    var str = `
      var ${line} = this.line['${this.id}'];
      var ${dom} = this.doms['${this.id}'];
      if(it.isTrue){
        ${line}.before(${dom}.update(it));
      }else{
        ${dom}.detach();
      }
    `;
    re.push(str.trim());

    // if(isRoot){
    //   var str = `
    //     var ${line} = this.line['${this.id}'];
    //     var ${dom} = this.doms['${this.id}'];
    //     if(it.isTrue){
    //       ${line}.before(${dom}.update(it));
    //     }else{
    //       ${dom}.detach();
    //     }
    //   `;
    //   re.push(str.trim());
    // }else{
    //   var str = `
    //     var ${line} = this.line['${this.id}'];
    //     var ${dom} = this.doms['${this.id}'];
    //     if(it.isTrue){
    //       this.$el = ${line}.
    //       var ${tmpDom} =
    //       ${line}.before(${dom}.update(it));
    //     }else{
    //       ${dom}.detach();
    //     }
    //   `;
    //   re.push(str.trim());
    // }

    // re.push(`var ${line} = this.line['${this.id}']`);
    // re.push(`var ${dom} = this.doms['${this.id}']`);
    // re.push('if(it.isTrue){');
    // if(isRoot){
    //   re.push(`${line}.before(${dom}.update(it));`);
    // }else{
    //   re.push(`${line}.before(${dom}.update(it));`);
    // }
    // re.push('}else{');
    // re.push(`${dom}.detach();`);
    // re.push('}');

    // re.push(`\/\/ [/${source.tag}]`);
    return re;
  },

  getRootList: function(){
    var re = [];
    re = re.concat(this.scanRootList());
    return re;
  },
  getFlagList: function(options){// flag the dom for ET
    var re = [];
    re = re.concat(this.scanFlagList());
    return re;
  },
  getUpdateList: function(options){// update string list
    var re = [];
    re = re.concat(this.scanUpdateList());
    return re;
  },
  getUpdateArguments: function(options){// arguments of update function
    var re =['it'];
    return re;
  }
});
