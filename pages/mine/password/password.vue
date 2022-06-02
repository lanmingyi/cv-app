<template>
	<view class="container  pos-relative" :class="[vtheme]">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType" class="bg-box">
			<view class="padding-lr-xl">
				<view v-if="showCode">
					<view class="padding-tb ">
						<view>我们将发送验证码发送到以下号码：</view>
						<view class="text-bold">+86 {{telephone}}</view>
					</view>
					<u-form-item label-position="left" label="验证码" prop="code" label-width="150">
						<u-input :border="false" placeholder="请输入验证码" v-model="model.code" type="text"></u-input>
						<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
					</u-form-item>
				</view>

				<view v-else class="padding-top  margin-top-sm">
					<u-form-item label-position="left" label="当前密码" prop="originalPassword" label-width="150">
						<u-input :password-icon="true" :border="false" type="password" v-model="model.originalPassword"
							placeholder="请输入当前密码"></u-input>
					</u-form-item>
				</view>

				<u-form-item label-position="left" label="新密码" prop="password" label-width="150">
					<u-input :password-icon="true" :border="false" type="password" v-model="model.password"
						placeholder="请输入新密码"></u-input>
				</u-form-item>
				<u-form-item label-position="left" label="确认密码" label-width="150" prop="password2">
					<u-input :border="false" type="password" v-model="model.password2" placeholder="请确认密码"></u-input>
				</u-form-item>
			</view>
		</u-form>

		<view class="art-botton u-padding-top-80">
			<view class="bg-blue round padding-tb-sm margin-lr margin-top-xl" @click="submit">提交</view>
		</view>
		<view class="pos-fixed-bottom">
			<view class="text-center text-blue u-font-13" @click="showCode = !showCode" style="text-decoration:underline;">忘记密码</view>
		</view>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				model: {
					userNameId: '',
					originalPassword: '',
					code: '',
					password: '',
					password2: '',
				},
				rules: {
					originalPassword: [{
							required: true,
							message: '请输入当前密码',
							trigger: ['change', 'blur'],
						},
						{
							// validator: (rule, value, callback) => {
							// 	return value === this.telephone;
							// },
							message: '当前密码错误',
							trigger: ['change', 'blur'],
						}
					],
					code: [{
							required: true,
							message: '请输入验证码',
							trigger: ['change', 'blur'],
						},
						{
							type: 'number',
							message: '验证码只能为数字',
							trigger: ['change', 'blur'],
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['change', 'blur'],
						}
					],
					password2: [{
							required: true,
							message: '请重新输入密码',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.model.password;
							},
							message: '两次输入的密码不相等',
							trigger: ['change', 'blur'],
						}
					],
				},
				showCode: false,
				password: '',
				telephone: '',
				userInfo: '',
				codeTips: '',
				errorType: ['message'],
			};
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
			console.log("userInfo",this.userInfo)
			this.model.userNameId = this.userInfo.userNameId
			this.telephone = this.userInfo.cellphone
		},
		computed: {
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.$http
							.post('/mdata/user/updateModifyPassword',this.model, {
								params: {},
							})
							.then(res => {
									console.log("res-------",res.data)
									this.password = res.data.password
									this.telephone = res.data.telephone
							})
							.catch(err => {
								uni.hideLoading();
								uni.showToast({
									title: err.data.message,
									icon: 'none'
								});
							});
					} else {
						console.log('验证失败');
					}
				});
			},
			codeChange(text) {
				this.codeTips = text;
			},
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
		}
	};
</script>

<style scoped lang="scss">
	
	.container{
		background-color: #fff;
	}
	.wrap {
		padding: 30rpx;
	}

	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>
