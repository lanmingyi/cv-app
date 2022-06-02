<template>
	<view id="page">
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title text-grey">任务名称</view>
				<input placeholder="任务名称" name="title" v-model="title"></input>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">任务类型</view>
				<picker @change="bindPickerChange" :value="taskTypeTextIndex" :range="gender" name="gender">
					<view   class="picker">{{gender[taskTypeTextIndex]}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">任务等级</view>
				<picker @change="bindPickerChange3" :value="priorityIndex" :range="gender3" name="gender">
					<view class="picker">{{gender3[priorityIndex]}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">任务状态</view>
				<picker @change="bindPickerChange2" :value="taskTypeIndex" :range="gender2" name="gender">
					<view  class="picker">{{gender2[taskTypeIndex]}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">指派人</view>
				<input placeholder="指派人" name="assigner" v-model="assigner"></input>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey text-grey">计划开始时间</view>
				<picker mode="date" :value="planStartTime" :start="startDate" :end="endDate" @change="changeDate1" name="startTime">
					<view class="picker">{{planStartTime}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">计划结束时间</view>
				<picker mode="date" :value="planEndTime" :start="startDate" :end="endDate" @change="changeDate2" name="startTime">
					<view class="picker">{{planEndTime}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">实际开始时间</view>
				<picker mode="date" :value="actualStartTime" :start="startDate" :end="endDate" @change="changeDate3" name="startTime">
					<view class="picker">{{actualStartTime}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">实际结束时间</view>
				<picker mode="date" :value="actualEndTime" :start="startDate" :end="endDate" @change="changeDate4" name="startTime">
					<view class="picker">{{actualEndTime}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">任务内容</view>
				<textarea placeholder="请输入任务内容" name="desc" v-model="content"></textarea>
			</view>
			<view class="cu-form-group btn">
				<button formType="submit" type="primary" style="width:100%;" >确定</button>
			</view>
			
		</form>
		<view class="cu-tabbar-height"></view>
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
			taskTypeText: '系统研发任务',
			taskTypeTextIndex:0,
			gender : ['系统研发任务', '系统测试任务','市场开发任务', '日常工作任务','其它临时任务'],
			taskType: 0,
			taskTypeIndex: 0,
			gender2 : ['未开始', '已接收','已完成'],
			planEndTime : '',
			priority:0,
			priorityIndex:0,
			gender3:['一级', '二级','三级'],
			show1 : false,
			planStartTime: currentDate,
			show2: false,
			actualEndTime : currentDate,
			show3 : false,
			actualStartTime: currentDate,
			actualEndTime: currentDate,
			show4: false,
			title: '',  
			assigner: '',
			content: '',
			rows:[],
			uuid:''
		}
	},
	components:{
		graceDate
	},
	onLoad(options) {
		
		this.uuid = options.uuId;
		
		this.getDate()
		this.getInfo()
		
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
		getInfo(){
			this.$http
				.post('/office/oaTaskBase/getDetailByUuid', {uuid:this.uuid}, {
					params: {},
					method:'GET', 
				})
				.then(res => {
					this.title =  res.data.title;
					this.gender.forEach((e,index)=>{
						if(res.data.priority==e){
							this.priorityIndex = index
						}
					})
					this.gender2.forEach((e,index)=>{
						if(res.data.taskType==e){
							this.taskTypeIndex = index
						}
					})
					this.gender3.forEach((e,index)=>{
						if(res.data.taskTypeText==e){
							this.taskTypeTextIndex = index
						}
					})
					this.assigner =  res.data.assigner;
					this.planStartTime =  res.data.planStartTime;
					this.planEndTime =  res.data.planEndTime;  
					this.actualStartTime =  res.data.actualStartTime;
					this.actualEndTime =  res.data.actualEndTime;  
					this.content =  res.data.content;
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
		bindPickerChange:function(e){
			console.log(e);
			this.taskTypeText = this.gender[e.detail.value];
		},
		bindPickerChange2:function(e){
			console.log(e);
			this.taskType = e.detail.value;
		},
		bindPickerChange3:function(e){
			console.log(e);
			this.priority = Number(e.detail.value)+1;
			console.log(this.priority)
		},
		
		changeDate1(e) {
			this.planStartTime = e.target.value;
			console.log(e)
		},
		
		changeDate2(e) {
			this.planEndTime= e.target.value
		},
		
		changeDate3(e) {
			this.actualStartTime= e.target.value
		},
		
		changeDate4(e) {
			this.actualEndTime= e.target.value
		},
		formSubmit : function(e){
			if (this.title.length == 0) {
			    uni.showToast({
			        icon: 'none',
			        title: '请填写任务标题！'
			    });
			    return;
			}
			if (this.planStartTime.length == 0) {
			    uni.showToast({
			        icon: 'none',
			        title: '请填写任务开始时间！'
			    });
			    return;
			}
			if (this.planEndTime.length == 0) {
			    uni.showToast({
			        icon: 'none',
			        title: '请填写任务结束时间！'
			    });
			    return;
			}
			if (this.content.length == 0) {
			    uni.showToast({
			        icon: 'none',
			        title: '请填写任务内容！'
			    });
			    return;
			}
			console.log(JSON.stringify(e.detail.value));
			
			let rows = [];
			for (let i = 1; i < 11; i++) {
				rows.push(i);
			}
			this.rows = rows;

			
			var obj = {};
			obj.title = this.title;  
			obj.priority = this.priority;
			obj.taskTypeText = this.taskTypeText;
			obj.status = this.taskType;  
			obj.assigner = this.assigner;
			obj.planStartTime = this.planStartTime;
			obj.planEndTime = this.planEndTime;  
			obj.actualStartTime = this.actualStartTime;
			obj.actualEndTime = this.actualEndTime;  
			obj.content = this.content;
			
			console.log(obj)
			this.$http
				.post('/office/oaTaskBase/update', {obj}, {
					params: {},
				})
				.then(res => {
					var jsondata = res.data;
					console.log("服务器状态码:" + res.statusCode);  
					  
					if (jsondata.statusCode == 200) {  
						console.log("提交成功" + res.statusCode);  
						uni.showToast({  
							icon: 'success',  
							title: '修改成功！'  
						});
						setTimeout(function () {
							uni.navigateTo({
								url:'../task'
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
	.btn{
		padding-top: 30rpx;
	}
</style>

