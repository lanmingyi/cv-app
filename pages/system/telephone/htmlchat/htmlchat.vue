<template>
	<view>
	</view>
</template>

<script>
	
	var webview = plus.webview.create('https://app.help-itool.com/Page/sesstion/View/Main/session/index.html','sesstion',{
		// 窗口 位置
		top: '76px',
		bottom: '51px'
	},{
		
		info:{
			// 用户关键字
			userKey:2666,
			
			// 用户手机
			userPhone:15252156614,
			
			// 用户昵称
			userName: '健健',
			
			// 头像
			headImg: 'https://ewsd-shanghai.oss-cn-shanghai.aliyuncs.com/static/app/images/logo.png',
			
			// [选填] token
			token:'123123'
		},
		
		// 项目配置 *[自行申请 替换就OK]
		ProjectInfo: {
			userPhone: "15252156614",
			userToken: "0ZJ_A5F0-F4AC1DD644DA",
			projectToken: "CC8-A829-E530731C0FD6",
			callUrl: "http://socketplus.ecjsw.com/MsgCall/tack"
		},
		
		style:{
			// 窗口颜色 配置
			nTitle:{
				color: '#fff',
				background: '#1482d1'
			}
		}
		
		
	});
	
	var wArr = ['chat'];
	
	export default {
		
		data(){
			
			return {
				
			}
			
		},
		
		onShow: function () {
			console.log('b App Show')
			
			if(webview == null){
				console.error('会话窗口 已被关闭')
			}
			
			for (var i = 0; i < wArr.length; i++) {
				if(plus.webview.getWebviewById(wArr[i])){
					return console.log(wArr[i] + '：存在 webview 不用显示');
				}
			}
			
			webview.show();
		},
		onHide: function () {
			for (var i = 0; i < wArr.length; i++) {
				if(plus.webview.getWebviewById(wArr[i])){
					return console.log(wArr[i] + '：存在 webview 不用隐藏');
				}
			}
			
			console.log('b App Hide')
			webview.hide('zoom-fade-out');
		},
		
		created:function(){
			
		},
		methods:{
			go_chatlist:function (e) {
				uni.navigateTo({
					url: './telephone'
				});
			},
		}
		
	}
	
</script>

<style>
.f_msg{
	width: 100upx;
	height: 100upx;
	background: #3AAAFE;
	border-radius: 50%;
	position: fixed;
	bottom: 5%;
	right: 10%;
	color: #fff;
	font-size: 26px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
