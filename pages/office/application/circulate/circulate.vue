<template>
	<view class="container" :class="[vtheme]">
		<view class="">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==swiperCurrent?'text-theme cur':''" v-for="(item,index) in navList" :key="index" @tap="tabsChange(index)" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="margin-top-sm bg-box">
			<!-- @transition="transition" @animationfinish="animationfinish" -->
			<swiper class="swiper-box" :current="swiperCurrent"  :show-bar="false" :disable-touch="true" >
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
						name: '我的'
					},{
						name: '待办'
					},
					{
						name: '已办'
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
				timer: null,
				id: ''
			};
		},
		onLoad(options) {
			this.id = options.id
			this.onLoadData()
		},
		methods: {
			onLoadData(){
				let id = this.id
				if(id){
					this.$nextTick(()=>{
						this.tabsChange(id)
					})
				} else {
					this.current = 0
					this.swiperCurrent = 0
					this.selectedIndex = 0
					this.getData(0)
				}
			},
			tabsChange(index) {
				console.log("index",index)
				this.swiperCurrent = index;
				this.$nextTick(()=>{
					setTimeout(()=>{
						if (this.circulatelist[index].children.length == 0) {
							this.getData(index)
						}
					},300)
				})
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
					url = '/office/oaChuanyue/getLssuedPageSet'
				} else if (this.swiperCurrent == 1) {
					url = '/office/oaChuanyue/getPageSet'
				} else if (this.swiperCurrent == 2) {
					url = '/office/oaChuanyue/getReceivePageSet'
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
						if(list){
							that.circulatelist[index].pageNo++
							that.circulatelist[index].children = that.circulatelist[index].children.concat(list);
							that.circulatelist[index].emptyType = 2
							if (that.circulatelist[index].children.length == 0) {
								that.circulatelist[index].loadingType = 'nomore'
								that.circulatelist[index].emptyType = 1
							} else {
								console.log("log-----",that.circulatelist[index].pageNo , res.data.pages)
								if (that.circulatelist[index].pageNo > res.data.pages) {
									that.circulatelist[index].loadingType = 'nomore';
								} else {
									that.circulatelist[index].loadingType = 'more';
								}
							}
						} else {
							that.circulatelist[index].loadingType = 'nomore'
							that.circulatelist[index].emptyType = 1
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
