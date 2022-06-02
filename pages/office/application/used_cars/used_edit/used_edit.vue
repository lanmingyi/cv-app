<template>
	<view id="page">
		<view class="grace-padding grace-bg-box grace-common-mt grace-common-border">
			<view class="grace-form">
				<form @submit="formSubmit">
					<!-- <view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>用车类型</view>
						<view class="grace-form-r">
							<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
								<text>{{gender[genderIndex]}}</text>
							</picker>
						</view>
					</view> -->
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
						<view class="grace-label"><text class="grace_must">*</text>车牌号</view>
						<input type="text" class="input" name="name"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>目的地</view>
						<input type="text" class="input" name="name"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>用车时长</view>
						<input type="text" class="input" name="name"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>用车事由</view>
						<view class="grace-form-r">
							<textarea placeholder="请输入用车理由" name="desc" style="height: 150px;"></textarea>
						</view>
					</view>
					<view class="btn">
						<button  type="primary" >撤销</button>
						<button formType="submit" type="primary" >提交</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>
<script>
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
				show2: false
			}
		},
		components:{
			graceDate
		},
		methods:{
			bindPickerChange:function(e){
				console.log(e);
				this.genderIndex = e.detail.value;
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
			}
		}
	}
	</script>
	<style>
		.grace_must{
			color: red;
		}
		.grace-common-border{
			border: none;
		}
		.grace-form-r{
			text-align: left;
			display: flex;
			justify-content: flex-end;
		}
		.grace-form uni-picker{
			width: 30%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
		.grace-form uni-textarea{
			height: 500upx;
		}
		.btn{
			width: 100%;
			margin-top: 200upx;  
			display: flex;
			justify-content: space-between;
		}
		.btn>button{
			width: 45%;
			margin: 0;
			padding: 0;
			background: #fff;
			outline: none;
			border: 1px solid #ccc;
			color: #666;
		}
		uni-button:after{
			border: none;
		}
</style>
