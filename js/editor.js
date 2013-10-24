function editor(category,slide){
	this._events = new events(this);
	
	this._overlay =$('<div id="overlay"></div>');
	this._element =$('<div id="editor"></div>');
	this._slidewindow = $('<div id="slidewindow"><div class="slide"></div></div>');

	this._slidelist_container = $('<div class="slides-container"></div>');
	this._slidelist = $('<div class="slides"></div>');
	this._properties = $('<div class="properties"></div>');

	this._category = category;	
	this._init();
}

editor.prototype = {
	_init:function(){
		var me = this;
		this._tools = {
			create:{
				icon:'img/add.png',
				submenu:{
					col1:{
						tooltip:'col 1',
						icon:'img/paper.png',
						draggable:true,
						data:{type:'slide',action:'add'}
					},
					col2:{
						tooltip:'col 2',
						icon:'img/paper.png',
						draggable:true,
						data:{type:'slide',action:'add'}
					},
					col3:{
						tooltip:'col 3',
						icon:'img/paper.png',
						draggable:true,
						data:{type:'slide',action:'add'}
					},
					video:{
						tooltip:'video',
						icon:'img/video.png',
						draggable:true,
						data:{type:'slide',action:'add'}
					},
					form:{
						tooltip:'form',
						icon:'img/form.png',
						draggable:true,
						data:{type:'slide',action:'add'}
					},
				}
			},
			close:{
				icon:'img/close_white.png',
			}	
		};

		this._toolbar = new toolbar(this,this._tools);	
	
		this._element
					.append(this._toolbar.getElement())
					.append(this._slidewindow)
					.append(this._slidelist_container
							.append(this._slidelist));		
		
		this._slides = [];

		this._category.each(function(){
			var s = new slide(this.getData());
			
			me._slides.push(s);
			me._slidelist.append(this.getElement())
		});

		this._toolbar.on('close',function(){
			me.close();
		});
	},
	editSlide:function(slide){

	},
	show:function(){
		$('body').append(this._overlay);
		$('body').append(this._element);

		this._slidelist.css('width',this._category.getWidth());
	},
	close:function(){
		this._overlay.remove();
		this._element.remove();
		this.fire('close');
	}
}