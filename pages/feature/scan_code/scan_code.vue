<template>
	<view id="scan_code">
		<view class="cu-form-group margin-top">
			<view class="title">扫码结果：</view>
			<view class="uni-list" v-if="result">
				<view class="uni-cell">
					<view class="scan-result">
						{{result}}
					</view>
				</view>
			</view>
		</view>

		<view class="uni-btn-v">
			<button type="primary" @click="scan">扫一扫</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				result: ''
			}
		},
		methods: {
			scan: function() {
				uni.scanCode({
					success: (res) => {
						this.result = res.result
					}
				});
			}
		}
	}
</script>

<style>
	#scan_code {
		width: 100%;
		padding: 20upx;
		background-color: white;
	}
	.scan-result {
		min-height: 50upx;
		line-height: 50upx;
	}
</style>
