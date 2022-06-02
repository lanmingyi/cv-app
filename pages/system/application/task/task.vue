<template>
	<view class="container" :class="[vtheme]">
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==selectedIndex?'text-orange cur':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect(index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-content">
			<view class="cu-card dynamic no-card margin-top" v-for="(item,index) in cardList" :key="index">
				<view class="cu-item shadow ">
					<view class="cu-list menu"  @tap="goDetail(item)">
						<!-- <view class="cu-bar bg-white solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-orange "></text> 任务
							</view>
						</view> -->
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-btn text-green"></text>
								<text class="text-grey">任务名称</text>
							</view>
							<view class="action">
								<text class="">{{ item.title }}</text> 
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-btn text-green"></text>
								<text class="text-grey">任务类型</text>
							</view>
							<view class="action">
								<text class="">{{ item.taskTypeText }}</text> 
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-btn text-green"></text>
								<text class="text-grey">任务状态</text>
							</view>
							<view class="action">
								<text class="" v-if="item.taskType == 1 || item.taskType == 4">未开始</text>
								<text class="" v-if="item.taskType == 2">已接收</text> 
								<text class="" v-if="item.taskType == 3">已完成</text> 
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-btn text-green"></text>
								<text class="text-grey">计划时间</text>
							</view>
							<view class="action">
								<text class="">{{ item.planStartTime }}--{{ item.planEndTime }}</text>
							</view>
						</view>
					</view>
					<view class="cu-list menu" style="margin: 0;border-top: 1rpx solid #f1f1f1;">
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
								<text class="text-grey">操作</text>
							</view>
							<view class="action">
								<view class="cu-tag round bg-orange light" @click="edit(item)">编辑</view>
								<view class="cu-tag round bg-olive light" @click="removeMsg(item)">删除</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<graceLoading :loadingType="loadingType" @loadMore="loadMore()"></graceLoading>
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

import graceLoading from '@/components/graceLoading.vue';
export default {
	components: {
		graceLoading,
	},
	data() {
		return {
			tabList: [{ name: '我的待办' }, { name: '我的任务' }],
			selectedIndex: 0,
			pages: 1,
			total: '',
			uuid: '',
			id: '',
			cardList: [],
			myrows: [],
			loadingType: 0,
			isEnd: false,
		};
	},
	onLoad() {
		
		this.getOaTaskBase();
	},
	onPullDownRefresh() {
		//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		console.log('refresh');
		this.page = 1,
		this.cardList = [],
	
		uni.showLoading({
			title:'加载中...'
		})
		this.getOaTaskBase();
		uni.stopPullDownRefresh(); //停止下拉刷新动画
	},
	onReachBottom: function() {
		//避免多次触发
		// if (this.loadingType == 1 || this.isEnd){return ;}
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
			// this.traysList = traysList
		}
	},
	methods: {
		/* 切换导航栏 */
		tabSelect(index){
			this.selectedIndex = index
			this.pages = 1
			this.cardList = []
			this.getOaTaskBase()
		},
		getOaTaskBase: function() {
			let url = ''
			if(this.selectedIndex==0){
				url = '/office/oaTaskBase/getOaTaskBaseByLevelId?levelId=1'
			}
			else{
				url = '/office/oaTaskBase/getMyTaskBaseByLevelId?levelId=1'
			}
			
			this.$http
				.post(url, {page:this.pages,
					rows:10}, {
					params: {},
				})
				.then(res => {
					this.pages = res.data.pages;
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
			var uuId = e.uuid;
			console.log('uuId:' + uuId);
			uni.navigateTo({
				url: 'taskEdit?uuId=' + uuId
			});
		},
		goDetail: function(e) {
			//创建绑定数据
			var uuId = e.uuid;
			console.log('uuId:' + uuId);
			uni.navigateTo({
				url: 'taskDetails?uuId=' + uuId
			});
		},
		
		removeMsg: function(e) {
			
			uni.showModal({
				title:'删除提示',
				content:'确定删除此条数据吗？',
				success: (res) => {
					if(res.confirm){
						uni.request({
							url: this.$baseUrl+'/office/oaTaskBase/deleteBatch',
							dataType: 'json',
							method: 'POST',
							data: {
								uuid: e.uuId
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
					}
				}
			})
			
		},
		navToAdd(){
			uni.navigateTo({
				url: 'taskAdd'
			});
		},
	},
};
</script>

<style>
.nav{
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
.tab-content{
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
.text-lg{
	font-size: 80rpx;
	color: #fff;
}

.null-box{
  width: 200rpx;
  height: 200rpx;
  background: url(https://zysd-shanghai.oss-cn-shanghai.aliyuncs.com/mini-program/bdtui/shop/serch-null.png) no-repeat;
  background-size: 100% 100%;
  margin: 400rpx auto;
}
</style>
