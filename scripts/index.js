require.config({
	paths:{
		jquery: '../lib/jquery-3.3.1.min',
		jqueryUI: '../lib/jquery-ui.min'
	}
});

require(['jquery', 'dialog'], function($,d){
	$('.btn_alert').click(function(e) {
		console.log('alert');
		new d.dialog().alert({
			content: '这是一个alert弹窗！',
			alertBtnHandler: function(){
				console.log('AlertBtn handler for alert');
			},
			width: 400,
			height: 300,
			top: 100,
			title: '这是alert弹窗',
			hasCloseBtn: true,
			closeBtnHandler: function(){
				console.log('CloseBtn handler for alert');
			},
			skinClassName: 'fangSkin',
			alertBtnText: 'OK',
			dragArea: '.hui_dialog_header'
		}).on('alert', function(){ console.log('alert on handler')}).on('close', function(){ console.log('close on handler')});
	});

	$('.btn_confirm').click(function(e) {
		console.log('confirm');
		new d.dialog().confirm({
			hasCloseBtn: true,
			content: '请确认您是否学会了封装UI组件'
		});
	});

	$('.btn_prompt').click(function(e) {
		console.log('prompt');
		new d.dialog().prompt({
			hasCloseBtn: true,
			title: '请输入您的名字',
			content: '您输入的信息将会保密处理',
			promptBtnText: '输入',
			promptPlaceholder: '姓名',
			promptBtnHandler: function(value){
				console.log('promptBtn handler for prompt');
				console.log('您输入了：'+value);
			},
		});
	});
	$('.btn_common').click(function(e) {
		console.log('common');
		new d.dialog().common({
			hasCloseBtn: true,
			content: '这是没有header and footer的弹窗'
		});
	});


});
