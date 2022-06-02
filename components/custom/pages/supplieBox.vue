<!--
 * @Description: 办公用品列表
 * @Author: 张夕雅
-->
<template>
	<view>
		<view class="margin-lr border-bottom-dashed padding-tb-sm" v-for="(item,index) in list" :key="index">
			<view class="flex align-center justify-between">
				<view class="flex align-center">
					<u-icon custom-prefix="custom-icon" class="font-three icon-color-main margin-right-sm" name="user"></u-icon>
					<text class="font-three">{{item.warehouseMan}}</text>
				</view>
				<view class="flex align-center">
					<text class="font-three">{{item.createTime}}</text>
				</view>
			</view>
			<view class="flex align-center">
				<u-icon custom-prefix="custom-icon" class="icon-color-second margin-right-sm" name="kucun"></u-icon>
				<text class="font-three">{{item.counts}}</text>
			</view>
			<view class="flex align-center" v-if="item.remark">
				<view class="font-three text-wrap">{{item.remark}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: {
				type: Array,
				default: ()=>[]
			}
		},
		data() {
			return {
			};
		},
		onLoad() {
		},
		methods: {
		},
		components: {
		}
	}
</script>

<style lang="scss">
</style>
