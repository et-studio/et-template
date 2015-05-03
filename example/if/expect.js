(function(){
	function Base(){}
	Base.prototype = {
		isET: true,
		init: function(options){
			this.options = options;
			this.doms = {};
			this.line = {};
			this.lastDoms = {};
			this.last = {};
			this.createElments();
			this.bindEvents();
		},
		get: function(){return this.$root},
		detory: function(){
			this.remove(this.doms);
			this.remove(this.lastDoms);
			this.last = null;
			this.$root.remove();
			// line 会随着 $root被remove掉
		},
		remove: function(list){
			if(!list) return;
			for(var i =0;i<list.length;i++){
				var item = list[i];
				if(item.isET) item.get().remove();
				else if(typeof item.remove === 'function') item.remove();
			}
		},
		detach: function(list){
			if(!list) return;
			for(var i =0;i<list.length;i++){
				var item = list[i];
				if(item.isET) item.get().detach();
				else if(typeof item.detach === 'function') item.detach();
			}
		},
		createElments: function(){},
		bindEvents: function(){
			var events = this.options.events || {};
			for(var key in events){
				var match = key.match(/^(\S+)\s*(.*)$/);
				var callBack = events[key];
				if(match && typeof callBack === 'function')
					this.$root.on(match[1], match[2], callBack);
			}
		}
		update: function(){}
	}

	function Template(options){this.init(options)}
	Template.prototype = new Base()
	Template.prototype.createElments = function(){
		var rootStr = '' +
			'<div>'+
		   '<div>It is always in before.</div>'+
		   '<div id="et-line-2" style="display:none;"></div>'+
		   '<div>It is always in after.</div>'+
		  '<div>';
		this.$root = $(rootStr);

		this.line['ET_2'] = this.$root.find('#et-line-2');
		var ET_3 = new Template_ET_3();
		this.doms['ET_3'] = ET_3;
		var ET_4 = new Template_ET_4()
		this.doms['ET_4'] = ET_4;
		this.lastDoms['ET_2'] = [ET_3.get(), ET_4.get()]
	}
	Template.prototype.update = function(it){
		// update 函数的数据都是只读的 不是可写的
		var last = this.last;

		// [#if]
		var $line = this.line['ET_2'];
		this.detach(this.lastDoms['ET_2']);
		if(it.isTrue){
			$line.before(this.doms['ET_3'].get())
		}else{
			$line.before(this.doms['ET_4'].get())
		}
		// [/#if]

		this.last = {
			it: it
		}
		return this.$root;
	}

	function Template_ET_3(options){ this.init(options)}
	Template_ET_3.prototype = new Base();
	Template_ET_3.prototype.createElments = function(){
		this.$root = $('<div>It is true.</div>');
	}

	function Template_ET_4(options){ this.init(options)}
	Template_ET_4.prototype = new Base();
	Template_ET_4.prototype.createElments = function(){
		this.$root = $('<div>It is false.</div>');
	}

	window.Template = Template;
	return Template;
})();
