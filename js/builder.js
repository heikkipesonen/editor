var builder = {
	toolbar: false,
	presentation: false,
	container:false,	
	window:false,
	tools:{
		create:{
			icon:'img/add.png',
			submenu:{
				/*
				startslide:{
					icon:'img/paper.png',
					tooltip:'col 1',
					draggable:true,
					data:{type:'slide',action:'add'}
				},
				*/
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
	init:function(container){
		this.toolbar = new toolbar(this,this.tools);
		this.presentation = new presentation();
		this.window = this.presentation.getElement();

		this.container = $(container);
		this.container.append(this.window).append(this.toolbar.getElement());

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

		//c.edit();
	}
}




