function column(){
	this._content = [];
	this._id = getId();
	this._element = getTemplate('column');
	this._element.container.attr('id',this._id);

}

column.prototype =  {
	getData:function(){
		var d = [];
		for (var i in this._content){
			d.push(this._content[i].getData());
		}

		return {
			id:this._id,
			content:d
		};
	},
	getOriginalElement:function(){
		return this._element.container[0];
	},
	onDrop:function(e){
		if (e.originalEvent){
			e = e.originalEvent;
		}

		e.preventDefault();
		
		if (e.dataTransfer.getData('type') == 'content'){
			e.stopPropagation();
			this.addContent( e.dataTransfer.getData('tag') , e.dataTransfer.getData('content') );
		}
	},
	reset:function(){
		var me = this;
		this._element.container.unbind();
		this._element.container.bind('drop',function(e){me.onDrop(e)});
		this._element.container.on('click','.content>.delete',function(){
			me.removeContentByElement( $(this).parent() );
		});
		
		this._element.container.bind('dragstart',function(e){
			e = e.originalEvent;
			e.stopPropagation();
			e.dataTransfer.setData('type','content-column');
			e.dataTransfer.setData('id',me._id);
			e.dataTransfer.setData('action','move');
		});		

		for (var i in this._content){
			this._content[i].reset();
		}
	},
	addTo:function(element){
		this.reset();
		$(element).append(this._element.container);
	},
	removeContent:function(id){
		for (var i in this._content){
			if (this._content[i]._id == id){
				this._content[i].remove();
				return this._content.splice(i,1)[0];
			}
		}
		return false;
	},
	removeContentByElement:function(e){
		for (var i in this._content){
			if (this._content[i].getOriginalElement() == e[0]){
				this._content[i].remove();
				return this._content.splice(i,1);
			}
		}
		return false;
	},
	setWidth:function(x){
		this._element.container.css('width',x);
	},
	add:function(content){		
		this._content.push(content);
		content.init();
		this._element.container.append(content._element);
	},
	addContent:function(tag, contents){
		this.add( new content(tag, contents) );
	},
	remove:function(){		
		this._element.remove();
	}
}
