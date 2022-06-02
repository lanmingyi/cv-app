<template>
	<view class="bg-white" id="page">
		<view class="margin">
			<view style="margin-top:50px;" class="grace-center">
				<image src='https://ewsd-shanghai.oss-cn-shanghai.aliyuncs.com/static/app/images/logo.png' style='width:68px; height:68px; border-radius:8px;'></image>
			</view>
			<view class="grace-form" style="margin-top:50upx;">
				<form @submit="loginNow">
					<view class="cu-form-group solid-top">
						<view class="grace-label">
							<picker :value="pnpre" @change="changePre" :range="pnpres" name="pn_pre">
								<text>+{{pnpre}}</text>
							</picker>
						</view>
						<input type="number" name="pn" class="input margin-left" v-model="phoneno" placeholder="请输入手机号"></input>
					</view>

					<view class="cu-form-group margin-bottom solid-bottom">
						<view class="title">验证码</view>
						<input type="number" class="input" name="yzm" placeholder="请输入验证码"></input>
						<button type="primary" class="cu-btn bg-green shadow" @tap='getVCode'>{{vcodeBtnName}}</button>
						<!-- <button class="cu-btn bg-green shadow">验证码</button> -->
					</view>
					
					<view form-type='submit' type='primary' class="flex flex-direction">
					  <button class="cu-btn margin-tb-sm lg bg-green">登录</button>
					</view>
				</form>
			</view>
			<view class="text-center" style="margin-top:20upx; line-height:50upx;" @tap="reg">
				还没有账号？点击注册
			</view>
			<!-- 第三方登录 -->
			<view class="grace-title" style="margin-top:30px;">
				<view class="text-center" style='color:#00C777'>第三方登录</view>
			</view>
			<view class="grace-login-three" style="margin-top:8px;">
				<view class="cuIcon-weixin" @tap="loginWithWx"></view>
				<view class="cuIcon-qq"></view>
				<view class="cuIcon-weibo"></view>
			</view>
		</view>
	</view>




</template>
<script>
	var graceChecker = require("@/graceUI/graceChecker.js");
	export default {
		data() {
			return {
				pnpre: '86',
				pnpres: ['86', '01', '11', '26', '520'],
				vcodeBtnName: "获取验证码",
				countNum: 120,
				countDownTimer: null,
				phoneno: ''
			}
		},
		methods: {
			loginWithWx: function() {
				uni.showToast({
					title: "有待完善",
					icon: "none"
				})
			},
			changePre: function(e) {
				this.pnpre = this.pnpres[e.detail.value];
			},
			loginNow: function(e) {
				// 表单验证
				var rule = [{
						name: "pn",
						checkType: "phoneno",
						errorMsg: "请填写正确的手机号"
					},
					{
						name: "yzm",
						checkType: "string",
						checkRule: "4,6",
						errorMsg: "请正确填写短信验证码"
					},
				];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				// 验证通过
				if (checkRes) {
					uni.showToast({
						title: "请观察控制台",
						icon: "none"
					});
					console.log(e);
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			getVCode: function() {
				var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.phoneno)) {
					uni.showToast({
						title: '请正确填写手机号码',
						icon: "none"
					});
					return false;
				}
				// 手机号码为 :  this.phoneno
				// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
				if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送') {
					return;
				}
				this.vcodeBtnName = "发送中...";
				// 与后端 api 交互，发送验证码 【自己写的具体业务代码】
				// 假设发送成功，给用户提示
				uni.showToast({
					title: '短信已发送，请注意查收',
					icon: "none"
				});
				// 倒计时
				this.countNum = 120;
				this.countDownTimer = setInterval(function() {
					this.countDown();
				}.bind(this), 1000);
			},
			countDown: function() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = "重新发送";
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + '秒重发';
			},
			reg: function() {
				wx.showToast({
					title: "注册页面类似登录，有待完善 (:",
					icon: "none"
				});
			}
		}
	}
</script>
<style>
	.cu-form-group uni-picker::after {
	    font-family: cuIcon;
	    display: block;
	    content: "\E6A3";
	    position: absolute;
	    font-size: 30upx;
	    color: #8799a3;
	    line-height: 52upx;
	    width: 32upx;
	    text-align: center;
	    top: 0;
	    bottom: 0;
	    right: -6upx;
	    margin: auto;
	}
	
	.grace-items {
		display: flex;
		flex: 1;
	}

	.item-border {
		display: flex;
		flex: 1;
	}

	.login-sendmsg-btn {
		border: 1px solid #00C777 !important;
		background: none !important;
		color: #00C777 !important;
		width: 100%;
		height: 35px;
		line-height: 35px;
		margin-top: 6px;
		font-size: 14px !important;
	}

	.grace-login-three {
		display: flex;
		justify-content: center;
		flex-wrap: nowrap;
	}

	.grace-login-three view {
		width: 50px;
		height: 50px;
		line-height: 50px;
		font-size: 46px;
		color: #00C777;
		text-align: center;
		margin: 8px 15px;
	}
</style>
