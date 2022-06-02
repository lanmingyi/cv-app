<template>
	<view class="container" :class="[vtheme]">
		<view class="">
			<!-- <u-tabs-swiper ref="uTabs" font-size="26" :list="navList" :current="current" @change="tabsChange"
				:is-scroll="false" swiperWidth="750" class="pos-strike"></u-tabs-swiper> -->
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==swiperCurrent?'text-theme cur':''" v-for="(item,index) in navList" :key="index" @tap="tabsChange(index)" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		 <!-- @transition="transition" @animationfinish="animationfinish" -->
		<view class="bg-box margin-top-sm">
			<swiper class="swiper-box" :current="swiperCurrent"
				:show-bar="false">
				<swiper-item class="swiper-item tab-content" v-for="(item, index) in emailslist"
					:key="index" @touchmove.stop="">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<view v-if="item.emptyType==0" class="empty">
							<uni-load-more :status="item.loadingType"></uni-load-more>
						</view>
						<view v-if="item.emptyType==1" class="empty">
							<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
						</view>
						<view v-if="item.emptyType== 2">
							<view class="cu-card dynamic" v-for="(childItem,index) in item.children" :key="index">
								<view class="bg-box padding light flex align-start border-top"
									@tap="goDetail" :data-uuid="childItem.uuid">
									<view class="tag-bg-main art-list-left radius margin-right-sm flex align-center justify-center ">
										<u-icon custom-prefix="custom-icon" class="u-font-32" name="news-fill"></u-icon>
									</view>
									<view style="width: 80%;" >
										<view class="font-main padding-left-xs flex align-center">
											<!-- <text class="cuIcon-title cu-botton-text-tips"></text> -->
											<view class="text-cut font-main">{{childItem.title}}</view>
										</view>
										<view class="font-three padding-left-xs">
											<text class="text-right">{{childItem.createTime}}</text>
										</view>
									</view>
								</view>
							</view>
							<view class="uni-tab-bar-loading">
								<uni-load-more :status="item.loadingType"></uni-load-more>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

	var _self, x, y;
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				navList: [{
						name: '发件箱'
					},
					{
						name: '收件箱'
					},
					{
						name: '草稿箱'
					}
				],
				selectedIndex: 0,
				list: [],
				getList: [],
				downList: [],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				emailslist: [{
					pageNo: 1,
					pageSize: 10,
					loadingType: 'loading',
					emptyType: '0',
					children: [{
						uuid: "111111",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理室发文处理",
						rankText: "紧急",
						creator: "张莹莹",
						createTime: "2021-01-28 21:04:46"
					}]
				}, {
					pageNo: 1,
					pageSize: 10,
					loadingType: 'loading',
					emptyType: '0',
					children: [{
						uuid: "222222",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理",
						rankText: "一般",
						creator: "超级管理员",
						createTime: "2021-01-28 21:04:46"
					}, {
						uuid: "3333333",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理",
						rankText: "重要",
						creator: "张莹莹",
						createTime: "2021-01-28 21:04:46"
					}]
				}, {
					pageNo: 1,
					pageSize: 10,
					loadingType: 'loading',
					emptyType: '0',
					children: [{
						uuid: "111111",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理室发文处理",
						rankText: "紧急",
						creator: "张莹莹",
						createTime: "2021-01-28 21:04:46"
					}, {
						uuid: "222222",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理",
						rankText: "一般",
						creator: "超级管理员",
						createTime: "2021-01-28 21:04:46"
					}, {
						uuid: "3333333",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理",
						rankText: "重要",
						creator: "张莹莹",
						createTime: "2021-01-28 21:04:46"
					}]
				}],
				timer: null
			};
		},
		onLoad() {
			_self = this;
			_self.current = 0
			_self.swiperCurrent = 0
			_self.selectedIndex = 0
			_self.emailslist.forEach(val=>{
				val.loadingType = 'nomore'
				val.emptyType = 2
			})
			// _self.getData(0)
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index;
				// this.$nextTick(() => {
				// 	setTimeout(() => {
				// 		if (this.circulatelist[index].children.length == 0) {
				// 			this.getData(index)
				// 		}
				// 	}, 300)
				// })
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				// if (this.circulatelist[current].children.length == 0) {
				// 	this.getData(current)
				// }
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				if (this.circulatelist[this.current].loadingType == 'more') {
					// this.getData(this.current)
				}
			},
			getData(index) {
				let url = ''
				if (this.swiperCurrent == 0) {
					url = '/office/oaChuanyue/getPageSet'
				} else if (this.swiperCurrent == 1) {
					url = '/office/oaChuanyue/getReceivePageSet'
				} else if (this.swiperCurrent == 2) {
					url = '/office/oaChuanyue/getReceivePageSet'
				}
				this.getListInfo(url, index)
			},
			// 获取收到传阅信息
			getListInfo: function(url, index) {
				console.log("url---", url, index)
				var that = this;
				that.$http
					.post(url, {
						pages: that.circulatelist[index].pageNo,
						rows: that.circulatelist[index].pageSize
					}, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						that.circulatelist[index].pageNo++
						that.circulatelist[index].children = that.circulatelist[index].children.concat(list);
						that.circulatelist[index].emptyType = 2
						if (that.circulatelist[index].children.length == 0) {
							that.circulatelist[index] = 'nomore'
							that.circulatelist[index].emptyType = 1
						} else {
							if (list.length < that.circulatelist[index].pageSize) {
								that.circulatelist[index].loadingType = 'nomore';
							} else {
								that.circulatelist[index].loadingType = 'more';
							}
						}
						console.log("index---", index, that.circulatelist[index])
					})
					.catch(err => {});
			},
			// 跳转到详情
			goDetail: function(e) {
				uni.navigateTo({
					url: 'emails_details'
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		height: calc(100vh - 40px);
	}
	
	.emails-icon{
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 28px;
	}
</style>
