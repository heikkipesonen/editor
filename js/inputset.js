function input(opts){
	this._events = new events(this);
	this._element = getTemplate('inputfield');

	for (var i in opts){
		this._element.field.attr(i,opts[i]);
	}

	if (!opts.id){
		this._element.attr('id',opts.name);
	} else {
		this._element.attr('id',opts.id);
	}

	this._opts = opts;

	if (opts.label){
		this._element.label.text(opts.label);
	}
}

input.prototype = {
	load:function(data){

	},
	getData:function(){

	},
	getElement:function(){
		return this._element.container;
	}
}


function inputset(opts){
	this._events = new events(this);
	this._opts = opts;
	this._element = getTemplate('inputset');
}

inputset.prototype = {
	add:function(input){

	},
	remove:function(input){

	},
	load:function(data){

	},
	getData:function(){

	},
	getElement:function(){
		return this._element.container;
	}

}