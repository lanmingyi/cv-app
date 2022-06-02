<template>
	<view class="container" :class="[vtheme]">
		<view v-if="taskList.length > 0" class="bg-box" >
			<view v-for="(item,index) in taskList" :key="index" class="padding-lr padding-tb-sm border-bottom pos-relative" @click="goToDetails(item)">
				<view class="flex align-center justify-between">
					<view>
						<view class="font-main">{{item.title}}</view>
					</view>
				</view>
				<view class="pos-absolute-right absolute-box text-opacity5 text-transform30">
					<text v-if="item.status == 0" class="bg-blue light text-sm block round">未开始</text>
					<text v-if="item.status == 1" class="bg-green light text-sm block round">进行中</text>
					<text v-if="item.status == 2" class="bg-orange light text-sm block round">已完成</text>
				</view>
				<view class=" margin-bottom-xs text-nowrap">
					<view class="font-three margin-top-xs"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="user1"></u-icon>{{item.assigner}}</view>
					<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-second margin-right-sm" name="shijian1"></u-icon>{{item.planStartTime}} - {{item.planEndTime}}</view>
					<view class="flex align-center justify-between">
						<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="shouye-5"></u-icon>{{item.taskTypeText}}</view>
					</view>
					<!-- <view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-three margin-right-sm" name="renwu3"></u-icon>{{item.content}}</view> -->
					<view class="font-second text-cut">{{item.content}}</view>
				</view>
			</view>
		</view>
		<view class="uni-tab-bar-loading" v-if="emptyType">
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		
		<view v-if="taskList.length == 0 && !emptyType" class="empty text-center margin-tb padding-top-xl">
			<u-empty text="无子任务清单" mode="data" icon-size="200"></u-empty>
		</view>
		
		<!-- #ifdef MP || H5 -->
		<view class="pos-fixed width-80 round cu-botton-submit text-xxl text-center" @click="addTask">+</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import commentList from '@/components/custom/pages/commentList.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components:{
			commentList,
			uniLoadMore
		},
		data() {
			return {
				pid: '',
				levelId: '',
				taskList:[],
				remark: "",
				loadingType: 'loading', //加载更多状态
				emptyType:true
			};
		},
		methods: {

		},
		onLoad(options) {
			this.pid = options.id;
			this.levelId = options.levelId
			console.log(options);
			this.getList()
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
				this.getList()
			}
		},
		onNavigationBarButtonTap(e) {
			console.log("点击了自定义按钮",e);  
			this.addTask()
		},
		methods: {
			changeData(){
				this.taskList = []
				this.getList()
			},
			addTask(){
				uni.navigateTo({
					url: 'taskAddSon?pid=' + this.pid + '&levelId=' + this.levelId
				});
			},
			getList() {
				this.$http
					.post('/office/oaTaskBase/getListByPid', {
						pid: this.pid
					}, {
						params: {},
					})
					.then(res => {
						let list = res.data
						if(list){
							list.forEach(val=>{
								this.taskList.push(val)
							})
							if(this.taskList.length == 0){
								this.loadingType = 'nomore'
								this.emptyType = false
							} else {
								this.emptyType = true
								if(list.length < 10){
									this.loadingType = 'nomore'
								} else {
									this.loadingType = 'more'
								}
							}
						} else {
							this.loadingType = 'nomore'
							this.emptyType = false
						}
					})
					.catch(err => {
					});
			},
			goToDetails(item){
				uni.navigateTo({
					url: 'taskDetails?uuId=' + item.uuid
				});
			},
		}
	}
</script>

<style scoped lang="scss">
</style>
