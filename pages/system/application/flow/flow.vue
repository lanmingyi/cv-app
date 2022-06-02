<template>
	<view class="container" :class="[vtheme]">
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==selectedIndex?'text-orange cur':''" v-for="(item,index) in tabList"
				 :key="index" @tap="tabSelect(index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="cu-list menu-avatar comment solids-top tab-content" v-if="cardList.length != 0">
			<view class="cu-item" v-for="(item,index) in cardList" :key="index" @tap="goDetail(item)">
				<block  v-if="item.modelKey==='zdyqjlc'||item.procDefKey==='zdyqjlc'">
					<view class="cu-avatar round" :style="'background-image:url('+ userInfo.avatar +')'"></view>
					<view class="content">
						<view class="margin-bottom">{{item.formName?item.formName:item.name}}</view>
						<view class="text-gray text-content text-df">
							流程名称 <text v-text="item.modelName?item.modelName:item.procDefName" class="text-black margin-left"></text>
						</view>
						<view class="text-gray text-content text-df" v-if="item.taskName">
							当前任务 <text v-text="item.taskName" class="text-black margin-left"></text>
						</view>
						<view class="text-gray text-content text-df">
							任务发起人 <text class="text-black margin-left">{{item.startUserId}}</text>
						</view>
						<view class="text-gray text-content text-df">
							创建时间 <text class="text-black margin-left">{{item.flowStartTime?item.flowStartTime:item.startTime}}</text>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="cu-avatar round" :style="'background-image:url('+ userInfo.avatar +')'"></view>
					<view class="content">
						<view class="margin-bottom">{{item.formName}}</view>
						<view class="text-gray text-content text-df">
							流程名称 <text v-text="item.modelName" class="text-black margin-left"></text>
						</view>
						<view class="text-gray text-content text-df">
							当前任务 <text v-text="item.taskName" class="text-black margin-left"></text>
						</view>
						<view class="text-gray text-content text-df">
							任务发起人 <text class="text-black margin-left">{{item.startUserId}}</text>
						</view>
						<view class="text-gray text-content text-df">
							创建时间 <text class="text-black margin-left">{{item.flowStartTime}}</text>
						</view>
					</view>
				</block>
			</view>
		</view>
		
		<view class="fab-box fab rightBottom" @click="navToAdd()">
			<view class="fab-circle right" style="background-color: rgb(0, 122, 255);">
				<text class="cuIcon-add tex-right text-lg"></text>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	var _self, x, y;
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				tabList: [{
					name: '待办流程'
				}, {
					name: '在办流程'
				}, {
					name: '历史流程'
				}],
				selectedIndex: 0,
				pages: 1,
				total: '',
				uuid: '',
				id: '',
				cardList: [],
				myrows: [],
			};
		},
		onLoad() {
			console.log(this.$store.state.hasLogin)
			_self = this;

			uni.showLoading({
				title:'加载中...'
			})
		},
		onShow() {
			this.pages = 1
			this.cardList = []
			this.getOaTaskBase();
		},
		onPullDownRefresh() {
			this.pages = 1
			this.cardList = []
			this.getOaTaskBase();
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		onReachBottom() {
			if (this.page < this.pages) {
				this.isEnd = true;
				this.page++;
				
				uni.showLoading({
					title:'加载中...'
				})
				this.getOaTaskBase();
			} else {
				this.loadingType = 2;
				this.loading = false;
			}
		},
		computed: mapState(['hasLogin','userInfo']),
		methods: {
			/* 切换导航栏 */
			tabSelect(index) {
				this.selectedIndex = index
				this.pages = 1
				this.cardList = []
				this.getOaTaskBase()
			},
			getOaTaskBase() {

				let url = ''
				if (this.selectedIndex == 0) {
					// this.getMyTaskBase()
					url = '/workflow/apiFlowableTask/getToDoTasks'
				} else if (this.selectedIndex == 1) {
					url = '/workflow/apiFlowableTask/getMyNoEndProcessPageSetData'
				} else {
					url = '/workflow/apiFlowableTask/getMyHistoryPageSet'
				}
				
				this.$http
					.post(url, {pageNo: this.pages,
						pageSize: 10}, {
						params: {},
					})
					.then(res => {
						this.pages = res.data.totalCount;
						let cardList = res.data.rows;
						
						if (cardList.length == 0) {
							uni.showToast({
								icon: 'none',
								title: '暂无数据'
							});
							this.loadingType = 2;
						} else {
							this.cardList = this.cardList.concat(cardList);
							if (this.page < this.pages) {
								this.loadingType = 0;
							} else {
								this.loadingType = 2;
							}
						}
						uni.hideLoading()
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: err.data.message,
							icon: 'none'
						});
					});
				
			},

			//点击进入详情页
			edit: function(e) {
				//创建绑定数据
				var uuId = e.businessKey;
				uni.navigateTo({
					url: 'flowEdit?uuId=' + uuId
				});
			},
			goDetail: function(e) {
				//创建绑定数据
				console.log(this.cardList)
				var uuId = e.businessKey;
				console.log(uuId)
				if (this.selectedIndex == 0) {
					uni.navigateTo({
						url: 'flowDetail?uuId=' + uuId + '&taskId=' + e.taskId + '&type=backlog' + '&processDefinitionId=' + e.processDefinitionId +'&processInstanceId='+e.processInstanceId +'&index='+this.selectedIndex+'&nodeId='+e.nodeId+'&modelKey='+e.modelKey
					});
				}if (this.selectedIndex == 1) {
					uni.navigateTo({
						url: 'flowDetail?uuId=' + uuId + '&taskId=' + e.taskId + '&type=backlog' + '&processDefinitionId=' + e.processDefinitionId +'&processInstanceId='+e.processInstanceId +'&index='+this.selectedIndex+'&modelKey='+e.modelKey+'&nodeId='+e.nodeId
					});
				}  else {
					uni.navigateTo({
						url: 'flowDetail?uuId=' + uuId + '&processDefinitionId=' + e.processDefinitionId +'&index='+this.selectedIndex +'&processInstanceId='+e.processInstanceId+'&modelKey='+e.procDefKey
					});
				}
			},

			removeMsg: function(e) {
				var uuId = e.uuid;

				var that = this;
				uni.request({
					url: this.$baseUrl + '/workflow/oaLeave/deleteBatch',
					dataType: 'json',
					method: 'POST',
					data: {
						uuid: uuId
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
			},
			navToAdd() {
				uni.navigateTo({
					url: 'flowAdd'
				});
			},
		},
	};
</script>

<style>
	
	.nav {
		position: fixed;
		/* #ifdef APP-PLUS || MP-WEIXIN */
		top: 0;
		/* #endif */
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		left: 0;
		width: 100%;
		z-index: 99999;
	}

	.tab-content {
		padding-top: 90rpx;
	}

	.fab-box {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
	}

	.fab-circle {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		background: #3c3e49;
		/* background: #5989b9; */
		border-radius: 50%;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		z-index: 11;
	}

	.fab-box.fab.rightBottom {
		right: 100rpx;
		bottom: 100rpx;
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
