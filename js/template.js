function template(name){
	var el = getTemplate(name);

	for (var i in el){
		this[i] = el[i];
	}
}

template.prototype = {
	getElement:function(){
		return this.container;
	},
	append:function(e){
		return this.container.append(e);
	},
	remove:function(){
		return this.container.remove();
	},
	addClass:function(cls){
		return this.container.addClass(cls);
	},
	removeClass:function(cls){
		return this.container.removeClass(cls);
	},
	hasClass:function(cls){
		return this.container.hasClass(cls);
	},
	addTo:function(selector){
		$(selector).append(this.container);
	},
	addEventListener:function(evt,fn){
		this.container[0].addEventListener(evt,fn);
	}

}