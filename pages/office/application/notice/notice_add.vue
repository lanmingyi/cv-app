<template>
	<view class="container " :class="[vtheme]">
		<u-form :model="newData" :rules="rules" ref="uForm" :errorType="errorType">
			<view class="padding-lr padding-top-sm bg-box">
				<u-form-item label-position="top" label="通知类型" label-width="150">
					<dict-select
						type="radio"
						:value="radio"
						@change="radioGroupChange"
						:list="radioList">
					</dict-select>
				</u-form-item>
				
				<u-form-item label-width="150" label-position="top" label="标题" prop="title" :required="true">
					<u-input :border="false" placeholder="" v-model="newData.title" type="text"></u-input>
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
				
				<u-form-item label-width="150" label-position="top" label="发布部门" prop="publishingDepartmentName">
					<u-input :border="false" placeholder="" v-model="newData.publishingDepartmentName" type="text" disabled></u-input>
				</u-form-item>
				
				<u-form-item label-width="150" label-position="top" label="内容" class="border-bottom-none" :required="true">
					<tEditor ref="editContent" placeholder="请输入..." @editOk="editOk" uploadFileUrl="/#"></tEditor> 
				</u-form-item>
			</view>
			
		</u-form>
		
		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="cu-botton-submit text-center"  @click="formSubmit">发布</view>
		</view>
	</view>
</template>

<script>
	import tEditor from '@/components/custom/TEditor/tEditor.vue';
	export default {
		components: {
			tEditor,
		},
		data() {
			return {
				radioList: [
					{
						label: '通知',
						value: '通知',
						checked: true,
						disabled: false
					},
					{
						label: '公告',
						value: '公告',
						checked: false,
						disabled: false
					},
				],
				radio: '通知',
				newData: {
					title: '',
					publisher: '',
					publishingDepartmentName: '',
					releaseDeparment: '',
					publisherId: '',
					releaseTime: '',
					content:''
				},
				rules: {
					title: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					publisher: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					releaseTime: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					]
				},
				errorType: ['message'],
				type: ''
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onNavigationBarButtonTap(e) {
			console.log("点击了自定义按钮",e);  
			this.formSubmit()
		},
		onLoad(options) {
			this.type = options.type
		},
		methods: {
			radioGroupChange(e) {
				console.log("e------",e)
			 this.radio = e
			},
			formSubmit(){
				var that = this
				let url = ''
				let content = that.$refs.editContent.getContent()
				that.newData.content = content.html
				that.newData.isRelease = "yes"
				console.log("content-----------",content)
				if(that.radio=='公告'){
					url = "/office/officePublicAnnouncement/savePublic"
				} else if(that.radio=='通知') {
					url = '/office/officePublicAnnouncement/saveNotice'
				}
				that.$refs.uForm.validate(valid => {
					if (valid) {
						if(!content.html){
							uni.showToast({title: '请输入新闻正文！',icon: 'none',duration: 1000});
						}else {
							that.$http.post(url, that.newData, {
									params: {},
								})
								.then(res => {
									uni.showToast({title: res.data.message,icon: 'none',duration: 1000});
									if(res.data.statusCode == 200){
										that.$nextTick(()=>{
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
			editOk(e){
				console.log("e-------",e)
			},
			changeUser(list, type) {
				this.$nextTick(() => {
					this.newData.publisher = list[0].name
					this.newData.publisherId = list[0].id
					this.newData.publishingDepartmentName = list[0].departmentName
					this.newData.publishingDepartmentId = list[0].pid
					this.$forceUpdate()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
