<!--
 * @Description: 页面展示定点滚动
 * @Author: 张夕雅
-->
<template>
	<view :class="[vtheme]">
		<view class="files-pos-fixed text-center tag-bg-default u-font-12 flex align-center justify-center flex-wrap" @click="goFiles()">
			<u-icon :name="iconName" :size="26" class="u-padding-top-6"></u-icon>
			<text style="width: 100%;" >{{tipsName}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tipsNum: 0,
				iconName: 'arrow-down',
				tipsName: '附件'
			}
		},
		onLoad(options) {},
		methods: {
			gotoTopTips() {
				this.tipsNum = 1
				this.iconName = 'arrow-up'
				this.tipsName = '顶部'
			},
			gotoBottomTips() {
				this.tipsNum = 0
				this.iconName = 'arrow-down'
				this.tipsName = '附件'
			},
			goFiles() {
				// smooth   平滑   instant    瞬间滚动
				if (this.tipsNum == 0) {
					var el = document.getElementById('files')
					this.$nextTick(() => {
						window.scrollTo({
							'behavior': 'instant',
							'top': el.offsetTop - 50
						})
						this.tipsNum = 1
						this.iconName = 'arrow-up'
						this.tipsName = '顶部'
					})
				} else {
					var el = document.getElementById('container-title')
					this.$nextTick(() => {
						window.scrollTo({
							'behavior': 'instant',
							'top': el.offsetTop - 50
						})
						this.tipsNum = 0
						this.iconName = 'arrow-down'
						this.tipsName = '附件'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.files-pos-fixed {
		position: fixed;
		width: 80rpx;
		height: 80rpx;
		bottom: 400rpx;
		right: 20rpx;
		border-radius: 8rpx;
		z-index: 9;
		opacity: 1;
	}

	.files-box-right {
		border-radius: 10px 0 0 10px;
	}
</style>
