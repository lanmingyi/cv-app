<template>
	<view class="container " :class="[vtheme]">
		<u-form :model="newData" :rules="rules" ref="uForm" :errorType="errorType">
			<view class="padding-lr bg-box">
				<u-form-item label-width="150" label-position="top" label="新闻标题" prop="newsTitle" :required="true">
					<u-input :border="false" placeholder="" v-model="newData.newsTitle" type="text"></u-input>
				</u-form-item>

				<u-form-item label-width="150" label-position="top" label="发布人" prop="publisher" :required="true">
					<user-popup 
						ref="userPop" 
						:value="newData.publisher" 
						type="3" 
						placeholder="" 
						@change="changeUser" 
						iconName="man-add" 
						iconNameColor="cu-color-icon"></user-popup>
				</u-form-item>

				<u-form-item label-width="150" label-position="top" label="发布部门">
					<u-input :border="false" placeholder="" v-model="newData.releaseDeparmentName" type="text"
						disabled></u-input>
				</u-form-item>

				<u-form-item label-width="150" label-position="top" label="发布时间" prop="releaseTime" :required="true">
					<picker-select 
						mode="time" 
						:value="newData.releaseTime" 
						placeholder=""
						iconName="clock" 
						iconNameColor="cu-color-icon"
						@change="confirmTime"></picker-select>
				</u-form-item>

				<u-form-item label-width="150" label-position="top" label="新闻正文" class="border-bottom-none" :required="true">
					<tEditor ref="editContent" placeholder="请输入..." @editOk="editOk" :uploadFileUrl="$upLoadUrl" :header="headers"></tEditor>
				</u-form-item>
			</view>

			<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
				<view class="cu-botton-submit text-center"  @click="formSubmit">发布</view>
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
				isChoose: [],
				query: [],
				newData: {
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
		},
		onNavigationBarButtonTap(e) {
			console.log("点击了自定义按钮", e);
			this.formSubmit()
		},
		methods: {
			formSubmit() {
				var that = this
				let url = ''
				let content = that.$refs.editContent.getContent()
				that.newData.content = content.html
				that.newData.isRelease = "yes"
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
							that.$http.post('/office/oaNewsBase/save', that.newData, {
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
						console.log('验证失败',valid);
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
			gouserPopup(){
				let items = this.isChoose.length>0?JSON.stringify(this.isChoose):JSON.stringify(this.query)
				this.showPop=true
				this.$refs.userPop.onRefresh({type:'3',item: items})
			},
			changeUser(list, type) {
				// console.log("list",list,type)
				this.query = list
				this.$nextTick(() => {
					this.newData.publisher = this.query[0].name
					this.newData.publisherId = this.query[0].id
					this.newData.releaseDeparmentName = this.query[0].departmentName
					this.newData.releaseDeparment = this.query[0].pid
					this.showPop = false
					this.$forceUpdate()
				})
			},
			confirmTime(e) {
				this.newData.releaseTime = e
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
