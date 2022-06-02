<template>
	<view id="page">
		<view class="a_logo">
			<image src="@/static/img/new_logo.png" mode=""></image>
			<view>明图科技</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item arrow" @tap="navigator">
				<view class="title">功能介绍</view>
				<view class="arrow-right"></view>
			</view>
		
			<view class="cu-item arrow" @tap="showModle">
				<view class="title">更新升级</view>
				<view class="arrow-right"></view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			showModle: function() {
				uni.showToast({
					icon: "none",
					title: "已经是最新版本！"
				})
			},
			navigator: function(){
				uni.redirectTo({
					url: 'intro/intro'
				})
			}
		}
	}
</script>

<style>
	.a_logo {
		text-align: center;
		margin: 100upx;
	}

	.a_logo>image {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
	}
</style>
