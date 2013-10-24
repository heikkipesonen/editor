function presentation(){
	this._events = new events(this);
	this._categories = [];
	this._id = getId();

	this._properties = {
		name:false		
	}

	this._element = $('<div class="presentation" droppable="true"></div>');
		this._header = $('<div class="header"></div>');
		this._nameinput = $('<input type="text" placeholder="'+this._id+'"/>');
		this._categorylist = $('<div class="categories"></div>');
		this._footer = $('<div class="footer"></div>');

	this._element.append(this._header.append(this._nameinput))
				.append(this._categorylist)
				.append(this._footer);
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

		this._element[0].addEventListener('dragover',function(e){
			e.preventDefault();
			e.stopPropagation();
		});

		this._element[0].addEventListener('drop',this._fn.drop);
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
		return this._element;
	},
	add:function(){
		var c = new category(this);
		this._categories.push( c );
		this._categorylist.append( c.getElement() );
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