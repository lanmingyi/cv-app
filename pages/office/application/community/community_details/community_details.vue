<template>
	<view id="page" class="padding-sm">
		<view class="title text-xxl"><text v-text="detail.oaTopicBase.title"></text></view>
		<view class="flex justify-between">
			<view class="text-gray text-df"><text class="cuIcon-peoplefill text-gray"></text><text v-text="detail.oaTopicBase.creator"></text></view>
			<view><text class="cuIcon-countdown text-gray margin-left-sm"><text v-text="detail.oaTopicBase.createTime"></text></text></view>
		</view>
		<view>
			<rich-text :nodes="detail.content"></rich-text>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				detail:{}
			};
		},
		methods:{
			
		},
		onLoad(options) {
			setTimeout(function () {
				console.log('start pulldown');
			}, 1000);
			//uni.startPullDownRefresh();
			uni.startPullDownRefresh({
				success: res => {},
			});  //这里表示当进入页面的时候就开始执行下拉刷新动画
			var uuid = options.uuId
			this.$http
				.get('/system/topicBase/detail', {
					params: {uuid:uuid},
				})
				.then(res => {
					this.res = '请求结果 : ' + JSON.stringify(res);
					this.detail = res.data
					this.detail.content = this.detail.oaTopicDocument.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err.data.message,
						icon: 'none'
					});
				});
			
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		}
	}
</script>

<style>
#page{
	background: #fff;
}
</style>
