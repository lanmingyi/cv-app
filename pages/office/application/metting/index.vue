<template>
	<view class="container pos-relative" :class="[vtheme]">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="false" :background="background"
			:back-text-style="{color: '#fff'}" :back-icon-name="backIconName" :back-text="backText">
			<view class="slot-wrap">
				<view class="down-wrap">
					<view class="flex align-center padding-left text-white text-bold"  @click="showModal">
						<text>{{nowDate}}</text>
						<text class="padding">{{week}}</text>
						<text class="cuIcon-unfold text-balck" :class="[showMetting ? 'transfrom-180' : 'transfrom-0']"></text>
					</view>
				</view>
			</view>
		</u-navbar>
		
		<view v-if="emptyType===0" class="empty text-center margin-tb-xl">
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="emptyType===1" class="empty text-center">
			<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
		</view>
		
		<view class="bg-box" v-if="emptyType===2">
			<view class="padding-bottom-sm padding-top padding-lr border-bottom" v-for="(item,index) in mettingList">
				<view class="flex ">
					<image class="metting-img" src="@/static/img/room.jpg"
						mode="aspectFill"></image>
					<view class="desc margin-left">
						<view class="text-cut font-main">{{item.name}}</view>
						<view>
							<view class="font-three">{{item.address}}</view>
							<view class="font-three">容纳人数：{{item.numberOfPeople}}</view>
						</view>
					</view>
				</view>
				<view class="margin-top-sm">
					<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-xs" name="user1"></u-icon>{{item.managementName}}</view>
					<view class="font-three" v-if="item.equipment"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-xs" name="shebei"></u-icon>{{item.equipment}}</view>
				</view>
				<view class="margin-top-sm padding-tb-xs flex align-center justify-end">
					<view class="font-three flex align-center border radius padding-lr-sm" @click="openReserve(item)">
						<u-icon custom-prefix="custom-icon" class="cu-color-submit" name="htmal5icon28" size="16"></u-icon>
						<text class="padding-left-xs">详情</text>
					</view>
					<view class="font-second margin-left-xl flex align-center border radius padding-lr-sm" @click="goReserve(item)">
						<u-icon custom-prefix="custom-icon" class="cu-color-delete" name="xuanze" size="16"></u-icon>
						<text class="padding-left-xs u-font-12">预定</text>
					</view>
				</view>
				
				<!-- <view class="margin-top-sm padding-tb-xs border radius shadow flex align-center justify-around">
					<view class="font-second flex align-center" @click="openReserve(item)">
						<u-icon custom-prefix="custom-icon" class="cu-color-submit" name="htmal5icon28"></u-icon>
						<text class="padding-left-xs ">详情</text>
					</view>
					<view class="border-center"></view>
					<view class="font-second flex align-center" @click="goReserve(item)">
						<u-icon custom-prefix="custom-icon" class="cu-color-delete" name="xuanze"></u-icon>
						<text class="padding-left-xs">预定</text>
					</view>
				</view> -->
			</view>
		</view>


		<!-- 会议室预定详情 -->
		<u-popup border-radius="5" v-model="showReserve" @close="closeReserve" mode="center" width="80%" height="300px"
			:mask="true" :closeable="false" close-icon-pos="top-right">
			<view class="padding pos-strike" >{{reserveListTitle}}</view>
			<view class="padding-lr-sm">
				<scroll-view scroll-y="true" style="height: 240px;">
					<view class="bg-box border-top padding-tb-sm" v-for="(childItem,index) in reserveList"
						:key="index">
						<view class="u-font-13 text-black">
							<text class="cuIcon-title text-blue"></text>
							<text class="text-cut">{{childItem.reserveStartDate}} - {{childItem.reserveEndDate}}</text>
						</view>
						<view class="padding-left-sm">
							<view class="u-font-12">会议主题：{{childItem.topics}}</view>
							<view class="u-font-12">预订人：{{childItem.reserveName}}</view>
						</view>
					</view>
					<view v-if="reserveList.length == 0">
						<view class="u-padding-top-70 text-center font-three">今日暂无预定</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<!-- 日期选择 -->
		<!-- <u-popup border-radius="10" v-model="showMetting" :mode="mode" length="90%" :mask="mask" :closeable="true"
			close-icon-pos="top-left" :sureable="true" sure-icon-pos="top-right" @sure="changeMetting">
			<calendar :is-show="showMetting" :start-date='startDate' :theme-color="'#FF6600'" @callback="getDate">
				<template v-slot:header>
				</template>
			</calendar>
		</u-popup> -->

		<u-calendar v-model="showMetting" ref="calendar" @change="changeMetting" mode="date" start-text="开始" :max-date="null"
			end-text="结束" range-color="#2979ff" range-bg-color="rgba(41,121,255,0.13)" active-bg-color="#2979ff"
			btn-type="primary">
		</u-calendar>
	</view>
</template>
<script>
	import Calendar from '@/components/mobile-calendar-simple/Calendar.vue'


	import {
		friendlyDate
	} from '@/common/util.js';
	import moment from 'moment/min/moment.min.js'

	export default {
		components: {
			Calendar
		},
		data() {
			return {
				loadingType: 'loading',
				loadingText: '加载中...',
				emptyType: 0,
				TabCur: 0,
				scrollLeft: 0,
				refreshing: false,
				refreshText: '下拉可以刷新',
				taskList: [],
				startDate: '',
				nowDate: '',
				changeDate: '',
				week: '',
				changeWeek: '',
				selectTime: [],
				showMetting: false,
				mode: 'bottom',
				mask: true, // 是否显示遮罩
				mettingList: [],
				showReserve: false,
				reserveList: [],
				result: "请选择日期",
				reserveListTitle: '',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
					'background-color': '#3b9cff'
				},
				activeColor: '#2979ff',
				mask: true,
				borderBottom: false,
				backText: '',
			}
		},
		computed: {
			scrollViewHeight() {
				return 'height:' + (uni.getSystemInfoSync().windowHeight) + 'px';
			}
		},
		onLoad: function() {
			let date = new Date();
			this.startDate = moment(date).format('yyyy-MM-DD')
			this.week = '星期' + this.filter(date.getDay())
			this.nowDate = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate()
			this.currentDate = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate()
			this.currentTime = moment(date).format('yyyy-MM-DD HH:mm:ss')
			this.changeDate = this.nowDate
			this.getMettingList()
		},
		methods: {
			openReserve(item) {
				console.log('open', item);
				this.reserveListTitle = item.name
				this.showReserve = true
				this.reserveList = []
				if (item.children.length == 0) {
					var that = this;
					that.$http
						.post('/office/oaConferenceRoomReserve/getPageSetByMeetingUuid', {
							nowDate: that.nowDate,
							mettingUuid: item.uuid
						}, {
							params: {},
						})
						.then(res => {
							if (res.data) {
								res.data.forEach(val => {
									val.reserveStartDate = moment(val.reserveStartDate).format(
										'yyyy-MM-DD HH:mm')
									val.reserveEndDate = moment(val.reserveEndDate).format('yyyy-MM-DD HH:mm')
								})
								this.reserveList = res.data
							}
						})
						.catch(err => {});
				}
			},
			closeReserve() {
				this.showReserve = false
				this.$nextTick(function() {
					this.reserveList = []
				})
			},
			getMettingList() {
				var that = this;
				that.$http
					.post('/office/officeConferenceRoom/getPageSet', {}, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows
						if(list){
							list.forEach(val => {
								val.children = []
							})
							that.mettingList = list
							that.emptyType = 2
						} else {
							that.emptyType = 1
						}
					})
					.catch(err => {});
			},
			getDate(date) {
				console.log(date.startStr)
				this.changeDate = date.startStr
			},
			showModal() {
				this.showMetting = true
			},
			goReserve(item) {
				console.log("this.currentTime", this.currentTime)
				uni.navigateTo({
					url: 'metting_reserve?currentTime=' + this.currentTime + '&week=' + this.week + '&uuId=' + item
						.uuid
				});
				// this.showTime = true
				// this.$refs.seleteTime.hadleData(this.selectTime)
			},
			changeMetting(e) {
				console.log("e------", e, e.result)
				this.nowDate = e.result
				this.week = e.week
				// var that = this
				// console.log("this.currentDate", that.changeDate.dateStr, !!that.changeDate.dateStr)
				// if (!!that.changeDate.dateStr) {
				// 	that.nowDate = that.changeDate.dateStr
				// 	that.week = that.changeDate.week
				// 	if (that.changeDate.recent && that.changeDate.recent == '今天') {
				// 		that.currentTime = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
				// 		that.currentDate = moment(new Date()).format('yyyy-MM-DD')
				// 		that.startDate = moment(new Date()).format('yyyy-MM-DD')
				// 	} else {
				// 		that.currentTime = that.nowDate.concat(' 01:00:00')
				// 		that.currentDate = that.nowDate
				// 		that.startDate = that.nowDate
				// 	}
				// 	that.mettingList.forEach(val => {
				// 		val.children = []
				// 	})
				// 	let readMore = that.$refs.uReadMore
				// 	if (readMore) {
				// 		readMore.forEach(e => {
				// 			e.init()
				// 		})
				// 	}
				// }
				// that.selectTime = []
			},
			navToArt(detail) {
				uni.navigateTo({
					url: '/pages/office/article_details/details?query=' + encodeURIComponent(JSON
						.stringify(detail))
				});
			},
			loadMore() {
				console.log('load more');
				this.getList(2);
			},
			onRefresh(event) {
				this.refreshText = '正在刷新...';
				this.refreshing = true;
				this.getList();
			},
			filter(num) {
				switch (num) {
					case 1:
						return '一'
						break;
					case 2:
						return '二'
						break;
					case 3:
						return '三'
						break;
					case 4:
						return '四'
						break;
					case 5:
						return '五'
						break;
					case 6:
						return '六'
						break;
					default:
						return '日'
				}
			},
		}
	}
</script>
<style scoped lang="scss">
	.calendar-tz.fixed {
		top: calc(44px + env(safe-area-inset-top)) !important;
		/* height: calc(100vh- calc(44px + env(safe-area-inset-top))); */
	}

	.metting-img {
		width: 200rpx !important;
		height: 160rpx !important;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.desc {
		height: 160rpx;
		width: 40%;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
	}
</style>
