<template>
	<view class="container" :class="[vtheme]">
		<view v-if="emptyType===0" class="empty text-center margin-tb-xl">
			<image src="@/static/img/loading.gif"></image>
			<text class="text-grey text-opacity5 ">加载中...</text>
		</view>
		<view v-if="emptyType===1" class="empty text-center">
			<image src="@/static/img/empty.png"></image>
			<view class="text-grey text-opacity5 margin-tb-xl">页面丢失</view>
		</view>
		<view v-if="emptyType===2">
			<view class="bg-box">
				<view class="padding-top padding-lr padding-bottom-xs">
					<view class="font-main text-bold">
						{{reserveData.topics}}
					</view>
				</view>
				<view class="padding-bottom">
					<view class="margin-lr flex align-center justify-between">
						<view class="font-second"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="yonghu"></u-icon>{{reserveData.managementName}}</view>
						<view class="font-second"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="zhuye"></u-icon>{{reserveData.conferenceRoomName}}</view>
					</view>
					<view class="margin-lr">
						<view class="font-second"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="shebei"></u-icon>{{reserveData.equipment}}</view>
					</view>
				</view>
			</view>
			
			<view class="text-box-line"></view>
			<view class="padding-lr bg-box">
				<u-form :model="reserveData" ref="uForm">
					<u-form-item label-width="180" label-position="top" label="预定人" >
						<u-input :border="false" v-model="reserveData.reserveName" type="text" disabled></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="参会人数" >
						<u-input :border="false" v-model="reserveData.attendNumberOfPeople" type="text" disabled></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="开始时间" >
						<u-input :border="false" v-model="reserveData.reserveStartDate" type="text" disabled></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="结束时间" >
						<u-input :border="false" v-model="reserveData.reserveEndDate" type="text" disabled></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="会议内容" >
						<u-input :border="false" v-model="reserveData.reason" type="text" disabled></u-input>
					</u-form-item>
				</u-form>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import moment from 'moment/min/moment.min.js'
	export default {
		components: {
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				emptyType: 0,
				productData: {},
				InputBottom: 0,
				commentValue: '',
				params:{},
				reserveData:{}
			};
		},
		onLoad(options) {
			// this.reserveData = JSON.parse(decodeURIComponent(options.details))
			this.params.uuid = options.uuId
			console.log("reserveData----",this.reserveData)
			this.getReserveDetails()
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getReserveDetails(){
				var that = this;
				that.$http
					.post('/office/oaConferenceRoomReserve/getDetailByTopicsId', {
						uuid: this.params.uuid
					}, {
						params: {},
					})
					.then(res => {
						this.reserveData = res.data
						this.reserveData.reserveStartDate = moment(res.data.reserveStartDate).format('yyyy-MM-DD HH:mm')
						this.reserveData.reserveEndDate = moment(res.data.reserveEndDate).format('yyyy-MM-DD HH:mm')
						this.emptyType = 2
					})
					.catch(err => {
						this.emptyType = 1
					});
			},
		}
	};
</script>

<style lang="scss" scoped>

</style>
