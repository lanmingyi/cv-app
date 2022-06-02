<template>
	<view class="container bg-box">
		<u-form :model="templateData" :rules="rules" ref="uForm" :errorType="errorType">
			<view class="padding-lr">

				<u-form-item label-width="150" label-position="left" label="姓名" prop="name">
					<u-input :border="false" placeholder="姓名" v-model="templateData.name" type="select"
						@click="gouserPopup" disabled iconName="man-add" iconNameColor="text-red"></u-input>
				</u-form-item>
				
				<u-form-item label-width="150" label-position="left" label="手机号" prop="mobilePhone ">
					<u-input v-model="templateData.mobilePhone " placeholder="手机号" type="number"/>
				</u-form-item>
				
				<u-form-item label-width="150" label-position="left" label="邮箱" prop="email ">
					<u-input v-model="templateData.email" type="text" placeholder="邮箱"/>
				</u-form-item>

				<u-form-item label-position="top" label="事物" prop="consultAffair" label-width="150">
					<u-input :border="false" placeholder="事物" v-model="templateData.consultAffair " type="textarea">
					</u-input>
				</u-form-item>
			</view>
		

			<user-popup :showPop="showPop" @cancle="()=>{showPop = false}" ref="userPop" @change="changeUser">
			</user-popup>

		</u-form>
		
		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center u-margin-top-80">
			<view class="bg-blue text-center" @click="formSubmit">{{type && type == "add" ? '新建' : '更新'}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPop: false,
				showSex:false,
				isChoose: [],
				query: [],
				templateData: {
					sex: '女',
					mobilePhone : '',
					email: ''
				},
				rules: {
					name: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					mobilePhone: [
						{
							required: true,
							message: '请输入手机号',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.email(value);
							},
							message: '邮箱输入不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						}]
				},
				errorType: ['message'],
				headers: {},
				sexKey: "1",
				sexList: [{
					label: '女',value: 0
				},{
					label: '男',value: 1
				}],
				radioList: [{
						name: '鲜甜',
						disabled: false
					},
					{
						name: '麻辣',
						disabled: false
					}
				],
				type: ''
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(options) {
			this.headers = {
				token: this.$store.state.token,
			}
			this.type = options.type
			if(options.type && options.type == 'edit'){
				this.getEditData(options.uuid)
			}
		},
		methods: {
			formSubmit() {
				var that = this
				let url = ''
				if(this.templateData.uuid){
					url = "/office/consultTemplate/update"
				} else {
					url = "/office/consultTemplate/save"
				}
				that.$refs.uForm.validate(valid => {
					if (valid) {
						that.$http.post(url, that.templateData, {
								params: {},
							})
							.then(res => {
								if (res.statusCode == 200) {
									uni.showToast({
										title: res.data.message,
										icon: 'none',
										duration: 1000
									});
									that.$nextTick(() => {
										uni.navigateBack();
									})
								}
							})
					} else {
						console.log('验证失败');
					}
				});
			},
			gouserPopup() {
				let items = this.isChoose.length > 0 ? JSON.stringify(this.isChoose) : JSON.stringify(this.query)
				this.showPop = true
				this.$refs.userPop.onRefresh({
					type: '3',
					item: items
				})
				/*
					@params  type  选择用户常用类型
					1   多选
					3   单选 
				*/
			},
			changeUser(list, type) {
				this.query = list
				this.$nextTick(() => {
					this.templateData.name = this.query[0].name
					this.showPop = false
					this.$forceUpdate()
				})
			},
			getEditData(uuid){
				var that = this
				that.$http.post('/office/consultTemplate/getDetailByUuid', {uuid: uuid}, {
						params: {},
					})
					.then(res => {
						if (res.statusCode == 200) {
							that.templateData.uuid = res.data.uuid
							that.templateData.name = res.data.name
							that.templateData.mobilePhone = res.data.mobilePhone
							that.templateData.consultAffair = res.data.consultAffair
							that.templateData.email = res.data.email
						}
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
