function category(presentation){
	this._events = new events(this);
	this._presentation = presentation;
	this._id = getId();

	this._element = getTemplate('category');
	this._slides = [];
	this._name = false;
	
	var me = this;
	this.evt = function evt(e){		
			if (me[e.type]){				
				me[e.type].call(me,e);
			} else {
				console.log(e.type);
			}
		}

	this._init();
}

category.prototype = {
	each:function(fn){
		for (var i in this._slides){
			fn.call(this._slides[i],i);
		}
	},
	getWidth:function(){
		var w = 0;
		for (var i in this._slides){
			w += this._slides[i].getWidth();
		}
		return w;
	},
	getSlides:function(){
		return this._slides;
	},
	_init:function(){
		this._element.container.bind('drop',this.evt)
								.bind('dragover',this.evt)
								.bind('dragleave',this.evt)
								.bind('dragstart',this.evt);



		var me = this;
		/*
		this._element.delete.unbind().bind('click',function(){
			me.remove();
		});

		this._element.edit.unbind().bind('click',function(){
			me.edit();
		});
		*/

		this._element.title.bind('click',function(){me.edit()}).bind('contextmenu',function(e){e.preventDefault(); me.remove()});

	},
	dragleave:function(e){
		if (this._element.container.hasClass('dragover')){
			this._element.container.removeClass('dragover');
		}
	},
	dragover:function(e){
		if (!this._element.container.hasClass('dragover')){
			this._element.container.addClass('dragover');
		}
	},
	dragstart:function(e) {
		if (e.originalEvent){	
			e = e.originalEvent;
		}
		e.stopPropagation();
		e.dataTransfer.setData('id',this.getId());
		e.dataTransfer.setData('type','category');
	},
	drop:function(e) {
		if (e.originalEvent){	
			e = e.originalEvent;
		}

		e.stopPropagation();
		e.preventDefault(); 
		
		if (e.dataTransfer.getData('type') == 'slide'){				
			this.add(e.dataTransfer.getData('id'));
		}

		this._element.container.removeClass('dragover');
	},
	edit:function(){
		BUILDER.edit(this);
	},
	getId:function(){
		return this._id;
	},
	getData:function(){
		var content = [];

		for (var i in this._slides){
			if (this._slides[i]){
				content.push( this._slides[i].getData() );
			}
		}

		var d = {
			type:'category',
			id:this._id,
			name:this._element.title.find('input').val(),
			content:content
		}

		return d;
	},
	load:function(data){
		if (data.type == 'category'){
			this._id = data.id;
			this._name = data.name;

			for (var i in data.content){
				console.log(data.content[i]);
			}
		}
	},
	setTile:function(title){
		this._element.title.find('h2').text(title);
	},
	remove:function(){
		this._element.container.unbind().remove();
		this.fire('remove',this);
		this.fire('change','remove',this)
	},
	getElement:function(){
		return this._element.container;
	},
	getSlide:function(id){
		if (id){		
			for (var i in this._slides){
				if (this._slides[i].getId() == id){
					return this._slides[i];	
				}
			}
			return false;
		}
		return this._slides[0];
	},
	showSlides:function(){
		var me = this;
		this.each(function(){
			me._element.slidecontainer.append(this.getElement());
		});
	},
	add:function(type,before){
		var me = this,
			s = new slide(type, this);

		this._slides.push(s);
		this._element.slidecontainer.append(s.getElement());

		s.on('remove',function(){
			me.removeSlide(s)
		});

		s.on('edit',function(){
			me.edit(me,this);
		});

		this.fire('change','add',s);
		this.fire('add',s);		
	},
	removeSlide:function(slide){
		for (var i in this._slides){
			if (this._slides[i] == slide){				
				$('#before_'+this._slides[i].getId()).remove();
				this._slides.splice(i,1);
			}
		}

		this.fire('remove',slide);
		this.fire('change','remove',slide);
	}
}