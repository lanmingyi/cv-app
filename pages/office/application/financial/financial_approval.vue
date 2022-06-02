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
						:tabList="tabList"
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
				<scroll-view scroll-y="true" @scrolltolower="onreachBottom" style="height: calc(100vh - 44px);">
					<approval-box :list="approvalList" @goToDetail="goToDetail"></approval-box>
					<view class="uni-tab-bar-loading">
						<uni-load-more :status="loadingType"></uni-load-more>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import dropdownBox from '@/components/custom/dropdownBox.vue';
	import approvalBox from '@/components/custom/pages/approvalBox.vue';
	export default {
		components: {
			uniLoadMore,
			approvalBox,
			dropdownBox
		},
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				loadingType: 'loading',
				emptyType: '0',
				approvalList: [],
				mask: true,
				borderBottom: false,
				activeColor: '#2979ff',
				backText: '',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
					'background-color': '#3b9cff'
				},
				tabList: [{
					label: '全部',
					value: 1
				}],
				taskType: '全部',
				selectedIndex: 1,
				params: {
					pageNo: '1',
					pageSize: '10',
					type: 'loanApproval'
				}
			};
		},
		onLoad() {
			this.getFinancialData()
			this.getData()
		},
		onShow() {
			let data = uni.getStorageSync('onFresh')
			if(data){
				uni.removeStorage({
					key:'onFresh'
				})
				this.params =  {
					pageNo: '1',
					pageSize: '10',
					type: 'loanApproval',
					projectType: ''
				}
				this.loadingType = 'loading'
				this.approvalList = []
				this.getData()
			}
		},
		methods: {
			onreachBottom() {
				console.log("111")
				if(this.loadingType == 'more'){
					this.loadingType = 'loading'
					this.getData()
				}
			},
			changeData(){
				this.params =  {
					pageNo: '1',
					pageSize: '10',
					type: 'loanApproval',
					projectType: ''
				}
				this.loadingType = 'loading'
				this.approvalList = []
				this.getData()
			},
			tabSelect(item) {
				console.log("item", item)
				this.selectedIndex = item.value
				this.taskType = item.label
				this.seletedShow = false
				this.params.pageNo = 1
				this.params.projectType = item.value != 1 ? item.value : ''
				this.approvalList = []
				this.loadingType = 'loading'
				this.getData()
			},
			getFinancialData() {
				var that = this;
				that.$http
					.post('/system/dicSet/getDicItemByCode', {
						code: "gaFinanceProjectType"
					}, {
						params: {},
					})
					.then(res => {
						let list = res.data;
						list.forEach(val => {
							val.label = val.text
							that.tabList.push(val)
						})
					})
					.catch(err => {});
			},
			getData(index) {
				var that = this;
				console.log("that.params", that.params)
				that.$http
					.post('/office/officeFinance/getPageSet', that.params, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						if(list){
							list.forEach(val => {
								val.typeTips = val.projectTypeName.substring(0, 2)
							})
							that.params.pageNo++
							that.approvalList = that.approvalList.concat(list);
							that.emptyType = 2
							if (that.approvalList.length == 0) {
								that.loadingType = 'nomore'
								that.emptyType = 1
							} else {
								if (that.params.pageNo > res.data.totalPage) {
									that.loadingType = 'nomore';
								} else {
									that.loadingType = 'more';	
								}
							}
						} else {
							that.loadingType = 'nomore'
							that.emptyType = 1
						}
					})
					.catch(err => {});
			},
			// 跳转到详情
			goToDetail(uuid) {
				uni.navigateTo({
					url: 'approval_details?uuId=' + uuid + '&type=approval'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/.u-dropdown__menu__item__text {
		color: #fff !important;
	}
	.pos-add-box{
		transform: translateY(-100%);
		transition-duration: 0.3s;
	}
	.add-transform{
		transform: translateY(0px);
	}
	.absolute-box {
		width: 100rpx;
		height: 100rpx;
		line-height: 96rpx;
		text-align: center;
		border-radius: 0 0 0 80%;
		// opacity: 0.8;
	}

	.text-transformRight30 {
		transform: rotate(30deg);
		display: block;
	}
</style>
