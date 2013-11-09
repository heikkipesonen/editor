function template(element){
	this.container = element;
    this.container.removeAttr('template');
	
	var me = this;
		
	this.container.find('*').each(function(){
		if ($(this).attr('class')){
			var prop = $(this).attr('class').split(' ')[0];
			me[prop] = $(this);
		}
	});
}

template.prototype = {
	bind:function(evt,fn){
		return this.container.bind(evt,fn);
	},
	unbind:function(){
		return this.container.unbind();
	},
	remove:function(){
		this.container.remove();
	}
}
