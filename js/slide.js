function slide(type,parent){
    this._events = new events(this);

    this._slide = getTemplate('slide');

    if (typeof(type) == 'object'){
        this.load(type);
    } else {
        this._type = type;
        this._id = getId();        
    }

    this._parent = parent || false;    
    this._slide.info.find('input').val(this._id);


    if (this._type){
        this._slide.container.addClass(this._type);
    }

    this._slide.container.attr('id',this._id);
    this._init();

    this._columns = [];
}

slide.prototype = {
    removeContent:function(id){
        for (var i in this._columns){
            if (id != this._columns[i]._id){
                var found = this._columns[i].removeContent(id);
                if (found){
                    return true;
                }
            } else {
                return this.removeColumn(this._columns[i]);                
            }
        }
    },
    getParent:function(){
        return this._parent;
    },
    _init:function(){
        var me = this;
        this._slide.container.bind('click',function(){BUILDER.edit(me)});
        this._slide.container.bind('contextmenu',function(e){e.preventDefault(); me.remove()});
        //this._slide.delete.unbind().bind('click',function(){me.remove()});
        //this._slide.edit.unbind().bind('click',function(){BUILDER.edit(me)});        
    }, 
    getColumns:function(){
        return this._columns;
    },
    addColumn:function(){
        var c = new column(),
            me = this;

        this._columns.push(c);                
        return c;
    },
    removeColumn:function(column){
        for (var i in this._columns){
            if (typeof(column) == 'string'){
                if (this._columns[i]._id == column){                    
                    this._columns[i].remove();
                    return this._columns.splice(i,1);                    
                }
            } else if (this._columns[i] == column){
                this._columns[i].remove();
                return this._columns.splice(i,1)[0];
            }
        }
        return false;
    },
    getWidth:function(){
        return this._slide.container.outerWidth(true);
    },
    clone:function(){
    
        var c = new slide(this.getType());
        c.setCols( this.getColumns() );
        return c;
    
    },
    getType:function(){
        return this._type;
    }, 
    getId:function(){
        return this._id;
    },
    getData:function(){
        var d = {
            id:this.getId(),
            type: this._type,
            item:'slide',
        };

        
        if (this._parent){
            d.parent = this._parent.getId();
        }

        if (this._columns){
            var coldata = [];
            for (var i in this._columns){
                coldata.push( this._columns[i].getData() );
            }

            d.colums = coldata;
        }

        return d;
    },
    load:function(data){        
        this._id = data.id;
        this._type = data.type;   

        for (var i in data.children){
            if (data.children[i].type == 'slide'){
                this.addChild(data.children[i].class,false,data.children[i]);
            }
        }
    },
    remove:function(){
        this.fire('remove',this);
        this.fire('change','remove');
        
        this._slide.container.remove();
    },
    getElement:function(){
        return this._slide.container;
    }
}

