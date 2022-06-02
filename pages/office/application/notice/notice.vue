<template>
	<view class="container" :class="[vtheme]">
		<!-- <view class="padding-tb-sm padding-lr-xl bg-box">
			<u-search v-model="title" placeholder="标题 ..." @change="change" shape="round" :clearabled="true" :show-action="false" input-align="left"></u-search>
		</view> -->
		
		<u-sticky>
			<list-search-single class="bg-box" :column="searchColumn" @search="searchFrom" :showLabel="false"></list-search-single>
		</u-sticky>
		
		<view v-if="emptyType==0" class="empty">
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="emptyType==1" class="empty">
			<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
		</view>
		<view v-if="emptyType==2">
			<act-box :list="noticeList" @goDetail="goDetail"></act-box>
			<view class="uni-tab-bar-loading">
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
		</view>
		
		<view class="pos-fixed width-80 round cu-botton-submit text-xxl text-center" @click="addNotice">+</view>
	</view>
</template>

<script>
	import listSearchSingle from '@/components/custom/search/listSearchSingle'
	import navTabList from '@/components/m-navList.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import actBox from '@/components/custom/pages/actBox.vue'

	var _self, x, y;
	export default {
		data() {
			return {
				selectedIndex: 0,
				noticeList: [],
				params: {
					pageNo: 1,
					pageSize: 10,
				},
				title: '',
				searchColumn: [{
					filedName: '新闻标题',
					type: 'text',
					filed: 'title',
					height: '56',
					placeholder : '标题...',
					value:'',
				}],
				searchData: {},
				loadingType: 'loading',//加载更多状态
				emptyType: '0',
				timer: null,
			};
		},
		onLoad() {
			_self = this;
			_self.getMessage();
		},
		destroyed() {
		  clearTimeout(this.timer)
		},
		onReachBottom: function() {
			if(this.loadingType == 'more'){
				this.loadingType = 'loading'
				this.getMessage();
			}
		},
		methods: {
			searchFrom(value) {
				if(this.timer){
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(()=>{
					this.searchData = value
					this.getData()
				},500)
			},
			changeData(){
				this.searchData = {}
				this.getData()
			},
			getData(){
				this.params = {
					pageNo: 1,
					pageSize: 10,
				},
				this.noticeList = []
				this.loadingType = 'loading'
				this.getMessage()
			},
			addNotice(){
				uni.navigateTo({
					url: 'notice_add?type=notice'
				});
			},
			getMessage: function () {
				var that = this;
				that.$http
					.post('/office/officePublicAnnouncement/getPageSet', {
						pages:that.params.pageNo,
						rows:that.params.pageSize,
						...that.searchData
						}, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						if(list){
							list.forEach(val=>{
								let data = {
									titleTips : val.title.substring(0,2),
									name : val.publishingDepartmentName,
									title : val.title,
									uuid:val.uuid,
									time : val.createTime,
									type: val.type
								}
								that.noticeList.push(data)
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
						} else {
							that.loadingType = 'nomore'
							that.emptyType = 1
						}
					})
					.catch(err => {
					});
				uni.hideLoading()
			},
			// 跳转到详情
			goDetail(uuid) {
				console.log("uuid",uuid)
				uni.navigateTo({
					url: 'notice_details?uuId=' + uuid
				});
			},

		},
		components: {
			navTabList,
			uniLoadMore,
			actBox,
			listSearchSingle
		}
	}
</script>

<style lang="scss" scoped>
	.tab-content {
		padding-top: 44px;
	}

	.iconfont {
		font-size: 10px;
	}

	.space {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

	}

	.rank {
		width: 100%;
	}

	.cu-card.dynamic>.cu-item {
		margin-bottom: 0;
	}

	.write-box {
		width: 280rpx;
		height: 300rpx;
		border-radius: 15rpx;
	}

	.font-size-xl {
		font-size: 26px;
	}
</style>
