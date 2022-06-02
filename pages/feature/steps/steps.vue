<template>
	<view id="page">
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 基本用法
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="BasicsSteps">下一步</button>
			</view>
		</view>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>basics?'':'text-red'" v-for="(item,index) in basicsList" :key="index">
					<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
				</view>
			</view>
		</view>

		<view class="bg-white padding margin-top-xs">
			<view class="cu-steps">
				<view class="cu-item" :class="index>basics?'':'text-orange'" v-for="(item,index) in basicsList" :key="index">
					<text :class="index>basics?'cuIcon-title':'cuIcon-' + item.cuIcon"></text> {{item.name}}
				</view>
			</view>
		</view>

		<view class="bg-white padding  margin-top-xs">
			<view class="cu-steps steps-arrow">
				<view class="cu-item" :class="index>basics?'':'text-blue'" v-for="(item,index) in basicsList" :key="index">
					<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 数字完成
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="NumSteps">下一步</button>
			</view>
		</view>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
					<text class="num" :class="index==2?'err':''" :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 多级显示
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="ScrollSteps">下一步</button>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll"
		 scroll-with-animation>
			<view class="cu-item padding-lr-xl" :class="index>scroll?'':'text-blue'" v-for="(item,index) in 10" :key="index" :id="'scroll-' + index">
				Level {{index + 1}} <text class="num" :data-index="index + 1"></text>
			</view>
		</scroll-view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 纵向排列
			</view>
		</view>
		<view class="example">
			<!-- <view class="example-title">纵向排列</view> -->
			<uni-steps :data="list2" direction="column" :active="active"></uni-steps>
			<button type="primary" @click="change">改变状态</button>
		</view>

	</view>
</template>
<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'

	export default {
		components: {
			uniSteps
		},
		data() {
			return {
				basicsList: [{
					cuIcon: 'usefullfill',
					name: '开始'
				}, {
					cuIcon: 'radioboxfill',
					name: '等待'
				}, {
					cuIcon: 'roundclosefill',
					name: '错误'
				}, {
					cuIcon: 'roundcheckfill',
					name: '完成'
				}, ],
				basics: 0,
				numList: [{
					name: '开始'
				}, {
					name: '等待'
				}, {
					name: '错误'
				}, {
					name: '完成'
				}, ],
				num: 0,
				scroll: 0,
				active: 1,
				list1: [{
					title: '事件一'
				}, {
					title: '事件二'
				}, {
					title: '事件三'
				}, {
					title: '事件四'
				}],
				list2: [{
					title: '买家下单',
					desc: '2018-11-11'
				}, {
					title: '卖家发货',
					desc: '2018-11-12'
				}, {
					title: '买家签收',
					desc: '2018-11-13'
				}, {
					title: '交易完成',
					desc: '2018-11-14'
				}]
			}
		},

		methods: {
			change() {
				if (this.active < this.list1.length - 1) {
					this.active += 1
				} else {
					this.active = 0
				}
			},
			BasicsSteps() {
				this.basics = this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1
			},
			NumSteps() {
				this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
			},
			ScrollSteps() {
				this.scroll = this.scroll == 9 ? 0 : this.scroll + 1
			}
		},
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		font-size: 32upx;
		line-height: 32upx;
		color: #777;
		margin: 40upx 25upx;
		position: relative
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 0 40upx
	}

	button {
		margin: 30upx;
	}
</style>
