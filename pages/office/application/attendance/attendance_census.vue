<template>
	<view class="container" :class="[vtheme]">
		<view class="cu-card padding-sm bg-box margin radius">
			<view class="flex align-center justify-between ">
				<view class="text-bold text-black">{{monthDate}} 月汇总</view>
				<view class="cuIcon-right"></view>
			</view>
			<view class="flex align-center justify-between padding-tb-sm">
				<view class="text-center census-item">
					<view class="text-xxl text-black text-bold">7.3</view>
					<view class="text-sm">平均公时(小时)</view>
				</view>
				<view class="text-center census-item">
					<view class="text-xxl text-black text-bold">1</view>
					<view class="text-sm">迟到(小时)</view>
				</view>
				<view class="text-center census-item">
					<view class="text-xxl text-black text-bold">0</view>
					<view class="text-sm">早退(小时)</view>
				</view>
			</view>
		</view>
		
		<view class="calendar-content margin-top margin-lr radius">
			<zzx-calendar @selected-change="datechange" type="attendance">
				<view style="text-align: left;padding: 20rpx 0 30rpx 30rpx;font-weight: bold;">
					每日记录<text class="margin-left-xs">{{monthDate}}</text>月
				</view>
			</zzx-calendar>
		</view>
		
		<view class="calendar-account cu-card padding-lr-sm bg-box margin-lr radius">
			<view class="  padding-lr-xs padding-bottom-sm">规则:{{ruls}}</view>
			<view v-for="(item,index) in clockList" :key="index">
				<view  class="cu-timeline" >
					<!-- :class="item.status == '0' ? 'cuIcon-round text-gray' : (item.status == '1'? 'cuIcon-roundcheck text-green' : 'cuIcon-roundclose text-red')" -->
					<view class="cu-item cuIcon-title" >
						<view class="flex align-start">
							<text class="text-bold   text-black">{{item.clockName}}</text>
							<text v-if="item.clockTime"  class="  text-black">{{item.clockTime}}</text>
							<text v-else class="  text-black">未打卡 <text class="cu-tag bg-orange light sm round margin-left-sm">缺卡</text></text>
						</view>
						<view v-if="!item.clockTime" class="  text-black margin-top-xs">
							<text class="cu-tag bg-blue light padding-lr-xs round" @click="dealWith(item)">处理异常</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-modal bottom-modal" :class="modalShow?'show':''">
				<view class="cu-dialog">
					<view class="padding-sm flex align-center justify-end">
						<view class="action text-blue margin-right-sm" @click="()=>{modalShow = flase}">取消</view>
					</view>
					<view class="padding-lr-xl padding-bottom-xl">
						<view class="padding-top-sm padding-lr" v-for="(item,index) in applyList" :key="index" @click="checkApply(item)">
							<text class="text-black">{{item.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import zzxCalendar from "@/components/zzx-calendar/zzx-calendar.vue"
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
				monthDate:new Date().getMonth()+1,
				clockList: [{clockName: '上班',clockTime: '08:38'},{clockName: '下班',clockTime: '19:06'}],
				ruls: '固定上下班 长沙考勤时间 09:00-18:30',
				modalShow: false,
				applyList:[{
					name:'补卡申请',id:1
				},{
					name:'出差申请',id:2
				},{
					name:'外出申请',id:3
				},{
					name:'请假申请',id:4
				},{
					name:'加班申请',id:5
				}]
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
			addScheduler() {
				uni.navigateTo({
					url: 'addScheduler'
				});
			},
			datechange(e) {
				console.log(e);
				this.nowData = Number(e.time.getMonth() + 1) + '-' + e.time.getDate()
				this.ruls = '固定上下班 长沙考勤时间 09:00-18:30'
				if(!e.info){
					this.clockList = []
					this.ruls = '休息'
				} else if(e.info == 1){
					this.clockList = [{clockName: '上班',clockTime: '08:38'},{clockName: '下班',clockTime: '19:06'}]
				} else if(e.info == 2){
					this.clockList = [{clockName: '上班',clockTime: '08:38'},{clockName: '下班',clockTime: ''}]
				}
			},
			dealWith(){
				this.modalShow = true
			},
			checkApply(item){
				console.log("申请----",item.name)
				this.modalShow = false
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
			getList(action = 0) {

			},
			goToDetails(){
				uni.navigateTo({
					url: 'scheduler_details'
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
	.calendar-content {
		/* margin-top: 150rpx; */
		background: #fff;
		padding-bottom: 10rpx;
	}
	.census-item{
		width: 30%;
	}
	.calendar-account{
		min-height: 300rpx;
		padding-bottom: 30rpx;
		margin-bottom: 150rpx;
	}
</style>
