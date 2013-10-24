function toolbar(parent,data){
	this._id = getId();
	this._parent = parent;
	this._events = new events(this);
	this._element =$('<ul id="'+this._id+'" class="toolbar"></ul>');


	this._submenus = {};
	this._items = {};
	this._itemData = {};

	if (this._parent){
		this._element.addClass('submenu');
	}

	if (data){
		this.load(data);
	}
}

toolbar.prototype = {
	_click:function(id){		
		this.fire('click',id);
		this.fire(id);
		
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
	load:function(data){
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
			
			if (!me._itemData[id].type){
				me._itemData[id].type = id;
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
		this._submenus[id] = new toolbar(this);		
		this._items[id].append(this._submenus[id].getElement()).addClass('has-submenu');
	},
	getElement:function(){
		return this._element;
	}
	
}