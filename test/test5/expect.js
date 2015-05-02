(function(){
	var delegateEventSplitter = /^(\S+)\s*(.*)$/;
	function Template(options){
		this.extendOptions(options);
		this.createElments();
		this.bindEvents();
	}
	Template.prototype = {
		createElments: function(){
			this.$root = $('<div>');
			this.map = {}
			this.map['el1'] = $('<div>It is true.</div>')
			this.map['el2'] = $('<div>It is false.</div>')
			this.map['el3'] = $('<div>It is always in.</div>')
		},
		extendOptions: function(options){
			for(var x in options){
				this[x] = options[x];
			}
		},
		bindEvents: function(){
			var events = this.events || {};
			for(var key in events){
				var match = key.match(delegateEventSplitter);
				var callBack = events[key];
				if(match && typeof callBack === 'function')
					this.$root.on(match[1], match[2], callBack);
			}
		},
		delegateAll: function(){
			this.$root.detach();
			for(var x in this.map){
				$el = this.map[x];
				$el.detach();
			}
		},
		reder: function(data){
			if(!data) data = {};
			this.delegateAll();

			var $el = this.$root;
			if(data.isTrue){
				$el.append(this.map['el1']);
			}else{
				$el.append(this.map['el2']);
			}
			$el.append(this.map['el3']);
			return $el;
		}
	}
	window.Template = Template;
	return Template;
})();
