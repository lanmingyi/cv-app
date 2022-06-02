<!--
 * @Description: 时间轴列表
 * @Author: 张夕雅
-->
<template>
	<view class="cu-timeline padding-bottom-sm">
		<view class="cu-item" :class="item.status == '0' ? 'cuIcon-round text-gray' : (item.status == '1'? 'cuIcon-roundcheck text-green' : 'cuIcon-roundclose text-red')">
			<view class="flex align-start justify-between">
				<text class="text-bold   text-black">{{item.sendName}}</text>
				<text class="  text-black">{{item.sendTime}}</text>
			</view>
			<view class="  text-black">
				{{item.desc}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item: Object
		},
		components: {},
		data() {
			return {  
				journalData: {}
			};
		},
		onLoad() {
		},
		onPullDownRefresh() {
		},
		methods: {
		}
	};
</script>

<style>
</style>
