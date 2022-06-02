<template>
	<view class="container" id="page">
		<view>
			<qrcode :val="qrval" :size="qrsize" ref="qrcode"></qrcode>
		</view>
		<view class="cu-form-group margin-top">
			<input placeholder="请输入要生成的二维码内容" :value="qrval" @input="bindClearInput"  name="input"></input>
			<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 设置二维码大小
			</view>
		</view>
		<view class="body-view">
			<slider :value="qrsize" @change="sliderchange" min="50" max="500" show-value />
		</view>
		
		<view class="uni-padding-wrap">
			<view class="uni-btn-v uni-common-mt">
				<button type="primary" @click="creatQrcode">生成二维码</button>
				<button type="warn" @click="clearQrcode">清除二维码</button>
			</view>
		</view>
	</view>
</template>
<script>
	import qrcode from '@/components/qrcode/qrcode.vue'

	export default {
		data() {
			return {
				title: '二维码生成',
				showClearIcon: false,
				qrval: '',
				qrsize: 100,
			}
		},
		methods: {
			bindClearInput: function(e) {
				this.qrval = e.target.value;
				if (e.target.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() {
				this.qrval = '';
				this.showClearIcon = false;
			},
			sliderchange(e) {
				this.qrsize = e.detail.value
			},
			creatQrcode() {
				if (!this.qrval) {
					uni.showToast({
						title: '请输入二维码内容',
						icon: 'none'
					});
					return;
				}
				this.$refs.qrcode.creatQrcode();
			},
			clearQrcode() {
				this.$refs.qrcode.clearQrcode();
				this.clearIcon();
			}
		},
		components: {
			qrcode
		}
	}
</script>
<style>
	#page{
		padding: 20upx;
	}
	.body-view{
		background-color: white;
		padding: 20upx 0;
	}
</style>
