<template>
	<view class="container" :class="[vtheme]">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="false" :background="background"
			:back-text-style="{color: '#fff'}" :back-icon-name="backIconName" :back-text="backText">
			<view class="slot-wrap">
				<view class="down-wrap">
					<dropdown-box
						ref="uDropdown"
						itemWidth="100vw"
						height="88"
						:mask="true"
						:borderBottom="false"
						:value="selectedIndex"
						:taskType="taskType"
						:tabList="navList"
						@change="tabSelect"
					></dropdown-box>
				</view>
			</view>
		</u-navbar>
		
		<view class="">
			<view v-if="emptyType==0" class="empty">
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
			<view v-if="emptyType==1" class="empty">
				<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
			</view>
			<view v-if="emptyType== 2">
				<task-box :list="taskList" @goDetail="goToDetail"></task-box>
				<view class="uni-tab-bar-loading">
					<uni-load-more :status="loadingType"></uni-load-more>
				</view>
			</view>
		</view>
		<view class="pos-fixed width-80 round cu-botton-submit text-xxl text-center" @click="addTask">+</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import dropdownBox from '@/components/custom/dropdownBox.vue'
	import taskBox from '@/components/custom/pages/taskBox.vue'

	var _self, x, y;
	export default {
		components: {
			uniLoadMore,
			dropdownBox,
			taskBox
		},
		data() {
			return {
				navList: [ {
					label: '我参与的',value: 1,type: '',url:'/office/oaTaskBase/getMyTaskBaseByLevelId'
				},{
					label: '所有任务',value: 2,type: 'allTask',url:'/office/oaTaskBase/getOaTaskBaseByLevelId'
				}, {
					label: '我的待办',value: 3,type: '',url:'/office/oaTaskBase/getMyTaskBaseByLevelId'
				}, {
					label: '未完成任务',value: 4,type: '',url:'/office/oaTaskBase/getPageSetNotCompleted'
				}],
				taskType: '我参与的',
				selectedIndex: 1,
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
					'background-color': '#3b9cff'
				},
				activeColor: '#2979ff',
				mask: true,
				borderBottom: false,
				backText: '',
				pageNo: 1,
				pageSize: 10,
				loadingType: 'loading',
				emptyType: '0',
				taskList: [],
				timer: null
			};
		},
		onLoad(options) {
			let id = options.id
			this.selectedIndex = id ? id : 1
			this.$nextTick(()=>{
				this.navList.forEach(val=>{
					if(val.value == this.selectedIndex){
						this.taskType = val.label
					}
				})
			})
			this.getData(this.selectedIndex)
		},
		onShow() {
			let data = uni.getStorageSync('onFresh')
			if(data){
				uni.removeStorage({
					key:'onFresh'
				})
				this.pageNo = 1
				this.pageSize = 10
				this.loadingType = 'loading'
				this.emptyType = '0'
				this.taskList = []
				this.getData(this.selectedIndex)
			}
		},
		onNavigationBarButtonTap(e) {
			console.log("点击了自定义按钮",e);  
			this.addTask()
		},
		methods: {
			changeData(){
				this.pageNo = 1,
				this.pageSize = 10,
				this.loadingType = 'loading',
				this.emptyType = '0',
				this.taskList = [],
				this.selectedIndex = 1
				this.getData(1)
			},
			tabSelect(item) {
				console.log("item", item)
				this.selectedIndex = item.value
				this.taskType = item.label
				this.pageNo = 1
				this.taskList = []
				this.loadingType = 'loading'
				this.getData(item.value)
			},
			addTask(){
				uni.navigateTo({
					url: 'taskAdd'
				});
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				console.log("111")
				if(this.loadingType == 'more'){
					this.getData(this.current)
				}
			},
			getData(index) {
				let url = ''
				if (this.selectedIndex == 1) {
					url = '/office/oaTaskBase/getMyTaskBaseByLevelId'
				} else if (this.selectedIndex == 2) {
					url = '/office/oaTaskBase/getOaTaskBaseByLevelId'
				} else if (this.selectedIndex == 3) {
					url = '/office/oaTaskBase/getMyTaskBaseByLevelId'
				} else if (this.selectedIndex == 4) {
					url = '/office/oaTaskBase/getPageSetNotCompleted'
				}
				this.getListInfo(url,index)
			},
			// 获取收到传阅信息
			getListInfo: function(url,index) {
				var that = this;
				var params = {}
				if(index == 1 || index == 3){
					params = {
						pages:that.pageNo,
						rows: 10,
						levelId: 1
					}
				} else if(index == 2){
					params = {
						pages:that.pageNo,
						rows: 10,
						levelId: 1,
						type: 'allTask'
					}
				} else {
					params = {
						pages:that.pageNo,
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
						if(list){
							that.pageNo++
							that.taskList = that.taskList.concat(list);
							that.emptyType = 2
							if (that.taskList.length == 0) {
								that.loadingType = 'nomore'
								that.emptyType = 1
							} else {
								if (that.pageNo > res.data.pages) {
									that.loadingType = 'nomore';
								} else {
									that.loadingType = 'more';
								}
							}
						} else {
							that.loadingType = 'nomore'
							that.emptyType = 1
						}
						console.log("index---",index,that.taskList,that.pageNo)
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
