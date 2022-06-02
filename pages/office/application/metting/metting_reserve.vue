<template>
	<view class="container" :class="[vtheme]">
		<!-- v-if="mettingData" -->
		<u-form :model="reserveData" :rules="rules" ref="uForm" :errorType="errorType">
			<view class="u-margin-bottom-80 bg-box">
				<view class="padding-top padding-lr padding-bottom-xs">
					<view class="font-main text-bold">
						{{mettingData.name}}
					</view>
				</view>
				<view class="padding-bottom">
					<view class="margin-lr flex align-center justify-between">
						<view class="font-second"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="yonghu"></u-icon>{{mettingData.managementName}}</view>
						<view class="font-second"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="zhuye"></u-icon>{{mettingData.departmentName}}</view>
					</view>
					<view class="margin-lr">
						<view class="font-second"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="shebei"></u-icon>{{mettingData.equipment}}</view>
					</view>
				</view>

				<view class="text-box-line"></view>
				<view class="padding-lr ">
					<u-form-item label-width="180" label-position="top" label="会议室地点" >
						<u-input class="font-main" type="text" :border="false" v-model="mettingData.address" disabled></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="可容纳人数" >
						<u-input type="text" :border="false" v-model="mettingData.numberOfPeople" disabled></u-input>
					</u-form-item>
				</view>
				<view class="text-box-line"></view>
				<view class="padding-lr">
					<u-form-item label-width="180" label-position="top" label="参会人数(人)" prop="attendNumberOfPeople" :required="true">
						<u-input :border="false"  placeholder="参会人数" v-model="reserveData.attendNumberOfPeople" type="number"></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="会议主题" prop="topics" :required="true">
						<u-input :border="false" v-model="reserveData.topics" type="text" placeholder="会议主题"></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="预定时间" :required="true">
						<view class="flex align-center justify-center">
							<time-rank-select
								:record="reserveData"
								:start="reserveData.reserveStartDate"
								:end="reserveData.reserveEndDate"
								startProp="reserveStartDate"
								endProp="reserveEndDate"
								:params="params"
								:dateTimestamp="dateTimestamp"
								@change="changeTime"></time-rank-select>
						</view>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="备注" prop="reason " class="border-bottom-none">
						<u-input type="textarea" :border="false" v-model="reserveData.reason" placeholder="请输入"></u-input>
					</u-form-item>
				</view>
			</view>
		</u-form>
		
		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="cu-botton-submit text-center" @click="formSubmit">发起预定</view>
		</view>
		
		
		<u-select mode="single-column" :list="topicList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<!-- 时间选择 -->
		<view class="cu-modal bottom-modal" :class="showTime?'show':''">
			<view class="cu-dialog pos-relative" style="max-height: 65%;overflow-y: scroll;">
				<view class="cu-bar bg-box pos-strike">
					<view class="action" @tap="()=>{showTime = false}">
						<text class="cuIcon-close text-red"></text>
					</view>
					<view class="action text-green"><text class="cuIcon-check text-green" @click="changeTimeSelect"></text>
					</view>
				</view>
				<s-select-time :isDisabled="true" :currentTime="currentTime" :currentDate="currentDate" startTime="7:00"
					endTime="21:00" :interval="30" @selectedTime="selectedTime" ref="seleteTime"
					:reserveList="reserveList">
					<!-- :disabledTime="disabledTime" -->
				</s-select-time>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import commentList from '@/components/custom/pages/commentList.vue';
	import SSelectTime from '@/components/s-select-time/s-select-time.vue'
	import timeRankSelect from '@/components/custom/timeRankSelect.vue';
	import moment from 'moment/min/moment.min.js'
	export default {
		components: {
			commentList,
			SSelectTime,
			timeRankSelect
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				opinionList: [],
				InputBottom: 0,
				commentValue: '',
				uuid: '',
				nowDate: '',
				week: '',
				joinList: [],
				showTime: false,
				disabledTime: [{
					start: '',
					end: ''
				}],
				currentTime: '',
				currentDate: '',
				reserveList: [],
				mettingData: [],
				selectShow:false,
				topicList: [],
				reserveData: {
					topics:'',
					reserveEndDate:'',
					reserveStartDate:'',
					attendNumberOfPeople:''
				},
				rules: {
					topics: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					reserveStartDate: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					reserveEndDate: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					attendNumberOfPeople: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
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
				dateTimestamp:{}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(options) {
			let date = new Date();
			this.dateTimestamp = {}
			this.nowDate = moment(options.currentTime).format('yyyy-MM-DD')
			this.currentDate = moment(options.currentTime).format('yyyy-MM-DD')
			this.currentTime =  moment(options.currentTime).format('yyyy-MM-DD HH:mm:ss')
			this.week = options.week
			this.uuid = options.uuId
			this.getDetails(options.uuId)
			this.getMettingTopic()
			this.getReserveList()
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			goReserveTime(){
				this.showTime = true
				this.$refs.seleteTime.hadleData(this.selectTime)
			},
			fifterData(date) {
				if (date) {
					let str2 = date.split(" ")
					return str2[1]
				}
			},
			getDetails(uuid) {
				console.log("uuid", uuid)
				var that = this;
				that.$http
					.post('/office/officeConferenceRoom/getDetailByUuid', {
						uuid: uuid
					}, {
						params: {},
					})
					.then(res => {
						that.mettingData = res.data
					})
					.catch(err => {});
			},
			getMettingTopic(){
				var that = this;
				that.$http
					.post('/office/oaMeetingTopics/getMettingTopic', {
					}, {
						params: {},
					})
					.then(res => {
						let list = res.data
						list.forEach(val=>{
							let data = {
								value: val.uuid,
								label: val.topicsName
							}
							that.topicList.push(data)
						})
					})
					.catch(err => {});
			},
			getReserveList(){
				var that = this;
				that.$http
					.post('/office/oaConferenceRoomReserve/getPageSetByMeetingUuid', {
						nowDate:that.nowDate,
						mettingUuid:that.uuid
					}, {
						params: {},
					})
					.then(res => {
						if(res.data.length> 0){
							res.data.forEach(val=>{
								let list = {
									startTime: val.startTime,
									endTime: val.endTime
								}
								this.reserveList.push(list)
							})
						}
						console.log("this.reserveList",this.reserveList)
					})
					.catch(err => {});
			},
			changeTime(e,timestamp,prop){
				this.$nextTick(function(){
					this.dateTimestamp = timestamp
					this.reserveData[prop] = e
					// this.$refs.uForm.validate() //表单验证
					this.$forceUpdate()
				})
			},
			selectConfirm(e){
				console.log("e-----",e)
				this.reserveData.topics = e[0].label
				this.reserveData.topicsId = e[0].value
			},
			formSubmit(){
				// this.reserveData.reserveDate = moment(this.nowDate).format('yyyy-MM-DD')
				this.reserveData.reserveStartDate = this.reserveData.reserveStartDate?moment(this.reserveData.reserveStartDate).format('yyyy-MM-DD HH:mm:ss'):''
				this.reserveData.reserveEndDate = this.reserveData.reserveEndDate?moment(this.reserveData.reserveEndDate).format('yyyy-MM-DD HH:mm:ss'):''
				this.reserveData.conferenceRoomName = this.mettingData.name
				this.reserveData.conferenceRoomUuid = this.uuid
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过',this.reserveData,this.mettingData);
						this.$http
							.post('/office/oaConferenceRoomReserve/save', this.reserveData, {
								params: {},
							})
							.then(res => {
								console.log("res----",res,res.data)
								this.$u.toast(res.data.message)
								setTimeout(()=>{
									uni.navigateBack()
								},500)
							})
							.catch(err => {});
					} else {
						console.log('验证失败',this.reserveData,this.mettingData);
					}
				});
			},
			changeTimeSelect() {
				console.log("this.selectTime", this.selectTime)
				this.showTime = false
			},
			selectedTime(e) {
				console.log(e)
				this.selectTime = e
				this.reserveData.reserveTime = e[0] + '-' + e[1]
				this.reserveData.startTime = e[0]
				this.reserveData.endTime = e[1]
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
