/*

	builder toolbar

		accepts json formatted data to describe menus and
		creates functional html output

		each menu item click triggers an event by the name of that item..
		so if button named (=id) "kameli" is clicked, event named "kameli"
		is fired. also 'click' event is fired with 'kameli' as first argument.

		so:

		toolbar.on('click',function(button_name){
		
			// button_name = kameli

		})

		and 

		toolbar.on('kameli',function(){
			
			// no arguments
			// this = toolbar

		})


		example for describing menus:

	simple thin menu:

		toolbar = {
			name_of_button:{
				icon:'image-url',
			},
			name_of_button:{
				icon:'image-url',
			},
			name_of_button:{
				icon:'image-url',
			}
			...
		}

	wide menu with descriptions and draggable buttons:
		
		just add "description" field into the button description

		toolbar = {
			name_of_button:{
				icon:'image-url',
				text:'some-text', 	// adds text to button
				description:'some more accurate info',
				draggable:true, 	// makes button draggable
				data:{				// draggable datatransfer data object
					foo:'bar'
				}

			},
			...			
		}

	and; the toolbar is recursive, so it can handle submenus:

		toolbar = {
			name_of_button:{
				icon:'image-url',
				submenu:{
					name_of_button:{
						icon:'image-url'
					},	
					name_of_button:{
						icon:'image-url'						
					}
				}				
			},
			...
		}


*/
function toolbar(data,parent){
	this._id = getId();
	this._parent = parent;
	this._events = new events(this);
	this._element =$('<ul id="'+this._id+'" class="toolbar"></ul>');
	this._header = $('<div class="header"><h3></h3></div>');

	this._submenus = {};
	this._items = {};
	this._itemData = {};

	if (this._parent){
		this._element.addClass('submenu'); // if this is actually a submenu of another menu
	}

	if (data){
		this.load(data);
	}
}

toolbar.prototype = {
	addHeader:function(text){
		this._element.prepend(this._header);
		this._header.find('h3').text(text);
	},
	_click:function(id){		
		this.fire('click',id); // click events
		this.fire(id);
		
		// if this has submenus, toggle visibility
		if (this._submenus[id]){
			this.hideSubmenu(id);
			this._items[id].toggleClass('submenu-visible');	
			
		}
	},
	hideSubmenu:function(exclude){
		for (var i in this._items){
			if (this._items[i].hasClass('submenu-visible') && i != exclude){
				this._items[i].removeClass('submenu-visible');
			}
		}
	},
	load:function(data){ // load menu data (json-describing)		
		for (var i in data){
			this.add(i,data[i]);
			if (data[i].submenu){
				if (!this._submenus[i]){					
					this.addSubmenu(i);
				}
				this._submenus[i].load(data[i].submenu);
			}
		}
	},
	add:function(id,data){
		var me = this;			

		this._items[id] = $('<li id="'+id+'">');
			this._items[id].append('<img src="'+data.icon+'" alt="" />');

		if (data.tooltip){
			this._items[id].addClass('tooltip');
			this._items[id].attr('tooltip',data.tooltip);
		}
		
		if (data.class){
			this._items[id].addClass(data.class.join(' '));
		}

		if (data.text){
			this._element.addClass('wide');
			this._items[id].append('<h4>'+data.text+'</h4>');

			if (data.description){
				this._items[id].append('<p>'+data.description+'</p>');
			}
		}

		this._items[id].on('click',function(e){
			var _id = id;
			e.stopPropagation();
			me._click(_id);
		});
		
		if (data.draggable === true){
			this._items[id].attr('draggable','true');
			this._setDrag(id,data.data);
		}
		this._element.append(this._items[id]);
	},
	_setDrag:function(id,data){
		var me = this;
		this._itemData[id] = data;

		this._items[id][0].addEventListener('dragstart',function(e){
			e.stopPropagation();
			me.fire('dragstart',id);
			
			e.dataTransfer.setData('id',id);			
			e.dataTransfer.setData('source',me._id);
			
			if (me._itemData[id]){			
				if (!me._itemData[id].type){
					me._itemData[id].type = id;
				}
			} else {
				me._itemData[id] = {
					type:id
				}
			}

			for (var i in me._itemData[id]){
				e.dataTransfer.setData(i, me._itemData[id][i]);
			}

		});

		this._items[id][0].addEventListener('dragend',function(e){
			e.stopPropagation();
			me.fire('dragend',id,me._itemData[id]);			
		});
	},
	addTo:function(parent_id,data){
		if (!this._submenus[parent_id]){
			this.addSubmenu(parent_id);
		};

		this._submenus[parent_id].add(data);
	},
	addSubmenu:function(id){
		this._submenus[id] = new toolbar(null,this);		
		this._submenus[id].addHeader(id);
		this._items[id].append(this._submenus[id].getElement()).addClass('has-submenu');
	},
	getElement:function(){
		return this._element;
	}
	
}