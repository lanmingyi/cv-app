<!-- 用户列表页 -->
<template>
	<view class="container" :class="[vtheme]">
		<view v-if="emptyType==0" class="empty">
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="emptyType!=0">
			<!-- 单个搜索条件 -->
			<view v-if="!type" class="search-container">
				<list-search-single class="bg-box " :column="searchColumn" @search="searchFrom" :showLabel="false" :borderBottom="false"></list-search-single>
			</view>

			<view v-if="emptyType==1" class="empty">
				<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
			</view>
			<!-- swiper-box -->
			<view v-if="emptyType== 2" >
				<scroll-view :style="{height: scrollHeight}" class="bg-box"  scroll-y="true" @scrolltolower="onreachBottom" :lower-threshold="150">
					<view class="text-box-line" v-if="!type"></view>
					<crm-box class="bg-box" ref="crmbox" :list="list" @goDetail="goDetail" :showTimes="type"></crm-box>
					<view class="uni-tab-bar-loading">
						<uni-load-more :status="loadingType"></uni-load-more>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import listSearchSingle from '@/components/custom/search/listSearchSingle'
	import crmBox from '@/components/custom/pages/crmBox'
	export default {
		components: {
			listSearchSingle,
			crmBox
		},
		data() {
			return {
				tagList: ['无意愿', '一般意向', '高意向', '多次留资', '需要回访', '空错号', '恶意/辱骂', '联系不上', '非本人'],
				list: [],
				url: '/office/crmCustomer/getPageSet',
				pageNo: 1,
				pageSize: 20,
				loadingType: 'loading',
				emptyType: 0,
				searchData: {},
				state: '',
				type: '',
				scrollHeight: '',
				searchColumn: [
				{
					filedName: '日期范围',
					filed: 'type',
					type: 'select',
					height: '56',
					placeholder : '日期范围',
					value:'',
					valueText: '',
					selectValue: [],
					list: [{
						label: '今天',
						value: 'today'
					}, {
						label: '昨天',
						value: 'yesterday'
					}, {
						label: '前天',
						value: 'beforeYesterday'
					}, {
						label: '最近7天',
						value: 'Last7days'
					}, {
						label: '最近一个月',
						value: 'lastMonth'
					}, {
						label: '全部',
						value: 'defaultAll'
					}]
				}
				]
			}
		},
		onLoad(o) {
			this.state = o.state ? o.state : ''
			this.type = o.type ? o.type : false
			let title = o.title ? '客户列表 - ' + o.title : '客户列表'
			console.log("title",title)
			uni.setNavigationBarTitle({
			    title: title
			})
			this.getData()
			if(!this.type){
				this.scrollHeight = `calc(100vh - 40px)`
			} else {
				this.scrollHeight = '100vh'
			}
		},
		onShow() {
			let crmData = uni.getStorageSync('crmData')
			console.log("crm--",crmData)
			this.list.map(val=>{
				if(val.phone == crmData.phone){
					val.state = crmData.state
					val.tag = crmData.tag
				}
			})
			if(this.$refs.listSearch)this.$refs.listSearch.clear()
		},
		methods: {
			onreachBottom() {
				if (this.loadingType == 'more') {
					this.getData()
				}
			},
			searchFrom(data) {
				console.log("data", data)
				this.searchData = data
				this.pageNo = 1
				this.list = []
				uni.showLoading({
					title: '加载中...'
				})
				this.getData()
			},
			getData() {
				let that = this
				that.loadingType = 'loading'
				let params = {
					pageNo: that.pageNo,
					pageSize: that.pageSize,
					state: that.state,
					...that.searchData
				}
				that.$http
					.post('/office/crmCustomer/getPageSet', params, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						list.forEach(e => {
							e.tag = that.isNull(e.tag) ? '' : e.tag.split(',')
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
					.catch(err => {});
			},
			goDetail(item) {
				uni.navigateTo({
					url: '../details?phone=' + item.phone
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* tag标签 */
	/deep/.u-size-mini{
		padding: 0 6px !important;
		height: 18px;
		line-height: 18px !important;
		display: flex; 
		align-items: center;
	}
	/deep/.u-size-default{
		height: 26px;
		line-height: 26px !important;
		padding: 0 12px !important;
		display: flex;
		align-items: center;
	}
	.swiper-box {
		height: calc(100vh - 80rpx);
	}
</style>
