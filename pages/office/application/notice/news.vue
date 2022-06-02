<template>
	<view class="container bg-box" :class="[vtheme]">
		<view v-if="emptyType===0" class="empty text-center margin-tb-xl">
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="emptyType===1" class="empty text-center">
			<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
		</view>
		<view v-if="emptyType===2">
			<act-box :list="newList" @goDetail="goDetail"></act-box>
			<view class="uni-tab-bar-loading">
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
			<view class="pos-fixed width-80 round cu-botton-submit text-xxl text-center" @click="addNews">+</view>
		</view>
	</view>
</template>

<script>
	import navTabList from '@/components/m-navList.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import actBox from '@/components/custom/pages/actBox.vue'

	var _self, x, y;
	export default {
		components: {
			navTabList,
			uniLoadMore,
			actBox
		},
		data() {
			return {
				selectedIndex: 0,
				params: {
					pageNo: 1,
					pageSize: 10,
				},
				newList: [],
				loadingType: 'loading',//加载更多状态
				emptyType: 0,
			}
		},
		onLoad() {
			_self = this;
			_self.newList = []
			_self.getListInfo();
		},
		onPullDownRefresh() {
			this.newList = []
			this.params =  {
				pageNo: 1,
				pageSize: 10,
			}
			this.getListInfo();
		},
		onReachBottom: function() {
			if(this.loadingType == 'more'){
				this.loadingType = 'loading',
				this.getListInfo();
			}
		},
		methods: {
			changeData(){
				this.params = {
					pageNo: 1,
					pageSize: 10,
				},
				this.newList = []
				this.loadingType = 'loading'
				this.getListInfo()
			},
			addNews(){
				uni.navigateTo({
					url: 'new_add'
				});
			},
			getListInfo: function() {
				var that = this;
				that.$http
					.post('/office/oaNewsBase/getPageSetDynamic', {}, {
						params: this.params,
					})
					.then(res => {
						let list = res.data.rows
						if(list){
							that.params.pageNo ++
							list.forEach(val=>{
								let data = {
									titleTips : val.publisher.substring(0,2),
									name : val.publisher,
									title : val.newsTitle,
									uuid:val.uuid,
									time : val.releaseTime
								}
								that.newList.push(data)
							})
							that.emptyType = 2
							if (that.newList.length == 0) {
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
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: err.data.message,
							icon: 'none'
						});
					});
			},
			// 跳转到详情
			goDetail(uuid) {
				uni.navigateTo({
					url: 'news_details?uuId=' + uuid
				});
			},

		},
		
	}
</script>

<style lang="scss" scoped>
</style>
