<script>
	// import update from 'common/update.js';
	import Vue from 'vue';
	import {
		mapMutations,mapState
	} from 'vuex';
	export default {
		computed: {
			...mapState(['userInfos','theme'])
		},
		methods: {
			...mapMutations(['SET_TOKEN','SET_THEME'])
		},
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					console.log("e",e)
					// #ifndef MP
					
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			

			// 锁定屏幕方向
			//			plus.screen.lockOrientation('portrait-primary'); //锁定
			// 			// #ifdef APP-PLUS
			// 			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			// 				uni.request({
			// 					url: 'http://www.example.com/update/',
			// 					data: {
			// 						version: widgetInfo.version,
			// 						name: widgetInfo.name
			// 					},
			// 					success: (result) => {
			// 						var data = result.data;
			// 						if (data.update && data.wgtUrl) {
			// 							uni.downloadFile({
			// 								url: data.wgtUrl,
			// 								success: (downloadResult) => {
			// 									if (downloadResult.statusCode === 200) {
			// 										plus.runtime.install(downloadResult.tempFilePath, {
			// 											force: false
			// 										}, function() {
			// 											console.log('install success...');
			// 											plus.runtime.restart();
			// 										}, function(e) {
			// 											console.error('install fail...');
			// 										});
			// 									}
			// 								}
			// 							});
			// 						}
			// 					}
			// 				});
			// 			});
			// 			// #endif
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				console.log(widgetInfo.version);
				uni.request({
					url: 'http://192.168.1.104:9300/system/updateApp',
					data: {
						version: widgetInfo.version,
						name: widgetInfo.name,
					},
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: (result) => {
						var data = result.data;
						console.log(data)
						if (data.update && data.wgtUrl) {
							uni.downloadFile({
								url: data.wgtUrl,
								success: (downloadResult) => {
									if (downloadResult.statusCode === 200) {
										plus.runtime.install(downloadResult
											.tempFilePath, {
												force: false
											},
											function() {
												console.log('install success...');
												plus.runtime.restart();
											},
											function(e) {
												console.error('install fail...');
											});
									}
								}
							});
						} else if (data.update && data.pkgUrl) {
							uni.showModal({ //提醒用户更新  
								title: "更新提示",
								content: data.note,
								success: (res) => {
									if (res.confirm) {
										plus.runtime.openURL(data.pkgUrl);  
									}
								}
							})
						}
					},
				});
			});
			// #endif
			
			uni.removeStorage({
				key: 'location'
			})
		},

		onShow: function() {
			// 主题匹配
			let theme = uni.getStorageSync('theme') ? uni.getStorageSync('theme') : 'default'
			let name = theme.split("-")[0];
			console.log("theme",theme,name)
			this.SET_THEME(name)
		},
		onHide: function() {
			console.log('App Hide');
		},
		data() {
			return {};
		},
	};
</script>
<!-- <script src="static/iconfont.js"></script> -->

<style>
	@import './static/iconfont.css';    //功能
	@import './static/customfont.css';  //小图标
	@import './graceUI/graceUI.css';
	@import './common/css/coloruiIcon.css';
	@import './common/css/uniIcon.css';
	@import './common/css/animation.css';
	@import './common/css/main.css';
	@import './common/css/uni.css';
	@import './common/css/common.css';
</style>
<style lang="scss">
	@import 'uview-ui/index.scss';
	
	// 流程图样式
	// @import 'bpmn-js/dist/assets/diagram-js.css' ;// bpmn.js  样式
	// @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
	// @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
	// @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

	body,
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
		font-size: 40upx;
		// overflow: hidden;
	}

	*,
	ul,
	li,
	a {
		padding: 0;
		margin: 0;
		text-decoration: none;
		-webkit-overflow-scrolling: touch;
		font-family: Helvetica Neue,Helvetica,sans-serif;
	}

	#page {
		width: 100%;
		background-color: #fff;
	}

	uni-view {
		font-size: 14px;
	}

	.icon {
		width: 30px;
		height: 30px;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}

	.u-drawer-content {
		border-radius: 30rpx 30rpx 0 0;
	}

	.grace-list .items .title {
		height: 100%;
	}

	.uni-table {
		min-width: 100% !important;
	}

	.uni-load-more__text {
		font-size: 12px !important;
	}
	
	uni-page-body {
	    height: 100%;
	}
	#viewFile {
	    height: 100vh;
			width: 100vw;
	}
	#wps-iframe {
	    height: 100vh !important;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
		background: #f8f8f8;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */
	@font-face {
		font-family: 'iconfont';
		/* project id 1042951 */
		src: url('https://at.alicdn.com/t/font_1042951_e24qthib7vh.eot');
		src: url('https://at.alicdn.com/t/font_1042951_e24qthib7vh.eot?#iefix') format('embedded-opentype'),
			url('https://at.alicdn.com/t/font_1042951_e24qthib7vh.woff2') format('woff2'),
			url('https://at.alicdn.com/t/font_1042951_e24qthib7vh.woff') format('woff'),
			url('https://at.alicdn.com/t/font_1042951_e24qthib7vh.ttf') format('truetype'),
			url('https://at.alicdn.com/t/font_1042951_e24qthib7vh.svg#iconfont') format('svg');
	}

	.font {
		font-family: 'iconfont';
		vertical-align: middle;
	}

	#reading,
	#home,
	#community,
	#telephone,
	#mine,
	#mine_detail {
		width: 100%;
	}

	.uni-input {
		height: 100%;
	}

	.head {
		color: #fff;
		background: #3aaafe;
		padding: 0 20upx;
		height: 44px;
		line-height: 44px;
		text-align: right;
		font-weight: 700;
		position: relative;
	}

	.navigator-hover {
		background: transparent;
	}

	.head_info {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.grace-common-mt {
		margin: 0;
	}

	.grace-form .grace-items .input {
		margin: 0;
	}

	.grace-form .grace-items {
		padding: 0;
	}

	.uni-header-logo {
		padding: 30upx;
		text-align: center;
		margin-top: 10upx;
	}

	.uni-header-logo image {
		width: 140upx;
		height: 140upx;
	}

	.uni-hello-text {
		color: #7a7e83;
	}

	.uni-padding-wrap {
		padding: 0;
		width: 100%;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300upx;
		background: #fff;
		padding: 50upx;
		margin-top: 10px;
		font-size: 38upx;
		color: #808080;
	}

	.grace-boxes {
		background: transparent;
	}

	.grace-scroll-do uni-scroll-view,
	.grace-scroll-do {
		border: none;
	}

	.grace-scroll-do {
		border-bottom: 1px solid #e6e6e6;
	}

	.uni-list-cell::after {
		background-color: #fff;
	}

	img {
		max-width: 100%;
		max-height: 100%;
	}

	/* image{
		max-width:100%;
		max-height:100%;
	} */
	/* .big_bg{
			background: url(static/img/tent_bg.jpg) repeat fixed center;
			background-size: 100% 100%;
		} */
		
</style>
