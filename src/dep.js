'use strict';

module.exports = {
  state: 'heathy', // [heathy, detach, remove, destory]
  isET: true,
  init: function(options) {
    this.options = options || {};
    this.roots = [];
    this.doms = {};
    this.last = null;
    this.records = {};
    this.createElments();
    this.bindEvents();
  },
  createElments: function() {

  },
  update: function(it) {
    this.last = {
      it: it
    };
    return this;
  },
  get: function() {
    var $re = this.$root;
    if(!$re){
      $re = $('');
      var list = this.roots || [];
      for(var i = 0; i < list.length; i++){
        var id = list[i];
        var dom = this.doms[id]; // null，element，ET
        if(dom && dom.isET && dom.state === 'heathy'){
          $re = $re.add(dom.get());
        }else if(dom){
          $re = $re.add(dom);
        }
      }
      this.$root = $re;
    }
    return $re;
  },
  clearRoot: function() {
    this.$root = null;
  },
  getRootDoms: function() {
    var re = [];
    var list = this.roots || [];
    for(var i = 0; i < list.length; i++){
      var id = list[i];
      var dom = this.doms[id]; // null，element，ET
      if(dom){
        re.push(dom);
      }
    }
    return re;
  },
  bindEvents: function() {
    var events = this.options.events || {};
    var list = this.getRootDoms();
    for(var key in events){
      var callBack = events[key];
      var match = key.match(/^(\S+)\s*(.*)$/);
      if(match && typeof callBack === 'function'){
        for(var i = 0; i < list.length; i++){
          var item = list[i];
          if(!item.isET){
            item.on(match[1], match[2], callBack);
          }
        }
      }
    }
    return this;
  },
  activate: function() {
    this.state = 'heathy';
  },
  detach: function() {
    var list = this.getRootDoms();
    for(var i = 0; i < list.length; i++){
      list[i].detach();
    }
    this.state = 'detach';
    return this;
  },
  remove: function() {
    var list = this.getRootDoms();
    for(var i = 0 ;i < list.length; i++){
      list[i].remove();
    }
    this.state = 'remove';
    return this;
  },
  destroy: function() {
    this.remove();
    for(var key in this){
      if(typeof this[key] !== 'function'){
        this[key] = null;
      }
    }
    this.state = 'destroy';
    return this;
  }
};
