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
			<!-- <view class="padding-right u-padding-top-6" slot="right" @click.stop="()=>{showAddStatus=!showAddStatus}">
				<u-icon name="plus" color="#fff" :size="40"></u-icon>
			</view> -->
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
					<approval-box :list="financialList" @goToDetail="goToDetail"></approval-box>
					<view class="uni-tab-bar-loading">
						<uni-load-more :status="loadingType"></uni-load-more>
					</view>
				</scroll-view>
			</view>
		</view>
		<uni-fab ref="fabs" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
			:direction="direction" @trigger="trigger"></uni-fab>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniFab from '@/components/uni-fab.vue'
	import dropdownBox from '@/components/custom/dropdownBox.vue';
	import approvalBox from '@/components/custom/pages/approvalBox.vue';

	var _self, x, y;
	export default {
		components: {
			uniLoadMore,
			uniFab,
			dropdownBox,
			approvalBox
		},
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				loadingType: 'loading',
				emptyType: 0,
				financialList: [],
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				params: {
					pageNo: '1',
					pageSize: '10',
					type: 'loanApproval'
				},
				showType: false,
				showAddStatus:false,
				activeColor: '#2979ff',
				tabList: [{
					label: '全部',
					value: 1
				}],
				taskType: '全部',
				selectedIndex: 1,
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				title: '财务管理',
				mask: true,
				borderBottom: false,
				backText: '',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
					'background-color': '#3b9cff'
				},
				content: [{
						iconPath: 'cuIcon-text',
						selectedIconPath: 'cuIcon-text',
						text: '借款',
						active: false
					},
					{
						iconPath: 'cuIcon-text',
						selectedIconPath: 'cuIcon-text',
						text: '付款',
						active: false
					},
					{
						iconPath: 'cuIcon-text',
						selectedIconPath: 'cuIcon-text',
						text: '报销',
						active: false
					},
				],
			};
		},
		onLoad() {
			this.getFinancialData()
			this.getData()
		},
		onNavigationBarButtonTap(e) {
			console.log("点击了自定义按钮", e);
			this.tabSelect()
		},
		methods: {
			onreachBottom() {
				console.log("111")
				if(this.loadingType == 'more'){
					this.loadingType = 'loading'
					this.getData()
				}
			},
			changeData() {
				this.selectedIndex = 1
				this.taskType = '全部'
				this.seletedShow = false
				this.params.pageNo = 1
				this.financialList = []
				this.loadingType = 'loading'
				this.getData()
			},
			tabSelect(item) {
				console.log("item", item)
				this.selectedIndex = item.value
				this.taskType = item.label
				this.seletedShow = false
				this.params.pageNo = 1
				this.params.projectType = item.value == 1 ? '' : item.value
				this.financialList = []
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
							that.params.pageNo++
							that.financialList = that.financialList.concat(list);
							that.emptyType = 2
							if (that.financialList.length == 0) {
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
			trigger(e,index) {
				console.log("e----", e)
				uni.navigateTo({
					url: 'approval_add?index=' + e.index
				});
				// this.showAddStatus = false
				this.$refs.fabs.close()
			},
			// 跳转到详情
			goToDetail(uuid) {
				uni.navigateTo({
					url: 'approval_details?uuId=' + uuid
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-dropdown__menu__item {
		// justify-content: flex-end !important;
		// padding-right: 30rpx;
	}

	/deep/.u-dropdown__menu__item__text {
		color: #fff !important;
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
