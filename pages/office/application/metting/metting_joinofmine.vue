<template>
	<view class="container" :class="[vtheme]">
		<view class="">
			<view v-if="emptyType===0" class="empty text-center margin-tb padding-top-xl">
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
			<view v-if="emptyType===1" class="empty text-center margin-tb padding-top-xl">
				<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
			</view>
			<view v-if="emptyType===2">
				<scroll-view scroll-y="true" @scrolltolower="onreachBottom" class="swiper-box">
					<view class="bg-box" v-for="(item,index) in reserveList" :key="index" @click="goToDetails(item)">
						<view class="padding-lr">
							<view class="flex align-center justify-between padding-top">
								<view class="font-main text-cut">{{item.nameOfProposedMeeting}}</view>
								<view class="margin-right-sm">
									<text class="tag-bg-main radius padding-lr-sm u-padding-top-2 u-padding-bottom-2 u-font-12">{{item.typees}}</text>
								</view>
							</view>
							<view class="padding-bottom-sm border-bottom">
								<view class="font-three u-padding-top-4"><u-icon custom-prefix="custom-icon" class="icon-color-second margin-right-sm" name="shijian1"></u-icon>{{item.startTime}}</view>
								
								<view class="flex align-center justify-between">
									<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="zhuye1"></u-icon>{{item.conferenceRoomName}}</view>
									<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="user1"></u-icon>{{item.hostess}}</view>
								</view>
								<view class="font-three flex align-start"><text class="u-padding-top-4">会议内容：</text><view class="font-second text-cut">{{item.primaryCoverage}}</view></view>
								
							</view>
						</view>
					</view>
					<view class="uni-tab-bar-loading">
						<uni-load-more :status="loadingType"></uni-load-more>
					</view>
				</scroll-view>
			</view>
			
		</view>
		
		<view class="pos-fixed width-80 round cu-botton-submit text-xxl text-center" @click="addMeeting">+</view>
		
		<!-- //弹窗 -->
		<view>
			<u-action-sheet :cancel-btn="cancel" :mask-close-able="maskClick" 
			@click="clickMoreData" :list="moreList" v-model="showPopup" :safe-area-inset-bottom="true" cancelTextFontSize="26"></u-action-sheet>
		</view>
	</view>
</template>

<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore,
			xflSelect
		},
		data() {
			return {
				params: {
					pageNo: 1,
					pageSize: 10,
					suppliesUuid: ''
				},
				total: '',
				uuid: '',
				id: '',
				reserveList: [],
				myrows: [],
				loadingType: 'loading', //加载更多状态
				isEnd: false,
				seletedShow:false,
				emptyType: 0,
				showPopup:false,
				cancel: true,
				maskClick: true,
				moreList:[{
					text: '申请使用',value: '1',fontSize: '26'
				}],
				checkData: {}
			};
		},
		onLoad() {
			this.getMettingReserve()
		},
		onShow() {
			let data = uni.getStorageSync('onFresh')
			if(data){
				uni.removeStorage({
					key:'onFresh'
				})
				this.page = 1
				this.params.pageNo = 1
				this.reserveList = []
				this.getMettingReserve()
			}
		},
		methods: {
			onreachBottom() {
				if(this.loadingType == 'more'){
					this.loadingType = 'loading'
					this.getMettingReserve()
				}
			},
			addMeeting(){
				uni.navigateTo({
					url: 'metting_add'
				});
			},
			moreData(item){
				this.showPopup = true
				console.log("item----数据类型",item)
				this.checkData = item
			},
			clickMoreData(item) {
				console.log("点击了---",item,this.checkData)
				uni.navigateTo({
					url: 'office_supplie_apply?uuId=' + this.checkData.uuid
				});
			},
			goToDetails(item){
				console.log("item---",item)
				uni.navigateTo({
					url: 'metting_details?uuId=' + item.uuid
				});
			},
			tabSelect(item) {
				console.log("item",item)
				this.selectedIndex = item.value
				this.taskType = item.label
				this.seletedShow = false
				this.params.pageNo = 1
				this.reserveList = []
				this.loadingType =  'loading'
				this.getMettingReserve()
			},
			//获取预定信息
			getMettingReserve: function() {
				this.$http
					.post('/office/oaMeetingApplication/getPageSet', {
						pageNo: this.params.pageNo,
						pageSize: this.params.pageSize,
						type: 'myMeeting'
					}, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						if(list){
							this.params.pageNo++
							this.reserveList = this.reserveList.concat(list);
							this.emptyType = 2
							console.log("reserveList----",this.reserveList)
							if (this.reserveList.length == 0) {
								this.loadingType = 'nomore'
								this.emptyType = 1
							} else {
								if (this.params.pageNo > res.data.totalPage) {
									this.loadingType = 'nomore';
								} else {
									this.loadingType = 'more';
								}
							}
						} else {
							this.loadingType = 'nomore'
							this.emptyType = 1
						}
					})
					.catch(err => {
					});
			},
			//点击进入详情页
			edit: function(e) {
				//创建绑定数据
				var uuId = e.uuid;
				console.log('uuId:' + uuId);
				uni.navigateTo({
					url: 'taskEdit?uuId=' + uuId
				});
			},
			goDetail: function(e) {
				//创建绑定数据
				var uuId = e.uuid;
				console.log('uuId:' + uuId);
				uni.navigateTo({
					url: 'taskDetails?uuId=' + uuId
				});
			},
			navToAdd() {
				uni.navigateTo({
					url: 'taskAdd'
				});
			},
		},
	};
</script>

<style scoped lang="scss">
.swiper-box{
	/* #ifdef APP-PLUS */
	height: calc(100vh - 44px);
	/* #endif */
	height: 100vh;
}
</style>
