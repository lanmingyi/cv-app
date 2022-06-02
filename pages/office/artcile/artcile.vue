<template>
	<view class="container" :class="[vtheme]">
		<swiper class="screen-swiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image :src="item.imgUrl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="">
			<view class="bg-box radius flex align-center padding-tb-sm">
				<navigator url="../application/scheduler/index" class="margin-right-sm">
					<view class="margin-left">
						<text class="font-light">今日日程</text>
					</view>
					<view class="margin-left text-center">
						<view class="text-bold font-light font-prominent">{{nowWeek}}</view>
						<view class="font-light">{{nowDate}}</view>
					</view>
				</navigator>
				<view class="content padding-xl">
					<view v-if="schedulerData" @click="goSchedulerDetail">
						<view v-if="schedulerData.startDate">
							<view class="text-cut font-three">{{schedulerData.startDate.split(' ')[1]}} - {{schedulerData.endDate.split(' ')[1]}}</view>
						</view>
						<view class="text-cut font-second">
							{{schedulerData.title}}
						</view>
					</view>
					<navigator url="../application/scheduler/index" v-else class="flex align-center">
						<view class="font-three"><text class="u-font-28">今日暂无其他安排</text></view>
						<u-icon custom-prefix="custom-icon" class="tag-text-default margin-left-xl u-font-36" name="tianjia"></u-icon>
					</navigator>
				</view>
			</view>
			<view class="text-box-line"></view>
		</view>
		
		<view class="cu-list grid col-4">
			<view class="cu-item animation-slide-bottom" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList" :key="index" @tap="navTo(item.url)">
				<view
					:style="{background: colorType()}"
					class="margin-auto box-font-list flex align-center justify-center">
					<view class="iconfont" :class="['icon-' + item.cuIcon,'text-white']"></view>
				</view>
				<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
			</view>
		</view>
		<view class="text-box-line"></view>

		<view class="article bg-box">
			<navigator url="../application/circulate/circulate?id=1" class=" solid-bottom padding-sm flex align-center justify-between">
				<view class="">
					<u-icon custom-prefix="custom-icon" class="icon-title-main margin-right-sm" name="shouye-5"></u-icon>
					<text class="font-second">待办传阅</text>
				</view>
				<view class="font-three padding-right-xs">全部<u-icon name="arrow-right" size="20"></u-icon></view>
			</navigator>
			<circulate-box :list="circulateList" @goDetail="goCirculateDetail"></circulate-box>
			<view v-if="circulateList.length == 0" class="flex align-center padding-xl margin-bottom-sm">
				<view class="font-three">暂无</view>
				<!-- <text class="cuIcon-add text-blue margin-left-xs u-font-36"></text> -->
			</view>
			<view class="text-box-line"></view>
		</view>
		
		<!-- <carousel class="bg-box" :img-list="carouselList" url-key="url"  @selected="selectedBanner" /> -->
		
		<swiper class="card-swiper bg-box" :indicator-dots="false" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in carouselList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill"></image>
					<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
				</view>
			</swiper-item>
		</swiper>
		
		<view class="text-box-line"></view>
		<view class="bg-box">
			<navigator url="../application/notice/notice" class=" solid-bottom padding-sm flex align-center justify-between">
				<view class="action">
					<u-icon custom-prefix="custom-icon" class="icon-title-main margin-right-sm" name="renwu3"></u-icon>
					<text class="font-second">通知公告</text>
				</view>
				<view class="font-three padding-right-xs">全部<u-icon name="arrow-right" size="20"></u-icon></view>
			</navigator>
			<view>
				<act-box :list="newsList" @goDetail="goToNoticeDetails"></act-box>
			</view>
		</view>
	</view>
</template>
<script>
	import carousel from '@/components/vear-carousel/vear-carousel'
	import actBox from '@/components/custom/pages/actBox.vue'
	import taskBox from '@/components/custom/pages/taskBox.vue'
	import circulateBox from '@/components/custom/pages/circulateBox.vue'
	import moment from 'moment/min/moment.min.js'
	import {
		friendlyDate
	} from '@/common/util.js';
	import wxCharts from '@/common/wxcharts.js';
	var canvaLineB = null;

	export default {
		components: {
			carousel,
			actBox,
			taskBox,
			circulateBox
		},
		data() {
			return {
				loadingText: '加载中...',
				circulateList: [],
				taskToDoList:[],
				stepsData: [{
					title: '发起审批',
					desc: '2021-04-21 18:24:30'
				}, {
					title: '人力部经理',
					desc: '2021-04-21 18:59:30'
				}, {
					title: '财务部经理',
					desc: '2021-04-22 08:14:30'
				}, {
					title: '审批完成',
					desc: '2021-04-22 10:14:30'
				}],
				stepsList:[],
				showSteps : false,
				serverData: '',
				nowDate:'',
				nowWeek:'',
				schedulerData:"",
				newsList: [],
				cuIconList:[],
				swiperList: [{
						imgUrl: '../../../static/img/bg_03.jpg'
					},{
						imgUrl: '../../../static/img/bg_04.jpg'
					},{
						imgUrl: '../../../static/img/bg_02.jpg'
					}
				],
				cardCur: 0,
				carouselList: [{
					url: 'https://img9.51tietu.net/pic/2019-091200/vgkpidei2tjvgkpidei2tj.jpg',
					id: 1
				}, {
					url: 'https://img9.51tietu.net/pic/2019-091200/euzekmi5m23euzekmi5m23.jpg',
					id: 2
				}, {
					url: 'https://img9.51tietu.net/pic/2019-091200/143tt0ta4sr143tt0ta4sr.jpg',
					id: 3
				}, {
					url: 'https://img9.51tietu.net/pic/2019-091200/ff1vqwm3q33ff1vqwm3q33.jpg',
					id: 4
				}, ],
			}
		},
		onLoad: function() {
			this.nowDate = moment(new Date()).format('MM-DD')
			this.nowWeek = '周' + this.filter(new Date().getDay())
			this.getFunction()
		},
		onShow() {
			this.schedulerData = []
			this.circulateList = []
			this.taskToDoList = []
			this.newsList = []
			this.getSchedulerlist()
			this.getChuanYueList()
			this.getTaskList()
			this.getListInfo()
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.schedulerData = []
			this.circulateList = []
			this.taskToDoList = []
			this.newsList = []
			this.getSchedulerlist()
			this.getChuanYueList()
			this.getTaskList()
			this.getListInfo()
			setTimeout(function () {
					uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			goToNoticeDetails(uuid) {
				uni.navigateTo({
					url: '../application/notice/notice_details?uuId=' + uuid,
				});
			},
			getFunction() {
				var that = this;
				that.$http
					.post(
						'/system/getListAppMenuByRoleId', {type: 'more'}, {
							params: {},
						}
					)
					.then((res) => {
						let list = res.data[0].list;
						this.cuIconList = list[1].list.slice(0,8);
					})
					.catch((err) => {});
			},
			getListInfo: function() {
				var that = this;
				that.$http
					.post('/office/officePublicAnnouncement/getPageSet', {}, {
							params: {
								pageNo: 1,
								pageSize: 5,
							},
						}
					)
					.then((res) => {
						let list = res.data.rows;
						list.forEach(val=>{
							let data = {
								titleTips : val.title.substring(0,2),
								name : val.publishingDepartmentName,
								title : val.title,
								uuid:val.uuid,
								time : val.createTime,
								type: val.type
							}
							that.newsList.push(data)
						})
					})
					.catch((err) => {});
			},
			getSchedulerlist(){
				var that = this;
				that.$http
					.post('/office/scheduler/getMyScheduler', {
						date:moment(new Date()).format('yyyy-MM-DD')
					}, {
						params:{},
					})
					.then(res => {
						if(res.data){
							this.schedulerData = res.data[0]
						}
					})
					.catch(err => {
					});
			},
			getChuanYueList(action = 0) {
				var that = this;
				that.$http
					.post('/office/oaChuanyue/getPageSet', {
						pageNo:1,
						pageSize: 5
					}, {
						params:{},
					})
					.then(res => {
						this.circulateList = res.data.rows
					})
					.catch(err => {
					});
			},
			getTaskList(){
				var that = this;
				that.$http
					.post('/office/oaTaskBase/getMyTaskBaseByLevelId', {
						pages: 1,
						rows: 3,
						levelId: 1
					}, {
						params:{},
					})
					.then(res => {
						this.taskToDoList = res.data.rows
					})
					.catch(err => {
					});
			},
			goSchedulerDetail(){
				uni.navigateTo({
					url: '/pages/office/application/scheduler/scheduler_details?uuId=' + this.schedulerData.uuid
				});
			},
			goCirculateDetail(uuid) {
				uni.navigateTo({
					url: '/pages/office/application/circulate/details?uuId=' + uuid + '&selectedIndex=1'
				});
			},
			goToTask(id,levelId) {
				uni.navigateTo({
					url: '/pages/office/application/task/task_list?id=' + id  + '&levelId=' + levelId
				});
			}
		}
	}
</script>
<style scoped lang="scss">
	
	.container{
		height: calc(100vh -88rpx - 100rpx - var(–safe-area-inset-bottom) - var(–status-bar-height));
	}
	/* 任务 */
	.task-box {
		border-radius: 20rpx;
		overflow: hidden;

		.task-title {
			// border-radius: 0 0 20rpx 20rpx;
		}

		.task-line {
			width: 100%;
			margin: 0 auto;
			border-bottom: 1px dashed #e7e7e7;
		}

		.task-info {
			// border-radius: 20rpx 20rpx 0 0;
		}
	}
</style>
