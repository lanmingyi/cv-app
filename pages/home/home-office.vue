<template>
	<view class="container" :class="[vtheme]">
		<swiper class="screen-swiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image :src="item.imgUrl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="main_content">
			<view class="cu-list grid col-4">
				<view class="cu-item animation-scale-up" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList" :key="index" @tap="navTo(item,index)">
					<!-- art-list-left -->
					<view
						:style="{background: item.color}"
						class="margin-auto box-font-list radius flex align-center justify-center">
						<view class="iconfont u-font-40" :class="['icon-' + item.cuIcon,'text-white']"></view>
					</view>
					<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
				</view>
			</view>
			
			<view class="bg-box">
				<view v-for="(item, index) in cuIconListMore" :key="index">
					<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom">
						<view class="font-main text-bold">{{ item.name }}</view>
					</view>
					<view class="cu-list grid col-4">
						<view class="cu-item animation-scale-up" :style="{animationDelay: delayTime(childIndex)}" v-for="(childItem, childIndex) in item.list" :key="childIndex" @tap="navToMore(childItem.url)">
							<view
								:style="{background: colorType()}"
								class="margin-auto box-font-list flex align-center justify-center">
								<view class="iconfont" :class="['icon-' + childItem.cuIcon,'text-white']"></view>
							</view>
							<view class="text-center font-second padding-top-xs">{{ childItem.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import actBox from '@/components/custom/pages/actBox.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			carousel,
			uniNoticeBar,
			uniLoadMore,
			actBox,
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userInfo']),
		data() {
			return {
				newsList: [],
				loadingType: 'loading', //加载更多状态
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '人家也是有底线的~',
				},
				list: [
					'美散户遭围剿 游戏驿站股价8次熔断',
					'中青报刊文：是时候反省所谓先进教育理念，保护老师管教权利',
					'央视解读：楼市调控重点转向三四线城市 释放什么信号？'
				],
				swiperList: [{
						imgUrl: '../../static/img/banner01.jpg'
					},
					{
						imgUrl: '../../static/img/banner02.jpg'
					},
					{
						imgUrl: '../../static/img/banner03.jpg'
					}
				],
				noticeList: [{
						title: '我的安排',
						noticeNum: '19',
					},
					{
						title: '我的工作',
						noticeNum: '3',
					},
					{
						title: '待我审批',
						noticeNum: '15',
					},
				],
				cuIconList: [],
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
				cuIconListMore:[]
			};
		},
		onLoad() {
			// this.getListInfo()
			let token = uni.getStorageSync('token')
			this.getFunction();
			this.getFunctionMore()
			this.getListInfo();
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if(e.index == 0){
				//调起app扫码
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						uni.navigateTo({
							url: '/pages/model/list/list?uuid=' + res.result
						});
					}
				});
			}
		},
		onShow() {},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			getFunctionMore() {
				var that = this;
				that.$http
					.post('/system/getListAppMenuByRoleId', {
						type: 'more'
					}, {
						params: {},
					})
					.then((res) => {
						let list = res.data[0].list
						this.cuIconListMore = list;
						// let list = res.data.slice(0)
						// this.cuIconListMore = list;
					})
					.catch((err) => {});
			},
			selectedBanner(item, index) {
				console.log("item.index", item, index)
			},
			navTo(val, index) {
				console.log("val",val)
				let url = val.url;
				if (index === 7) {
					url = url + '?id=' + val.id;
				}
				uni.navigateTo({
					url: url
				});
			},
			navToMore(val) {
				let list = val.split('../')
				uni.navigateTo({
					url: '../office/' + list[1],
				});
			},
			getFunction() {
				var that = this;
				that.$http
					.post(
						'/system/getListAppMenuByRoleId', {}, {
							params: {},
						}
					)
					.then((res) => {
						let list = res.data[0].list[0];
						this.cuIconList = list[0].list;
					})
					.catch((err) => {});
			},
			getListInfo: function() {
				var that = this;
				that.$http
					.post('/office/officePublicAnnouncement/getPageSet', {}, {
							params: {
								pageNo: 1,
								pageSize: 20,
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
						that.loadingType = 'nomore';
					})
					.catch((err) => {});
			},
			goToNews() {
				uni.navigateTo({
					url: '../application/notice/news',
				});
			},
			goToNotices() {
				uni.navigateTo({
					url: '../application/notice/notice',
				});
			},
			goToNoticeDetails(uuid) {
				uni.navigateTo({
					url: '../application/notice/notice_details?uuId=' + uuid,
				});
			},
			goToNewsDetails(uuid) {
				uni.navigateTo({
					url: '../application/notice/news_details?uuId=' + uuid,
				});
			},
		},
	};
</script>

<style lang="scss">
	.container{
		height: calc(100vh -88rpx - 100rpx - var(–safe-area-inset-bottom) - var(–status-bar-height));
	}
	.font-icon {
		width: 26px;
		height: 26px;
		margin: 0 auto;
	}

	.title-img {
		margin: 0 0 0 20px !important;
		border-radius: 5px !important;
		width: 90px !important;
		height: 70px !important;
	}

	.title-content {
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-word;
		display: -webkit-box;
		-webkit-line-clamp: 2; //指定行数
		-webkit-box-orient: vertical;
	}

	.main-info {
		background: rgb(58, 170, 254);
		width: 100%;
		height: 244rpx;
		border-radius: 0 0 5rpx 5rpx;
		margin-top: 15px;
	}

	.main-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.cu-list.grid>.cu-item:after {
		// border: none !important;
	}
</style>
