<template>
	<view class="container" :class="[vtheme]">
		<u-form :model="schedulerData" :rules="rules" ref="uForm" :errorType="errorType"
			class="u-padding-bottom-80 u-margin-bottom-50 bg-box">
			<view class="padding-lr">
				<u-form-item label-width="180" label-position="top" label="" prop="title" :required="true">
					<u-input :border="false" v-model="schedulerData.title" type="text" placeholder="请为您的日程、活动等添加名称"></u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="" prop="text" :required="true">
					<u-input :border="false" v-model="schedulerData.text" type="textarea" placeholder="请输入任务描述">
					</u-input>
				</u-form-item>
				<!-- <u-form-item label-width="180" label-position="top" label="日程类型" prop="type" :required="true">
					<dict-select
						type="select"
						mode="single-column"
						:value="schedulerData.type"
						@change="(label,value)=>{confirmType(value,'type')}"
						:border="false"
						:list="typeList">
					</dict-select>
				</u-form-item> -->
				<u-form-item label-width="180" label-position="top" label="事件类型" prop="eventType" :required="true">
					<dict-select
						type="select"
						mode="single-column"
						:value="schedulerData.eventType"
						@change="(label,value)=>{confirmType(value,'eventType')}"
						:border="false"
						:list="eventTypeList">
					</dict-select>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="任务时间" :required="true">
					<time-rank-select
						:record="schedulerData"
						:start="schedulerData.startDate"
						:end="schedulerData.endDate"
						startProp="startDate"
						endProp="endDate"
						:params="params"
						:dateTimestamp="dateTimestamp"
						@change="changeTime"></time-rank-select>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="参与人" class="border-bottom-none" >
					<user-popup
						ref="userPop" 
						:value="schedulerData.publisher" 
						type="1" 
						placeholder="" 
						@change="changeUser"
						iconName="man-add" 
						iconNameColor="cu-color-icon"></user-popup>
				</u-form-item>
			</view>
		</u-form>
		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="cu-botton-submit text-center" @click="formSubmit">发起申请</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import moment from 'moment/min/moment.min.js'
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				isChoose: [],
				query: [],
				logReceive: '',
				logReceiveName: '',
				schedulerData: {
					type: 'mySave'
				},
				typeText:'',
				typeList:[{
					value: 'mySave',
					label: '我的日程'
				},{
					value: 'departmentSave',
					label: '部门日程'
				},{
					value: 'companySave',
					label: '公司日程'
				}],
				eventTypeList: [
					{
						value: 1,
						label: '工作'
					},
					{
						value: 2,
						label: '会议'
					},
					{
						value: 3,
						label: '出差'
					},
					{
						value: 4,
						label: '休闲'
					},
					{
						value: 5,
						label: '其它'
					}
				],
				rules: {
					title: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					text: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					type: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					eventType: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					startDate: [{
						required: true,
						message: '必填',
						trigger: ['change','blur']
					}],
					endDate: [{
						required: true,
						message: '必填',
						trigger: ['change','blur']
					}],
				},
				errorType: ['message'],
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true,
					timestamp: true,
				},
				dateTimestamp:{start: '',end: ''},
				showPop:false,
				showType: false,
				showStatus:false,
				roomList: [],
				statusList: [],
				securityList: []
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			this.schedulerData.applicatioNtime = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
			this.getCodeList()
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			confirmType(value,key){
				this.schedulerData[key] = value
			},
			changeUser(list,type){
				this.query = list
			},
			formSubmit() {
				var that = this;
				let name = []
				let nameid = []
				if(that.query){
					that.query.forEach(val => {
						name.push(val.name)
						nameid.push(val.id)
					})
				}
				let joinUser = name.join(',')
				let joinUserId = nameid.join(',')
				let params = {
					...that.schedulerData, 
					joinUser: joinUser,
					joinUserId: joinUserId,
					isApp:'true'
				}
				console.log("params---", params)
				that.$refs.uForm.validate(valid => {
					if (valid) {
						that.$http
							.post('/office/scheduler/save', params, {
								params: {},
							})
							.then(res => {
								console.log("res----", res, res.data)
								uni.showToast({
									title: res.data.message,
									icon: 'none',
								});
								if(res.data.statusCode == 200){
									that.$nextTick(() => {
										var pages = getCurrentPages();
										var prevPage = pages[pages.length - 2]; //上一个页面
										prevPage.$vm.changelist()
										uni.navigateBack();
									})
								}
							})
							.catch(err => {});
					} else {
						console.log('验证失败');
					}
				});
			},
			changeTime(e,timestamp,prop){
				this.$nextTick(function(){
					this.dateTimestamp = timestamp
					this.schedulerData[prop] = e
					// this.$refs.uForm.validate() //表单验证
					this.$forceUpdate()
				})
			},
			changeCheckBox(e,index){
				console.log("e,",e,index)
				if(e && !e.value){
					this.query.splice(index,1)
					this.schedulerData.numberParticipants = this.query.length
				}
			},
			getCodeList() {
				const that = this
				that.$http
					.post('/office/officeConferenceRoom/getMettingRoomAddress', {}, {
						params: {},
					})
					.then(res => {
						res.data.forEach(val => {
							let data = {
								label: val.name,
								value: val.uuid
							}
							that.roomList.push(data)
						})
					})
				that.$http
					.post('/system/dicSet/getDicItemByCode', {
						code: 'security'
					}, {
						params: {},
					})
					.then(res => {
						res.data.forEach(val => {
							let data = {
								label: val.text,
								value: val.value
							}
							that.securityList.push(data)
						})
					})
				that.$http
					.post('/system/dicSet/getDicItemByCode', {
						code: 'meetingsType'
					}, {
						params: {},
					})
					.then(res => {
						res.data.forEach(val => {
							let data = {
								label: val.text,
								value: val.value
							}
							that.statusList.push(data)
						})
					})
			},
		}
	};
</script>

<style lang="scss" scoped>
</style>
