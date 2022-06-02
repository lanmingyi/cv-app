<template>
	<view class="container" :class="[vtheme]">
		<view class="content bg-box padding-bottom-sm">
			<zzx-calendar @selected-change="datechange" type="scheduler">
				<view style="text-align: left;padding: 20rpx 0 30rpx 30rpx;font-weight: bold;">
					<text class="margin-left-xs">{{monthDate}}</text>
				</view>
			</zzx-calendar>
		</view>
		<view class="text-box-line"></view>	
		<view class="padding bg-box" v-if="empty">
			<u-time-line>
				<u-time-line-item v-for="(item,index) in schedulerList" :key="index">
					<template v-slot:node>
							<u-icon name="calendar-fill" color="#03cf7d"	:size="30"></u-icon>
						</template>
					<template v-slot:content>
						<view>
							<view class="u-order-title font-three">
								<text>{{item.organizer}}</text>
								<text class="padding-left-sm">{{fifterData(item.startDate)}} - {{fifterData(item.endDate)}}</text>
							</view>
							<view class="u-order-desc font-second">{{item.title}}</view>
							<view class="u-order-desc font-three text-cut">{{item.text}}</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
		<view class="padding-lr bg-box" v-else>
			<view class="padding-tb">
				<text class="font-three">今日暂无日程</text>
			</view>
		</view>
		<view class="pos-fixed width-80 round cu-botton-submit text-xxl text-center" @click="addScheduler">+</view>
	</view>
</template>
<script>
	import zzxCalendar from "@/components/zzx-calendar/zzx-calendar.vue"
	import moment from 'moment/min/moment.min.js'
	import {
		friendlyDate
	} from '@/common/util.js';

	export default {
		components: {
			zzxCalendar
		},
		data() {
			return {
				loadingText: '加载中...',
				TabCur: 0,
				scrollLeft: 0,
				refreshing: false,
				refreshText: '下拉可以刷新',
				taskList: [],
				curDate: '',
				markDays: [],
				nowData: "",
				monthDate: moment(new Date()).format("yyyy-MM-DD"),
				empty:true,
				schedulerList:[]
			}
		},
		computed: {
			scrollViewHeight() {
				return 'height:' + (uni.getSystemInfoSync().windowHeight) + 'px';
			}
		},
		onLoad: function() {
			this.getList();
			let date = new Date()
			this.nowData = Number(date.getMonth() + 1) + '-' + date.getDate()
		},
		methods: {
			changelist(){
				// this.monthDate = moment(new Date()).format("yyyy-MM-DD")
				this.schedulerList = []
				this.getList()
			},
			fifterData(date){
				let str = moment(date).format('HH:mm')
				return str
			},
			addScheduler() {
				uni.navigateTo({
					url: 'addScheduler?type=mySave'
				});
			},
			datechange(e) {
				// this.nowData = Number(e.time.getMonth() + 1) + '-' + e.time.getDate()
				this.monthDate = e.fullDate
				this.schedulerList = []
				this.getList()
				console.log(e,this.nowData );
			},
			activeTop(i) {
				this.conferenceActive = i
			},
			open() {
				this.$refs.calendar.open();
			},
			confirm(e) {
				console.log(e);
			},
			change(e) {
				console.log("e133", e)
			},
			// action = 0
			getList() {
				let that = this
				that.$http.post('/office/scheduler/getMyScheduler', {
						date: that.monthDate
					}, {
						params: {},
					})
					.then(res => {
						console.log("res",res,res.data)
						if(res.data.length > 0){
							that.schedulerList = res.data
						}
						if(that.schedulerList == 0){
							that.empty = false
						} else {
							that.empty = true
						}
						console.log("that.schedulerList",that.schedulerList)
					})
					.catch(err => {});
			},
			goToDetails(item){
				uni.navigateTo({
					url: 'scheduler_details?uuId=' + item.uuid
				});
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
		}
	}
</script>
<style scoped lang="scss">
</style>
