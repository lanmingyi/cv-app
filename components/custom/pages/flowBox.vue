<!--
 * @Description: 流程列表
 * @Author: 张夕雅
-->
<template>
	<view>
		 <!-- v-if="childItem.modelKey=='tyqjlc'" -->
		<view class="bg-box" v-for="(childItem,index) in list" :key="index" @click="goDetail(childItem)">
			<view class="margin-lr">
				<view class="flex align-center justify-between">
					<view class="padding-top-sm" style="width: 90%;">
						<view class="font-main text-cut padding-right-sm">{{childItem.formName || childItem.name}}</view>
						<view class="font-three text-right">( {{childItem.modelName || childItem.procDefName}} )</view>
					</view>
					<view>
						<u-icon name="arrow-right padding-left-xs" size="20" ></u-icon>
					</view>
				</view>
				<view class="task-info padding-bottom-sm border-bottom">
					<view class="">
						<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="user1"></u-icon>{{childItem.startUserId}}</view>
						<view class="font-three " v-if="childItem.taskName"><u-icon custom-prefix="custom-icon" class="icon-color-second margin-right-sm" name="renwu3"></u-icon>{{childItem.taskName}}</view>
						<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="shijian1"></u-icon>{{childItem.startTime}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self, x, y;
	export default {
		props:{
			list: {
				type: Array,
				default: ()=>[]
			}
		},
		data() {
			return {
				loadingType: 'loading',//加载更多状态
				emptyType: '0'
			};
		},
		onLoad() {
			_self = this;
		},
		methods: {
			// 跳转到详情
			goDetail(item) {
				this.$emit('goDetail',item)
				// uni.navigateTo({
				// 	url: 'notice_details?uuId=' + uuId
				// });
			},

		},
		components: {
		}
	}
</script>

<style lang="scss">
</style>
