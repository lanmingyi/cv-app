<template>
	<view id="page">
		<view class="cu-bar bg-box solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 输入区域高度自适应，不会出现滚动条
			</view>
		</view>
		<view class="uni-textarea">
			<textarea @blur="bindTextAreaBlur" style="height: 100upx;" />
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 占位符字体是红色的textarea
				</view>
			</view>
			<view class="uni-textarea">
				<textarea placeholder-style="color:#F76260" placeholder="占位符字体是红色的"/>
			</view>
		</view>
</template>
<script>
	export default {
		data() {
			return {
				focus: false
			}
		},
		methods: {
			bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			}
		}
	}
</script>

<style>

</style>
