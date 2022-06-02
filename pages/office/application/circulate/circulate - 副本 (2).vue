<template>
	<view class="container" :class="[vtheme]">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="false" :background="background"
			:back-text-style="{color: '#fff'}" :back-icon-name="backIconName" :back-text="backText">
			<view class="slot-wrap">
				<view class="down-wrap">
					<u-dropdown :close-on-click-mask="mask" ref="uDropdown" :activeColor="activeColor" :borderBottom="borderBottom" itemWidth="100vw" height="88">
						<u-dropdown-item class="text-left" v-model="selectedIndex" :title="taskType" :options="navList" @change="tabSelect"></u-dropdown-item>
					</u-dropdown>
				</view>
			</view>
		</u-navbar>
		
		<view>
			<view v-if="emptyType==0" class="empty">
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
			<view v-if="emptyType==1" class="empty">
				<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
			</view>
			<view v-if="emptyType== 2">
				<circulate-box :list="circulateList" @goDetail="goDetail"></circulate-box>
				
				<view class="uni-tab-bar-loading">
					<uni-load-more :status="loadingType"></uni-load-more>
				</view>
			</view>
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
				navList: [{label: '待办传阅',value: 1},
					{label: '已办传阅',value:2},
					{label: '我发起的',value:3}
				],
				selectedIndex: 1,
				pageNo: 1,
				pageSize: 10,
				loadingType: 'loading',
				emptyType: '0',
				circulateList: [],
				taskType: '待办传阅',
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
			};
		},
		onLoad(options) {
			let id = options.id
			_self = this;
			_self.selectedIndex = id ? id : 1
			if(id){
				_self.$nextTick(()=>{
					_self.navList.forEach(val=>{
						if(val.value == id){
							_self.taskType = val.label
						}
					})
				})
			}
			_self.getData(_self.selectedIndex)
		},
		methods: {
			tabSelect(item) {
				console.log("item", item)
				this.selectedIndex = item.value
				this.taskType = item.label
				this.pageNo = 1
				this.circulateList = []
				this.loadingType = 'loading'
				this.getData(item.value)
			},
			onreachBottom() {
				if(this.loadingType == 'more'){
					this.getData(this.selectedIndex)
				}
			},
			getData(index) {
				let url = ''
				if (this.selectedIndex == 1) {
					url = '/office/oaChuanyue/getPageSet'
				} else if (this.selectedIndex == 2) {
					url = '/office/oaChuanyue/getReceivePageSet'
				} else if (this.selectedIndex == 3) {
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
						pages: that.pageNo,
						rows: that.pageSize
					}, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						that.pageNo++
						that.circulateList= that.circulateList.concat(list);
						that.emptyType = 2
						if (that.circulateList.length == 0) {
							that.loadingType = 'nomore'
							that.emptyType = 1
						} else {
							console.log("log-----",that.pageNo , res.data.pages)
							if (that.pageNo > res.data.pages) {
								that.loadingType = 'nomore';
							} else {
								that.loadingType = 'more';
							}
						}
						console.log("index---",index,that.circulateList)
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
