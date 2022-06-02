<template>
	<view style="width: 100%;">
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="'background-image:url(' + userInfo.avatar + ')'"></view>
						<view class="content flex-sub">
							<view>{{userInfo.userName}}</view>
							<!-- <view class="text-gray   flex justify-between">
								等待审批
							</view> -->
						</view>
					</view>
				</view>
				<view class="pass">
					<image :class="pass?'passImg':'rejectImg'" :src="pass?'../../static/img/pass.png':'../../static/img/reject.png'"></image>
				</view>
				<view class="content margin">
					<view class="text-gray text-content text-df">
						休假标题 <text v-text="detailsInfo.title" class="text-black margin-left"></text>
					</view>
					<view class="text-gray text-content text-df">
						休假类型 <text v-text="detailsInfo.item" class="text-black margin-left"></text>
					</view>
					<view class="text-gray text-content text-df">
						休假时长 <text v-text="detailsInfo.days" class="text-black margin-left"></text>
					</view>
					<view class="text-gray text-content text-df">
						开始时间 <text class="text-black margin-left">{{detailsInfo.beginTime}}</text>
					</view>
					<view class="text-gray text-content text-df">
						结束时间 <text class="text-black margin-left">{{detailsInfo.endTime}}</text>
					</view>
					<view class="text-gray text-content text-df">
						休假原因 <text v-text="detailsInfo.reason" class="text-black margin-left"></text>
					</view>
				</view>
			</view>
			<view class="cu-timeline margin-top">
				<view class="cu-item cuIcon-noticefill" v-for="(item, index) in stepList" :key="index" :class="item.comment || changIndex == index + 1 ? 'text-orange' : ''">
					<view class="content shadow-blur " >
						<view class="flex justify-between flex-wrap">
							<view class="flex align-center flex-wrap">
								<text class="cu-tag bg-green  light" v-if="item.comment">已完成</text>
								<text class="cu-tag bg-red   light " v-if="changIndex == index && !item.comment">进行中</text>
								【{{ item.activityName }}】
							</view>
							
						</view>
						<view class="margin-top" v-if="item.comment"><text class="cuIcon-mark margin-right-xs"></text>{{ item.comment.message }}</view>
						<view class="margin-top flex justify-between">
							<view v-if="item.comment">
								<text  class="cuIcon-people margin-right-xs"></text><text> {{ item.userName }}</text>
							</view>
							<view v-if="item.comment">
								<text  class="cuIcon-time margin-right-xs"></text>{{ item.serchTime }}</view>
							</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grid solid-top" v-if="btnText.length != 0">
			<view class="flex flex-direction" v-for="(item,index) in btnText" :key="index" @tap="showModal(item)">
				<button class="cu-btn lg" :class="item.nodeButtonName=='驳回'?'text-blue':'bg-blue'">{{item.nodeButtonName}}</button>
			</view>
			<!-- <view class="flex flex-direction" @tap="showModal" data-target="Modal">
				<button class="cu-btn lg" :class="btnText[0]=='驳回'?'text-blue':'bg-blue'">{{item}}</button>
			</view> -->
		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">审批意见</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view>
						<textarea maxlength="-1" @input="textareaAInput" placeholder="审批意见"></textarea>
					</view>
					<button class="cu-btn bg-blue lg margin-top" @tap="submit">提交</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			title: '',
			priority: '',
			taskTypeText: '',
			taskType: '',
			assigner: '',
			planStartTime: '',
			planEndTime: '',
			actualStartTime: '',
			actualEndTime: '',
			content: '',
			uuid: '',
			detailsInfo: '',
			btnText: [],
			modalName: null,
			comment: '',
			processInstanceId: '',
			stepList: [],
			changIndex: '',
			pass:false,
			tabIndex:0,
			type:0,
		};
	},
	onLoad(options) {
		uni.showLoading({
			title:'加载中...'
		})
		console.log(options);
		this.uuid = options.uuId;
		this.type = options.type;
		this.taskId = options.taskId;
		this.processDefinitionId = options.processDefinitionId;
		this.processInstanceId = options.processInstanceId;
		this.tabIndex = options.index
		this.nodeId=options.nodeId
		this.modelKey=options.modelKey
		// this.getDetail()
		if (options.type == 'backlog') {
			// this.getBtns();
		}
		this.getStep();
	},
	computed: mapState(['hasLogin', 'userInfo']),
	methods: {
		textareaAInput(e) {
			this.comment = e.detail.value;
		},
		formatDate(strTime) {
			var date = new Date();
			var seperator1 = '-';
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = '0' + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = '0' + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			return currentdate;
		},
		submit() {
			let values = {
				processInstanceId:this.processInstanceId,
				taskId:this.taskId,
				processDefinitionId:this.processDefinitionId
			}
			if (this.type === 1) {
			  values.outcome = '同意'
			} else {
			  values.outcome = '驳回'
			}
			values.message = this.comment
			values = Object.assign(values,this.detailsInfo)
			this.$http
				.post('/workflow/apiFlowableTask/agree', values)
				.then(res => {
					if(res.data.statusCode===200){
						uni.redirectTo({
						    url: 'flow'
						});
						this.modalName = null;
					}
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					});
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err.data.message,
						icon: 'none'
					});
				});
			
		},
		myFunction(remarkime){
		    var dateee = new Date(remarkime).toJSON();
		    var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
		    return date
		},
		getStep() {
			let url = ''
			if(this.tabIndex==2){
				url = '/workflow/apiFlowableTask/historyClickDetails'
			}
			else{
				url = '/workflow/apiFlowableProcessInstance/clickStartProcess'
			}
			this.$http
				.post(url, {taskId:this.taskId,
				processDefinitionId:this.processDefinitionId,
				processInstanceId:this.processInstanceId,
				modelKey:this.modelKey,
				nodeId:this.nodeId,
				businessKey:this.uuid})
				.then(res => {
					if(res.data.statusCode===300||!res.data.businessData){
						uni.showToast({
							title: '此流程未与表单关联',
							icon: 'none'
						});
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})
						},1000)
					} else {
						uni.hideLoading()
						console.log(res);
						this.detailsInfo = res.data.businessData;
						this.stepList = res.data.commentBeanList
						if (this.type == 'backlog') {
							this.btnText = res.data.flowNodeButtons
						}
						
						console.log(this.stepList[0].comment.message)
						let cur = true;
						this.stepList.forEach((e,index)=>{
							if (e.comment) {
								e.serchTime = this.myFunction(e.comment.time)
							}
							if (cur) {
								if (index != 0 && !e.comment) {
									console.log('www', index);
									this.changIndex = index;
									cur = false;
								}
							}
						})
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

		showModal(e) {
			this.modalName = 'Modal'
			if(e == '同意'){
				this.type = 1
			}
			else{
				this.type = 0
			}
		},
		hideModal(e) {
			this.modalName = null;
		}

	},
}
</script>

<style>
	/* 	.cu-avatar{
		position: absolute;
		top: 30rpx;
		left: 26rpx;
		z-index: 999;
	} */
	
	textarea{
		text-align: left;
		/* margin-top: -40vh !important; */
		width: 100%;
		height: 100%;
		font-size: 30rpx;
	}
	
	.padding-xl view{
		padding: 30rpx;
		height: 500rpx;
		background-color: #ffffff;
	}
	
	.cu-timeline{
		margin-bottom: 100rpx;
	}
	
	.cu-dialog {
		width: 100%;
		height: 100%;
		border-radius: 0px;
	}
	
	.padding-xl{
		height: 100%;
	}
	
	.padding-xl .cu-btn{
		width: 100%;
	}
	
	.grid button{
		width: 130rpx;
		height: 60rpx !important;
		margin: 20rpx;
		padding: 0 !important;
	}
	
	.passImg{
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		width: 215rpx;
		height: 170rpx;
		transform:rotate(-45deg);
		-ms-transform:rotate(-45deg);
		-moz-transform:rotate(-45deg);
		-webkit-transform:rotate(-45deg);
		-o-transform:rotate(-45deg);
	}
	
	.rejectImg{
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		width: 170rpx;
		height: 170rpx;
		transform:rotate(-20deg);
		-ms-transform:rotate(-20deg);
		-moz-transform:rotate(-20deg);
		-webkit-transform:rotate(-20deg);
		-o-transform:rotate(-20deg);
	}
	
	.grid{
		position: fixed;
		bottom: 0;
		right: 0;
		background-color: white;
		width: 100%;
		flex-direction: row-reverse
	}
	
	.cu-card>.cu-item{
		margin: 0;
	}
	
	.content .text-content{
		line-height: 50rpx;
	}
	.shadow-blur{
		background: #F8F8F8 !important;
	}
</style>

