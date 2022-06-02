<!--
 * @Description: 流程流转数据
 * @Author: 张夕雅
-->
<template>
	<view class="container " :class="[vtheme]">
		<u-form :model="handleData" :rules="rules" ref="uForm" :errorType="errorType">
			<view class="padding-lr bg-box">
				<u-form-item label-width="150" label-position="top" label="审批意见" prop="message" :required="true">
					<u-input :border="false" placeholder="" v-model="handleData.message" type="textarea"></u-input>
				</u-form-item>
				
				<u-form-item label-width="150" label-position="left" label="" class="border-bottom-none">
					<dict-select
						type="checkbox"
						@change="checkboxChange"
						:border="false"
						:list="list">
					</dict-select>
				</u-form-item>
				<u-form-item v-show="showList" label-width="150" label-position="top" label="抄送给" prop="duplicateUserName" :required="true">
					<user-popup
						ref="userPop" 
						:value="handleData.duplicateUserName" 
						type="3" 
						placeholder="" 
						@change="changeUser" 
						iconName="man-add" 
						iconNameColor="cu-color-icon"></user-popup>
				</u-form-item>
				
				
				<u-form-item label-width="150" label-position="left" label="" class="border-bottom-none">
					<dict-select
						type="checkbox"
						@change="checkboxChange1"
						:border="false"
						:list="list1">
					</dict-select>
				</u-form-item>
				<u-form-item v-show="showList1" label-width="150" label-position="top" label="指定" prop="assignUserName" :required="true">
					<user-popup
						ref="userPop" 
						:value="handleData.assignUserName" 
						type="3" 
						placeholder="" 
						@change="changeUserSign" 
						iconName="man-add" 
						iconNameColor="cu-color-icon"></user-popup>
				</u-form-item>

			</view>


		</u-form>
	</view>
</template>

<script>
	import jinEdit from '@/components/jin-edit/jin-edit.vue';
	export default {
		components: {
			jinEdit,
		},
		data() {
			return {
				showTime: false,
				showPop: false,
				showPopSign:false,
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
				assignUser: [],
				duplicateUser: [],
				handleData: {
					message: '',
					processInstanceId: '',
					taskId:'',
					processDefinitionId: ''
				},
				rules: {
					newsTitle: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					assignUserName: [{
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
				showList:false,
				showList1:false,
				list: [
					{
						label: '是否抄送',
						value: '是否抄送',
						checked: false,
						disabled: false
					}
				],
				list1: [
					{
						label: '是否指定下一节点处理人',
						value: '是否指定下一节点处理人',
						checked: false,
						disabled: false
					}
				],
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
			checkboxChange(e){
				this.showList = !this.showList
			},
			checkboxChange1(e){
				this.showList1 = !this.showList1
			},
			formSubmit() {
				var that = this
				let url = ''
				console.log("content-----------", content,that.handleData)
				// that.$refs.uForm.validate(valid => {
				// 	if (valid) {
				// 		if (!content.html) {
				// 			uni.showToast({
				// 				title: '请输入新闻正文！',
				// 				icon: 'none',
				// 				duration: 1000
				// 			});
				// 		} else {
				// 			that.$http.post('/office/oaNewsBase/save', that.handleData, {
				// 					params: {},
				// 				})
				// 				.then(res => {
				// 					uni.showToast({title: res.data.message,icon: 'none',duration: 1000});
				// 					if (res.data.statusCode == 200) {
				// 						that.$nextTick(function(){
				// 							var pages = getCurrentPages();
				// 							var prevPage = pages[pages.length - 2]; //上一个页面
				// 							prevPage.$vm.changeData()
				// 							uni.navigateBack();
				// 						})
				// 					}
				// 				})
				// 		}
				// 	} else {
				// 		console.log('验证失败');
				// 	}
				// });
			},
			gouserPopup(){
				let items = this.isChoose.length>0?JSON.stringify(this.isChoose):JSON.stringify(this.query)
				this.showPop=true
				this.$refs.userPop.onRefresh({type:'1',item: items})
			},
			gouserPopupSign(){
				let items = this.isChoose.length>0?JSON.stringify(this.isChoose):JSON.stringify(this.query)
				this.showPopSign=true
				this.$refs.userPopSign.onRefresh({type:'3',item: items})
			},
			changeUser(list, type) {
				this.query = list
				let name = []
				let uuid = []
				this.$nextTick(() => {
					this.query.forEach(val=>{
						name.push(val.name + ' ')
					})
					this.handleData.duplicateUserName = name.join("")
					// this.handleData.publisherId = this.query[0].id
					this.showPop = false
					this.$forceUpdate()
				})
			},
			changeUserSign(list, type) {
				this.query = list
				this.$nextTick(() => {
					this.handleData.assignUserName = this.query[0].name
					this.handleData.assignUser = this.query[0].id
					this.showPopSign = false
					this.$forceUpdate()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>

