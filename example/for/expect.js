(function(){
	var delegateEventSplitter = /^(\S+)\s*(.*)$/;
	var _ = {
		extend: function(){
			var data = arguments[0] || {};
			for(var i = 1;i<arguments.length;i++){
				var object = arguments[i];
				for(var key in object){
					data[key] = object[key];
				}
			}
			return data;
		},
		find: function(list, attr, value){
			for(var i =0;i<list;i++){
				var item = list[i];
				if(item && item[attr] === value){
					return item;
				}
			}
		}
	}
	function Base(){}
	Base.prototype = {
		isET: true,
		init: function(options){
			_.extend(this, options);
			this.doms = {};
			this.line = {};
			this.lastDoms = {};
			this.last = {};
			this.createElments();
			this.bindEvents();
		},
		get: function(){return this.$root},
		detory: function(){
			for(var key in this.doms){
				var $dom = this.doms[key];
				if($dom.isET) $dom.detory();
				else $dom.remove();
			}
			for(var key in this.lastDoms){
				var $dom = this.lastDoms[key];
				if($dom.isET) $dom.detory();
				else $dom.remove();
			}
			this.last = null;
			this.$root.remove();
			// line 会随着 $root被remove掉
		},
		createElments: function(){},
		bindEvents: function(){},
		update: function(){}
	}

	function Template(options){
		this.init(options);
	}
	Template.prototype = new Base()
	Template.prototype.createElments = function(){
		this.$root = $('<div class="div-root"><div id="et-el1" class="div-name"></div><div id="et-el2" class="div-home"></div></div>');
		this.doms['ET_1'] = this.$root.find('#et-el1');
		this.doms['ET_2'] = this.$root.find('#et-el2');
	}
	Template.prototype.update = function(it){
		// update 函数的数据都是只读的 不是可写的
		var last = this.last;

		if( (value = it.name) !== (last.it && last.it.name) ){
			this.doms['ET_1'].text('My name is ' + value + '.');
		}
		if( (value = it.home) !== (last.it && last.it.home) ){
			this.doms['ET_2'].text('My home is ' + value + '.');
		}

		this.last = {
			it: it
		}
		return this.$root;
	}

	window.Template = Template;
	return Template;
})();
