<template>
	<view id="viewFile"></view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		components: {},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				simpleMode: 'normal',
				app: null,
			};
		},
		onLoad() {
			let wpsUrl = uni.getStorageSync('wpsUrl');
			let token = uni.getStorageSync('token')
			
			this.openWps(wpsUrl,token)
		},
		methods: {
			openWps(url, token) {
				this.$nextTick(function(){
					let _this = this;
					const wps = _this.wps.config({
						mode: _this.simpleMode ? 'simple' : 'normal',
						mount: document.querySelector('#viewFile'),
						wpsUrl: url,
						wordOptions: {
						  isShowDocMap: false, // 是否开启目录功能，默认开启
						  isBestScale: true, // 打开文档时，默认以最佳比例显示
						  isShowBottomStatusBar: true, // 是否展示底部状态栏
						  mobile: {
						    isOpenIntoEdit: true, // （Mobile）要有编辑权限，移动端打开时是否进入编辑
						    isShowHoverToolbars: true, // （Mobile）是否显示文字底部工具栏
						    isVoiceCommentEnabled: false, // （Mobile）是否允许插入语音评论
						  },
						}
					});
					wps.setToken({ token });
					let app = wps.WpsApplication;
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
.pos-strike{
	position: sticky;
	top: 0;
	z-index: 5;
}
.cu-form-group uni-input,
.cu-form-group uni-textarea{
	font-size: 13px;
}
.cu-form-group uni-textarea{
	min-height: 200px !important;
	border: 1px solid #e7e7e7;
	border-radius: 10px;
	padding:10px 15px;
}
.text-font-13{
	font-size: 13px !important;
}
.botton-bottom{
	position: fixed;
	bottom: 20px;
	left: 0;
	right: 0;
	z-index: 5;
}
</style>
