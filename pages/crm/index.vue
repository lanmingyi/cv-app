<template>
	<view class="container" :class="[vtheme]">
		<swiper class="screen-swiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image :src="item.imgUrl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="main_content">
			
			<view class="cu-list grid col-4">
				<view class="cu-item animation-scale-up" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList" :key="index" @tap="navTo(item,index)">
					<!-- art-list-left -->
					<view
						:style="{background: colorType()}"
						class="margin-auto box-font-list radius flex align-center justify-center">
						<view class="iconfont u-font-40" :class="['icon-' + item.cuIcon,'text-white']"></view>
					</view>
					<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
				</view>
			</view>
			

			<view class="text-box-line"></view>
			
			<view class="bg-box">
				<navigator url="./sort/index" class=" solid-bottom padding-sm flex align-center justify-between">
					<view class="action">
						<u-icon custom-prefix="custom-icon" class="icon-title-main margin-right-sm" name="renwu3"></u-icon>
						<text class="font-second">最新客户</text>
					</view>
				</navigator>
				<crm-box class="bg-box" ref="crmbox" :list="crmList" @goDetail="goDetail"></crm-box>
				<view class="uni-tab-bar-loading">
					<view class="loading-more font-three">{{loadingText}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import crmBox from '@/components/custom/pages/crmBox.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			carousel,
			uniLoadMore,
			crmBox,
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userInfo']),
		data() {
			return {
				newsList: [],
				loadingText: '正在加载...', //加载更多状态
				swiperList: [{
						imgUrl: '../../static/img/crm01.jpg'
					},
					{
						imgUrl: '../../static/img/crm02.jpg'
					}
				],
				cuIconList:[{
					name: '待沟通',
					cuIcon: 'rankinglist',
					url: './sort/sortIndex?state=待沟通&title=待沟通'
				},{
					name: '无需求',
					cuIcon: 'column',
					url: './sort/sortIndex?state=无需求&title=无需求'
				},{
					name: '需回访',
					cuIcon: 'integral',
					url: './sort/sortIndex?state=需回访&title=需回访'
				},{
					name: '跟进中',
					cuIcon: 'shouhuoicon',
					url: './sort/sortIndex?state=跟进中&title=跟进中'
				},{
					name: '决策中',
					cuIcon: 'invoice',
					url: './sort/sortIndex?state=决策中&title=决策中'
				},{
					name: '洽谈中',
					cuIcon: 'trust',
					url: './sort/sortIndex?state=洽谈中&title=洽谈中'
				},{
					name: '已成单',
					cuIcon: 'goumaipianhao',
					url: './sort/sortIndex?state=已成单&title=已成单'
				},{
					name: '所有客户',
					cuIcon: 'certified-supplier',
					url: './sort/index'
				},{
					name: '高意向',
					cuIcon: 'dollar1',
					url: './sort/sortIndex?state=highIntention&title=高意向'
				},{
					name: '同IP客户',
					cuIcon: 'agriculture',
					url: './sort/collapseList?state=sameAsIP'
				},{
					name: '同公司客户',
					cuIcon: 'agriculture',
					url: './sort/collapseList?state=sameAsCompany'
				},{
					name: '多次访问',
					cuIcon: 'ascending',
					url: './sort/sortIndex?state=multipleVisits&type=true&title=多次访问'
				}],
				crmList:[]
			};
		},
		onLoad() {
			this.loadingText = '正在加载中...'
			this.getList()
		},
		onShow() {
			let crmData = uni.getStorageSync('crmData')
			console.log("crm--",crmData)
			this.crmList.map(val=>{
				if(val.phone == crmData.phone){
					val.state = crmData.state
					val.tag = crmData.tag
				}
			})
		},
		onPullDownRefresh() {
		},
		methods: {
			selectedBanner(item, index) {
				console.log("item.index", item, index)
			},
			navTo(val, index) {
				let url = val.url
				console.log(val)
				uni.navigateTo({
					url: url
				});
			},
			getList: function() {
				let that = this
				let params = {
					pageNo: 1,
					pageSize: 20,
				}
				that.$http
					.post('/office/crmCustomer/getPageSet', params, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						if(list){
							list.forEach(e => {
								e.tag = that.isNull(e.tag) ? '' : e.tag.split(',')
							})
							that.crmList = list;
							that.loadingText = '人家也是有底线的~'
						}
					})
					.catch(err => {});
			},
			goDetail(item) {
				uni.navigateTo({
					url: './details?phone=' + item.phone
				})
			},
		},
	};
</script>

<style lang="scss">
	.container{
		height: calc(100vh -88rpx - 100rpx - var(–safe-area-inset-bottom) - var(–status-bar-height));
	}
	.font-icon {
		width: 26px;
		height: 26px;
		margin: 0 auto;
	}

	.title-img {
		margin: 0 0 0 20px !important;
		border-radius: 5px !important;
		width: 90px !important;
		height: 70px !important;
	}

	.title-content {
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-word;
		display: -webkit-box;
		-webkit-line-clamp: 2; //指定行数
		-webkit-box-orient: vertical;
	}

	.main-info {
		background: rgb(58, 170, 254);
		width: 100%;
		height: 244rpx;
		border-radius: 0 0 5rpx 5rpx;
		margin-top: 15px;
	}

	.main-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.cu-list.grid>.cu-item:after {
		// border: none !important;
	}
	
	.uni-tab-bar-loading {
		text-align: center;
		padding: 20upx 0;
		font-size: 14px;
		color: #CCCCCC;
	}
</style>
