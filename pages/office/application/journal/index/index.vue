<template>
	<view class="container" :class="[vtheme]">
		<u-form :model="journalData" :rules="rules" ref="uForm" :errorType="errorType" class="u-padding-bottom-80 u-margin-bottom-50 bg-box">
			<view class="padding-lr">
				<u-form-item label-width="0" label-position="left" label=" " prop="logTitle" :required="true">
					<u-input :border="false" v-model="journalData.logTitle" type="text"  placeholder="日志名称"></u-input>
				</u-form-item>
				
				<u-form-item label-width="180" label-position="top" label="日志内容" prop="logContent" class="border-bottom-none" :required="true">
					<u-input :border="false" v-model="journalData.logContent" type="textarea"  placeholder="日志内容"></u-input>
				</u-form-item>
			</view>
			
			<view class="text-box-line"></view>
			
			<view class="padding-lr">
				<u-form-item label-width="180" label-position="top" label="发送到人" prop="logReceiveName" class="border-bottom-none" :required="true">
					<user-popup
						ref="userPop" 
						:value="journalData.logReceiveName" 
						type="1" 
						placeholder="" 
						@change="changeUser"
						iconName="man-add" 
						iconNameColor="cu-color-icon"></user-popup>
				</u-form-item>
			</view>
		</u-form>
	
		
		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="cu-botton-submit text-center" @click="formSubmit">提交日志</view>
		</view>
	</view>
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
				logReceive: '',
				logReceiveName: '',
				journalData: {
					logTitle:'',
					logContent:'',
					logReceiveName: ''
				},
				rules: {
					logTitle: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					logContent: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					logReceiveName: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					]
				},
				errorType: ['message'],
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			changeUser(list,type){
				let name = []
				let nameid = []
				list.forEach(val=>{
					name.push(val.name)
					nameid.push(val.id)
				})
				this.journalData.logReceiveName = name.join(',')
				this.journalData.logReceive = nameid.join(',')
			},
			formSubmit(){
				var that = this;
				let params = {
					...that.journalData, 
					logStatus : '日志',
				}
				console.log("params---", params)
				that.$refs.uForm.validate(valid => {
					if (valid) {
						that.$http
							.post('/office/oaWorkLog/save', params, {
								params: {},
							})
							.then(res => {
								uni.showToast({
								    title: res.data.message,
										icon: 'none',
								    duration: 1000
								});
								that.$nextTick(()=>{
									var pages = getCurrentPages();
									var currPage = pages[pages.length - 1]; //当前页面
									var prevPage = pages[pages.length - 2]; //上一个页面
									console.log("prevPage----",prevPage)
									// prevPage.query = this.checkList//小程序写法
									prevPage.$vm.changelist()
									uni.navigateBack();
								})
							})
							.catch(err => {});
					} else {
						console.log('验证失败');
					}
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
</style>
