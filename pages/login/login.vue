<template>
	<view id="login" :class="[vtheme]">
		<view class="logo pos-relative">
			<view class="img">
				<image mode="widthFix" src="@/static/img/AI.png"></image>
			</view>
			<view class="title">AI快速开发平台</view>
		</view>
		
		<!-- 账号密码输入框 -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==swiperCurrent?'text-theme cur':''" v-for="(item,index) in navList" :key="index" @tap="tabsChange(index)" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		
		<swiper class="swiper-box" :current="swiperCurrent"  :show-bar="false" :disable-touch="true" >
			
			<swiper-item class="swiper-item tab-content">
				<view class="form">
					<u-form :model="userData" ref="userForm" :errorType="errorType">
						<u-form-item label-width="20" label-position="left" prop="userNameId" :borderBottom="false">
							<view class="username">
								<u-input :border="false" placeholder="请输入账号" v-model="userData.userNameId" placeholder-style="color: #3a3a3a;font-size:13px;" type="text"></u-input>
							</view>
						</u-form-item>
						<u-form-item label-width="20" label-position="left" prop="password" :borderBottom="false">
							<view class="password">
								<u-input :border="false" placeholder="请输入密码" v-model="userData.password" placeholder-style="color: #3a3a3a;font-size:13px;" type="password"></u-input>
							</view>
						</u-form-item>
					</u-form>
					<view class="btn" @tap="bindLogin">登 录</view>
				</view>
			</swiper-item>
			
			<swiper-item class="swiper-item tab-content">
				<view class="form">
					<u-form :model="phoneData" ref="phoneForm" :errorType="errorType">
						<u-form-item label-width="20" label-position="left" prop="phoneNumber" :borderBottom="false">
							<view class="username">
								<u-input :border="false" placeholder="手机号" v-model="phoneData.phoneNumber" placeholder-style="color: #3a3a3a;font-size:13px;" type="text"></u-input>
							</view>
						</u-form-item>
						<u-form-item label-width="20" label-position="left" prop="code" :borderBottom="false">
							<view class="password">
								<u-input :border="false" placeholder="验证码" v-model="phoneData.code" placeholder-style="color: #3a3a3a;font-size:13px;" type="number"></u-input>
							</view>
							<view class="code" @click.stop.prevent="getCaptcha">
								{{!state.smsSendBtn ? '获取验证码' : state.time+'s'}}
							</view>
						</u-form-item>
					</u-form>
					<view class="btn" @tap="bindLoginPhone">登 录</view>
				</view>
			</swiper-item>
		
		</swiper>
		
		<view class="company-name">
			<view>明图科技有限公司</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import mInput from '@/components/m-input.vue';
	import service from '@/service.js';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				navList: [{
						name: '账号登录'
					},{
						name: '手机号登录'
					}
				],
				phoneData:{
					phoneNumber: '',
					code: '',
				},
				phoneDataRules: {
					phoneNumber:[{
						required: true,
						pattern: /^1[34578]\d{9}$/,
						message: '请输入正确的手机号',
						trigger: ['change','blur'],
					}]
				},
				phoneDataCodeRules: {
					phoneNumber:[{
						required: true,
						pattern: /^1[34578]\d{9}$/,
						message: '请输入正确的手机号',
						trigger: ['change','blur'],
					}],
					code:[{
						required: true,
						message: '请输入验证码',
						trigger: 'change',
					}]
				},
				isSaaSEnabled: false,
				state: {
				  time: 60,
				  smsSendBtn: false,
				},
				userData :{
					userNameId: 'ewsd0001',
					password: 'ewsd0001',
				},
				userDataRules: {
					userNameId:[{
						required: true,
						message: '请输入账号',
						trigger: 'change',
					},{
						min:5,
						message: '账号最短为 5 个字符',
					}],
					password:[{
						password: true,
						message: '请输入密码',
						trigger: 'change',
					},{
						min:6,
						message: '密码最短为 6 个字符',
					}]
				},
				errorType: ['toast'],
				swiperCurrent: 0,
				flag: true
			};
		},
		onReady() {
			this.$refs.phoneForm.setRules(this.phoneDataRules);
		},
		methods: {
			...mapMutations(['login']),
			tabsChange(index) {
				this.swiperCurrent = index;
				if(index == 0){
					// this.$refs.userForm.resetFields()
					this.$refs.userForm.setRules(this.userDataRules);
					
				} else {
					this.$refs.phoneForm.resetFields()
					this.$refs.phoneForm.setRules(this.phoneDataRules);
					// this.userData = {
					// 	userNameId: 'ewsd0001',
					// 	password: 'ewsd0001',
					// }
				}
			},
			inputChange(e){
				console.log("inputChange",e)
			},
			// 获取验证码
			getCaptcha(e) {
				this.$refs.phoneForm.setRules(this.phoneDataRules);
				console.log("this.state.smsSendBtn",this.state.smsSendBtn)
				if(this.state.smsSendBtn){
					return
				}
				this.$refs.phoneForm.validate((valid)=>{
					if(valid){
						const hide = this.$u.toast('验证码发送中')
						let interval = null
						this.$http.post("/system/smsCode.api", { phoneNumber: this.phoneData.phoneNumber},{params:{}})
						.then((res) => {
							if(res.data.statusCode == 200){
								this.state.smsSendBtn = true;
								interval = setInterval(() => {
									if (this.state.time-- <= 0) {
										this.state.time = 60;
										this.state.smsSendBtn = false;
										clearInterval(interval);
									}
								}, 1000);
							} else {
								
							}
							setTimeout(hide, 0);
							this.$u.toast(res.data.message)
						})
						.catch((err) => {
							setTimeout(hide, 1);
							clearInterval(interval);
							this.state.time = 60;
							this.state.smsSendBtn = false;
							this.$u.toast('发送失败！')
						});
					}
				})
			},
			bindLoginPhone(){
				if(this.swiperCurrent == 1){
					this.$refs.phoneForm.setRules(this.phoneDataCodeRules);
					this.$refs.phoneForm.validate((valid)=>{
						if(valid){
							let params = {
								...this.phoneData
							}
							this.$http.post("/system/phoneNumberLogin.api", params,{params:{}})
							.then((res) => {
								var jsondata = res;
								if (jsondata.statusCode == 200) {
									this.token = jsondata.data.message.substring(7);
									this.getUserInfo(); //用户登录之后应该返回用户的基本信息，此接口未返回需要调用返回用户信息的接口
									// 用来判断是否第一次启动应用
									uni.setStorageSync('isFirst', this.token);
								} else {
									this.$u.toast(res.data.message)
									return;
								}
							})
							.catch((err) => {
								this.$u.toast(res.data.message)
							});
						}
					})
				}
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 */
				this.$refs.userForm.validate((valid)=>{
					if(valid){
						const ajaxdata = JSON.stringify({
							...this.userData,
							loginType: 'app',
							code: ''
						});
						// 请求登录，获取登录信息
						console.log("this.flag",this.flag)
						if (this.flag) {
							this.flag = false;
							this.$http
								.post('/system/jwtLogin', ajaxdata, {
									params: {},
									header: {
										'content-type': 'application/json'
									},
									custom: {
										auth: false
									}
								})
								.then(res => {
									console.log(res.data);
									this.flag = true;
									var jsondata = res;
									if (jsondata.data.statusCode == 200) {
										this.token = jsondata.data.message.substring(7);
										this.getUserInfo(); //用户登录之后应该返回用户的基本信息，此接口未返回需要调用返回用户信息的接口
										// 用来判断是否第一次启动应用
										uni.setStorageSync('isFirst', this.token);
									} else {
										this.$u.toast(res.data.message)
										return;
									}
								})
								.catch(err => {
									this.flag = true;
									uni.hideLoading();
									this.$u.toast(err.data.message)
								});
						}
					}
				})
			},
			getUserInfo() { //用户此时没有获取到用户信息所以请求用的不是封装好的
				uni.request({
					url: this.$baseUrl + '/mdata/user/getCurrentUserInfor',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'token': this.token
					},
					success: res => {
						let userInfo = res.data
						userInfo.token = this.token
						this.login(userInfo)
						let url = uni.getStorageSync('location')
						console.log("url",url) 
						if(url){
							uni.reLaunch({
								url: '/' + url
							})
						} else {
							uni.switchTab({
								url:'/pages/home/home'
							})
						}
					},
					fail: function(res) {
						this.$u.toast(res.data.message)
					}
				});
			}
		},
		onLoad(option) {
			this.flag = true
			uni.hideToast()
		}
	};
</script>

<style lang="scss" scoped>
	page {
		// background: linear-gradient(to bottom, #fe8b48 0%,#fe4936 100%);
		// background: linear-gradient(to bottom, #3aaafe 0%, #3aaafe 100%);
	}

	#login {
		width: 100%;
		height: 100vh;
		background-color: #fff;
	}
	.title {
		padding-top: 40upx;
		text-align: center;
		color: #fff;
		font-weight: bold;
		font-size: 40upx;
	}
	
	.company-name{
		text-align: center;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 40upx;
		view{
			margin: 0 auto;
			color: #aeafb5;
			font-family: Helvetica Neue,Helvetica,sans-serif;
			letter-spacing: 3upx;
		}
	}

	.logo {
		width: 100%;
		padding-top: 100upx;
		padding-bottom: 100upx;
		// background: linear-gradient(to bottom, #3aaafe 0%, #3aaafe 100%);
		// border-radius: 0 50%;
		margin-bottom: 10px;
		background: url(@/static/img/bg002.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.img {
			width: 25%;
			margin: 0 auto;

			image {
				width: 100%;
				border-radius: 100%;
			}
		}
		
		.bottom-img{
			width: 100vw;
			position: absolute;
			z-index: 2;
			bottom: -10px;
			left: 0;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.swiper-box{
		width: 100vw;
		height: 40vh;
	}

	.form {
		width: 86%;
		padding: 0 3%;
		font-size: 30upx;
		margin: 70upx auto 0;

		.username,
		.password,
		.code {
			width: 86%;
			height: 90upx;
			display: flex;
			align-items: center;
			border-radius: 15upx;
			padding: 0 45upx;
			background-color: rgba($color: #3aaafe, $alpha: 0.1);

			input {
				width: 100%;
				height: 50upx;
				color: #3a3a3a;
				font-size: 14px;
			}
		}
		
		.code-box{
			display: flex;
			align-items: center;
			border-radius: 15upx;
			padding: 15upx 30upx;
			font-size: 14px;
			white-space: nowrap;
			color: #fff;
			background: #3aaafe;
		}
		
		.username,
		.password {
			width: 100%;
			// border-bottom: 3upx solid #3aaafe;
		}
		
		.code{
			margin-left: 20px;
			width: 50%;
			height: 35px;
			justify-content: center;
			border-radius: 15upx;
			white-space: nowrap;
			color: #3aaafe;
			font-size: 26upx;
			padding: 0 10px;
			background-color: #fff;
			border: 2upx solid #3aaafe;
		}

		.btn {
			color: #fff;
			width: 100%;
			height: 90upx;
			margin-top: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 15upx;
			background-color: #3aaafe;
			// border: solid 1upx #fffefe;
			// box-shadow: 0 0 2upx rgba(0, 0, 0, .5);
			font-size: 36upx;
		}
	}
</style>
