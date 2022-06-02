<template>
	<view id="page">
		<view class="cu-bar bg-white solid-bottom solid-top">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 基本用法
			</view>
		</view>
		<view class="cu-form-group">
			<uni-rate value="2"></uni-rate>
		</view>
		
		<view class="cu-bar bg-white solid-bottom solid-top">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 自定义星星大小
			</view>
		</view>
		<view class="cu-form-group">
			<uni-rate size="18" value="5"></uni-rate>
		</view>
		
		<view class="cu-bar bg-white solid-bottom solid-top">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 星星的数量
			</view>
		</view>
		<view class="cu-form-group">
			<uni-rate max="10" value="5"></uni-rate>
		</view>
		
		<view class="cu-bar bg-white solid-bottom solid-top">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 不可点击状态
			</view>
		</view>
		<view class="cu-form-group">
			<uni-rate disabled="true" value="3.5"></uni-rate>
		</view>
		
		<view class="cu-bar bg-white solid-bottom solid-top">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 星星的间距
			</view>
		</view>
		<view class="cu-form-group">
			<uni-rate margin="10" value="3.5"></uni-rate>
		</view>
		
		<view class="cu-bar bg-white solid-bottom solid-top">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 星星的颜色
			</view>
		</view>
		<view class="cu-form-group">
			<uni-rate color="wheat" value="2"></uni-rate>
		</view>
		
		<view class="cu-bar bg-white solid-bottom solid-top">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 选中状态的星星的颜色
			</view>
		</view>
		<view class="cu-form-group">
			<uni-rate active-color="red" value="3"></uni-rate>
		</view>
		
		<view class="cu-bar bg-white solid-bottom solid-top">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 星星的类型，是否为实心类型
			</view>
		</view>
		<view class="cu-form-group">
			<uni-rate is-fill="false" value="3"></uni-rate>
		</view>
	</view>
</template>
<script>
import uniRate from '@/components/uni-rate/uni-rate.vue';
export default {
	components:{
		uniRate
	}
}
</script>
<style>
</style>
