var BUILDER = {
	toolbar: false,
	presentation: false,
	container:false,	
	editor:false,
	window:false,
	tools:{
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
		load:{
			icon:'img/download.png',
		},
		save:{
			icon:'img/upload.png',
		},
		remove:{
			icon:'img/trashcan.png'
		}
	},
	edit:function(item){
		this.editor.edit(item);
	},
	init:function(container){
		this.toolbar = new toolbar(this.tools);
		this.presentation = new presentation();
		this.window = this.presentation.getElement();

		this.container = $(container);
		this.container.append(this.window).append(this.toolbar.getElement());
		this.editor = EDITOR;
		this.editor.init();

		var c = this.presentation.add();
			c.add('col1');
			c.add('video');
			c.add('form');
			c.add('col1');
			c.add('video');
			c.add('form');
			c.add('col1');
			c.add('video');
			c.add('form');
			c.add('col1');
			c.add('video');
			c.add('form');
		
		c.edit();
		
		var c = this.presentation.add();
			c.add('col1');
			c.add('video');
			c.add('form');
			c.add('col1');

		var c = this.presentation.add();
			c.add('col1');
			c.add('video');
			c.add('form');
			c.add('col1');

	}
}




