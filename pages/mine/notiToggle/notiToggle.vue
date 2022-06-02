<template>
	<scroll-view class="page show">
		<view class="grace-text">
			<view class="grace-text">
				<text>“勿扰模式”开启后，将不进行消息推送，消息提示。</text>
			</view>
		</view>
		<view>
			<view class="cu-form-group bg-box">
				<view class="title">手动启用</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-form-group bg-box">
				<view class="title">定时开启</view>
				<switch @change="SwitchA1" :class="switchA1?'checked':''" :checked="switchA1?true:false"></switch>
			</view>

			<form bindsubmit="formSubmit">
				<view class="cu-bar bg-box solid-top">
					<view class="action">
						<view class="title">开始时间</view>
					</view>
					<view class="action">
						<view class="cu-btn bg-green shadow">
							<input type="text" name="startDate" :disabled="disabled" :value="date1" @tap="showDate1"></input>
						</view>
					</view>
				</view>

				<view class="cu-bar bg-box solid-top">
					<view class="action">
						<view class="title">结束时间</view>
					</view>
					<view class="action">
						<view class="cu-btn bg-green shadow">
							<input type="text" name="endDate" :disabled="disabled" :value="date2" @tap="showDate2"></input>
						</view>
					</view>
				</view>
			</form>
			<graceDate :show="show1" :isTime="true" v-on:changeDate="changeDate1" :currentHour="22" :currenMinute="59"></graceDate>
			<graceDate :show="show2" :isTime="true" v-on:changeDate="changeDate2" :currentHour="5" :currenMinute="59"></graceDate>
		</view>

	</scroll-view>
</template>

<script>
	import graceDate from '@/graceUI/components/graceTime.vue'
	export default {
		data() {
			return {
				date1: '点击选择',
				show1: false,
				date2: '点击选择',
				show2: false,
				disabled: false,
				switchA: false,
				switchA1: false
			}
		},
		components: {
			graceDate
		},
		methods: {
			choose: function() {
				this.disabled = true;
			},
			showDate1: function() {
				this.show1 = true;
			},
			changeDate1: function(e) {
				this.date1 = e;
				this.show1 = false;
			},
			showDate2: function() {
				this.show2 = true;
			},
			changeDate2: function(e) {
				this.date2 = e;
				this.show2 = false;
			},
			SwitchA: function(e) {
				this.switchA = e.detail.value
			},
			SwitchA1: function(e) {
				this.switchA1 = e.detail.value
			},
		}
	}
</script>

<style>
.grace-text{
	background: #fafafa;
	padding: 20upx 10upx;
	text-align: center;
}
.uni-list-cell-pd{
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
.uni-list::before{
	background: #fff;
}
.grace-form .grace-items{
	width: 95%;
	padding: 0 30upx;
	border-top: 1px solid #e2e2e2;
	border-bottom: none;
}	
.grace-form .grace-items .input{
	width: 90%;
}
</style>
