<template>
	<view id="page">
		<view class="uni-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">声音</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
		</view>

		<view class="uni-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">通知显示内容</view>
				<switch @change="SwitchA1" :class="switchA1?'checked':''" :checked="switchA1?true:false"></switch>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">锁屏显示消息弹框</view>
				<switch @change="SwitchA2" :class="switchA2?'checked':''" :checked="switchA2?true:false"></switch>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">通知时指示灯闪烁</view>
				<switch @change="SwitchA3" :class="switchA3?'checked':''" :checked="switchA3?true:false"></switch>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">与我相关的通知</view>
				<switch @change="SwitchA4" :class="switchA4?'checked':''" :checked="switchA4?true:false"></switch>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">退出后仍接收消息通知</view>
				<switch @change="SwitchA5" :class="switchA5?'checked':''" :checked="switchA5?true:false"></switch>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchA: false,
				switchA1: false,
				switchA2: false,
				switchA3: false,
				switchA4: false,
				switchA5: false,
			}
		},
		methods: {
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			SwitchA1(e) {
				this.switchA1 = e.detail.value
			},
			SwitchA2(e) {
				this.switchA2 = e.detail.value
			},
			SwitchA3(e) {
				this.switchA3 = e.detail.value
			},
			SwitchA4(e) {
				this.switchA4 = e.detail.value
			},
			SwitchA5(e) {
				this.switchA5 = e.detail.value
			},
		}
	}
</script>

<style>
	.uni-list-cell-pd {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.uni-list::before {
		background: #fff;
	}
</style>
