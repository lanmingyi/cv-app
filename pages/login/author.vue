<!--
 * @Description: 企业微信授权登录中间件
 * @Author: 黄婷
 * @Date: 2021-06-08 16:25:22
 * @LastEditTime: 2021-06-08 16:53:45
 * @LastEditors: 黄婷
-->
<template>
	<view class="qywx_login">
		<view class="iconfont icon-prompt-fill1"></view>
		{{title}}
		<view v-if="loginBtn" class="padding-tb-xl text-center text-blue" @click="goLogin">若已绑定，请点击重新登录</view>
	</view>
</template>

<script>
import { mapActions,mapState } from 'vuex';
import { getQueryString } from '@/common/util.js';
export default {
	computed:{
		...mapState(['token']),
	},
	data(){
		return {
			title:'企业微信授权登录',
			loginBtn: false,
			type: '',
			uuid: '',
		}
	},
	onLoad(e) {
		console.log("e----",e)
		const that = this
		that.type = e ? e.type : ''
		that.uuid = e ? e.uuid : ''
		uni.hideToast()
	},
	mounted() {
		const that = this
		const token = uni.getStorageSync('token')
		that.loginBtn = false
		console.log("123---",token)
		if (token) {
			console.log("hastoken")
			if(token == 300){
				console.log("token == 300")
				that.title = '未绑定用户，请至桌面端进行绑定'
				that.loginBtn = true
			} else {
				console.log("300 === token")
				that.$http.post('/system/checkToken', { token: token }).then((res) => {
					if (res.statusCode === 200) {
						that.loginSuccess();
					}
				}).catch((err)=>{
					console.log("err",err)
					that.goLogin()
				});
			}
		} else {
			that.bingAuthor()
		}
	},
	methods: {
		...mapActions(['EnterpriseWeChatLogin']),
		goLogin(){
			console.log("重新登陆")
			uni.removeStorage({
			    key: 'token',
			    success: function (res) {}
			});
			this.redirectUrl()
		},
		loginSuccess(res) {
			let url = uni.getStorageSync('location')
			console.log("url",url)
			if(url){
				uni.reLaunch({
					url: '/' + url
				})
			} else {
				uni.switchTab({
					url:'../home/home'
				})
			}
		},
		requestFailed(err) {
			uni.showToast({
				title: 'token失效，正在重新登录...',
				icon : 'none'
			})
			if(err.statusCode == 300){
				// this.goLogin()
				// this.title = '未绑定用户，请至桌面端进行绑定'
				this.loginBtn = true  //手动点击以防触发死循环
			}
		},
		bingAuthor(){
			// const code = sessionStorage.getItem('code')
			console.log('11111')
			const code = getQueryString('code');
			if(code){
				this.EnterpriseWeChatLogin({ code: code })
					.then((res) => {
						this.loginSuccess()
					}).catch((err) => {
						this.requestFailed(err)
					})
					.finally(() => {});
			} else {
				this.redirectUrl()
			}
		},
		redirectUrl(){
			console.log("redirectUrl")
			setTimeout(()=>{
				let redirect_uri = ''
				let url = uni.getStorageSync('location')
				if(url){
					redirect_uri =  this.$redirectUrl + url;
				} else {
					redirect_uri =  this.$redirectUrl + `pages/login/author`;
				}
				window.location.href =
					'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ this.$appId +'&redirect_uri=' +
					redirect_uri +
					'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
			},100)
		},
	},
};
</script>

<style lang="scss" scoped>
	.qywx_login{
		width: 100%;
		height: 100vh;
		background: #fff;
		text-align: center;
		padding: 25% 0;
		.icon-prompt-fill1{
			font-size: 5em;
			color: #007AFF;
		}
	}
</style>
