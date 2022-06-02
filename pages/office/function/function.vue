<template>
	<view class="container" :class="[vtheme]">
		<view class="bg-box">
			<view v-for="(item, index) in cuIconList" :key="index">
				<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom">
					<view class="font-main text-bold">{{ item.name }}</view>
				</view>
				<view class="cu-list grid col-4">
					<view class="cu-item animation-scale-up" :style="{animationDelay: delayTime(childIndex)}" v-for="(childItem, childIndex) in item.list" :key="childIndex" @tap="navTo(childItem.url)">
						<view
							:style="{background: colorType()}"
							class="margin-auto box-font-list flex align-center justify-center">
							<view class="iconfont" :class="['icon-' + childItem.cuIcon,'text-white']"></view>
						</view>
						<view class="text-center font-second padding-top-xs">{{ childItem.name }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				accordionActive: '',
				cuIconList: [],
			};
		},
		onLoad(options) {
			// this.changeColor();
			this.getFunction();
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url: e,
				});
			},
			getFunction() {
				var that = this;
				that.$http
					.post('/system/getListAppMenuByRoleId', {
						type: 'more'
					}, {
						params: {},
					})
					.then((res) => {
						let list = res.data[0].list.slice(1)
						this.cuIconList = list;
						// let list = res.data.slice(1)
						// this.cuIconList = list;
					})
					.catch((err) => {});
			},
		},
	};
</script>

<style scoped lang="scss">
</style>
