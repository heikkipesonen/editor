function presentation(){
	this._events = new events(this);
	this._categories = [];
	this._id = getId();

	this._properties = {
		name:false		
	}

	this._template = new getTemplate('presentation');
	this._init();
}

presentation.prototype = {
	_init:function(){
		var me = this;
		this._fn = {
			drop:function(e){
				e = e.originalEvent;
				e.stopPropagation();
				me.drop(e);
			}
		}

		this._template.container.bind('dragover',function(e){
			e.preventDefault();
			e.stopPropagation();
		});

		this._template.container.bind('drop',this._fn.drop);
	},
	drop:function(evt){
		if (evt.dataTransfer.getData('action') =='add'){
			if (evt.dataTransfer.getData('type') == 'slide'){
				var c = this.add();
				c.add(evt.dataTransfer.getData('id'))
			}
		}
	},
	getElement:function(){
		return this._template.container;
	},
	add:function(){
		var c = new category(this),
			me = this;

		this._categories.push( c );
		this._template.categories.append( c.getElement() );
		
		c.on('remove',function(){			
			me.remove(this);
		});

		c.on('edit',function(e){
			console.log(e);
		})
		return c;
	},
	remove:function(category){
		for (var i in this._categories){
			if (this._categories[i] == category){
				delete this._categories[i];
				return true;
			}
		}
		return false;
	},

}