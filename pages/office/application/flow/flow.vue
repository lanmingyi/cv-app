<template>
	<view class="container" :class="[vtheme]">
		<!-- <u-sticky>
			<u-tabs-swiper ref="uTabs" font-size="26" :list="navList" :current="current" @change="tabsChange"
				:is-scroll="false" swiperWidth="750" class="pos-strike"></u-tabs-swiper>
		</u-sticky> -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==swiperCurrent?'text-theme cur':''" v-for="(item,index) in navList" :key="index" @tap="tabsChange(index)" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- @transition="transition" @animationfinish="animationfinish" -->
		<swiper class="swiper-box" :current="swiperCurrent" :show-bar="false" :disable-touch="true" >
			<swiper-item class="swiper-item tab-content" v-for="(item, index) in taskList" :key="index">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<view class="margin-top-sm">
						<view v-if="item.emptyType==0" class="empty">
							<uni-load-more :status="item.loadingType"></uni-load-more>
						</view>
						<view v-if="item.emptyType==1" class="empty">
							<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
						</view>
						<view v-if="item.emptyType== 2">
							<flow-box :list="item.children" @goDetail="goToDetail"></flow-box>
							<view class="uni-tab-bar-loading">
								<uni-load-more :status="item.loadingType"></uni-load-more>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import flowBox from '@/components/custom/pages/flowBox.vue'

	var _self, x, y;
	export default {
		components: {
			uniLoadMore,
			flowBox
		},
		data() {
			return {
				navList: [{
					name: '待办',
					value: 1,
					type: ''
				}, {
					name: '已办',
					value: 2,
					type: ''
				}, {
					name: '历史',
					value: 3,
					type: ''
				}, ],
				selectedIndex: 0,
				list: [],
				getList: [],
				downList: [],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				taskList: [{
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
		onLoad() {
			_self = this;
			_self.current = 0
			_self.swiperCurrent = 0
			_self.selectedIndex = 0
			_self.getData(0)
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index;
				this.$nextTick(() => {
					setTimeout(() => {
						if (this.taskList[index].children.length == 0) {
							this.getData(index)
						}
					}, 300)
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
				if (this.taskList[current].children.length == 0) {
					this.getData(current)
				}
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				if (this.taskList[this.current].loadingType == 'more') {
					this.getData(this.current)
				}
			},
			getData(index) {
				let url = ''
				if (this.swiperCurrent == 0) {
					url = '/workflow/apiFlowableTask/getToDoTasks'
				} else if (this.swiperCurrent == 1) {
					url = '/workflow/apiFlowableTask/getMyNoEndProcessPageSetData'
				} else if (this.swiperCurrent == 2) {
					url = '/workflow/apiFlowableTask/getMyHistoryPageSet'
				}
				this.getListInfo(url, index)
			},
			// 获取收到传阅信息
			getListInfo: function(url, index) {
				var that = this;
				var params = {}
				if (index == 0 || index == 2) {
					params = {
						pageNo: that.taskList[index].pageNo,
						pageSize: 10,
						levelId: 1
					}
				} else if (index == 1) {
					params = {
						pageNo: that.taskList[index].pageNo,
						pageSize: 10,
						levelId: 1,
						type: 'allTask'
					}
				} else {
					params = {
						pageNo: that.taskList[index].pageNo,
						pageSize: 10
					}
				}
				console.log("url---", url, params)
				that.$http
					.post(url, params, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						if(list){
							that.taskList[index].pageNo++
							that.taskList[index].children = that.taskList[index].children.concat(list);
							that.taskList[index].emptyType = 2
							if (that.taskList[index].children.length == 0) {
								that.taskList[index].loadingType = 'nomore'
								that.taskList[index].emptyType = 1
							} else {
								if (list.length < that.taskList[index].pageSize) {
									that.taskList[index].loadingType = 'nomore';
								} else {
									that.taskList[index].loadingType = 'more';
								}
							}
						} else {
							that.taskList[index].loadingType = 'nomore'
							that.taskList[index].emptyType = 1
						}
						console.log("index---", index, that.taskList[index])
					})
					.catch(err => {});
			},
			// 跳转到详情
			goToDetail(e) {
				//创建绑定数据
				console.log(this.swiperCurrent, e , e.modelKey)
				var uuId = e.businessKey;
				if (this.swiperCurrent == 0) {
					uni.navigateTo({
						url: 'flowDetail?uuId=' + uuId + '&taskId=' + e.taskId + '&type=backlog' +
							'&processDefinitionId=' + e.processDefinitionId + '&processInstanceId=' + 
							e.processInstanceId + '&index=' + this.swiperCurrent + '&modelKey=' + e.modelKey + '&nodeId=' + e.nodeId 
					});
				} else if (this.swiperCurrent == 1) {
					uni.navigateTo({
						url: 'flowDetail?uuId=' + uuId + '&taskId=' + e.taskId + '&type=backlog' +
							'&processDefinitionId=' + e.processDefinitionId + '&processInstanceId=' + e
							.processInstanceId + '&index=' + this.swiperCurrent + '&modelKey=' + e.modelKey +
							'&nodeId=' + e.nodeId
					});
				} else {
					uni.navigateTo({
						url: 'flowDetail?uuId=' + uuId + '&processDefinitionId=' + e.processDefinitionId +
							'&index=' + this.swiperCurrent + '&processInstanceId=' + e.processInstanceId +
							'&modelKey=' + e.procDefKey
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		height: calc(100vh - 40px);
		padding-top: var(–status-bar-height);
	}
</style>
