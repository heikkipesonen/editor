/*


	slide editor
		which edits actually the categories

*/

BUILDER.editor = {
	_events : {},
	_element : {},
	_category : false,

	init:function(){
		var me = this;
		this._events = new events(this);
		this._element = getTemplate('editor');		
		// instantiate new toolbar and load tools
		this._toolbar = new toolbar(this._tools);		
		$('body').append(this._element.container);
		this.close();
		// if exit button is clicked at the toolbar
		this._toolbar.on('close',function(){
			me.close();
		});

		this._toolbar.on('save',function(){
			console.log( me.getData() );
		})

		this._element.container.append(this._toolbar.getElement());
		
		// slidewindow binded to drop events, so items can be deleted
		// when they are dropdded here
		this._element.slidewindow.bind('dragover',function(e){
			e.preventDefault();
		});

		this._element.slidewindow.bind('drop',function(e){
			e.preventDefault();
			e.stopPropagation();
			e = e.originalEvent;			
			if (e.dataTransfer.getData('action') == 'move'){
				me.removeContent(e.dataTransfer.getData('id'));
			}
		});


		// editlide, binds to drop events to add contents to slide
		this._element.editslide.bind('drop',function(e){			
			e.preventDefault();
			e.stopPropagation();
			e = e.originalEvent;

			if (me[e.dataTransfer.getData('action')] ){
				me[e.dataTransfer.getData('action')]( e.dataTransfer.getData('type') );
			} else if (e.dataTransfer.getData('type') == 'content'){
				me.addColumn().onDrop(e);
			}
		});

		this._element.editslide.bind('dragover',function(e){
			e.preventDefault();
		});

		this._element.editslide.on('click','.column .delete',function(){
			me._slide.removeColumn($(this).parent().attr('id'));
			var col = me.setColumns();
		});
	},
	getData:function(){
		return this._category.getData();
	},
	removeContent:function(id){		
		var result = this._slide.removeContent(id);
		if (result instanceof column){			
			this.setColumns(true);
		}
	},
	setColumns:function(col){
		if (!col){		
			this._element.editslide.empty();
			if (this._slide){
				var cols = this._slide.getColumns();				
				for (var i in cols){
					cols[i].addTo(this._element.editslide);
				}
			}			
		} else if (col instanceof column){
			col.addTo(this._element.editslide);
		}

		var cols = this._element.editslide.find('.column');
		
		cols.each(function(){
			$(this).css('width', (97/cols.length)-3 + '%');
		});		
	},
	addColumn:function(e){
		if (this._slide){
			var c = this._slide.addColumn();
			this.setColumns(c);
			return c;
		}
	},
	edit:function(item){		
		if (item instanceof category){			
			this.setCategory(item);
			this.setSlide(this._category.getSlide())
		} else if (item instanceof slide){

			if (item.getParent() instanceof category){

				this.setCategory(item.getParent() );
				this.setSlide(item);

			}			
		}

		this.show();
	},
	setCategory:function(category){
		this._category = category;
		this._element.list.empty();
		var me = this;
		this._category.each(function(){
			me._element.list.append( '<div class="slide preview" id="'+this._id+'"></div>');
		});

		this._element.list.find('.slide').bind('click',function(){me.setSlide($(this).attr('id'))});		
	},
	setSlide:function(slide){				
		if (typeof(slide) == 'string'){
			slide = this._category.getSlide(slide);
		}
		this._element.list.find('.selected').removeClass('selected');
		this._element.list.find('#'+slide.getId()).addClass('selected');
		this._slide = slide;
		this.setColumns();		
	},
	getSlidesWidth:function(){
		var w = 0;
		this._element.slides.find('.slide').each(function(){
			w += $(this).outerWidth(true);
		});
		return w;		
	},
	show:function(){		
		this._element.container.removeClass('hidden-right');
		this._element.slides.find('.list').css('width',this.getSlidesWidth()+10);
	},
	close:function(){		
		this._element.container.addClass('hidden-right');
		this.fire('close');
	}
}