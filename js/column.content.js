function content(tag,contents){
	this._tag = tag;
	this._content = contents;
}

content.prototype = {
	init:function(){
		this._id = getId();
		this._element = $('<div id="'+this._id+'" class="content" draggable=true></div>');
		this._container = $('<div tag="'+this._tag+'" contenteditable=true />');	
		
		this._element.append(this._container);//.append('<div class="delete"></div>');
		
		if (this._content){
			this._element.html(this._contents);
		}	

		if (this._tag == 'img'){
			this.droppable();
		}

		this.reset();
		this._content = false;
	},
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
					type: 'text',
					tag: this._tag,
					text: this._container.html() 
				};
		} 

		return this._content;
	},
	droppable:function(e){
		var me = this;
		this._container.attr('contenteditable','false');
		this._element.dropInput(function(e){	
			var i = e[0];
			if (i.datatype == 'image'){
				me.setImage(i);
			}
		});
	},
	setImage:function(e){
		this._content = e;
		this._element.find('[tag="'+this._tag+'"]').html('<img class="full-width" src="'+e.data+'" />');
	},
	getOriginalElement:function(){
		return this._element[0];
	},
	remove:function(){
		this._element.remove();
	}
}


function headerContent(contents){
	content.call(this);
}

headerContent.prototype = new content();




function imageContent(tag,contents){
	content.call(this);
	this._tag = tag;
	this._content = contents;	

	this.init();
}

imageContent.prototype = new content();

imageContent.prototype.setImage = function(e){
	this._content = e;
	this._element.find('[tag="'+this._tag+'"]').html('<img class="full-width" src="'+e.data+'" />');
}
