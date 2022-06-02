<template>
	<view class="container" :class="[vtheme]">
		<view v-if="emptyType===0" class="empty text-center margin-tb-xl">
			<image src="@/static/img/loading.gif"></image>
			<text class="text-grey text-opacity5 ">加载中...</text>
		</view>
		<view v-if="emptyType===1" class="empty text-center">
			<image src="@/static/img/empty.png"></image>
			<view class="text-grey text-opacity5 margin-tb-xl">页面丢失</view>
		</view>
		<view class="bg-box" v-if="emptyType===2">
			<view class="swiper-box">
				<view class="bg-box margin-lr flex align-start justify-between">
					<view class="action padding-tb-sm">
						<view class="">
							<view class="text-balck text-bold margin-right-sm">{{supplieData.useName}}</view>
							<view class="text-balck text-bold text-font-13 ">{{supplieData.warehouseAdministrator}}</view>
							<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="shebei"></u-icon>{{supplieData.useTypeName}}</view>
							<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-second margin-right-sm" name="kucun"></u-icon>{{supplieData.counts}}</view>
							<view class="flex align-center padding-top-sm">
								<u-tag text="+ 入库" mode="plain" class="margin-right-sm" size="mini" @click="handlePut"/>
								<u-tag text="+ 出库" mode="plain" size="mini" @click="handleOut"/>
							</view>
						</view>
					</view>
					<view class="cu-tag bg-orange light text-bold margin-top round">{{supplieData.suppliesName}}</view>
				</view>
				<view v-if="supplieData.explain" class="margin-lr padding-tb-sm border-top-dashed">
					<view class="u-font-13">{{supplieData.explain}}</view>
				</view>
				<view class="text-box-line"></view>
			</view>
			
			<scroll-view scroll-x class="bg-white nav border-bottom">
				<view class="flex">
					<view class="cu-item tab-box" :class="index==current?'text-blue cur':''"
						v-for="(item,index) in tabsList" :key="index" @tap="tabChange(index)" :data-id="index">
						<text class="font-second">{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
			<swiper :style="{height:scrollHeight}" :current="current" :show-bar="false" :disable-touch="true">
				<swiper-item class="swiper-item tab-content">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<view class="bg-box">
							<view v-if="params.emptyType==0" class="empty">
								<uni-load-more :status="loadingType"></uni-load-more>
							</view>
							<view v-if="params.emptyType==1" class="empty">
								<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
							</view>
							<view v-if="params.emptyType== 2">
								<supplie-box :list="putinList"></supplie-box>
								<view class="uni-tab-bar-loading">
									<uni-load-more :status="params.loadingType"></uni-load-more>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item tab-content">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<view class="bg-box">
							<view v-if="paramsDelivery.emptyType==0" class="empty">
								<uni-load-more :status="loadingType"></uni-load-more>
							</view>
							<view v-if="paramsDelivery.emptyType==1" class="empty">
								<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
							</view>
							<view v-if="paramsDelivery.emptyType== 2">
								<supplie-box :list="deliveryList"></supplie-box>
								<view class="uni-tab-bar-loading">
									<uni-load-more :status="paramsDelivery.loadingType"></uni-load-more>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import supplieBox from '@/components/custom/pages/supplieBox.vue'
	export default {
		components: {supplieBox},
		data() {
			return {
				emptyType: 0,
				productData: {},
				InputBottom: 0,
				commentValue: '',
				putinList: [],
				deliveryList: [],
				uuid: '',
				params: {
					pageNo: 1,
					pageSize: 20,
					loadingType: 'loading',
					emptyType: 0,
				},
				paramsDelivery: {
					pageNo: 1,
					pageSize: 20,
					loadingType: 'loading',
					emptyType: 0,
				},
				loadingType: 'loading',
				current: 0,
				scrollHeight: '100vh',
				tabsList: [{
					name: '入库记录'
				}, {
					name: '出库记录'
				}],
				showEdit:true,
				reservList: [{userName: '张莹莹',check: true},{userName: '李峰',check: false},{userName: '领导',check: false},{userName: '程俊杰',check: true},
				{userName: '李峰',check: true},{userName: '张莹莹',check: false},{userName: '领导',check: false},{userName: '程俊杰',check: true}],
				supplieData:{}
			};
		},
		onLoad(options) {
			this.uuid = options.uuId
			this.getSupplieDetails()
		},
		onShow() {
			let data = uni.getStorageSync('onFresh')
			if(data){
				uni.removeStorage({
					key:'onFresh'
				})
				this.putinList = []
				this.deliveryList = []
				this.getSupplieDetails()
			}
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			onreachBottom() {
				console.log("触底加载",this.current)
				if (this.current == 0 && this.params.loadingType == 'more') {
					this.tabChange(0)
				} else if(this.current == 1 && this.paramsDelivery.loadingType == 'more'){
					this.tabChange(1)
				}
			},
			tabChange(e) {
				console.log("e---", e)
				this.current = e
				if (e == 0 && this.putinList.length == 0) {
					this.params = {
						pageNo: 1,
						pageSize: 20,
						loadingType: 'loading',
						emptyType: 0
					}
					this.getPutInData()
				} else if (e == 1 && this.deliveryList.length == 0) {
					this.paramsDelivery = {
						pageNo: 1,
						pageSize: 20,
						loadingType: 'loading',
						emptyType: 0
					}
					this.getDeliverData()
				}
			},
			handlePut(){
				uni.navigateTo({
					url:'edit?uuid='+ this.uuid +' &type=put'
				})
			},
			handleOut(){
				uni.navigateTo({
					url:'edit?uuid='+ this.uuid +' &type=out'
				})
			},
			getPutInData(){
				let that = this
				let params = {
					pageNo: that.params.pageNo,
					pageSize: that.params.pageSize,
					type: 'entryWarehouse',
					useName: that.supplieData.useName
				}
				that.$http
					.post('/office/oaWorkWarehouse/getPageSet', params, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						that.params.pageNo++
						that.putinList = that.putinList.concat(list);
						that.params.emptyType = 2
						if (that.putinList.length == 0) {
							that.params.loadingType = 'nomore'
							that.params.emptyType = 1
						} else {
							if (that.params.pageNo > res.data.totalPage) {
								that.params.loadingType = 'nomore';
							} else {
								that.params.loadingType = 'more';
							}
						}
						console.log("index---", that.putinList)
					})
					.catch(err => {});
			},
			getDeliverData(){
				let that = this
				let params = {
					pageNo: that.paramsDelivery.pageNo,
					pageSize: that.paramsDelivery.pageSize,
					type: 'quitWarehouse',
					useName: that.supplieData.useName
				}
				that.$http
					.post('/office/oaWorkWarehouse/getPageSet', params, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						that.paramsDelivery.pageNo++
						that.deliveryList = that.deliveryList.concat(list);
						that.paramsDelivery.emptyType = 2
						if (that.deliveryList.length == 0) {
							that.paramsDelivery.loadingType = 'nomore'
							that.paramsDelivery.emptyType = 1
						} else {
							if (that.paramsDelivery.pageNo > res.data.totalPage) {
								that.paramsDelivery.loadingType = 'nomore';
							} else {
								that.paramsDelivery.loadingType = 'more';
							}
						}
						console.log("index---", that.deliveryList)
					})
					.catch(err => {});
			},
			getSupplieDetails(){
				var that = this;
				that.$http
					.post('/office/oaWorkSuplist/getDetailByUuid', {
						uuid: this.uuid
					}, {
						params: {},
					})
					.then(res => {
						this.supplieData = res.data
						this.emptyType = 2
						this.tabChange(this.current)
						this.$nextTick(function() {
							let userInfoHeight = ''
							let navHeight = ''
							this.$u.getRect('.swiper-box').then(res => {
								userInfoHeight = res.height + 'px'
							})
							this.$u.getRect('.nav').then(res => {
								navHeight = res.height + 'px'
							})
							this.$nextTick(function() {
								this.scrollHeight = `calc(100vh - ` + userInfoHeight + ` - ` + navHeight + ` - 88rpx )`
							})
						})
					})
					.catch(err => {
						this.emptyType = 1
					});
			},
		}
	};
</script>

<style lang="scss" scoped>
</style>
