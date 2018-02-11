/**
* author: liufang
* date: 2018.01.20
*/
define(['jquery', 'jqueryUI', 'widget'],function($, $UI, widget){
	function dialog(){
		this.config = {
			width: 360,
			height: 200,
			title: '系统消息',
			content: '',
			alertBtnText: '确定',
			alertBtnHandler: null,
			closeBtnHandler: null,
			hasCloseBtn: false,
			skinClassName: '',
			hasMask: true,
			isDraggable: true,
			dragArea: null,
			confirmBtnText: '确定',
			confirmBtnHandler: null,
			cancelBtnText: '取消',
			cancelBtnHandler: null,
			promptBtnText: '确定',
			promptBtnHandler: null,
			promptInputIsPassword: false,
			promptInputMaxLength: 30,
			promptInputDefaultValue: '',
			promptPlaceholder: ''

		};
		
	}
	
	dialog.prototype = $.extend({}, new widget.Widget(), {
		renderUI: function(){
			var footerContent = '';
			switch(this.config.type){
				case 'alert':
					footerContent = '<input type="button" class="hui_footer_btn hui_alertBtn" value="' +this.config.alertBtnText+ '" />';
					break;
				case 'confirm':
					footerContent = '<input type="button" class="hui_footer_btn hui_confirmBtn" value="' +this.config.confirmBtnText+ '" /><input type="button" class="hui_footer_btn hui_cancelBtn" value="' +this.config.cancelBtnText+ '" />';
					break;
				case 'prompt':
					this.config.content += '<div class="hui_promptInputBox"><input type="'+(this.config.promptInputIsPassword ? 'password' : 'text')+'" value="'+this.config.promptInputDefaultValue+'" maxlength="'+this.config.promptInputMaxLength+'" placeholder="'+this.config.promptPlaceholder+'" class="hui_promptInput" /></div>';
					footerContent = '<input type="button" class="hui_footer_btn hui_promptBtn" value="' +this.config.promptBtnText+ '" /><input type="button" class="hui_footer_btn hui_cancelBtn" value="' +this.config.cancelBtnText+ '" />';
			}
			this.dialogBox = $(
				'<div class="hui_dialog_box">'+
					'<div class="hui_dialog_main">' +this.config.content+ '</div>'+
				'</div>'
			);
			if(this.config.type !== 'common'){
				this.dialogBox.prepend('<div class="hui_dialog_header">' +this.config.title+ '</div>');
				this.dialogBox.append('<div class="hui_dialog_footer">' +footerContent+ '</div>');
			}

			if(this.config.hasCloseBtn){
				this.dialogBox.prepend('<span class="hui_dialog_close">X</span>');
			}
			this.dialogBox.appendTo(document.body);
			if(this.config.hasMask){
				this._mask = $('<div class="hui_mask_box"></div>');
				this._mask.appendTo(document.body);
			}
			this._promptInput = this.dialogBox.find('.hui_promptInput');
		},
		bindUI: function(){
			var that = this;
			this.dialogBox.on('click', '.hui_dialog_close', function() {
				that.fire('close');
				that.destroy();
			}).on('click', '.hui_alertBtn', function() {
				that.fire('alert');
				that.destroy();
			}).on('click', '.hui_confirmBtn', function() {
				that.fire('confirm');
				that.destroy();
			}).on('click', '.hui_cancelBtn', function() {
				that.fire('cancel');
				that.destroy();
			}).on('click', '.hui_promptBtn', function() {
				that.fire('prompt', that._promptInput.val());
				that.destroy();
			});

			if(this.config.alertBtnHandler){
				this.on('alert', this.config.alertBtnHandler);
			}
			if(this.config.closeBtnHandler){
				this.on('close', this.config.closeBtnHandler);
			}
			if(this.config.confirmBtnHandler){
				this.on('confirm', this.config.confirmBtnHandler);
			}
			if(this.config.cancelBtnHandler){
				this.on('cancel', this.config.cancelBtnHandler);
			}
			if(this.config.promptBtnHandler){
				this.on('prompt', this.config.promptBtnHandler);
			}
		},
		initUI: function(){
			var CFG = this.config;
			this.dialogBox.css({
				width: CFG.width,
				height: CFG.height,
				left: CFG.left || (window.innerWidth-CFG.width)/2,
				top: CFG.top || (window.innerHeight-CFG.height)/2
			});
			if(CFG.skinClassName){
				this.dialogBox.addClass(CFG.skinClassName);
			}
			if(CFG.isDraggable){
				if(CFG.dragArea){
					this.dialogBox.draggable({handle: CFG.dragArea});
				}else {
					this.dialogBox.draggable();
				}
			}
			if(this.config.type == 'common'){
				this.dialogBox.find('.hui_dialog_main').addClass('common_main');
			}
		},
		destroyBefore: function(){
			this._mask && this._mask.remove();
		},

		alert: function(config){
			$.extend(this.config, config, {type: 'alert'}),
			this.render();
			return this;
		},
		confirm: function(config){
			$.extend(this.config, config, {type: 'confirm'}),
			this.render();
			return this;
		},
		prompt: function(config){
			$.extend(this.config, config, {type: 'prompt'}),
			this.render();
			this._promptInput.focus();
			return this;
		},
		common: function(config){
			$.extend(this.config, config, {type: 'common'}),
			this.render();
			return this;
		}

	});

	return {
		dialog: dialog
	}
});