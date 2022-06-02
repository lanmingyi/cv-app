<!-- 用户列表页 -->
<template>
	<view class="container" :class="[vtheme]">
		<view v-if="emptyType==0" class="empty">
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="emptyType!=0">
			<!-- 2个或低于2个搜索条件组件 -->
			<list-search class="bg-box" ref="listSearch" :column="searchColumn" :columnList="searchColumnList" @search="searchFrom" :showLabel="false" :borderBottom="false"></list-search>
			
			<view v-if="emptyType==1" class="empty">
				<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
			</view>
			<scroll-view v-if="emptyType== 2"class="swiper-box bg-box" scroll-y="true" @scrolltolower="onreachBottom" :lower-threshold="150">
				<view class="text-box-line" ></view>
				<crm-box class="bg-box" ref="crmbox" :list="list" @goDetail="goDetail"></crm-box>
				<view class="uni-tab-bar-loading">
					<uni-load-more :status="loadingType"></uni-load-more>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import listSearch from '@/components/custom/search/listSearch'
	import crmBox from '@/components/custom/pages/crmBox'
	export default {
		components: {
			listSearch,
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
				searchColumn: [
				{
					filedName: '客户状态',
					type: 'select',
					filed: 'state',
					height: '56',
					placeholder : '客户状态',
					value:'',
					valueText: '',
					selectValue: [],
					list: [{
						label: '待沟通',
						value: '待沟通'
					},{
						label: '无需求',
						value: '无需求'
					}, {
						label: '需回访',
						value: '需回访'
					}, {
						label: '跟进中',
						value: '跟进中'
					}, {
						label: '决策中',
						value: '决策中'
					}, {
						label: '洽谈中',
						value: '洽谈中'
					}, {
						label: '已成单',
						value: '已成单'
					}]
				},
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
				],
				searchColumnList:[
					{
						filedName: '客户姓名',
						type: 'text',
						filed: 'name',
						height: '56',
						placeholder : '客户姓名',
						value:'',
						valueText: '',
					},{
						filedName: '客户状态',
						type: 'select',
						filed: 'state',
						height: '56',
						placeholder : '客户状态',
						value:'',
						valueText: '',
						selectValue: [],
						list: [{
							label: '待沟通',
							value: '待沟通'
						},{
							label: '无需求',
							value: '无需求'
						}, {
							label: '需回访',
							value: '需回访'
						}, {
							label: '跟进中',
							value: '跟进中'
						}, {
							label: '决策中',
							value: '决策中'
						}, {
							label: '洽谈中',
							value: '洽谈中'
						}, {
							label: '已成单',
							value: '已成单'
						}]
					},
					{
						filedName: '电话',
						type: 'text',
						filed: 'phone',
						height: '56',
						placeholder : '电话',
						value:'',
						valueText: '',
					},
					{
						filedName: 'IP地址',
						type: 'text',
						filed: 'ipAddr',
						height: '56',
						placeholder : 'IP地址',
						value:'',
						valueText: '',
					},
					{
						filedName: 'IP区域',
						type: 'text',
						filed: 'ipRegion',
						height: '56',
						placeholder : 'IP区域',
						value:'',
						valueText: '',
					},
					{
						filedName: '公司名称',
						type: 'text',
						filed: 'company',
						height: '56',
						placeholder : '公司名称',
						value:'',
						valueText: '',
					},
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
			this.getData()
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
