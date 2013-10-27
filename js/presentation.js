function presentation(){
	this._events = new events(this);
	this._categories = [];
	this._id = getId();

	this._properties = {
		name:false		
	}

	this._element = new getTemplate('presentation');
	this._init();
}

presentation.prototype = {
	_init:function(){
		var me = this;
		this._fn = {
			drop:function(e){
				e.stopPropagation();
				me.drop(e);
			}
		}

		this._element.container[0].addEventListener('dragover',function(e){
			e.preventDefault();
			e.stopPropagation();
		});

		this._element.container[0].addEventListener('drop',this._fn.drop);
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
		return this._element.container;
	},
	add:function(){
		var c = new category(this),
			me = this;

		this._categories.push( c );
		this._element.categories.append( c.getElement() );
		
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