BUILDER.editor._tools = {
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
			block:{
				text:'block',
				description:'layout block',
				icon:'img/paper.png',
				draggable:true,
				data:{
					action:'addColumn',
					type:2
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
				description:'video element',
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
	save:{
		text:'save',
		class:['save'],
		description:'save changes',
		icon:'img/upload.png',
	},	
	close:{
		text:'back',
		class:['back'],
		description:'save and return',
		icon:'img/arrow-left.png',
	}	
};