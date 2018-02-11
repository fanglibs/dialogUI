/**
* author: liufang
* date: 2018.01.20
*/
define(['jquery'],function($){
	function widget(){
		this.dialogBox = null;   //属性：最外层容器
	}

	widget.prototype = {
		on: function(type, handler){
			if(typeof this.handlers[type] === 'undefined'){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire: function(type, data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i=0, length=handlers.length; i<length; i++){
					handlers[i](data);
				}
			}
		},
		renderUI: function(){},       //接口：添加dom节点
		bindUI: function(){},         //接口：监听事件
		initUI: function(){},         //接口：初始化组件属性
		render: function(element){    //方法：渲染组件
			this.renderUI();
			this.handlers = {};
			this.bindUI();
			this.initUI();
			$(element || document.body).append(this.dialogBox);
		},
		destroyBefore: function(){},  //接口：销毁前的处理函数
		destroy: function(){          //方法：销毁组件的方法
			this.destroyBefore();
			this.dialogBox.off();
			this.dialogBox.remove();
		}

	};

	return {
		Widget: widget
	}
});