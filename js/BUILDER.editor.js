/*


	slide editor
		which edits actually the categories

*/
var EDITOR = {
	_events : {},
	_element : {},
	_category : false,
	_tools : {
		content:{
			text:'content',
			icon:'img/add.png',
			description:'add content to slide',
			submenu:{
				col:{
					text:'column',
					description:'add new column',
					icon:'img/paper.png',
					draggable:true,
					data:{
						action:'addColumn',
						type:1
					}
				},				
				header:{
					text:'header',
					description:'large header text',
					icon:'img/paper.png',
					draggable:true,
					data:{
						action:'addContent',
						type:'content',
						tag:'h2'
					}
				},
				text:{
					text:'text',
					description:'text container',
					icon:'img/paper.png',
					draggable:true,
					data:{
						action:'addContent',
						type:'content',
						tag:'p'
					}
				},
				image:{
					text:'image',
					description:'picture',
					icon:'img/camera.png',
					draggable:true,
					data:{
						action:'addContent',
						type:'content',
						tag:'img'
					}				
				},
				video:{
					text:'video',
					description:'small video',
					icon:'img/video.png',
					draggable:true,
				},
				hotspot:{
					text:'hotspot',
					description:'clickable hotspot',
					icon:'img/hotspot.png',
					draggable:true,
				},
				form:{
					text:'form',
					description:'input form',
					icon:'img/form.png',
					draggable:true,
				},
			}
		},
		properties:{
			text:'properties',
			description:'slide settings',
			icon:'img/gear-white.png',
			submenu:{				
				background:{
					text:'background',
					description:'background image',
					icon:'img/camera.png',
					draggable:false,
					data:{}
				},
			}
		},
		close:{
			text:'back',
			class:['back'],
			description:'save and return',
			icon:'img/arrow-left.png',
		}	
	},
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

		this._element.container.append(this._toolbar.getElement());
		


		/*
					bind on events
		*/

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
				EDITOR.removeContent(e.dataTransfer.getData('id'));
			}
		});


		// editlide, binds to drop events to add contents to slide
		this._element.editslide.bind('drop',function(e){			
			e.preventDefault();
			e.stopPropagation();
			e = e.originalEvent;

			if (EDITOR[e.dataTransfer.getData('action')] ){
				EDITOR[e.dataTransfer.getData('action')]( e.dataTransfer.getData('type') );
			} else if (e.dataTransfer.getData('type') == 'content'){
				EDITOR.addColumn().onDrop(e);
			}
		});

		this._element.editslide.bind('dragover',function(e){
			e.preventDefault();
		});

		this._element.editslide.on('click','.column .delete',function(){
			EDITOR._slide.removeColumn($(this).parent().attr('id'));
			var col = EDITOR.setColumns();
		});
	},
	removeContent:function(id){		
		var result = this._slide.removeContent(id);
		if (result instanceof column){
			this.setColumns();
		}
	},
	setColumns:function(column){
		if (!column){		
			this._element.editslide.empty();

			if (this._slide){

				var cols = this._slide.getColumns();
				
				for (var i in cols){
					cols[i].addTo(this._element.editslide);
				}
			}
			
		} else {
			column.addTo(this._element.editslide);
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

		this._category.each(function(){
			BUILDER.editor._element.list.append( '<div class="slide preview" id="'+this._id+'"></div>');
		});

		this._element.list.find('.slide').bind('click',function(){EDITOR.setSlide($(this).attr('id'))});		
	},
	setSlide:function(slide){				
		if (typeof(slide) == 'string'){
			slide = this._category.getSlide(slide);
		}
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
		//if ()
		//$('body').append(this._element.container);
		this._element.container.removeClass('hidden-right');
		this._element.slides.find('.list').css('width',this.getSlidesWidth()+10);
	},
	close:function(){		
		this._element.container.addClass('hidden-right');
		this.fire('close');
	}
}