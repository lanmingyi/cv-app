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
				<u-form-item label-width="180" label-position="top" label="事件类型" prop="eventTypeName" :required="true">
					<dict-select
						type="select"
						mode="single-column"
						:value="schedulerData.eventTypeName"
						@change="confirmType"
						:border="false"
						:list="typeList">
					</dict-select>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="任务时间" :required="true">
					<view class="flex align-center justify-center">
						<u-form-item label-width="60" label-position="left" label=" " prop="startDate"
							class="border-bottom-none u-padding-0">
							<u-input :border="false" v-model="schedulerData.startDate" type="text" placeholder="开始时间"
								disabled @click="()=>{showStartTime=true}"></u-input>
							<u-picker mode="time" v-model="showStartTime" :minuteStep="30" :params="params"
								@confirm="confirmStart" :showTimeTag="false"></u-picker>
							<!-- <picker-select
								mode="time" 
								type="text"
								:value="schedulerData.startDate" 
								placeholder="开始时间"
								:minuteStep="30"
								@change="confirmStart"></picker-select> -->
						</u-form-item>
						<view class="border-center"></view>
						<u-form-item label-width="60" label-position="left" label=" " prop="endDate"
							class="border-bottom-none u-padding-0">
							<u-input :border="false" v-model="schedulerData.endDate" type="text" placeholder="结束时间"
								disabled @click="openEnd"></u-input>
							<u-picker mode="time" v-model="showEndTime" :minuteStep="30" :params="params"
								@confirm="confirmEnd" :showTimeTag="false"></u-picker>
						</u-form-item>
					</view>
				</u-form-item>
				<u-form-item label-width="180" label-position="left" label="参与人" class="border-bottom-none" :required="true">
					<user-popup
						ref="userPop" 
						:value="schedulerData.publisher" 
						type="1" 
						placeholder="" 
						@change="changeUser" 
						@changeCheck="changeCheck"
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
				schedulerData: {},
				typeList: [
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
					eventTypeName: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					startDate: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					endDate: [{
						required: true,
						message: '必填',
						trigger: 'change',
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
				showStartTime: false,
				showEndTime: false,
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
			confirmType(label,value){
				this.$nextTick(()=>{
					this.schedulerData.eventTypeName = label
					this.schedulerData.eventType = value
				})
			},
			changeUser(list,type){
				console.log("list----",list,type)
				this.query = list
				this.showPop=false
			},
			changeCheck(list){
				this.query = list
			},
			gouserPopup() {
				let items = this.isChoose.length > 0 ? JSON.stringify(this.isChoose) : JSON.stringify(this.query)
				this.$refs.userPop.onRefresh({
					type: 1,
					item: items
				})
				this.showPop = true
			},
			close(item, index) {
				console.log("item-----", item)
				this.query.splice(index, 1)
			},
			formSubmit() {
				var that = this;
				console.log("wwwwwww",this.query)
				let name = []
				let nameid = []
				if(that.query){
					that.query.forEach(val => {
						name.push(val.name)
						nameid.push(val.id)
					})
				}
				// that.schedulerData.startDate = that.schedulerData.startDate+ ':00'
				// that.schedulerData.endDate = that.schedulerData.endDate+ ':00'
				let joinUser = name.join(',')
				let joinUserId = nameid.join(',')
				let params = {
					...that.schedulerData, 
					type: that.type,
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
			confirmStart(e) {
				let input = '';
				if (this.params.year) input += e.year;
				if (this.params.month) input += '-' + e.month;
				if (this.params.day) input += '-' + e.day;
				if (this.params.hour) input += ' ' + e.hour;
				if (this.params.minute) input += ':' + e.minute;
				if (this.params.second) input += ':' + e.second;
				console.log("input------start", input);
				this.dateTimestamp.start = e.timestamp
				if (this.dateTimestamp.start && this.dateTimestamp.end) {
					if (this.dateTimestamp.start + Number(30 * 60) >= this.dateTimestamp.end) {
						uni.showToast({
							title: "预定开始时间不能大于结束时间且预约最小时长为30分钟",
							icon: 'none',
						});
					}
				} else {
					console.log("value", this.dateTimestamp.start, parseInt((new Date().valueOf()) / 1000))
					if (this.dateTimestamp.start < parseInt((new Date().valueOf()) / 1000)) {
						uni.showToast({
							title: "不可选择过去时间",
							icon: 'none',
						});
					} else {
						this.schedulerData.startDate = input
					}
				}
			},
			openEnd() {
				if (!this.dateTimestamp.start) {
					uni.showToast({
						title: "请选择预定开始时间",
						icon: 'none',
					});
				} else {
					this.showEndTime = true
				}
			},
			confirmEnd(e) {
				console.log(e);
				let input = '';
				if (this.params.year) input += e.year;
				if (this.params.month) input += '-' + e.month;
				if (this.params.day) input += '-' + e.day;
				if (this.params.hour) input += ' ' + e.hour;
				if (this.params.minute) input += ':' + e.minute;
				if (this.params.second) input += ':' + e.second;
				console.log("input------end", input);
				this.dateTimestamp.end = e.timestamp
				if (this.dateTimestamp.start && this.dateTimestamp.end) {
					if (this.dateTimestamp.start + Number(30 * 60) >= this.dateTimestamp.end) {
						uni.showToast({
							title: "预定结束时间不能大于开始时间且预约最小时长为30分钟",
							icon: 'none',
						});
					} else {
						if (this.dateTimestamp.end < parseInt((new Date().valueOf()) / 1000)) {
							uni.showToast({
								title: "不可选择过去时间",
								icon: 'none',
							});
						} else {
							this.schedulerData.endDate = input
						}
					}
				}
			},
			changeCheckBox(e,index){
				console.log("e,",e,index)
				if(e && !e.value){
					this.query.splice(index,1)
					this.schedulerData.numberParticipants = this.query.length
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
