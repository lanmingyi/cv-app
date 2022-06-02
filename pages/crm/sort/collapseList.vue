<template>
	<view class="container" :class="[vtheme]">
		<view v-if="emptyType==0" class="empty">
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="emptyType!=0">
			<view v-if="emptyType==1" class="empty">
				<u-empty :text="title" mode="list" icon-size="200"></u-empty>
			</view>
			<scroll-view v-if="emptyType== 2"class="swiper-box bg-box" scroll-y="true" @scrolltolower="onreachBottom" :lower-threshold="150">
				<view class="bg-box padding-lr">
					<u-collapse>
						<!-- :title="item.head" -->
						<u-collapse-item v-for="(item, index) in list" :key="index" class="border-bottom">
							<block slot="title">
								<view class="flex flex-direction" v-if="state == 'sameAsIP'">
									<view class="flex align-center" v-if="item.ipAddr">
										<u-icon custom-prefix="custom-icon" class="font-second icon-color-main margin-right-sm" 
											name="IPguangchang"></u-icon>
										<text class="font-second">{{item.ipAddr}}</text>
									</view>
									<view class="flex align-center" v-if="item.ipRegion">
										<u-icon custom-prefix="custom-icon" class="font-second icon-color-main margin-right-sm"
											name="diyu"></u-icon>
										<text class="font-second">{{item.ipRegion}}</text>
									</view>
								</view>
								<view class="flex flex-direction" v-if="state == 'sameAsCompany'">
									<view class="flex align-center">
										<u-icon custom-prefix="custom-icon" class="font-second icon-color-main margin-right-sm" 
											name="ditu1"></u-icon>
										<text class="font-second">{{item.company}}</text>
									</view>
								</view>
							</block>
							
							<crm-box class="bg-box" ref="crmbox" :list="item.list" @goDetail="goDetail" :showIpadd="false"></crm-box>
							
						</u-collapse-item>
					</u-collapse>
					<view class="uni-tab-bar-loading">
						<uni-load-more :status="loadingType"></uni-load-more>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import crmBox from '@/components/custom/pages/crmBox.vue';
	export default {
		components:{crmBox},
		data() {
			return {
				pageNo: 1,
				pageSize: 20,
				title: '暂无数据',
				loadingType: 'loading',
				emptyType: 0,
				list:[],
				state:''
			}
		},
		onLoad(o){
			this.state = o.state
			this.getData()
		},
		onShow(){
			let crmData = uni.getStorageSync('crmData')
			this.list.map(val => {
				val.list.map(e=>{
					if(e.phone == crmData.phone){
						e.state = crmData.state
						e.tag = crmData.tag
					}
				})
			})
		},
		methods: {
			getData() {
				let that = this
				that.loadingType = 'loading'
				let params = {
					pageNo: that.pageNo,
					pageSize: that.pageSize,
					state: that.state
				}
				that.$http
					.post('/office/crmCustomer/getPageSet', params, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						list.forEach(val => {
							val.list.forEach(e=>{
								e.tag = that.isNull(e.tag) ? '' : e.tag.split(',')
							})
						})
						that.pageNo++
						that.list = that.list.concat(list);
						that.emptyType = 2
						if (that.list.length == 0) {
							that.loadingType = 'nomore'
							that.emptyType = 1
						} else {
							if (that.pageNo > res.data.totalPage) {
								that.loadingType = 'nomore';
							} else {
								that.loadingType = 'more';
							}
						}
						uni.hideLoading()
					})
					.catch(err => {
						that.emptyType = 1
						that.title = '获取数据失败'
						that.loadingType = 'more'
					});
			},
			goDetail(item) {
				uni.navigateTo({
					url: '../details?phone=' + item.phone
				})
			},
		}
	}
</script>

<style scoped lang="scss">

</style>
