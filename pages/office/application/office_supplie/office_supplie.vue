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
		
		<view v-if="emptyType===0" class="empty text-center margin-tb padding-top-xl">
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="emptyType===1" class="empty text-center margin-tb padding-top-xl">
			<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
		</view>
		<block v-if="emptyType===2">
			<scroll-view scroll-y="true" @scrolltolower="onreachBottom" style="height: calc(100vh - 44px);">
				<view class="bg-box" v-for="(childItem,index) in supplieList" :key="index" >
					<view class="padding-lr">
						<view class="task-title padding-top u-padding-bottom-6 flex align-center justify-between ">
							<view class="flex align-center">
								<view class="font-main text-cut">{{childItem.useName}}</view>
							</view>
							<!-- <view class="flex align-center">
								<u-icon class="font-three" name="more-dot-fill" @click="moreData(childItem)"></u-icon>
							</view> -->
						</view>
						<view class="task-info padding-bottom-sm border-bottom" @click="goToDetail(childItem)">
							<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="shebei"></u-icon>{{childItem.useTypeName}}</view>
							<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-second margin-right-sm" name="kucun"></u-icon>{{childItem.counts}}</view>
							<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="zhuye1"></u-icon>{{childItem.suppliesName}}</view>
						</view>
					</view>
				</view>
				<view class="uni-tab-bar-loading">
					<uni-load-more :status="loadingType"></uni-load-more>
				</view>
			</scroll-view>
		</block>
		<!-- //弹窗 -->
		<view>
			<u-action-sheet :cancel-btn="cancel" :mask-close-able="maskClick" 
			@click="clickMoreData" :list="moreList" v-model="showPopup" :safe-area-inset-bottom="true" cancelTextFontSize="26"></u-action-sheet>
		</view>
	</view>
</template>

<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	import dropdownBox from '@/components/custom/dropdownBox.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore,
			dropdownBox,
			xflSelect
		},
		data() {
			return {
				taskType: '所有库',
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
				tabList: [{
					label: '所有库',value: 1
				}],
				params: {
					pageNo: 1,
					pageSize: 10,
					suppliesUuid: ''
				},
				total: '',
				uuid: '',
				id: '',
				supplieList: [],
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
			this.getSupWarehouse()
			this.getOfficeSupplie()
		},
		onPullDownRefresh() {
			this.page = 1,
			this.supplieList = [],
			uni.showLoading({
				title: '加载中...'
			})
			this.loadingType =  'loading'
			this.getOaTaskBase();
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		},
		methods: {
			onreachBottom() {
				console.log("111")
				if(this.loadingType == 'more'){
					this.loadingType = 'loading'
					this.getOfficeSupplie()
				}
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
			goToDetail(item){
				console.log("item---",item)
				uni.navigateTo({
					url: 'office_supplie_details?uuId=' + item.uuid
				});
			},
			tabSelect(item) {
				console.log("item",item)
				this.selectedIndex = item.value
				this.taskType = item.label
				this.seletedShow = false
				this.params.pageNo = 1
				this.params.suppliesUuid = item.value != 1 ? item.value : ''
				this.supplieList = []
				this.loadingType =  'loading'
				this.getOfficeSupplie()
			},
			//获取库名
			getSupWarehouse: function() {
				this.$http
					.post('/office/oaWorkSupplies/getPageSet', {
						pageNo: 1,
						pageSize: 20,
					}, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						list.forEach(val=>{
							let data = {
								label: val.warehouseName,
								value: val.uuid
							}
							this.tabList.push(data)
						})
						// this.tabList = this.tabList.concat(list);
					})
					.catch(err => {
					})
			},
			//获取用品信息
			getOfficeSupplie: function() {
				this.$http
					.post('/office/oaWorkSuplist/getPageSet', {
						pageNo: this.params.pageNo,
						pageSize: this.params.pageSize,
						suppliesUuid: this.params.suppliesUuid
					}, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						if(list){
							this.params.pageNo++
							this.supplieList = this.supplieList.concat(list);
							this.emptyType = 2
							if (this.supplieList.length == 0) {
								this.loadingType = 'nomore'
								this.emptyType = 1
							} else {
								if (list.length < this.params.pageSize) {
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

			removeMsg: function(e) {
				uni.showModal({
					title: '删除提示',
					content: '确定删除此条数据吗？',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: this.$baseUrl + '/office/oaTaskBase/deleteBatch',
								dataType: 'json',
								method: 'POST',
								data: {
									uuid: e.uuId
								},
								header: {
									'Content-Type': 'application/x-www-form-urlencoded',
									token: this.$store.state.token
								},
								success: res => {
									this.res = '请求结果 : ' + JSON.stringify(res);
									var jsondata = res.data;
									console.log('服务器状态码:' + res.statusCode);

									if (jsondata.statusCode == 200) {
										console.log('删除成功' + res.statusCode);
										uni.showToast({
											icon: 'success',
											title: '删除成功'
										});
									} else {
										uni.showToast({
											icon: 'none',
											title: '删除失败！'
										});
									}
									that.getOaTaskBase();
								},
								fail: error => {
									console.log(error);
								}
							});
						}
					}
				})

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
	/* 任务 */
	.task-box {
		border-radius: 20rpx;
		overflow: hidden;
	
		.task-title {
			// border-radius: 0 0 20rpx 20rpx;
		}
	
		.task-line {
			width: 90%;
			margin: 0 auto;
			border-bottom: 4rpx dashed #e7e7e7;
		}
	
		.task-info {
			// border-radius: 20rpx 20rpx 0 0;
		}
	}
	
	.text-lg {
		font-size: 80rpx;
		color: #fff;
	}

	.null-box {
		width: 200rpx;
		height: 200rpx;
		background: url(https://zysd-shanghai.oss-cn-shanghai.aliyuncs.com/mini-program/bdtui/shop/serch-null.png) no-repeat;
		background-size: 100% 100%;
		margin: 400rpx auto;
	}
</style>
