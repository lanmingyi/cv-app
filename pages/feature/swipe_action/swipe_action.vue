<template>
	<view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 基本用法
			</view>
		</view>
		<uni-swipe-action :options="options" @click="bindClick">
			<view class='cont'>SwipeAction 基础使用场景</view>
		</uni-swipe-action>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 禁止滑动
			</view>
		</view>
		<uni-swipe-action :disabled="true">
			<view class='cont'>SwipeAction 禁止滑动展示</view>
		</uni-swipe-action>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 传递点击事件
			</view>
		</view>
		<uni-swipe-action :options="options" @click="bindClick">
			<view class='cont'>点击选项时触发事件</view>
		</uni-swipe-action>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 开启或关闭事件
			</view>
		</view>
		<uni-swipe-action :options="options" @opened="bindOpened" @closed="bindClosed">
			<view class='cont'>开启或关闭事件时触发事件</view>
		</uni-swipe-action>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 使用变量控制开关
			</view>
		</view>
		<view class="padding flex bg-white flex-direction">
			<button class="cu-btn bg-grey lg" @click="setOpened">当前状态：{{isOpened ? '开' : '关'}}</button>
		</view>
		<uni-swipe-action :options="options" :is-opened="isOpened" :auto-close="true" @opened="bindOpened2" @closed="bindClosed2">
			<view class='cont'>开启或关闭事件时触发事件</view>
		</uni-swipe-action>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 与 List 组件一起使用
			</view>
		</view>
		<!-- #ifndef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
		<uni-list>
			<uni-swipe-action :options="options1">
				<uni-list-item title="item1" show-arrow="false"></uni-list-item>
			</uni-swipe-action>
			<uni-swipe-action :options="options">
				<uni-list-item title="item2" show-arrow="false"></uni-list-item>
			</uni-swipe-action>
			<uni-swipe-action :options="options3">
				<uni-list-item title="item3" show-arrow="false"></uni-list-item>
			</uni-swipe-action>
		</uni-list>
		<!-- #endif -->
		<!-- #ifdef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
		<view class="uni-list">
			<uni-swipe-action :options="options1">
				<uni-list-item title="item1" show-arrow="false"></uni-list-item>
			</uni-swipe-action>
			<uni-swipe-action :options="options">
				<uni-list-item title="item2" show-arrow="false"></uni-list-item>
			</uni-swipe-action>
			<uni-swipe-action :options="options3">
				<uni-list-item title="item3" show-arrow="false"></uni-list-item>
			</uni-swipe-action>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

	export default {
		components: {
			uniSwipeAction,
			uniList,
			uniListItem
		},
		data() {
			return {
				isOpened: false,
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '确认',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				options1: [{
					text: '取消置顶'
				}],
				options3: [{
					text: '置顶'
				}, {
					text: '标记为已读',
					style: {
						backgroundColor: 'rgb(254,156,1)'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}]
			}
		},
		methods: {
			bindClick(value) {
				uni.showToast({
					title: `点击了${value.text}按钮`,
					icon: 'none'
				})
			},
			bindOpened() {
				uni.showToast({
					title: `SwipeAction 开启`,
					icon: 'none'
				})
			},
			bindClosed() {
				uni.showToast({
					title: `SwipeAction 关闭`,
					icon: 'none'
				})
			},
			setOpened() {
				this.isOpened = !this.isOpened
			},
			bindOpened2() {
				this.isOpened = true
			},
			bindClosed2() {
				this.isOpened = false
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.cont {
		height: 90upx;
		line-height: 90upx;
		padding: 0 30upx;
		position: relative;
	}

	.cont::before {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		top: 0;
		height: 1px;
		content: '';
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.cont::after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		content: '';
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

</style>