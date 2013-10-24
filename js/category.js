function category(presentation){
	this._events = new events(this);
	this._presentation = presentation;
	this._id = getId();

	// html elements
	this._element = $('<div type="category" class="category" draggable="true"></div>');
	this._slidecontainer = $('<div class="slides"></div>');
	this._delete = $('<div class="delete"></div>');
	this._edit = $('<div class="edit"></div>');
	this._title = $('<div class="title"><input type="text" class="title-input" placeholder="'+this._id+'"/></div>');

	this._element.append(this._delete).append(this._edit).append(this._title).append(this._slidecontainer);
	// contained slides
	this._slides = [];

	this._name = false;

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
		var me = this;
		// event listener functions
		this._fn = {
			drop:function(e){
				e.stopPropagation();
				e.preventDefault(); 
				
				if (e.dataTransfer.getData('type') == 'slide'){				
					me.add(e.dataTransfer.getData('id'));
				}

				me._element.removeClass('dragover');
			},
			dragstart:function(e){								
				e.stopPropagation();

				e.dataTransfer.setData('id',me.getId());
				e.dataTransfer.setData('type','category');
			},
			dragover:function(){
				if (!me._element.hasClass('dragover')){
					me._element.addClass('dragover');
				}
			},
			dragleave:function(){
				me._element.removeClass('dragover');
			},
		}

		this._element[0].addEventListener('drop',this._fn.drop);
		this._element[0].addEventListener('dragover',this._fn.dragover);
		this._element[0].addEventListener('dragleave',this._fn.dragleave);
		this._element[0].addEventListener('dragstart',this._fn.dragstart);

		this._delete.click(function(){
			me.remove();
		});

		this._edit.click(function(){
			me.edit();
		});

		//this.on('change',this.setWidth);
	},
	edit:function(slide){		
		var e = new editor(this,slide),
			me= this;

		e.show();

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
			name:this._title.find('input').val(),
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
		this._title.find('h2').text(title);
	},
	remove:function(){
		this._element[0].removeEventListener('drop',this._fn.drop);
		this._element.remove();
		this.fire('remove',this);
		this.fire('change','remove',this)
	},
	getElement:function(){
		return this._element;
	},
	getSlide:function(id){
		for (var i in this._slides){
			if (this._slides[i].getId() == id){
				return this._slides[i];	
			}
		}
		return false;
	},
	showSlides:function(){
		var me = this;
		this.each(function(){
			me._slidecontainer.append(this.getElement());
		});
	},
	add:function(type,before){
		var me = this,
			s = new slide(type, this);

		this._slides.push(s);
		this._slidecontainer.append(s.getElement());

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
				delete this._slides[i];				
			}
		}

		this.fire('remove',slide);
		this.fire('change','remove',slide);
	}
}