<!--
 * @Description: 流程表单信息
 * @Author: 张夕雅
-->
<template>
	<view class="container " :class="[vtheme]">
		<u-form :model="detailsInfo" :rules="rules" ref="uForm" :errorType="errorType">
			<view class="padding-lr bg-box">
				<u-form-item label-width="150" label-position="top" label="休假标题" prop="newsTitle" :required="true">
					<u-input :border="false" placeholder="" v-model="detailsInfo.title" type="text"></u-input>
				</u-form-item>

				<u-form-item label-width="150" label-position="top" label="休假人" prop="publisher" :required="true">
					<user-popup
						ref="userPop" 
						:value="detailsInfo.publisher" 
						type="3" 
						placeholder="" 
						@change="changeUser" 
						iconName="man-add" 
						iconNameColor="cu-color-icon"></user-popup>
				</u-form-item>

				<u-form-item label-width="150" label-position="top" label="开始时间" prop="beginTime">
					<picker-select
						mode="time" 
						:value="detailsInfo.beginTime" 
						placeholder=""
						iconName="clock" 
						iconNameColor="cu-color-icon"
						@change="(e)=>{confirmTime(e,'beginTime')}"></picker-select>
				</u-form-item>

				<u-form-item label-width="150" label-position="top" label="结束时间" prop="releaseTime">
					<picker-select
						mode="time" 
						:value="detailsInfo.endTime" 
						placeholder=""
						iconName="clock" 
						iconNameColor="cu-color-icon"
						@change="(e)=>{confirmTime(e,'endTime')}"></picker-select>
				</u-form-item>

				<u-form-item label-width="150" label-position="top" label="休假时长" prop="releaseDeparmentName">
					<u-input :border="false" placeholder="" v-model="detailsInfo.days" type="text"
						disabled></u-input>
				</u-form-item>
				
				<u-form-item label-width="150" label-position="top" label="休假原因" prop="releaseDeparmentName">
					<u-input :border="false" placeholder="" v-model="detailsInfo.reason" type="text"
						disabled></u-input>
				</u-form-item>
			</view>

		</u-form>
	</view>
</template>

<script>
	import tEditor from '@/components/custom/TEditor/tEditor.vue';
	export default {
		components: {
			tEditor
		},
		data() {
			return {
				showTime: false,
				showPop: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true,
					timestamp: true,
				},
				leaveTypeList:[],
				isChoose: [],
				query: [],
				detailsInfo: {
					newsTitle: '',
					publisher: '',
					releaseDeparmentName: '',
					releaseDeparment: '',
					publisherId: '',
					releaseTime: '',
					content: ''
				},
				rules: {
					newsTitle: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					publisher: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					releaseTime: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}]
				},
				errorType: ['message'],
				headers: {},
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(options) {
			this.headers = {
				token: this.$store.state.token,
			}
			this.getDicItemByCode()
		},
		onNavigationBarButtonTap(e) {
			console.log("点击了自定义按钮", e);
			this.formSubmit()
		},
		methods: {
			getDicItemByCode(){
				this.$http
					.post('/system/dicSet/getDicItemByCode', {code: 'leaveType'})
					.then(res => {
						this.leaveTypeList = res.data
					}).catch(err => {
						uni.hideLoading();
					});
			},
			getLeaveType(val){
				console.log(this.leaveTypeList)
				if(this.leaveTypeList&&this.leaveTypeList.length!==0) {
					let list = this.leaveTypeList.filter((item) => item.value===val)
					return list[0].text
				} else {
					return false
				}
			},
			formSubmit() {
				var that = this
				let url = ''
				let content = that.$refs.editContent.getContent()
				that.detailsInfo.content = content.html
				that.detailsInfo.isRelease = "yes"
				console.log("content-----------", content)
				that.$refs.uForm.validate(valid => {
					if (valid) {
						if (!content.html) {
							uni.showToast({
								title: '请输入新闻正文！',
								icon: 'none',
								duration: 1000
							});
						} else {
							that.$http.post('/office/oaNewsBase/save', that.detailsInfo, {
									params: {},
								})
								.then(res => {
									uni.showToast({title: res.data.message,icon: 'none',duration: 1000});
									if (res.data.statusCode == 200) {
										that.$nextTick(function(){
											var pages = getCurrentPages();
											var prevPage = pages[pages.length - 2]; //上一个页面
											prevPage.$vm.changeData()
											uni.navigateBack();
										})
									}
								})
						}
					} else {
						console.log('验证失败');
					}
				});
			},
			editOk(e) {
				console.log("e-------", e)
			},
			handleChange(file) {
				console.log("file---", file)
				let list = file.file
				if (list.status == 'done') {
					let response = list.response.filePath
				}
			},
			changeUser(list, type) {
				this.$nextTick(() => {
					this.detailsInfo.publisher = list[0].name
					this.detailsInfo.publisherId = list[0].id
					this.detailsInfo.releaseDeparmentName = list[0].departmentName
					this.detailsInfo.releaseDeparment = list[0].pid
					this.$forceUpdate()
				})
			},
			confirmTime(e,prop) {
				this.$nextTick(function() {
					this.detailsInfo[prop] = e
					this.$forceUpdate()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
