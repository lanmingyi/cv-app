<template>
	<view id="page">
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title"><text class="grace_must">*</text>会议类型</view>
				<view class="">
					<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
						<view class="picker">{{gender[genderIndex]}}</view>
					</picker>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="grace_must">*</text>开始时间</view>
				<input type="text" class="input" name="startDate" :disabled="true" :value="beginTime" @tap="showDate1"></input>
			</view>
			<graceDate :show="show1" v-on:changeDate="changeDate1" :currentHour="12" :currenMinute="58"></graceDate>
			<view class="cu-form-group">
				<view class="title"><text class="grace_must">*</text>结束时间</view>
				<input type="text" class="input" name="endDate" :disabled="true" :value="endTime" @tap="showDate2"></input>
			</view>
			<graceDate :show="show2" v-on:changeDate="changeDate2" :currentHour="12" :currenMinute="58"></graceDate>
			<view class="cu-form-group">
				<view class="title"><text class="grace_must">*</text>会议时长</view>
				<input type="text" class="input" name="name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="grace_must">*</text>会议地点</view>
				<input type="text" class="input" name="name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="grace_must">*</text>发起人</view>
				<input type="text" class="input" name="name" placeholder="发起人"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="grace_must">*</text>会议主题</view>
				<textarea placeholder="请输入会议主题" name="desc"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="grace_must">*</text>与会人员</view>
				<textarea placeholder="请输入会议主题" name="desc"></textarea>
			</view>
			<view class="btn cu-form-group margin-top">
				<!-- <button  type="primary" >撤销</button> -->
				<button formType="submit" type="primary" >提交</button>
			</view>
		</form>
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
			show2: false,
			positionTop: 0
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
		initPosition() {
		    /**
		     * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
		     * 反向使用 top 进行定位，可以避免此问题。
		     */
		
		    this.positionTop = uni.getSystemInfoSync().windowHeight -200; 
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
	#page{
		background: #fff;
	}
	.grace-padding{
		width: 100%;
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
		height: 300upx;
	}
	.btn{
		width: 100%;
				padding-top: 30rpx;
		display: flex;
		justify-content: space-between;
	}
	.btn>button{
		width: 90%;
		margin: 0 auto;
		background: #fff;
		outline: none;
		border: 1px solid #ccc;
		color: #666;
	}
	uni-button:after{
		border: none;
	}
</style>
