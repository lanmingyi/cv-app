<template>
	<view class="container" :class="[vtheme]">
		<view class="margin-bottom-max bg-box">
			<u-form :model="taskData" :rules="rules" ref="uForm" :errorType="errorType">
				<view class="padding-lr">
					<u-form-item label-width="180" label-position="top" label="任务标题" prop="title" :required="true">
						<u-input :border="false" placeholder="" v-model="taskData.title" type="text"></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="top" label="指派给" prop="assigner" :required="true">
						<user-popup
							ref="userPop" 
							:value="taskData.assigner" 
							type="3" 
							placeholder="" 
							@change="changeUser" 
							iconName="man-add" 
							iconNameColor="cu-color-icon"></user-popup>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="top" label="排序" prop="sort">
						<u-input :border="false" placeholder="" v-model="taskData.sort" type="number"></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="top" label="计划结束时间" prop="planEndTime" :required="true">
						<picker-select
							mode="time" 
							:value="taskData.planEndTime" 
							placeholder=""
							iconName="clock" 
							iconNameColor="cu-color-icon"
							@change="confirmTime"></picker-select>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="top" label="任务内容" prop="content" class="border-bottom-none" :required="true">
						<u-input :border="false" placeholder="" v-model="taskData.content" type="textarea" :rows="4"></u-input>
					</u-form-item>
				</view>
				
			</u-form>
		</view>
		
		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="cu-botton-submit text-center" @click="formSubmit">新建</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import moment from 'moment';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {uniLoadMore},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				showPop:false,
				title: '',
				uuid: '',
				type: '',
				emptyType: 0,
				loadingType: 'loading',
				processComments: '',
				showTime :false,
				showTimeType: 1,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
					timestamp: true,
				},
				isChoose: [],
				query:[],
				logReceive: '',
				logReceiveName: '',
				showType: false,
				showStatus:false,
				showLeval:false,
				pid: '',
				taskData: {
					title:'',
					pid:'',
					levelId:'',
					assigner:'',
					assignerId: '',
					sort: '',
					planEndTime: '',
					content: '',
				},
				rules: {
					title: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					assigner: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					planEndTime: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					content: [
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
		onLoad(options) {
			this.pid = options.pid
		},
		methods: {
			formSubmit(){
				var that = this
				let url = ''
				that.$refs.uForm.validate(valid => {
					if (valid) {
						that.taskData.pid = 1
						that.taskData.levelId =  1
						that.$http.post('/office/oaTaskBase/save', that.taskData, {
								params: {},
							})
							.then(res => {
								uni.showToast({title: res.data.message,icon: 'none',duration: 1000});
								that.$nextTick(()=>{
									var pages = getCurrentPages();
									var currPage = pages[pages.length - 1]; //当前页面
									var prevPage = pages[pages.length - 2]; //上一个页面
									prevPage.$vm.changeData()//h5写法
									uni.navigateBack();
								})
							})
					} else {
						console.log('验证失败');
					}
				});
			},
			changeUser(list,type){
				this.$nextTick(()=>{
					this.taskData.assigner = list[0].name
					this.taskData.assignerId = list[0].id
					this.$forceUpdate()
				})
			},
			confirmTime(e) {
				this.$nextTick(function(){
					this.taskData.planEndTime = e
				})
			},
			confirmType(e) {
				this.$nextTick(function(){
					this.taskData.taskTypeText = e[0].label
					this.taskData.taskType = e[0].value
					this.$forceUpdate()
				})
			},
			confirmLeval(e) {
				this.$nextTick(function(){
					this.taskData.priorityName = e[0].label
					this.taskData.priority = e[0].value
					this.$forceUpdate()
				})
			},
			confirmStatus(e) {
				this.$nextTick(function(){
					this.taskData.statuName = e[0].label
					this.taskData.status = e[0].value
					this.$forceUpdate()
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
</style>
