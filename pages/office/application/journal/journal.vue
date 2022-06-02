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
			<view class="padding-right u-padding-top-6" slot="right" @click.stop="goToAdd">
				<u-icon name="plus" color="#fff" :size="40"></u-icon>
			</view>
		</u-navbar>
		<!-- fixed-content -->
		<view class="">
			
			<view v-if="emptyType==0" class="empty">
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
			<view v-if="emptyType==1" class="empty">
				<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
			</view>
			<view v-if="emptyType== 2">
				<view class="bg-box padding-tb-sm border-bottom " v-for="(childItem,index) in journalList" :key="index">
					<view class="text-xl padding-left flex align-center margin-top-xs">
						<view class="margin-right-sm">
							<text class="tag-bg-default radius padding-lr-sm u-padding-top-2 u-padding-bottom-2 u-font-12">
								{{childItem.logStatus}}</text>
						</view>
						<view class="text-cut font-main">{{childItem.logTitle}}</view>
					</view>
					<view @click.stop="goLogDetail(childItem)" class="margin-tb-xs margin-lr">
						<view class="flex align-center justify-between">
							<view class="font-three">
								 <!-- icon-text-color -->
								<u-icon custom-prefix="custom-icon" class="margin-right-sm icon-color-main" name="user1"></u-icon><text class="text-left">{{childItem.creator}}</text>
							</view>
							<view class="font-three">
								<u-icon custom-prefix="custom-icon" class="margin-lr-sm icon-color-main" name="shijian1"></u-icon><text class="text-right">{{childItem.createTime}}</text>
							</view>
						</view>
						<view class="font-second text-cut">
							{{childItem.logContent}}
						</view>
					</view>
				</view>
				<view class="uni-tab-bar-loading">
					<uni-load-more :status="loadingType"></uni-load-more>
				</view>
			</view>
		</view>

		<!-- //弹窗 -->
		<view>
			<u-action-sheet :cancel-btn="cancel" :mask-close-able="maskClick" @click="clickMoreData" :list="moreList"
				v-model="showPopup" :safe-area-inset-bottom="true" cancelTextFontSize="26"></u-action-sheet>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import dropdownBox from '@/components/custom/dropdownBox.vue'

	var _self, x, y;
	export default {
		components: {
			uniLoadMore,
			dropdownBox,
		},
		data() {
			return {
				navList: [{label: '看日志',value: 1},
					{label: '我发出的',value: 2},
				],
				taskType: '看日志',
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
				journalList: [],
				pageNo: 1,
				pageSize: 10,
				loadingType: 'loading',
				emptyType: '0',
				showPopup: false,
				cancel: true,
				maskClick: true,
				moreList: [{
					text: '删除',
					value: '1',
					fontSize: '26'
				}],
				deleData: '',
				triggered: false,
			};
		},
		onLoad() {
			_self = this;
			_self.selectedIndex = 1
			_self.getData(1)
		},
		onShow() {
			console.log("this.swiperCurrent---", this.swiperCurrent)
		},
		methods: {
			goToAdd(){
				uni.navigateTo({
					url: 'journal_add'
				});
			},
			changelist() {
				this.selectedIndex = 1
				this.journalList = []
				this.pageNo = 1
				this.pageSize = 10
				this.loadingType = 'loading'
				this.emptyType = '0'
				this.getData(this.selectedIndex)
			},
			tabSelect(item) {
				console.log("item", item)
				this.selectedIndex = item.value
				this.taskType = item.label
				this.seletedShow = false
				this.pageNo = 1
				this.journalList = []
				this.loadingType = 'loading'
				this.getData(item.value)
			},
			moreData(item) {
				this.showPopup = true
				this.deleData = item
			},
			clickMoreData(item) {
				let that = this
				console.log("点击了---", item, that.deleData.uuid)
				that.$http
					.post('/office/oaWorkLog/deleteBatch', {
						uuid: that.deleData.uuid
					}, {
						params: {},
					})
					.then(res => {
						that.getList.children.forEach((val, index) => {
							if (val.uuid == that.deleData.uuid) {
								that.getList.children.splice(index, 1)
							}
						})
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					})
					.catch(err => {});
			},
			getData(index) {
				let url = ''
				if(index == 1){
					url = '/office/oaWorkLog/getPageSetByReceive'
				} else if(index == 2) {
					url = '/office/oaWorkLog/getPageSet'
				}
				var that = this;
				that.$http
					.post(url, {}, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						if(list){
							that.pageNo++
							that.journalList = that.journalList.concat(list);
							that.emptyType = 2
							if (that.journalList.length == 0) {
								that.loadingType = 'nomore'
								that.emptyType = 1
							} else {
								if (that.pageNo > res.data.totalPage) {
									that.loadingType = 'nomore';
								} else {
									that.loadingType = 'more';
								}
							}
						} else {
							that.loadingType = 'nomore'
							that.emptyType = 1
						}
						console.log("index---", index, that.journalList)
					})
					.catch(err => {});
			},
			// 跳转到详情
			goLogDetail(item) {
				console.log('uuId:' + item.uuid);
				uni.navigateTo({
					url: 'journal_details?uuId=' + item.uuid + '&selectedIndex=' + this.selectedIndex
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		height: calc(100vh - 44px - 40px);
	}

	.write-box {
		width: 280rpx;
		height: 300rpx;
		border-radius: 15rpx;
	}
</style>
