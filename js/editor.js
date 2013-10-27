/*


	slide editor
		which edits actually the categories

*/
function editor(category,slide){
	this._events = new events(this);
	
	this._overlay =$('<div id="overlay"></div>'); // background overlay, if editor smaller than window..
	this._element =$('<div id="editor"></div>'); // main element
	this._slidewindow = $('<div id="slidewindow"><div class="slide"></div></div>'); // main slide edit container

	// slides list (at the bottom)
	this._slidelist_container = $('<div class="slides-container"></div>');
	this._slidelist = $('<div class="slides"></div>');
	this._properties = $('<div class="properties"></div>');

	this._category = category;	
	this._init();
}

editor.prototype = {	
	_init:function(){
		var me = this;

		// toolbar
		this._tools = {
			create:{
				text:'Slide layout',
				description:'set slide layout',
				icon:'img/add.png',
				submenu:{
					col:{
						text:'column',
						description:'single column',
						icon:'img/paper.png',
						draggable:true,
						data:{}
					},
					video:{
						text:'video',
						description:'fullscreen video',
						icon:'img/video.png',
					},
					form:{
						text:'form',
						description:'fullscreen form',
						icon:'img/form.png',
					},
				}
			},
			content:{
				text:'content',
				icon:'img/add.png',
				description:'add content to slide',
				submenu:{
					header:{
						text:'header',
						description:'large header text',
						icon:'img/paper.png',
						draggable:true,
					},
					text:{
						text:'text',
						description:'text container',
						icon:'img/paper.png',
						draggable:true,
					},
					image:{
						text:'image',
						description:'picture',
						icon:'img/camera.png',
						draggable:true,
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
		};

		// instantiate new toolbar and load tools
		this._toolbar = new toolbar(this,this._tools);	
	
		// attach elements to one another.
		this._element
					.append(this._toolbar.getElement())
					.append(this._slidewindow)
					.append(this._slidelist_container
							.append(this._slidelist));		
		
		this._slides = []; // slides contained in this editor

		// loop through category slides, attach previes into slide list
		this._category.each(function(){
			me._slidelist.append( '<div class="slide preview" id="'+this._id+'"></div>');
		});

		// if exit button is clicked at the toolbar
		this._toolbar.on('close',function(){
			me.close();
		});
	},
	editSlide:function(slide){

	},
	getSlidesWidth:function(){
		var w = 0;
		this._slidelist.find('.slide').each(function(){
			w += $(this).outerWidth(true);
		});
		return w;		
	},
	show:function(){
		$('body').append(this._overlay);
		$('body').append(this._element);


		this._slidelist.css('width',this.getSlidesWidth()+10);
	},
	close:function(){
		this._overlay.remove();
		this._element.remove();
		this.fire('close');
	}
}