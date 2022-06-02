<template>
	<view id="page">
		<view class="cu-bar bg-box solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 默认样式
			</view>
			<view class="action">
				<switch checked @change="switch1Change" />
				<switch @change="switch2Change" />
			</view>
		</view>

		<view class="cu-bar bg-box solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 推荐展示样式
			</view>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">关闭</view>
			<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">开启中</view>
			<switch @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
		</view> -->
		<view class="cu-form-group">
			<view class="title">开关选择</view>
			<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">定义颜色</view>
			<!-- #ifdef MP-ALIPAY -->
			<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false" color="#e54d42"></switch>
			<!-- #endif -->
		
			<!-- #ifndef MP-ALIPAY -->
			<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
			<!-- #endif -->
		</view>
		<view class="cu-form-group">
			<view class="title">定义图标</view>
			<switch class='switch-sex' @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
		</view>
		<!-- #ifndef MP-ALIPAY -->
		<view class="cu-form-group">
			<view class="title">方形开关</view>
			<switch class='orange radius' @change="SwitchD" :class="switchD?'checked':''" :checked="switchD?true:false"></switch>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'switch',
				switchA: false,
				switchB: true,
				switchC: false,
				switchD: false,
			}
		},
		methods: {
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			switch2Change: function (e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			SwitchC(e) {
				this.switchC = e.detail.value
			},
			SwitchD(e) {
				this.switchD = e.detail.value
			},
		}
	}
</script>
<style>
</style>

