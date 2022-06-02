<template>
	<view id="clipboard">
		<view class="uni-padding-wrap">
			<view class="cu-form-group margin-top">
				<input type="text" placeholder="请输入剪贴板内容" :value="data" @input="dataChange" name="input"></input>
			</view>
			<view class="uni-btn-v">
				<button type="primary" @click="setClipboard">存储数据</button>
				<button @tap="getClipboard">读取数据</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				data: ''
			}
		},
		methods: {
			dataChange: function (e) {
				this.data = e.target.value
			},
			getClipboard: function () {
				uni.getClipboardData({
					success: (res) => {
						console.log(res.data);
						uni.showModal({
							title: '读取剪贴板',
							content: '剪贴板内容为: ' + res.data,
							showCancel: false
						})
					},
					fail: () => {
						uni.showModal({
							content: '读取剪贴板失败!',
							showCancel: false
						})
					}
				});
			},
			setClipboard: function () {
				var data = this.data;
				if (data.length === 0) {
					uni.showModal({
						title: '设置剪贴板失败',
						content: '内容不能为空',
						showCancel: false
					})
				} else {
					uni.setClipboardData({
						data: data,
						success: () => {
							uni.showModal({
								content: '设置剪贴板成功',
								showCancel: false
							})
						},
						fail: () => {
							uni.showModal({
								content: '储存数据失败!',
								showCancel: false
							})
						}
					});
				}
			}
		}
	}
</script>

<style>
	#clipboard{
		width: 100%;
		padding: 20upx;
	}
	.uni-input{
		height: auto;
	}
</style>
