<!--
 * @Description: 传阅列表
 * @Author: 张夕雅
-->
<template>
	<view :class="[vtheme]">
		<view class="bg-box" v-for="(childItem,index) in list" :key="index" @click="goDetail(childItem)">
			<view class="padding-lr padding-tb-sm border-bottom">
				<view class="flex align-center">
					<view class="font-main text-cut">{{childItem.title}}</view>
				</view>
				<view class="padding-top-xs flex align-center justify-between">
					<view class="font-three text-cut"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="shijian1"></u-icon>{{childItem.completeDate}}</view>
					
					<view class="">
						<text :class="childItem.rank == '1'? 'tag-text-main' : (childItem.rank == '2' ?'tag-text-second' : 'tag-text-three')"  
							class="radius padding-lr-sm u-padding-top-2 u-padding-bottom-2 u-font-12">
							{{childItem.rankText}}
						</text>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self, x, y;
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				loadingType: 'loading', //加载更多状态
				emptyType: '0'
			};
		},
		onLoad() {
			_self = this;
		},
		methods: {
			// 跳转到详情
			goDetail(item) {
				this.$emit('goDetail', item.uuid)
				// uni.navigateTo({
				// 	url: 'notice_details?uuId=' + uuId
				// });
			},

		},
		components: {}
	}
</script>

<style lang="scss">
</style>
