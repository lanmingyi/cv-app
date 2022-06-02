<template>
	<view class="container" :class="[vtheme]">
		<view class="pos-top-fixed">
				<u-tabs-swiper ref="uTabs" font-size="26" :list="navList" :current="current" @change="tabsChange"
			:is-scroll="false" swiperWidth="750" class="pos-strike"></u-tabs-swiper>
		</view>
		<view class="fixed-content">
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" :show-bar="false">
				<swiper-item class="swiper-item tab-content" v-for="(item, index) in taskList" :key="index" @touchmove.stop="">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<view class="margin-top-sm">
							<view v-if="item.emptyType==0" class="empty">
								<uni-load-more :status="item.loadingType"></uni-load-more>
							</view>
							<view v-if="item.emptyType==1" class="empty">
								<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
							</view>
							<view v-if="item.emptyType== 2">
								<task-box :list="item.children" @goDetail="goToDetail"></task-box>
								<view class="uni-tab-bar-loading">
									<uni-load-more :status="item.loadingType"></uni-load-more>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- <view class="pos-fixed width-80 round bg-blue light text-xxl text-center" @click="addTask">+</view> -->
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import taskBox from '@/components/custom/taskBox.vue'

	var _self, x, y;
	export default {
		components: {
			uniLoadMore,
			taskBox
		},
		data() {
			return {
				navList: [ {
					name: '我的',value: 1,type: '',url:'/office/oaTaskBase/getMyTaskBaseByLevelId'
				},{
					name: '所有',value: 2,type: 'allTask',url:'/office/oaTaskBase/getOaTaskBaseByLevelId'
				}, {
					name: '待办',value: 3,type: '',url:'/office/oaTaskBase/getMyTaskBaseByLevelId'
				}, {
					name: '未完成',value: 4,type: '',url:'/office/oaTaskBase/getPageSetNotCompleted'
				}],
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
				},{
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
		onNavigationBarButtonTap(e) {
			console.log("点击了自定义按钮",e);  
			this.addTask()
		},
		methods: {
			changeData(){
				this.taskList = [{
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
				},{
					pageNo: 1,
					pageSize: 10,
					loadingType: 'loading',
					emptyType: '0',
					children: []
				}],
				this.current = 0
				this.swiperCurrent = 0
				this.selectedIndex = 0
				this.getData(0)
			},
			tabsChange(index) {
				this.$nextTick(()=>{
					this.swiperCurrent = index;
					setTimeout(()=>{
						if (this.taskList[index].children.length == 0) {
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
				if (this.taskList[current].children.length == 0) {
					this.getData(current)
				}
			},
			addTask(){
				uni.navigateTo({
					url: 'taskAdd'
				});
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				if(this.taskList[this.current].loadingType == 'more'){
					this.getData(this.current)
				}
			},
			getData(index) {
				let url = ''
				if (this.swiperCurrent == 0) {
					url = '/office/oaTaskBase/getMyTaskBaseByLevelId'
				} else if (this.swiperCurrent == 1) {
					url = '/office/oaTaskBase/getOaTaskBaseByLevelId'
				} else if (this.swiperCurrent == 2) {
					url = '/office/oaTaskBase/getMyTaskBaseByLevelId'
				} else if (this.swiperCurrent == 3) {
					url = '/office/oaTaskBase/getPageSetNotCompleted'
				}
				this.getListInfo(url,index)
			},
			// 获取收到传阅信息
			getListInfo: function(url,index) {
				var that = this;
				var params = {}
				if(index == 0 || index == 2){
					params = {
						pages:that.taskList[index].pageNo,
						rows: 10,
						levelId: 1
					}
				} else if(index == 1){
					params = {
						pages:that.taskList[index].pageNo,
						rows: 10,
						levelId: 1,
						type: 'allTask'
					}
				} else {
					params = {
						pages:that.taskList[index].pageNo,
						rows: 10
					}
				}
				console.log("url---", url, params)
				that.$http
					.post(url, params, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						that.taskList[index].pageNo++
						that.taskList[index].children = that.taskList[index].children.concat(list);
						that.taskList[index].emptyType = 2
						if (that.taskList[index].children.length == 0) {
							that.taskList[index] = 'nomore'
							that.taskList[index].emptyType = 1
						} else {
							if (that.taskList[index].pageNo > res.data.pages) {
								that.taskList[index].loadingType = 'nomore';
							} else {
								that.taskList[index].loadingType = 'more';
							}
						}
						console.log("index---",index,that.taskList[index],that.taskList[index].pageNo)
					})
					.catch(err => {});
			},
			// 跳转到详情
			goToDetail(id,levelId){
				console.log("levelId------",id,levelId)
				uni.navigateTo({
					url: 'task_list?id=' + id + '&levelId=' + levelId
				});
			}
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
