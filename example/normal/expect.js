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
		this.$root = $('<div><div id="et-line-2" style="display:none;"></div></div>');
		this.line['ET_2'] = this.$root.find('#et-line-2');
	}
	Template.prototype.update = function(it){
		// update 函数的数据都是只读的 不是可写的
		var last = this.last;

		// [#for item~index in it]
		var lastDomList = this.lastDoms['ET_2'] || [];
		var newDomList = [];
		for(var i = 0;i<lastDomList.length;i++){
			lastDomList[i].detach();
		}

		for(var i = 0; i < it.list.length ;i++){
			var index = i;
			var item = it.list[i];
			var id = item['id'];

			// get child template
			var et;
			if(id) et = this.doms['ET_2' + '_' + id];
			if(!et) et = new Template_ET_3();
			if(id) this.doms['ET_2' + '_' + id] = et;

			et.update(it, item, index);
			newDomList.push(et.get());
			this.line['ET_2'].before(et.get());
		}
		this.lastDoms['ET_2'] = newDomList;
		// [/for]

		this.last = {
			it: it
		}
		return this.$root;
	}

	function Template_ET_3(options){
		this.init(options);
		_.extend(this, options);
	}
	Template_ET_3.prototype = new Base()
	Template_ET_3.prototype.createElments = function(){
		this.$root = $('<div id="et-3"></div>');
		this.doms['ET_3'] = this.$root.filter('#et-3');
	}
	Template_ET_3.prototype.update = function(it, item, index){
		// update 函数的数据都是只读的 不是可写的
		var $el = this.$root;
		var last = this.last;

		if( (value = item.name) !== (last.item && last.item.name)){
			this.doms['ET_3'].text('It is ' + value + '.');
		}

		this.last = {
			it: it,
			item: item,
			index: index
		};
		return this.$root;
	}

	window.Template = Template;
	return Template;
})();
