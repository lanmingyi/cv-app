<template>
	<view class="container" :class="[vtheme]">
		<view class="pos-top-fixed">
				<u-tabs-swiper ref="uTabs" font-size="26" :list="navList" :current="current" @change="tabsChange"
			:is-scroll="false" swiperWidth="750" class="pos-strike"></u-tabs-swiper>
		</view>
		<view class="fixed-content margin-top bg-box">
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" :show-bar="false">
				<swiper-item class="swiper-item tab-content" v-for="(item, index) in circulatelist" :key="index" @touchmove.stop="">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<view v-if="item.emptyType==0" class="empty">
							<uni-load-more :status="item.loadingType"></uni-load-more>
						</view>
						<view v-if="item.emptyType==1" class="empty">
							<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
						</view>
						<view v-if="item.emptyType== 2">
							<circulate-box :list="item.children" @goDetail="goDetail"></circulate-box>
							
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
	import circulateBox from '@/components/custom/pages/circulateBox.vue'

	var _self, x, y;
	export default {
		components: {
			uniLoadMore,
			circulateBox
		},
		data() {
			return {
				navList: [{
						name: '待办'
					},
					{
						name: '已办'
					},
					{
						name: '我的'
					}
				],
				selectedIndex: 0,
				list: [],
				getList: [],
				downList: [],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				circulatelist: [{
					pageNo: 1,
					pageSize: 10,
					loadingType: 'loading',
					emptyType: '0',
					children: []
				}, {
					pageNo: 1,
					pageSize: 10,
					loadingType: 'loading',
					emptyType: '0',
					children: []
				}, {
					pageNo: 1,
					pageSize: 10,
					loadingType: 'loading',
					emptyType: '0',
					children: []
				}],
				timer: null
			};
		},
		onLoad(options) {
			let id = options.id
			_self = this;
			if(id){
				_self.$nextTick(()=>{
					_self.tabsChange(id)
				})
			} else {
				_self.current = 0
				_self.swiperCurrent = 0
				_self.selectedIndex = 0
				_self.getData(0)
			}
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index;
				this.$nextTick(()=>{
					setTimeout(()=>{
						if (this.circulatelist[index].children.length == 0) {
							this.getData(index)
						}
					},300)
				})
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
				if (this.circulatelist[current].children.length == 0) {
					this.getData(current)
				}
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				if(this.circulatelist[this.current].loadingType == 'more'){
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
					url = '/office/oaChuanyue/getLssuedPageSet'
				}
				this.getListInfo(url,index)
			},
			// 获取收到传阅信息
			getListInfo: function(url,index) {
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
							console.log("log-----",that.circulatelist[index].pageNo , res.data.pages)
							if (that.circulatelist[index].pageNo > res.data.pages) {
								that.circulatelist[index].loadingType = 'nomore';
							} else {
								that.circulatelist[index].loadingType = 'more';
							}
						}
						console.log("index---",index,that.circulatelist[index])
					})
					.catch(err => {});
			},
			// 跳转到详情
			goDetail(uuid) {
				uni.navigateTo({
					url: 'details?uuId=' + uuid + '&selectedIndex=' + this.selectedIndex
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		height: calc(100vh - 40px);
	}
	.task-box{
		border-radius: 20rpx;
	}
</style>
