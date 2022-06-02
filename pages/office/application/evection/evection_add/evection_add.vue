<template>
	<view id="page">
		<view class="grace-padding grace-bg-box grace-common-mt grace-common-border">
			<view class="grace-form">
				<form @submit="formSubmit">
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>交通工具</view>
						<view class="grace-select-tips">
							<radio-group @change="graceSelectChange1" name="tipName2">
								<label v-for="(item, index) in vehicle" :key="index" :class="[item.checked ? 'grace-checked' : '']">
									<radio :value="item.value" :checked="item.checked"></radio> {{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>单程往返</view>
						<view class="grace-select-tips">
							<radio-group @change="graceSelectChange2" name="tipName2">
								<label v-for="(item, index) in journey" :key="index" :class="[item.checked ? 'grace-checked' : '']">
									<radio :value="item.value" :checked="item.checked"></radio> {{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>出发城市</view>
						<input :value="pickerText" class="input"  @click="showMulLinkageThreePicker"  placeholder="选择城市"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>目的城市</view>
						<input :value="pickerText2" class="input"  @click="showMulLinkageThreePicker2"  placeholder="选择城市"></input>
					</view>
					<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker2" :pickerValueDefault="cityPickerValueDefault"
					 @onCancel="onCancel" @onConfirm="onConfirm2"></mpvue-city-picker>
					<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
					 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>开始时间</view>
						<input type="text" class="input" name="startDate" :disabled="true" :value="beginTime" @tap="showDate1"></input>
					</view>
					<graceDate :show="show1" v-on:changeDate="changeDate1" :currentHour="12" :currenMinute="58"></graceDate>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>结束时间</view>
						<input type="text" class="input" name="endDate" :disabled="true" :value="endTime" @tap="showDate2"></input>
					</view>
					<graceDate :show="show2" v-on:changeDate="changeDate2" :currentHour="12" :currenMinute="58"></graceDate>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>时长</view>
						<input type="text" class="input" name="name"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>出差天数</view>
						<input type="text" class="input" name="name"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>出差备注</view>
						<view class="grace-form-r">
							<textarea placeholder="请输入出差备注" name="desc" style="height: 150px;"></textarea>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>同行人</view>
						<input type="text" class="input" name="name" style="height: 150px;"></input>
					</view>
					<view class="btn">
						<button formType="submit" type="primary" style="width:90%;">提交</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>
<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvue-picker.vue';
	// https://github.com/zhetengbiji/mpvue-citypicker
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	import graceDate from '@/graceUI/components/graceDate.vue'
export default {
	
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			genderIndex: 0,
			gender : ['例会', '临时会议','电话会议', '视频会议'],
			endTime : '点击选择',
			show1 : false,
			beginTime: '点击选择',
			show2: false,
			vehicle: [
				{ name: '火车', value: '0', checked: true },
				{ name: '飞机', value: '1', checked: false },
				{ name: '汽车', value: '2', checked: false },
				{ name: '其他', value: '4', checked: false },
			],
			journey: [
				{ name: '单程', value: '0', checked: true },
				{ name: '往返', value: '1', checked: false }
			],
			mulLinkageTwoPicker: cityData,
			cityPickerValueDefault: [0, 0, 1],
			themeColor: '#007AFF',
			pickerText: '',
			pickerText2: '',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray:[]
		}
	},
	components: {
		mpvuePicker,
		mpvueCityPicker,
		graceDate
	},
	methods:{
		onCancel(e) {
			console.log(e)
		},
		showDate1: function () {
			this.show1 = true;
		},
		changeDate1: function (e) {
			this.beginTime= e;
			this.show1 = false;
		},
		showDate2: function () {
			this.show2 = true;
		},
		changeDate2: function (e) {
			this.endTime= e;
			this.show2 = false;
		},
		formSubmit : function(e){
			wx.showToast({title:'请观察控制台', icon:'none'});
			console.log(JSON.stringify(e.detail.value));
		},
		// 出发城市
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show()
		},
		onConfirm(e) {
			this.pickerText = e.label;
		},
		// 目的城市
		showMulLinkageThreePicker2() {
			this.$refs.mpvueCityPicker2.show()
		},
		onConfirm2(e) {
			this.pickerText2 = e.label;
		},
		getDate(type) {
			const date = new Date();
		
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
		
			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
		
			return `${year}-${month}-${day}`;
		},
		graceSelectChange1: function (e) {
			var checkVal = e.detail.value;
			for (var i = 0; i < this.vehicle.length; i++) {
				if (checkVal.indexOf(this.vehicle[i].value + '') != -1) {
					this.vehicle[i].checked = true;
				} else {
					this.vehicle[i].checked = false;
				}
			}
			this.vehicle = this.vehicle;
		},
		graceSelectChange2: function (e) {
			var checkVal2 = e.detail.value;
			for (var i = 0; i < this.journey.length; i++) {
				if (checkVal2.indexOf(this.journey[i].value + '') != -1) {
					this.journey[i].checked = true;
				} else {
					this.journey[i].checked = false;
				}
			}
			this.journey = this.journey;
		}
	},
	 onBackPress() {
	  if (this.$refs.mpvueCityPicker.showPicker) {
	  	this.$refs.mpvueCityPicker.pickerCancel();
	    return true;
	  }
	  if (this.$refs.mpvueCityPicker2.showPicker) {
	  	this.$refs.mpvueCityPicker2.pickerCancel();
	    return true;
	  }
	},
	onUnload() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel()
		}
		if (this.$refs.mpvueCityPicker2.showPicker) {
			this.$refs.mpvueCityPicker2.pickerCancel()
		}
	}
}
</script>
<style>
	.grace-select-tips uni-label{
		height: 100%;
	}
	.grace-form .grace-items .input{
		height: 100%;
		font-size: 13px;
	}
	.grace_must{
		color: red;
	}
	.grace-common-border{
		border: none;
	}
	.grace-select-tips{
		padding: 0;
	}
	.grace-checked{
		background: #3AAAFE !important;
	}
	.grace-form-r{
		text-align: left;
	}
	.grace-form-r,.grace-form uni-picker,.city{
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	
	.grace-form uni-picker{
		width: 30%;
	}
	.grace-form uni-textarea{
		height: 300upx;
	}
	.btn{
		width: 100%;
		margin-top: 200upx;  
	}
	.btn>button{
		background: #fff;
		outline: none;
		border: 1px solid #ccc;
		color: #666;
	}
	uni-button:after{
		border: none;
	}
</style>
