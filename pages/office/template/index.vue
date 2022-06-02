<template>
	<view class="container bg-box">
		<view v-if="emptyType===0" class="empty text-center margin-tb-xl">
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="emptyType===1" class="empty text-center">
			<image src="@/static/img/empty.png"></image>
			<view class="text-grey text-opacity5 margin-tb-xl">页面数据为空</view>
		</view>
		<view v-if="emptyType===2">
			<view>
				<view v-for="item in templateList" :key="item.uuid">
					<view class="text-box-line"></view>
					<view class="margin-lr" @goDetail="goDetail(item)">
						<view class="padding-top-sm u-font-13 flex align-center justify-between">模板创建人：{{item.name}}
							<text class="cuIcon-more text-black" @click.stop="moreData(item)"></text></view>
						<view class=" padding-tb-xs u-font-13 border-bottom-dashed">模板创建时间：{{item.createTime}}</view>
						<view class="padding-top-sm u-font-13">电话：{{item.mobilePhone}}</view>
						<view class="padding-tb-xs u-font-13">邮件：{{item.email}}</view>
						<view class="padding-bottom-sm u-font-13">事物：{{item.consultAffair}}</view>
					</view>
				</view>
			</view>

			<view class="uni-tab-bar-loading">
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
		</view>

		<view v-if="emptyType===2 || emptyType===1">
			<view class="pos-fixed width-80 round bg-blue light text-xxl text-center" @click="add">+</view>
		</view>

		<!-- //弹窗 -->
		<view>
			<u-action-sheet :cancel-btn="cancel" :mask-close-able="maskClick" @click="clickMoreData" :list="moreList"
				v-model="showPopup" :safe-area-inset-bottom="true" cancelTextFontSize="26"></u-action-sheet>
		</view>
	</view>
</template>

<script>
	import navTabList from '@/components/m-navList.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

	var _self, x, y;
	export default {
		components: {
			navTabList,
			uniLoadMore
		},
		data() {
			return {
				selectedIndex: 0,
				params: {
					pageNo: 1,
					pageSize: 10,
				},
				templateList: [],
				loadingType: 'loading', //加载更多状态
				emptyType: 0,
				checkData: {},
				cancel: true,
				maskClick: true,
				showPopup: false,
				moreList: [{
					text: '编辑',
					value: '1',
					fontSize: '26'
				}, {
					text: '删除',
					value: '2',
					fontSize: '26'
				}],
			}
		},
		onShow() {
			_self = this;
			_self.templateList = []
			_self.loadingType = 'loading'
			_self.params.pageNo = 1
			_self.getListInfo();

		},
		onReachBottom: function() {
			if (this.loadingType == 'more') {
				this.loadingType = 'loading'
				this.getListInfo()
			}
		},
		methods: {
			moreData(item) {
				this.showPopup = true
				console.log("item----数据类型", item)
				this.checkData = item
			},
			clickMoreData(item) {
				console.log("点击了---", item, this.checkData)
				if (item.value == 1) { //编辑
					uni.navigateTo({
						url: 'add?type=edit&uuid=' + this.checkData.uuid
					});
				} else if (item.value == 2) { //删除
					this.deleteData(item)
				}
			},
			deleteData(item) {
				uni.showModal({
					title: '删除提示',
					content: '确定删除此条数据吗？',
					success: (res) => {
						if (res.confirm) {
							this.$http.post('/office/consultTemplate/deleteBatch', {
									uuid: this.checkData.uuid
								}, {
									params: {},
								})
								.then(res => {
									if (res.data.statusCode == 200) {
										this.templateList = []
										this.params.pageNo = 1
										this.loadingType = 'loading'
										this.getListInfo()
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
								})
						}
					}
				})
			},
			changeData() {
				this.params = {
						pageNo: 1,
						pageSize: 10,
					},
					this.templateList = []
				this.loadingType = 'loading'
				this.getListInfo()
			},
			add() {
				console.log("新建")
				uni.navigateTo({
					url: 'add?type=add'
				});
			},
			getListInfo: function() {
				var that = this;
				that.$http
					.post('/office/consultTemplate/getPageSet', {}, {
						params: this.params,
					})
					.then(res => {
						that.params.pageNo++
						let list = res.data.rows
						that.templateList = that.templateList.concat(list)
						that.emptyType = 2
						if (that.templateList.length == 0) {
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
					url: 'details?uuId=' + uuid
				});
			},

		},

	}
</script>

<style lang="scss" scoped>
</style>
