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
		<view class="bg-box margin-top-sm">
			 <!-- @transition="transition" @animationfinish="animationfinish" -->
			<swiper class="swiper-box" :current="swiperCurrent" :show-bar="false">
				<swiper-item class="swiper-item tab-content" v-for="(item, index) in documentlist"
					:key="index" @touchmove.stop="">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<view v-if="item.emptyType==0" class="empty">
							<uni-load-more :status="item.loadingType"></uni-load-more>
						</view>
						<view v-if="item.emptyType==1" class="empty">
							<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
						</view>
						<view v-if="item.emptyType== 2">
							<!-- <act-box :list="item.children" @goDetail="()=>{}"></act-box> -->
							<view class="bg-box" v-for="(childItem,index) in item.children" :key="index" @click="goDetail(childItem)">
								<view class="padding-lr border-bottom padding-top-sm">
									<view class="task-info flex align-center">
										<view class=" text-black text-cut">{{childItem.title}}</view>
									</view>
									<view class="task-title padding-top-xs padding-bottom-sm flex align-center justify-between">
										<view class="text-black text-cut u-font-13">{{childItem.time}}</view>
										<view class="padding-right-sm">
											<text :class="childItem.tipsId == 1 ? 'bg-red' : (childItem.tipsId == 2 ?'bg-blue' : 'bg-olive')"  
												class="light radius u-font-12 padding-lr-sm u-padding-top-2 u-padding-bottom-2">
												{{childItem.titleTips}}
											</text>
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
		<uni-fab ref="fabs" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
			:direction="direction" @trigger="trigger"></uni-fab>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		mapMutations
	} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniFab from '@/components/uni-fab.vue'
	import actBox from '@/components/custom/pages/actBox.vue'

	var _self, x, y;
	export default {
		components: {
			uniLoadMore,
			uniFab,
			actBox
		},
		data() {
			return {
				navList: [{
						name: '未处理'
					},
					{
						name: '处理中'
					},
					{
						name: '已办结'
					},
					{
						name: '草稿'
					}
				],
				selectedIndex: 0,
				list: [],
				getList: [],
				downList: [],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				documentlist: [{
					pageNo: 1,
					pageSize: 10,
					loadingType: 'nomore',
					emptyType: 2,
					children: [{
						uuid: "111111",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理室发文处理",
						tipsId: 1,
						titleTips: "紧急",
						name: "张莹莹",
						time: "2021-01-28 21:04:46"
					}]
				}, {
					pageNo: 1,
					pageSize: 10,
					loadingType: 'nomore',
					emptyType: 2,
					children: [{
						uuid: "222222",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理",
						tipsId: 3,
						titleTips: "一般",
						name: "超级管理员",
						time: "2021-01-28 21:04:46"
					}, {
						uuid: "3333333",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理",
						tipsId: 2,
						titleTips: "重要",
						name: "张莹莹",
						time: "2021-01-28 21:04:46"
					}]
				}, {
					pageNo: 1,
					pageSize: 10,
					loadingType: 'nomore',
					emptyType: 2,
					children: [{
						uuid: "111111",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理室发文处理",
						titleTips: "紧急",
						tipsId: 1,
						name: "张莹莹",
						time: "2021-01-28 21:04:46"
					}, {
						uuid: "222222",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理",
						titleTips: "一般",
						tipsId: 3,
						name: "超级管理员",
						time: "2021-01-28 21:04:46"
					}, {
						uuid: "3333333",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理",
						titleTips: "重要",
						tipsId: 2,
						name: "张莹莹",
						time: "2021-01-28 21:04:46"
					}]
				}, {
					pageNo: 1,
					pageSize: 10,
					loadingType: 'nomore',
					emptyType: 2,
					children: [{
						uuid: "222222",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理",
						titleTips: "一般",
						tipsId: 3,
						name: "超级管理员",
						time: "2021-01-28 21:04:46"
					}, {
						uuid: "3333333",
						title: "河南省治理教育乱收费工作联席会议办公室发文处理",
						titleTips: "重要",
						tipsId: 2,
						name: "张莹莹",
						time: "2021-01-28 21:04:46"
					}]
				}],
				timer: null,
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				content: [{
						iconPath: 'cuIcon-text',
						selectedIconPath: 'cuIcon-text',
						text: '发文',
						active: false
					},
					{
						iconPath: 'cuIcon-text',
						selectedIconPath: 'cuIcon-text',
						text: '收文',
						active: false
					},
				],
			};
		},
		onLoad() {
			_self = this;
			_self.current = 0
			_self.swiperCurrent = 0
			_self.selectedIndex = 0
			// _self.getData(0)
		},
		methods: {
			...mapMutations(['SET_WPAURL']),
			tabsChange(index) {
				this.swiperCurrent = index;
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
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				if (this.circulatelist[this.current].loadingType == 'more') {
					this.getData(this.current)
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
			trigger(e,record) {
				console.log("e----", e, location)
				uni.navigateTo({
					url: 'document_add'
				})
			},

			// 跳转到详情
			goDetail: function(e) {
				uni.navigateTo({
					url: 'document_details'
				});
				this.$refs.fabs.close()
			},

		}
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		height: calc(100vh - 40px);
	}

	.task-box {
		border-radius: 20rpx;
	}
</style>
