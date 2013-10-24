function getId() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}



function slide(type,parent){
    this._events = new events(this);

    this._parent = parent || false;    
    this._type = type;
    this._id = getId();

    //this._container = $('<div class="slide-container"></div>');            
    this._slide = $('<div class="slide '+type+' " draggable="true"></div>');
    this._info = $('<div class="info"><input type="text" class="name-input" placeholder="'+this._id+'"/></div>');
    this._delete = $('<div class="delete"></div>');
    this._edit = $('<div class="edit"></div>');
    
    

    this._slide.attr('id',this._id);


    this._slide.append(this._delete).append(this._edit).append(this._info);
    this._children = [];
    this._content = [];

    this._init();           
}

slide.prototype = {
    _init:function(){
        var me = this;

        this._fn = {
            dragstart:function(e){
                e.stopPropagation();
                
                e.dataTransfer.setData('type', 'slide');
                e.dataTransfer.setData('action', 'add');
                e.dataTransfer.setData('slide_type',me._type);
                e.dataTransfer.setData('slide_cols',me._columns);
                e.dataTransfer.setData('id',me._id);                
            },
            delete:function(){
                me.remove();
            },
            edit:function(){
                me.fire('edit');
            }
        }

        //this._container[0].addEventListener('dragstart',this._fn.dragstart);
        this._delete.click(this._fn.delete);
        this._edit.click(this._fn.edit);

/*
        this._slideDrop = this._slide.dropInput();

            this._slideDrop.on('propagate',function(e){
                me._drop(e);
            });

            this._slideDrop.on('load',function(e){            
                me.addContent(e);
            });
*/
    },    
    getWidth:function(){
        return this._container.outerWidth(true);
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
            if (this._container != this._slide){
                this.addChild(e.dataTransfer.getData('slide_type'),e.dataTransfer.getData('slide_cols'));
            } else {
                this._container = $('<div class="slide-container""></div>');
                var p = this._slide.parent();
                this._slide.replaceWith(this._container);
                this._container.append(this._slide);
                this.addChild(e.dataTransfer.getData('slide_type'),e.dataTransfer.getData('slide_cols'));

                this._slideDrop.remove();
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
            this._slide.append('<div class="col"></div>');
        }

        this._slide.find('.col')
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

                this._slide.append( el );
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
            type:'slide',
            class: this._type,
            columns:this._columns,
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
        this._slide.attr('id',this._id);
        this._type = data.class;
        this.setCols(data.columns);
/*
        for (var i in data.children){
            if (data.children[i].type == 'slide'){
                this.addChild(data.children[i].class,false,data.children[i]);
            }
        }
*/
    },
    remove:function(){
        this.fire('remove',this);
        this.fire('change','remove');
        
        //this._slideDrop.remove();
        this._slide.remove();
        //this._container[0].removeEventListener('dragstart',this._fn.dragstart);
        //this._container.remove();
    },
    /*
    addChild:function(type,columns,data){
        var sl = new slide(type,this);
        this._children.push(sl);
        this._container.append(sl.getElement());

        if (columns){
            sl.setCols(columns);
        }

        if (data){
            sl.load(data);
        }

        var me = this;
        
        sl.on('remove',function(){
            me._removeChild(this);
        });

        sl.getElement().addClass('child');
        this.fire('add',sl);
        this.fire('change','add');
    },
    _removeChild:function(child){
        for (var i in this._children){
            if (this._children[i] == child){
                delete this._children[i];
            }
        }
    },
    */
    getElement:function(){
        return this._slide;
    },
    getColumns:function(){
        return this._columns;
    }
}

