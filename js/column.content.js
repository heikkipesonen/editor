function content(tag,content){
	this._tag = tag;
	this._id = getId();
	this._element = $('<div id="'+this._id+'" class="content" draggable=true></div>');
	this._container = $('<div tag="'+tag+'" contenteditable=true />');
	
	console.log(tag)
	this._element.append(this._container);//.append('<div class="delete"></div>');
	
	if (content){
		this._content = content;
		this._element.html(content);
	}	

	if (tag == 'img'){
		this.droppable();
	}

	this.reset();
	this._content = false;
}

content.prototype = {
	reset:function(){
		this._element.unbind();
		var me = this;
		this._element.bind('dragstart',function(e){
			e = e.originalEvent;
			e.stopPropagation();
			e.dataTransfer.setData('type','content-item');
			e.dataTransfer.setData('id',me._id);
			e.dataTransfer.setData('action','move');
		});
	},
	getData:function(){
		
		if (this._tag != 'img'){
			this._content = {
					type: text,
					text: this._container.html() 
				};
		} 

		return this._content;
	},
	droppable:function(e){
		var me = this;
		this._element.dropInput(function(e){
	
			var i = e[0];
			if (i.datatype == 'image'){
				me.setImage(i);
			}

		});
	},
	setImage:function(e){
		this._content = e;
		this._element.find('[tag="'+this._tag+'"]').html('<img src="'+e.data+'" />');
	},
	getOriginalElement:function(){
		return this._element[0];
	},
	remove:function(){
		this._element.remove();
	}
}