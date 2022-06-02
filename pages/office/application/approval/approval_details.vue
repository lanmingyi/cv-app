<template>
	<view class="container bg-box" :class="[vtheme]">
		<view class="cu-list menu">
			<view class="cu-item margin-bottom-sm">
				<view class="content flex align-center">
					<view class="cuIcon-roundcheckfill margin-right" :class="detailsInfo.status == 2 ? 'text-olive' : 'text-gray'"></view>
					<text class="text-black text-bold">{{detailsInfo.title}}</text>
				</view>
			</view>
			<view class="border-bottom  flex align-center padding-lr padding-tb-sm   ">
				<text class="text-black margin-right-sm">审批编号:</text>
				<text class="text-black" v-text="detailsInfo.assigner"></text>
			</view>
			<view class="border-bottom  flex align-center padding-lr padding-tb-sm   ">
				<text class="text-black margin-right-sm">补卡班次:</text>
				<text class="text-black" v-text="detailsInfo.taskTypeText"></text>
			</view>
			<view class="border-bottom  flex align-center padding-lr padding-tb-sm   ">
				<text class="text-black margin-right-sm">补卡时间:</text>
				<text class="text-black ">{{detailsInfo.planEndTime}}</text>
			</view>
			<view class=" flex align-center padding-lr padding-tb-sm   ">
				<text class="text-black margin-right-sm text-nowrap">补卡理由:</text>
				<text class="text-black ">{{detailsInfo.content}}</text>
			</view>
			
			<!-- <view class="cu-bar bg-box border-bottom margin-top-sm">
				<view class="action">
					<view class="text-black text-bold">流程</view>
				</view>
			</view>
			<view class="bg-box   ">
				<uni-steps :options="stepsList" direction="column" :active="1"></uni-steps>
			</view> -->
			
			<view class="cu-bar bg-box border-bottom margin-top-sm">
				<view class="action">
					<view class="text-black text-bold">评论意见</view>
				</view>
			</view>
			<view class="cu-card bg-box">
				<comment-list :commentList="opinionList"></comment-list>
			</view>
			
			<!-- <view class="text-box-line"></view>
			<view class="cu-bar bg-box border-bottom margin-top-sm">
				<view class="action">
					<view class="text-black text-bold">发起评论</view>
				</view>
			</view>
			<view class="send-content padding text-left bg-box margin-top-sm">
				<view class="padding-bottom u-font-18 text-blue" @click="()=>{visible = true,$refs.userPop.getOrganizationList(1)}">@</view>
				<textarea v-model="remark" class="text-sm" placeholder="评论"/>
			</view> -->
			
			
			<view class="art-botton">
				<view class="bg-blue round padding-tb-sm"  @click="()=>{showPop= true}">发起评论</view>
			</view>
			
			
		</view>
		<comment-pop ref="commentPop" :showPop="showPop" placeholder="发起评论..." @close="()=>{showPop = false}" @sure="sureOpinion"></comment-pop>
	</view>
</template>

<script>

	
	import commentList from '@/components/custom/pages/commentList.vue';
	import commentPop from '@/components/custom/pages/commentPop.vue';
	
	export default {
		components:{
			commentList,commentPop,
		},
		data() {
			return {
				uuid: '',
				detailsInfo: '',
				opinionList: [{
					personName: '张三三',
					remark: '任务已解决，等待上传最新代码',
					modifyTime: '2021-01-28 21:04:02'
				},{
					personName: '李斯思',
					remark: '收到',
					modifyTime: '2021-01-30 21:04:02'
				}],
				remark: "",
				stepsList: [{
					title: '发起审批',
					desc: '2021-04-21 18:24:30'
				}, {
					title: '人力部经理',
					desc: '2021-04-21 18:59:30'
				}, {
					title: '财务部经理',
					desc: '2021-04-22 08:14:30'
				}, {
					title: '审批完成',
					desc: '2021-04-22 10:14:30'
				}],
				visible:false,
				checkUserList: [],
				showPop:false,
			};
		},
		methods: {

		},
		onLoad(options) {
			this.uuid = options.uuId;
			console.log(this.uuid);
			// this.getDetail()
			this.detailsInfo = {
					taskType: 2,
					priority:'1',
					taskTypeText: "系统测试任务",
					title: "为什么自动驾驶诉讼不断？",
					planEndTime: "2021-01-28 11:19:59",
					planEndTime: "2021-01-28 11:19:59",
					actualStartTime:"2021-01-28 11:19:59",
					actualEndTime:"2021-01-28 11:19:59",
					assigner: "张莹莹",
					content: "根据开发进度紧随测试  需要在年底30号之前完成第一轮测试  第二轮测试和回归测试   保证上线前无Bug"
				}
			// console.log("options---", this.detailsInfo)
		},
		methods: {
			sureOpinion(remark,list){
				console.log("remark", remark,list)
				uni.showToast({
					title: remark,
					icon: 'none',
					duration: 1000,
				});
				this.showPop = false
				// console.log("remark",this.remark)
				// if(!this.remark){
				// 	uni.showToast({
				// 		title: "讨论回复不能为空！",
				// 		icon:'none',
				// 		duration: 1000,
				// 	});
				// } else {
				// 	uni.showToast({
				// 		title: this.remark,
				// 		icon:'none',
				// 		duration: 1000,
				// 	});
				// }
			},
			getDetail() {
				this.$http
					.post('/office/oaTaskBase/getDetailByUuid', {
						uuid: this.uuid
					}, {
						params: {},
					})
					.then(res => {
						this.detailsInfo = res.data;
					})
					.catch(err => {
					});
			},
			changeRemark(event){
				const {value,cursor} = event.detail
				
				console.log(value[cursor-1])
				if(value[cursor-1]==='@'){
					this.visible = true
					this.$refs.userPop.getOrganizationList(1)
				}
				
			},
			getRemarkUser(list){
				if(list){
					list.forEach((val,index)=>{
						let data = this.checkUserList.find(e=>e.name == val.name)
						// if(!data)this.remark += this.checkUserList.length == 0 && index > 0 ? ' @'+val.name : val.name
						if(!data)this.remark += ' @'+val.name
					})
				}
				this.visible = false
				this.$nextTick(function(){
					this.checkUserList = this.checkUserList.concat(list)
					console.log("checkUserList",this.checkUserList)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.cu-list.menu>.cu-item .content{
	font-size: 28rpx;
}
.art-opinion{
	width: 100%;
	padding-bottom: 40rpx;
}
.send-content{
	// width: 95%;
	// margin: 20rpx auto 0;
	border-radius: 10rpx;
}
.art-botton{
	// position: fixed;
	// bottom: 0;
	// left: 0;
	// right: 0;
	// z-index: 3!important;
	width: 80%;
	margin: 60rpx auto;
	text-align: center;
}
</style>
