function slide(type,parent){
    this._events = new events(this);

    this._slide = getTemplate('slide');
    /*
        this._slide.info = this._slide.container.find('.info');
        this._slide.delete = this._slide.container.find('.delete');
        this._slide.edit = this._slide.container.find('.edit');
    this._slide.container = $('<div class="slide"></div>');
        this._slide.info = $('<div class="info"><input type="text" class="name-input"/></div>');
        this._slide.delete = $('<div class="delete"></div>');
        this._slide.edit = $('<div class="edit"></div>');
    */


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
    //this._slide.container.append(this._slide.delete).append(this._slide.edit).append(this._slide.info);
    
    this._children = [];
    this._content = [];

    this._init();           
}

slide.prototype = {
    _init:function(){
        var me = this;

        this._slide.delete.click(function(){me.remove()});
        this._slide.edit.click(function(){me.fire('edit')});
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
    _drop:function(e){
        /*
        if (e.dataTransfer.getData('type') == 'slide'){            
            if (this._container != this._slide.container){
                this.addChild(e.dataTransfer.getData('slide_type'),e.dataTransfer.getData('slide_cols'));
            } else {
                this._container = $('<div class="slide-container""></div>');
                var p = this._slide.container.parent();
                this._slide.container.replaceWith(this._container);
                this._container.append(this._slide.container);
                this.addChild(e.dataTransfer.getData('slide_type'),e.dataTransfer.getData('slide_cols'));

                this._slide.containerDrop.remove();
                this._container[0].removeEventListener('dragstart',this._fn.dragstart);
                this._init();
            }
        }
        */
    },
    setCols:function(count){
        if (typeof(count) == 'string'){
            count = parseInt(count);
        }

        this._columns = count;
        var colWidth = 85/count;

        
        for (var i=0;i<count; i++){
            this._slide.container.append('<div class="col"></div>');
        }

        this._slide.container.find('.col')
            .css('margin-left','5%')
            .css('width',colWidth-5 +'%')
            .first().css('margin-left','10%');

    },
    addContent:function(content,column){
        
        if (content instanceof Array){
            for (var i in content){
                this.addContent(content[i],column);
            }
        } else {
            if (content.datatype == 'image'){
                var el = new Image();
                el.src = content.data;

                this._slide.container.append( el );
            }            

            this._content.push({col:column,content:content});
        }
    },
    getId:function(){
        return this._id;
    },
    getData:function(){
        var d = {
            id:this.getId(),
            type: this._type,
            item:'slide',
            content:this._content
        };

        
        if (this._parent){
            d.parent = this._parent.getId();
        }

        d.children = [];

        if (this._children.length > 0){
            for (var i in this._children){
                d.children.push(this._children[i].getData());
            }
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
        
        //this._slide.containerDrop.remove();
        this._slide.container.remove();
        //this._container[0].removeEventListener('dragstart',this._fn.dragstart);
        //this._container.remove();
    },
    addChild:function(type){
        var sl = new slide(type,this);
        this._children.push(sl);
        
        this.fire('add',sl);
        this.fire('change','add');
    },
    removeChild:function(child){
        for (var i in this._children){
            if (this._children[i] == child){
                delete this._children[i];
            }
        }
    },
    getElement:function(){
        return this._slide.container;
    },
    getColumns:function(){
        return this._columns;
    }
}

