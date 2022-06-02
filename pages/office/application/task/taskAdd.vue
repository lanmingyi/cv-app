<template>
	<view class="container" :class="[vtheme]">
		<view class="margin-bottom-max bg-box">
			<u-form :model="taskData" :rules="rules" ref="uForm" :errorType="errorType">
				<view class="padding-lr">
					<u-form-item label-width="180" label-position="top" label="任务标题" prop="title" :required="true">
						<u-input :border="false" placeholder="" v-model="taskData.title" type="text"></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="left" label="任务类型" prop="taskType" :required="true">
						<dict-select
							type="select"
							mode="single-column"
							:value="taskData.taskType"
							@change="(label,value)=>{handleChange(label,'taskTypeText',value,'taskType')}"
							:border="false"
							:list="typeList">
						</dict-select>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="left" label="任务状态" prop="status" :required="true">
						<dict-select
							type="select"
							mode="single-column"
							:value="taskData.status"
							@change="(label,value)=>{handleChange(value,'status')}"
							:border="false"
							:list="statusList">
						</dict-select>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="left" label="优先级" prop="priority" :required="true">
						<dict-select
							type="select"
							mode="single-column"
							:value="taskData.priorityName"
							@change="(label,value)=>{handleChange(label,'priorityName',value,'priority')}"
							:border="false"
							:list="levalList">
						</dict-select>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="left" label="指派人" prop="assigner" :required="true">
						<user-popup
							ref="userPop" 
							:value="taskData.assigner" 
							type="3" 
							placeholder="" 
							@change="changeUser" 
							iconName="man-add" 
							iconNameColor="cu-color-icon"></user-popup>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="left" label="排序" prop="sort" :required="true">
						<u-input :border="false" placeholder="" v-model="taskData.sort" type="number"></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="top" label="计划时间" :required="true" class="border-bottom-none" >
						<u-form-item label-width="0" label-position="left" label=" " prop="planStartTime" style="padding: 0">
							<u-input :border="false" input-align="center" type="select" v-model="taskData.planStartTime" placeholder="计划开始时间" @click="()=>{showTime=true,showTimeType=1}" disabled iconName="" iconNameColor="cu-color-icon"></u-input>
						</u-form-item>
						<view class="border-center"></view>
						<u-form-item label-width="60" label-position="left" label=" " prop="planEndTime" style="padding: 0">
							<u-input :border="false" type="select" input-align="center" v-model="taskData.planEndTime" placeholder="计划结束时间" @click="()=>{showTime=true,showTimeType=2}" disabled iconName="" iconNameColor="cu-color-icon"></u-input>
						</u-form-item>
<!-- 						<time-rank-select
							:record="taskData"
							:start="taskData.planStartTime"
							:end="taskData.planEndTime"
							startProp="planStartTime"
							endProp="planEndTime"
							:params="params"
							:dateTimestamp="dateTimestamp"
							@change="changeTime"></time-rank-select> -->
					</u-form-item>
					
					<u-form-item label-width="180" label-position="top" label="实际时间" class="border-bottom-none" >
						<u-form-item label-width="0" label-position="left" label=" " prop="actualStartTime" style="padding: 0">
							<u-input :border="false" type="select" input-align="center" v-model="taskData.actualStartTime" placeholder="实际开始时间" @click="()=>{showTime=true,showTimeType=3}" disabled iconName="" iconNameColor="cu-color-icon"></u-input>
						</u-form-item>
						<view class="border-center"></view>
						<u-form-item label-width="60" label-position="left" label=" " prop="actualEndTime" style="padding: 0">
							<u-input :border="false" type="select" input-align="center" v-model="taskData.actualEndTime" placeholder="实际结束时间" @click="()=>{showTime=true,showTimeType=4}" disabled iconName="" iconNameColor="cu-color-icon"></u-input>
						</u-form-item>
					</u-form-item>
					
					
					
					<u-form-item label-width="180" label-position="top" label="任务内容" prop="content" :required="true">
						<u-input :border="false" placeholder="" v-model="taskData.content" type="textarea" :rows="4"></u-input>
					</u-form-item>
				</view>
				<u-picker mode="time" v-model="showTime" :params="params" @confirm="confirmTime"></u-picker>
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
				typeList: [],
				statusList:[{label: '未开始',value: 0},{label: '已接受',value: 1},{label: '已完成',value: 2}],
				levalList:[],
				pid: '',
				taskData: {
					title:'',
					pid:'',
					levelId:'',
					assigner:'',
					assignerId: '',
					taskType: '',
					taskTypeText: '',
					status: '0',
					sort: '',
					planStartTime: '',
					planEndTime: '',
					actualStartTime: '',
					actualEndTime: '',
					content: '',
					priority: '',
					priorityName: ''
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
					taskType: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					status: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					priority: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					sort:[
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					planStartTime: [
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
				errorType: ['border-bottom'],
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(options) {
			this.pid = options.pid
			this.getCodeList()
		},
		methods: {
			getCodeList(){
				var that = this;
				that.$http
					.post('/system/dicSet/getDicItemByCode', {code: 'taskType'}, {
						params: {},
					})
					.then(res => {
						res.data.forEach(val=>{
							let data = {
								label: val.text,
								value: val.value
							}
							that.typeList.push(data)
						})
					})
				that.$http
					.post('/system/dicSet/getDicItemByCode', {code: 'priority'}, {
						params: {},
					})
					.then(res => {
						res.data.forEach(val=>{
							let data = {
								label: val.text,
								value: val.value
							}
							that.levalList.push(data)
						})
					})
			},
			formSubmit(){
				var that = this
				let url = ''
				that.$refs.uForm.validate(valid => {
					if (valid) {
						that.taskData.pid = this.pid ? this.pid : 1
						that.taskData.levelId = this.levelId ? this.levelId : 1
						that.$http.post('/office/oaTaskBase/save', that.taskData, {
								params: {},
							})
							.then(res => {
								uni.showToast({title: res.data.message,icon: 'none',duration: 1000});
								if(res.data.statusCode == 200){
									that.$u.toast('新建成功')
									setTimeout(()=>{
										uni.setStorage({
											key:'onFresh',
											data: true
										})
										uni.navigateBack();
									},300)
								}
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
					let input = ''
					if (this.params.year) input += e.year;
					if (this.params.month) input += '-' + e.month;
					if (this.params.day) input += '-' + e.day;
					if (this.params.hour) input += ' ' + e.hour;
					if (this.params.minute) input += ':' + e.minute;
					if (this.params.second) input += ':' + e.second;
					if(this.showTimeType==1)this.taskData.planStartTime = input
					if(this.showTimeType==2)this.taskData.planEndTime = input
					if(this.showTimeType==3)this.taskData.actualStartTime = input
					if(this.showTimeType==4)this.taskData.actualEndTime = input
				})
			},
			handleChange(label,labelKey,value,valuekey){
				this.taskData[labelKey] = label
				if(value&&valuekey)this.taskData[valuekey] = value
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
