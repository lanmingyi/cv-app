<template>
	<view class="container " :class="[vtheme]" v-if="journalData">
		<view class="bg-box">
			<view class="padding-lr padding-top-sm padding-bottom-xs">
				<view class="text-black text-bold padding-right-sm">
					{{journalData.logTitle}}
				</view>
			</view>
			<view class="padding-bottom">
				<view class="margin-left">
					<view class="text-balck u-font-13 margin-right-sm">发起人：{{journalData.creator}}</view>
					<view class="text-balck u-font-13">发起时间：{{journalData.createTime}}</view>
				</view>
			</view>
			
			<view class="text-box-line"></view>
			<u-form :model="journalData" ref="uForm"  class="u-padding-bottom-40 bg-box">
				<view class="padding-lr">
					<view v-if="typeId && typeId == 1">
						<u-form-item label-width="180" label-position="top" label="日志内容" >
							<u-input :border="false" v-model="journalData.logContent" type="text" disabled placeholder="暂无"></u-input>
						</u-form-item>
					</view>
					
					<view v-if="typeId && typeId == 2">
						<u-form-item label-width="180" label-position="top" label="今日完成工作" >
							<u-input :border="false" v-model="journalData.logContent" type="text" disabled placeholder="暂无"></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="未完成工作" >
							<u-input :border="false" v-model="journalData.logPlan" type="text" disabled placeholder="暂无"></u-input>
						</u-form-item>
					</view>
					
					<view v-if="typeId && typeId == 3">
						<u-form-item label-width="180" label-position="top" label="本周完成工作" >
							<u-input :border="false" v-model="journalData.logContent" type="text" disabled placeholder="暂无"></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="本周工作总结" >
							<u-input :border="false" v-model="journalData.logSummary" type="text" disabled placeholder="暂无"></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="下周工作计划" >
							<u-input :border="false" v-model="journalData.logPlan" type="text" disabled placeholder="暂无"></u-input>
						</u-form-item>
					</view>
					
					<view v-if="typeId && typeId == 4">
						<u-form-item label-width="180" label-position="top" label="本月完成工作" >
							<u-input :border="false" v-model="journalData.logContent" type="text" disabled placeholder="暂无"></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="本月工作总结" >
							<u-input :border="false" v-model="journalData.logSummary" type="text" disabled placeholder="暂无"></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="下月工作计划" >
							<u-input :border="false" v-model="journalData.logPlan" type="text" disabled placeholder="暂无"></u-input>
						</u-form-item>
					</view>
					
					<view v-if="typeId && typeId != 1">
						<u-form-item label-width="180" label-position="top" label="需协调工作" >
							<u-input :border="false" v-model="journalData.logCoordinate" type="text" disabled placeholder="暂无"></u-input>
						</u-form-item>
					</view>
					
					<u-form-item label-width="180" label-position="top" label="备注" class="border-bottom-none">
						<u-input :border="false" v-model="journalData.logRemarks" type="text" disabled placeholder="暂无"></u-input>
					</u-form-item>
				</view>
				
				<view class="text-box-line "></view>
				
				<view class="padding-lr">
					<u-form-item label-width="180" label-position="top" label="日志接收人" class="border-bottom-none">
						<view class="padding-top-sm flex align-center flex-wrap ">
							<view class="" v-for="(item,index) in reservList" :key="index">
								<view :class="[item.lookState == 1?'cuIcon-roundcheck text-green':'cuIcon-round text-gray','margin-right']">
									<text class="margin-left-sm u-font-13">{{item.userName}}</text>
								</view>
							</view>
						</view>
					</u-form-item>
				</view>
				
			</u-form>
			
			<view class="text-box-line margin-bottom-sm"></view>
			<view class="cu-bar bg-box border-bottom">
				<view class="action">
					<view class="text-black text-bold">评论</view>
				</view>
			</view>
			<view class="cu-card margin-bottom-max">
				<comment-list :commentList="opinionList"></comment-list>
			</view>
			
			<!-- :height="70" -->
			<comment-box ref="commentBox" placeholder="评论..." rightText="发送" type="textarea" :autoHeight="true"
				:leftIconSize="30" leftIconName="edit-pen-fill" @sure="sendComment"></comment-box>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import commentList from '@/components/custom/pages/commentList.vue';
	import commentBox from '@/components/custom/pages/commentBox.vue';
	export default {
		components: {commentList,commentBox},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				InputBottom: 0,
				commentValue: '',
				journalData: '',
				reservList: [],
				opinionList: [],
				logUuid : '',
				typeId: ''
			};
		},
		onLoad(options) {
			let uuid = options.uuid
			let selectedIndex = options.selectedIndex
			this.logUuid = options.uuId
			this.getData()
			this.getReceiveList()
			this.getCommentList()
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getData(){
				var that = this;
				that.$http
					.post('/office/oaWorkLog/getDetailByUuid', {
						uuid: that.logUuid
					}, {
						params: {},
					})
					.then(res => {
						that.journalData = res.data
						if(res.data.logStatus == '日志'){
							this.typeId = 1
						} else if(res.data.logStatus == '日报'){
							this.typeId = 2
						} else if(res.data.logStatus == '周报'){
							this.typeId = 3
						} else if(res.data.logStatus == '月报'){
							this.typeId = 4
						}
					})
					.catch(err => {});
			},
			getReceiveList(){
				var that = this;
				that.$http
					.post('/office/oaWorkLogReceive/getLogReceiveList', {
						logUuid: that.logUuid
					}, {
						params: {},
					})
					.then(res => {
						that.reservList = res.data
					})
					.catch(err => {});
			},
			getCommentList(){
				var that = this;
				that.$http
					.post('/office/oaWorkLogComment/getCommentList', {
						logUuid: that.logUuid
					}, {
						params: {},
					})
					.then(res => {
						that.opinionList = res.data
					})
					.catch(err => {});
			},
			sendComment(commentValue){
				console.log("评论值----",commentValue)
				if(!commentValue){
					uni.showToast({
					    title: '请给与评论意见！',
							icon: 'none',
					    duration: 1000
					});
				} else {
					this.$http
						.post('/office/oaWorkLogComment/saveCommentData', {
							logUuid: this.logUuid,
							content: commentValue
						}, {
							params: {},
						})
						.then(res => {
							if (res.data === 1 || res.data.statusCode === 200){
								this.$refs.commentBox.clear()
								uni.showToast({
								    title: '发送成功',
										icon: 'none',
								    duration: 1000
								});
								this.opinionList = []
								this.getCommentList()
							} else {
								uni.showToast({
								    title: '发送失败！',
										icon: 'none',
								    duration: 1000
								});
							}
						})
						.catch(err => {});
				}
			},
			formSubmit(){
				let tips = ""
				if(!this.conplaint.purchaseVolume){
					tips = "请输入采购量！"
				} else if(!this.conplaint.companyName){
					tips = "请输入公司名称！"
				} else if(!this.conplaint.contacts){
					tips = "请输入联系人！"
				} else if(!this.conplaint.telephone){
					tips = "请输入联系电话！"
				} else if(!this.conplaint.email){
					tips = "请输入联系邮箱！"
				} else {
					tips = "请输入投诉意见！"
				}
				if(tips){
					uni.showToast({
					    title: tips,
							icon: 'none',
					    duration: 1000
					});
				} else {
					console.log("投诉建议",this.conplaint)
				}
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
	.botton-input{
		width: 540rpx;
		line-height: 60rpx;
		height: 60rpx;
		padding-left: 20rpx;
		border-radius: 10rpx;
		
	}
}
.input-backGround{
	background: #f1f1f1;
	font-size: 12px;
}
</style>
