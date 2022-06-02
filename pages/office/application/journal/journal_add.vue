<template>
	<view class="container" :class="[vtheme]">
		<view class="margin-lr flex flex-wrap justify-around padding-top">
			<view class="cu-card dynamic write-box bg-box margin-bottom margin-top-xl"
				v-for="(item,index) in writeList" :key="index">
				<navigator :url="item.url"
					class="flex align-center justify-center bg-box light"
					style="height: 100%;" :data-uuid="item.uuid">
					<view class=" text-center ">
						<view class="text-main-title">
							<u-icon name="plus" size="36"></u-icon>
						</view>
						<view class="text-main-title text-bold text-xl">{{item.name}}</view>
						<view class="text-gray   text-bold">{{item.desc}}</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

	var _self, x, y;
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				writeList: [{
					name: '日志',
					desc: '空白日志',
					url: 'index/index'
				}, {
					name: '日报',
					desc: '今日工作内容',
					url: 'daily/daily'
				}, {
					name: '周报',
					desc: '本周工作内容',
					url: 'weekly/weekly'
				}, {
					name: '月报',
					desc: '本月工作内容',
					url: 'monthly/monthly'
				}],
			};
		},
		onLoad() {
		},
		onShow() {
		},
		methods: {
			changelist(){},
		},
	}
</script>

<style lang="scss" scoped>
	.write-box {
		width: 280rpx;
		height: 340rpx;
		border-radius: 15rpx;
		box-shadow: 0 0 5px #e7e7e7;
	}
</style>
