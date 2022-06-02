<template>
	<view id="page">
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 示例1
			</view>
		</view>
		<view style="justify-content:center;" class="cu-form-group margin-bottom">
			<graceCountd :timer="timer1" v-on:endDo="endDo"></graceCountd>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 示例2
			</view>
		</view>
		<view style="justify-content:center; background:#00B26A; padding:50upx 0;">
			<graceCountd :timer="timer2" borderColor="#FFFFFF" splitorColor="#FFF" fontColor="#FFFFFF" bgrColor="none"></graceCountd>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 示例3
			</view>
		</view>
		<view style="justify-content:center;" class="cu-form-group margin-bottom">
			<graceCountd fontColor="#FFFFFF" bgrColor="#000000" :timer="timer3"></graceCountd>
		</view>
		<view style="height:30px;"></view>
	</view>
</template>
<script>
	import graceCountd from "@/graceUI/components/graceCountd.vue";
	//模拟3个时间
	var dateObj = new Date();
	var currentTime = dateObj.getTime();
	var timer1 = formatDateTime((currentTime + 1000 * 20));
	var timer2 = formatDateTime((currentTime + 1000 * 100));
	var timer3 = formatDateTime((currentTime + 1000 * 200));
	//时间戳 转 YY-mm-dd HH:ii:ss 
	function formatDateTime(inputTime) {
		var date = new Date(inputTime);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
	};
	export default {
		data() {
			return {
				timer1: timer1,
				timer2: timer2,
				timer3: timer3
			}
		},
		components: {
			graceCountd
		},
		methods: {
			endDo: function() {
				uni.showToast({
					// your code
					title: "倒计时执行完毕......",
					icon: "none"
				})
			}
		}
	}
</script>
<style>
	.grace-countdown {
		padding: 2upx 0;
		flex-wrap: nowrap;
		justify-content: center;
	}

	.grace-countdown-splitor {
		width: auto !important;
		justify-content: center;
		line-height: 44upx;
		padding: 0 5upx;
	}

	.grace-countdown-numbers {
		line-height: 44upx;
		width: auto !important;
		padding: 0 10upx;
		justify-content: center;
		height: 44upx;
		border-radius: 8upx;
		margin: 0 5upx;
		border: 1px solid #000000;
		font-size: 22upx;
	}
</style>
