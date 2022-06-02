<template>
	<view id="page">
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">标题</view>
				<input placeholder="标题" name="title"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">休假类型</view>
				<picker @change="bindPickerChange" :value="taskTypeTextIndex" :range="gender" name="item" range-key="name">
					<view   class="picker">{{gender[taskTypeTextIndex].name}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">休假时长</view>
				<input placeholder="休假时长" name="days"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">开始时间</view>
				<picker mode="date" :value="beginTime" :start="startDate" :end="endDate" @change="changeDate1" name="beginTime">
					<view class="picker">{{beginTime}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">结束时间</view>
				<picker mode="date" :value="endTime" :start="startDate" :end="endDate" @change="changeDate2" name="endTime">
					<view class="picker">{{endTime}}</view>
				</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title">任务内容</view>
				<textarea placeholder="请输入任务内容" name="reason"></textarea>
			</view>
			<view class="cu-form-group btn">
				<button class="cu-btn bg-blue" formType="submit" type="primary" style="width:100%;" >确定</button>
			</view>
		</form>
		
	</view>
</template>
<script>
import graceDate from '@/components/graceDate.vue'
export default {
	
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			taskTypeTextIndex:0,
			gender:[],
			beginTime:currentDate,
			endTime:currentDate,
			item:'',
			taskId:'',
			text:''
		}
	},
	components:{
		graceDate
	},
	onLoad(options) {
		var that = this;
		var token = '';
		this.getCode()
		this.getDate()
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods:{
		getCode(){
			this.$http
				.post('/system/codeItem/getListByCodeSetIdAndLevelId', {codeSetId:'ACGA',
					levelId:4}, {
					params: {},
				})
				.then(res => {
					console.log(res)
					let gender = res.data
					gender.forEach(e=>{
						this.gender.push({
							name:e.text
						})
					})
					this.item = this.gender[0].name
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err.data.message,
						icon: 'none'
					});
				});
			
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
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		changeDate1(e) {
			this.beginTime = e.target.value;
			console.log(e)
		},
		
		changeDate2(e) {
			this.endTime= e.target.value
		},
		bindPickerChange(e){
			
			let index = e.detail.value
			this.taskTypeTextIndex = index
			this.item = this.gender[index].name;
		},
		formSubmit : function(e){
			let ajaxData = e.detail.value
			console.log(JSON.stringify(e.detail.value));
			if (ajaxData.title.length == 0) {
			    uni.showToast({
			        icon: 'none',
			        title: '请填写休假假标题！'
			    });
			    return;
			}
			else if (!ajaxData.days) {
			    uni.showToast({
			        icon: 'none',
			        title: '请填写休假时长！'
			    });
			    return;
			}
			else if (ajaxData.beginTime.length == 0) {
			    uni.showToast({
			        icon: 'none',
			        title: '请填写休假开始时间！'
			    });
			    return;
			}
			else if (ajaxData.endTime.length == 0) {
			    uni.showToast({
			        icon: 'none',
			        title: '请填写休假结束时间！'
			    });
			    return;
			}
			else if (ajaxData.reason.length == 0) {
			    uni.showToast({
			        icon: 'none',
			        title: '请填写休假内容！'
			    });
			    return;
			}
			
			this.$http
				.post('/workflow/oaLeave/save', {title:ajaxData.title,
					days:ajaxData.days,
					item:this.item,
					beginTime:ajaxData.beginTime,
					endTime:ajaxData.endTime,
					reason:ajaxData.reason}, {
					params: {},
				})
				.then(res => {
					var jsondata = res.data;
					console.log("服务器状态码:" + res.statusCode);  
					  
					if (res.data.statusCode == 200) {  
						console.log("提交成功" + res.statusCode);  
						uni.showToast({  
							icon: 'success',  
							title: '添加成功！'  
						});
						setTimeout(function () {
							uni.navigateBack({
								delta:1
							})
						},1000)
					} else {  
						uni.showToast({  
							icon: 'none',  
							title: '提交失败！' 
						});  
					}
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err.data.message,
						icon: 'none'
					});
				});
			
			
		},
		
		graceSelectChange: function (e) {
			var checkVal = e.detail.value;
			for (var i = 0; i < this.grade.length; i++) {
				if (checkVal.indexOf(this.grade[i].value + '') != -1) {
					this.grade[i].checked = true;
				} else {
					this.grade[i].checked = false;
				}
			}
			this.grade = this.grade;
		},
	}
}
</script>
<style>
	#page{
		background: #fff;
	}
	.btn{
		padding-top: 30rpx;
	}
</style>

