<template>
	<view id="page">
		<view class="cu-bar bg-box solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 默认样式
			</view>
		</view>
		<radio-group class="block">
			<view class="cu-form-group">
				<view class="title">选中</view>
				<radio value="r1" checked="true" />
			</view>
			<view class="cu-form-group">
				<view class="title">未选中</view>
				<radio value="r2" />
			</view>
		</radio-group>
		
		<view class="cu-bar bg-box solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 推荐展示样式
			</view>
		</view>
		<radio-group class="block" @change="RadioChange">
			<view class="cu-form-group">
				<view class="title">单选操作(radio)</view>
				<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">定义样式</view>
				<radio class='radio' :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
			</view>
			<view class="cu-form-group">
				<view class="title">定义颜色</view>
				<view>
					<radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
					<radio class='red margin-left-sm' :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio>
				</view>
			</view>
			<!-- #endif -->
		</radio-group>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				radio: 'A',
			}
		},
		methods: {

			RadioChange(e) {
				this.radio = e.detail.value
			},
		}
	}
</script>

<style>

</style>
