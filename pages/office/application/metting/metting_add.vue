<template>
	<view class="container" :class="[vtheme]">
		<u-form :model="mettingData" :rules="rules" ref="uForm" :errorType="errorType"
			class="bg-box">
			<view class="padding-lr">
				<u-form-item label-width="180" label-position="top" label="申请时间" :required="true">
					<u-input :border="false" v-model="mettingData.applicatioNtime" disabled placeholder="请输入"></u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="会议名称" prop="nameOfProposedMeeting" :required="true">
					<u-input :border="false" v-model="mettingData.nameOfProposedMeeting" type="textarea"
						placeholder="请输入"></u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="会议内容" prop="primaryCoverage" :required="true">
					<u-input :border="false" v-model="mettingData.primaryCoverage" type="textarea" placeholder="请输入">
					</u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="预定时间" :required="true">
					<view class="flex align-center justify-center">
						<u-form-item label-width="60" label-position="left" label=" " prop="startTime"
							class="border-bottom-none u-padding-0">
							<u-input :border="false" v-model="mettingData.startTime" type="text" placeholder="开始时间"
								disabled @click="()=>{showStartTime=true}"></u-input>
							<u-picker mode="time" v-model="showStartTime" :minuteStep="30" :params="params"
								@confirm="confirmStart" :showTimeTag="false"></u-picker>
						</u-form-item>
						<view class="border-center"></view>
						<u-form-item label-width="60" label-position="left" label=" " prop="endTime"
							class="border-bottom-none u-padding-0">
							<u-input :border="false" v-model="mettingData.endTime" type="text" placeholder="结束时间"
								disabled @click="openEnd"></u-input>
							<u-picker mode="time" v-model="showEndTime" :minuteStep="30" :params="params"
								@confirm="confirmEnd" :showTimeTag="false"></u-picker>
						</u-form-item>
					</view>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="会议时长(h)" :required="false">
					<u-input :border="false" v-model="mettingData.duration" placeholder="时长根据预定时间自动计算" disabled></u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="会议室" prop="conferenceRoomName" :required="true">
					<u-input :border="false" placeholder="会议室" v-model="mettingData.conferenceRoomName" type="select"
						disabled iconNameColor="cu-color-icon" @click="()=>{showMettingRoom = true}"></u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="会议类型" prop="typees" :required="true">
					<u-input :border="false" placeholder="会议类型" v-model="mettingData.typees" type="select" disabled
						iconNameColor="cu-color-icon" @click="()=>{showStatus = true}"></u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="备注" class="border-bottom-none">
					<u-input :border="false" v-model="mettingData.logRemarks" placeholder="请输入"></u-input>
				</u-form-item>
			</view>
		
			<view class="text-box-line"></view>
		
			<view class="padding-lr">
				<u-form-item label-width="180" label-position="top" label="会议主持人" prop="hostess" :required="true">
					<user-popup
						ref="userPop" 
						:value="mettingData.hostess" 
						type="3" 
						placeholder="" 
						@change="changeUser" 
						iconName="man-add" 
						iconNameColor="cu-color-icon"></user-popup>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="申请单位" prop="applicationDepartmentName" :required="true">
					<u-input :border="false" placeholder="请选择" v-model="mettingData.applicationDepartmentName" disabled></u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="拟参会人员" :required="true">
					<user-popup
						ref="userPop" 
						:value="mettingData.logReceiveName" 
						type="1" 
						placeholder="" 	
						@change="changeUser" 
						iconName="man-add" 
						iconNameColor="cu-color-icon"></user-popup>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="参会人数">
					<u-input :border="false" v-model="mettingData.numberParticipants" placeholder="请输入">
					</u-input>
				</u-form-item>
				<u-form-item label-width="180" label-position="top" label="会议保障"  prop="conferenceGuarantee" :required="true">
					<u-input :border="false" placeholder="会议保障" v-model="mettingData.conferenceGuarantee" type="select"
						disabled iconNameColor="cu-color-icon" @click="()=>{showSecurity = true}"></u-input>
				</u-form-item>
			</view>
		</u-form>
		
		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="cu-botton-submit text-center" @click="formSubmit">发起申请</view>
		</view>
		
		<u-select v-model="showMettingRoom" mode="mutil-column-auto" :list="roomList" @confirm="confirmRoom"></u-select>
		<u-select v-model="showStatus" mode="mutil-column-auto" :list="statusList" @confirm="confirmStatus"></u-select>
		<u-select v-model="showSecurity" mode="mutil-column-auto" :list="securityList" @confirm="confirmSecurity">
		</u-select>

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
				emptyType: 0,
				loadingType: 'loading',
				isChoose: [],
				query: [],
				logReceive: '',
				logReceiveName: '',
				mettingData: {},
				rules: {
					applicationDepartmentName: [{
						required: true,
						message: '请输入会议名称',
						trigger: 'change',
					}],
					applicatioNtime: [{
						required: true,
						message: '请输入申请时间',
						trigger: 'change',
					}],
					nameOfProposedMeeting: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					primaryCoverage: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					startTime: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					endTime: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					conferenceRoomName: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					typees: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					hostess: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					conferenceGuarantee: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}]
				},
				errorType: ['message'],
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false,
					timestamp: true,
				},
				showStartTime: false,
				showEndTime: false,
				dateTimestamp: {},
				showPop: false,
				showSecurity: false,
				showMettingRoom: false,
				showStatus: false,
				roomList: [],
				statusList: [],
				securityList: []
			};
		},
		onReady() {
			if(this.$refs.uForm)this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			this.mettingData.applicatioNtime = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
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
						if(res.data && res.data.length > 0){
							res.data.forEach(val => {
								let data = {
									label: val.name,
									value: val.uuid
								}
								that.roomList.push(data)
								if(that.roomList.length == 0){
									that.$u.toast('没有会议室数据')
									setTimeout(()=>{
										uni.navigateBack()
									},300)
								}
							})
						} else {
							that.$u.toast('获取会议室失败')
							setTimeout(()=>{
								uni.navigateBack()
							},300)
						}
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
			changeUser(list, type) {
				this.query = list
				if (type == 1) {
					this.mettingData.numberParticipants = this.query.length
				} else if (type == 3) {
					this.mettingData.hostess = list[0].name
					this.mettingData.hostessId = list[0].id
					this.mettingData.applicationDepartmentName = list[0].departmentName
					this.mettingData.applicationDepartmentId = list[0].pid
				}
				this.$forceUpdate()
				this.showPop = false
			},
			close(item, index) {
				console.log("item-----", item)
				this.query.splice(index, 1)
			},
			formSubmit() {
				var that = this;
				console.log("wwwwwww",this.query)
				if(that.query){
					let name = []
					let nameid = []
					that.query.forEach(val => {
						name.push(val.name)
						nameid.push(val.id)
					})
					that.mettingData.attendanceUsers = name.join(',')
					that.mettingData.attendanceUserId = nameid.join(',')
				}
				that.mettingData.startTime = that.mettingData.startTime + ':00'
				that.mettingData.endTime = that.mettingData.endTime + ':00'
				let params = {
					isRelease: 'yes',
					...that.mettingData,
				}
				console.log("params---", params)
				that.$refs.uForm.validate(valid => {
					if (valid) {
						that.$http
							.post('/office/oaMeetingApplication/save', params, {
								params: {},
							})
							.then(res => {
								console.log("res----", res, res.data)
								that.$u.toast('res.data.message')
								setTimeout(()=>{
									uni.setStorage({
										key:'onFresh',
										data:true
									})
									uni.navigateBack()
								})
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
						this.mettingData.startTime = input
						this.getDuration()
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
							this.mettingData.endTime = input
							this.getDuration()
						}
					}
				}
			},
			getDuration() {
				let start = moment(this.mettingData.startTime).valueOf()
				let end = moment(this.mettingData.endTime).valueOf()
				let num = Number(end - start)
				console.log(start, end, num)
				if (this.mettingData.startTime && this.mettingData.endTime) {
					let hours = Number(num / (1000 * 3600))
					this.mettingData.duration = hours
				}
			},
			changeCheckBox(e,index){
				console.log("e,",e,index)
				if(e && !e.value){
					this.query.splice(index,1)
					this.mettingData.numberParticipants = this.query.length
				}
			},
			confirmRoom(e) {
				this.$nextTick(function() {
					this.mettingData.conferenceRoomName = e[0].label
					this.mettingData.conferenceRoomUuid = e[0].value
					this.$forceUpdate()
				})
			},
			confirmStatus(e) {
				this.$nextTick(function() {
					this.mettingData.typees = e[0].label
					this.mettingData.type = e[0].value
					this.$forceUpdate()
				})
			},
			confirmSecurity(e) {
				this.$nextTick(function() {
					this.mettingData.conferenceGuarantee = e[0].label
					// this.mettingData.conferenceGuarantee = e[0].value
					this.$forceUpdate()
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
</style>
