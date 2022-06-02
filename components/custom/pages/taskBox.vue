<!--
 * @Description: 任务列表
 * @Author: 张夕雅
-->
<template>
	<view>
		<view class="bg-box" v-for="(childItem,index) in list" :key="index" @click="goDetail(childItem)">
			<view class="padding-lr">
				<view class="task-title padding-top flex align-center justify-between">
					<view class="flex align-center">
						<view class="font-main text-cut">{{childItem.title}}</view>
					</view>
					<view class="flex align-center">
						<view class="">
							<text :class="childItem.priority == '1'? 'tag-text-main' : (childItem.priority == '2' ?'tag-text-second' : 'tag-text-three')"  
								class="radius padding-lr-sm u-padding-top-2 u-padding-bottom-2 u-font-12">
								{{childItem.priority == '1'? '一级' : (childItem.priority == '2' ?'二级' : '三级')}}
							</text>
						</view>
						<!-- <u-icon name="arrow-right" size="20" color="#2b2f33"></u-icon> -->
					</view>
				</view>
				<view class="task-info padding-bottom-sm border-bottom">
					<view class="font-three margin-top-xs"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="user1"></u-icon>{{childItem.assigner}}</view>
					
					<view class=" text-nowrap">
						<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-second margin-right-sm" name="shijian1"></u-icon>{{childItem.planStartTime}}  -  {{childItem.planEndTime}}</view>
					</view>
					<view class=" flex align-center justify-between">
						<!-- icon-yonghu -->
						<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="renwu3"></u-icon>{{childItem.taskTypeText}}</view>
						
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
				
				this.$emit('goDetail',item.id,item.levelId)
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
