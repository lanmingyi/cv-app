<template>
	<view class="container bg-box">
		<act-box :list="noticeList" @goDetail="goDetail"></act-box>
		<view class="uni-tab-bar-loading">
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view class="pos-fixed width-80 round cu-botton-submit text-xxl text-center" @click="addPublic">+</view>
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
				noticeList: [],
				params: {
					pageNo: 1,
					pageSize: 10,
				},
				loadingType: 'loading',//加载更多状态
				emptyType: '0'
			};
		},
		onLoad() {
			_self = this;
			_self.getMessage();
		},
		onReachBottom: function() {
			if(this.loadingType == 'more'){
				this.loadingType = 'loading'
				this.getMessage();l
			}
		},
		methods: {
			changeData(){
				this.params = {
					pageNo: 1,
					pageSize: 10,
				},
				this.noticeList = []
				this.loadingType = 'loading'
				this.getMessage()
			},
			addPublic(){
				uni.navigateTo({
					url: 'notice_add?type=public'
				});
			},
			getMessage: function () {
				var that = this;
				that.$http
					.post('/office/officePublicAnnouncement/getPageSetPublic', {pageNo:that.params.pageNo,
						pageSize:that.params.pageSize}, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						list.forEach(val=>{
							let data = {
								titleTips : val.title.substring(0,2),
								name : val.publishingDepartmentName,
								title : val.title,
								uuid:val.uuid,
								time : val.createTime
							}
							that.noticeList.push(data)
							// val.contentText = val.content.replace(/<[^<>]+>/g,"").substring(0,80)
						})
						that.params.pageNo++
						that.emptyType = 2
						if (that.noticeList.length == 0) {
							that.loadingType = 'nomore'
							that.emptyType = 1
						} else {
							if (that.params.pageNo > res.data.totalPage) {
								that.loadingType = 'nomore';
							} else {
								that.loadingType = 'more';
							}
						}
					})
					.catch(err => {
					});
				
			},
			// 跳转到详情
			goDetail(uuid) {
				uni.navigateTo({
					url: 'notice_details?uuId=' + uuid
				});
			},

		},
	}
</script>

<style lang="scss">
</style>
