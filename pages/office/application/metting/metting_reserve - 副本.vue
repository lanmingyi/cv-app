<template>
	<view class="container ">
		<!-- v-if="mettingData" -->
		<u-form :model="reserveData" :rules="rules" ref="uForm" :errorType="errorType">
			<view class="margin-bottom-max">
				<view class="cu-bar bg-box margin-left">
					<view class="text-black text-bold padding-right-sm">
						<text class="cuIcon-calendar text-green u-font-16 margin-right-xs"></text>{{mettingData.name}}
					</view>
				</view>
				<view class="cu-bar bg-box padding-bottom">
					<view class="margin-left">
						<view class="text-balck text-font-13 margin-right-sm">{{mettingData.managementName}}</view>
						<view class="text-balck text-font-13">{{mettingData.departmentName}}</view>
						<view class="text-balck text-font-13">最多容纳人数：{{mettingData.numberOfPeople}}</view>
					</view>
				</view>

				<view class="text-box-line"></view>
				<view class="padding-lr">
					<!-- <u-form-item label-width="150" label-position="left" label="预订人:" prop="reserveName">
						<u-input :border="false"  placeholder="预订人" v-model="reserveData.reserveName" type="text"></u-input>
					</u-form-item> -->
					<u-form-item label-width="150" label-position="left" label="参会人数:" prop="attendNumberOfPeople">
						<u-input :border="false"  placeholder="参会人数" v-model="reserveData.attendNumberOfPeople" type="number"></u-input>
					</u-form-item>
					<u-form-item label-width="150" label-position="left" label="会议主题:" prop="topics">
						<u-input :border="false" type="select" :select-open="selectShow" v-model="reserveData.topics" placeholder="会议主题" @click="selectShow = true" iconNameColor="text-red"></u-input>
					</u-form-item>
					<u-form-item label-width="150" label-position="left" label="预定日期:" prop="reserveEndTime">
						<view class="text-font-13">{{nowDate}} {{week}}</view>
					</u-form-item>
					<u-form-item label-width="150" label-position="left" label=" " prop="reserveTime">
						<u-input :border="false" placeholder="请选择预定时间段" v-model="reserveData.reserveTime" type="select" @click="goReserveTime" disabled iconName="clock" iconNameColor="text-red"></u-input>
					</u-form-item>
					<u-form-item label-width="150" label-position="top" label="备注:" prop="reserveEndTime">
						<u-input type="textarea" :border="false" v-model="reserveData.reason" placeholder="请输入"></u-input>
					</u-form-item>
				</view>
				
				<view class="text-box-line"></view>
				<view class="cu-bar bg-box flex align-center justify-between border-bottom border-top" >
					<view class="action">
						<view class="text-bold text-font-13">会议室地点：</view>
						<view class="text-font-13">{{mettingData.address}}</view>
					</view>
				</view>
				<view class="cu-bar bg-box flex align-center justify-between ">
					<view class="action">
						<view class="text-bold text-font-13">设备：</view>
					</view>
				</view>
				<view class="margin-lr padding-bottom flex align-center flex-wrap ">
					<view class="action">
						<view class="text-font-13">{{mettingData.equipment}}</view>
					</view>
				</view>
			</view>
		</u-form>
		
		<view class="pos-fixed-bottom">
			<view class="pos-fixed-bottom-box">
				<view class="bg-blue round padding-tb-sm" @click="formSubmit">发起预定</view>
			</view>
		</view>
		
		
		<u-select mode="single-column" :list="topicList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<!-- 时间选择 -->
		<view class="cu-modal bottom-modal" :class="showTime?'show':''">
			<view class="cu-dialog pos-relative" style="max-height: 65%;overflow-y: scroll;">
				<view class="cu-bar bg-box pos-strike">
					<view class="action" @tap="()=>{showTime = false}">
						<text class="cuIcon-close text-red"></text>
					</view>
					<view class="action text-green"><text class="cuIcon-check text-green" @click="changeTime"></text>
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
	import moment from 'moment/min/moment.min.js'
	export default {
		components: {
			commentList,
			SSelectTime
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
					reserveTime:'',
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
					reserveTime: [
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
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(options) {
			let date = new Date();
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
			selectConfirm(e){
				console.log("e-----",e)
				this.reserveData.topics = e[0].label
				this.reserveData.topicsId = e[0].value
			},
			formSubmit(){
				this.reserveData.reserveDate = moment(this.nowDate).format('yyyy-MM-DD')
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
								this.reserveData = []
								uni.showToast({
								    title: res.data.message,
										icon: 'none',
								    duration: 1000
								});
							})
							.catch(err => {});
					} else {
						console.log('验证失败',this.reserveData,this.mettingData);
					}
				});
			},
			changeTime() {
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
