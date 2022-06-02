<template>
	<view class="container" :class="[vtheme]">
		<form>
<!-- 			<view class="cu-bar bg-box">
				<view class="action">
					
					<view class="text-black text-bold">任务名称</view>
				</view>
			</view> -->
			<view class="cu-form-group">
				<!-- <view class="text-balck text-bold text-font-13">任务名称：</view> -->
				<text class="cuIcon-calendar text-green margin-right-sm"></text>
				<input placeholder="请为您的日程、活动等添加名称" name="input" v-model="schedulerData.title" ></input>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1" v-model="schedulerData.text" placeholder="请输入任务描述"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="text-balck text-bold text-font-13 flex align-center">事件类型：</view>
				<input placeholder="事件类型" name="input" v-model="schedulerData.eventTypeName" disabled @click="()=>{showType=true}"></input>
			</view>
			<view class="cu-form-group">
				<view class="text-balck text-bold text-font-13">任务时间：</view>
			</view>
			<view class="padding-lr padding-bottom padding-top-xs flex align-center justify-around">
				<view style="width: 50%; border-right: 1px solid #303030;" class="padding-left-xl">
					<view class="text-sm" @click="()=>{showStartTime=true}">{{schedulerData.startDate ? schedulerData.startDate :'开始时间'}}</view>
					<u-picker mode="time" v-model="showStartTime" :params="params" @confirm="confirmStart"></u-picker>
				</view>
				<view style="width: 50%;" class="padding-left-xl">
					<view class="text-sm" @click="()=>{showEndTime=true}">{{schedulerData.endDate ? schedulerData.endDate :'结束时间'}}</view>
					<u-picker mode="time" v-model="showEndTime" :params="params" @confirm="confirmEnd"></u-picker>
				</view>
			</view>
			
			<view class="text-box-line"></view>
			<view class="cu-form-group flex align-center justify-between" @click="gouserPopup(1)">
				<view class="text-balck text-bold text-font-13">参与人</view>
				<view class="action flex align-center">
					<text class="cuIcon-right text-grey"></text>
				</view>
			</view>
			<view class="margin-bottom-max padding-lr flex align-center flex-wrap">
				<view v-for="(tag, index) in query" :key="index" class="margin-right-sm margin-bottom">
					<u-tag :text="tag.name" type="primary" shape="circleRight" :closeable="true" mode="light" @close="close(tag,index)" :show="true" size="mini" />
				</view>
			</view>
		</form>
		
		<u-select @click="showType = true" mode="single-column" v-model="showType" :list="typeList" @confirm="confirmType" @cancel="()=>{showType=false}"></u-select>
		

		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="cu-botton-submit text-center"  @click="formSubmit">完成</view>
		</view>
		
		<user-popup :showPop="showPop" @cancle="()=>{showPop = false}" ref="userPop" @change="changeUser">
		</user-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				schedulerData: {
					startTime: '',
					endTime:''
				},
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false,
					timestamp: true,
				},
				showStartTime: false,
				showEndTime: false,
				isChoose: [],
				query:[],
				joinUser: '',
				joinUserId: '',
				typeList: [
					{
						value: 1,
						label: '工作'
					},
					{
						value: 2,
						label: '会议'
					},
					{
						value: 3,
						label: '出差'
					},
					{
						value: 4,
						label: '休闲'
					},
					{
						value: 5,
						label: '其它'
					}
				],
				showType:false,
				isChoose: [],
				query:[],
				showPop:false,
				type: ''
			};
		},
		onLoad(options) {
			this.type = options.type
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			confirmType(e){
				console.log("e----",e)
				this.$nextTick(()=>{
					this.schedulerData.eventTypeName = e[0].label
					this.schedulerData.eventType = e[0].value
				})
			},
			changeUser(list,type){
				console.log("list----",list,type)
				this.query = list
				this.showPop=false
			},
			close(tag,index){
				this.query.splice(index,1)
			},
			gouserPopup(type){
				let items = this.isChoose.length>0?JSON.stringify(this.isChoose):JSON.stringify(this.query)
				this.$refs.userPop.onRefresh({type:1,item: items})
				this.showPop=true
			},
			confirmStart(e) {
				let input = '';
				if (this.params.year) input += e.year;
				if (this.params.month) input += '-' + e.month;
				if (this.params.day) input += '-' + e.day;
				if (this.params.hour) input += ' ' + e.hour;
				if (this.params.minute) input += ':' + e.minute;
				if (this.params.second) input += ':' + e.second;
				console.log("input------start",input);
				this.schedulerData.startDate = input
			},
			confirmEnd(e) {
				console.log(e);
				let input = '';
				if (this.params.year) input += e.year;
				if (this.params.month) input += '-' + e.month;
				if (this.params.day) input += '-' + e.day;
				if (this.params.hour) input += ' ' + e.hour;
				if (this.params.minute) input += ':' + e.minute;
				if (this.params.second) input += ':' + e.second;
				console.log("input------end",input);
				this.schedulerData.endDate = input
			},
			formSubmit(){
				let tips = ""
				if(!this.schedulerData.title){
					tips = "请输入日程名称！"
				} else if(!this.schedulerData.text){
					tips = "请输入事件描述！"
				} else if(!this.schedulerData.eventTypeName){
					tips = "请选择事件类型！"
				}
				// else if(!this.schedulerData.organizer){
				// 	tips = "请选择组织人！"
				// }
				if(tips){
					uni.showToast({
					    title: tips,
							icon: 'none',
					    duration: 1000
					});
				} else {
					console.log("新建日程",this.conplaint)
					this.saveData()
				}
			},
			saveData(){
				var that = this;
				let name = []
				let nameid = []
				that.query.forEach(val=>{
					name.push(val.name)
					nameid.push(val.id)
				})
				that.joinUser = name.join(',')
				that.joinUserId = nameid.join(',')
				let params = {
					...that.schedulerData, 
					type: that.type,
					joinUser: that.joinUser,
					joinUserId: that.joinUserId,
					isApp:'true'
				}
				console.log("params---", params)
				that.$http
					.post('/office/scheduler/save', 
					{calendarInfo: JSON.stringify(params)}, {
						params: {},
					})
					.then(res => {
						console.log("res----",res,res.data)
						uni.showToast({
						    title: res.data.message,
								icon: 'none',
						    duration: 1000
						});
						that.$nextTick(()=>{
							var pages = getCurrentPages();
							var currPage = pages[pages.length - 1]; //当前页面
							var prevPage = pages[pages.length - 2]; //上一个页面
							console.log("prevPage----",prevPage)
							prevPage.$vm.changelist()
							uni.navigateBack();
						})
					})
					.catch(err => {});
			},
		}
	};
</script>

<style lang="scss" scoped>
.pos-strike{
	position: sticky;
	top: 0;
	z-index: 5;
}
.cu-form-group uni-input,
.cu-form-group uni-textarea{
	font-size: 13px;
}
.cu-form-group uni-textarea{
	min-height: 200px !important;
	border: 1px solid #e7e7e7;
	border-radius: 10px;
	padding:10px 15px;
}
.text-font-13{
	font-size: 13px !important;
}
.botton-bottom{
	position: fixed;
	bottom: 20px;
	left: 0;
	right: 0;
	z-index: 5;
}
.art-botton{
	width: 80%;
	margin: 60rpx auto;
	text-align: center;
}
</style>
