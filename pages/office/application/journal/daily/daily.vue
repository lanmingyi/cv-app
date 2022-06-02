<template>
	<view class="container" :class="[vtheme]">
		<u-form :model="journalData" :rules="rules" ref="uForm" :errorType="errorType" class="u-padding-bottom-80 u-margin-bottom-50 bg-box">
			<view class="padding-lr">
				<u-form-item label-width="180" label-position="top" label="今日完成工作" prop="logContent" :required="true">
					<u-input :border="false" v-model="journalData.logContent" type="textarea"  placeholder="请输入"></u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="未完成工作">
					<u-input :border="false" v-model="journalData.logPlan" type="textarea"  placeholder="请输入"></u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="需协调工作">
					<u-input :border="false" v-model="journalData.logCoordinate" type="textarea"  placeholder="请输入"></u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="备注" class="border-bottom-none">
					<u-input :border="false" v-model="journalData.logRemarks" type="textarea"  placeholder="请输入"></u-input>
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
			<view class="cu-botton-submit text-center" @click="formSubmit">提交日报</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				logReceive: '',
				logReceiveName: '',
				journalData: {
					logContent:'',
					logReceiveName: ''
				},
				rules: {
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
				showPop:false
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
		},
		onPullDownRefresh() {
			console.log('refresh');
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
					logTitle: '日报',
					logStatus : '日报',
					...that.journalData, 
				}
				console.log("params---", params)
				that.$refs.uForm.validate(valid => {
					if (valid) {
						that.$http
							.post('/office/oaWorkLog/save', params, {
								params: {},
							})
							.then(res => {
								console.log("res----",res,res.data)
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
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
