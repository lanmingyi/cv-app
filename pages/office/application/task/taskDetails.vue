<template>
	<view class="container" :class="[vtheme]">
		<form>
			<view class="cu-bar bg-box">
				<view class="action">
					<text class="text-black text-bold">{{detailsInfo.title}}</text>
				</view>
			</view>
			<view class="text-box-line"></view>
			<view class="bg-box flex align-center padding-lr padding-tb border-bottom">
				<view class="text-balck text-bold u-font-13">负责人：</view>
				<text class="u-font-13" v-text="detailsInfo.assigner"></text>
			</view>
			<view class=" bg-box flex align-center padding-lr padding-tb border-bottom">
				<view class="text-balck text-bold u-font-13">任务类型：</view>
				<text class="u-font-13" v-text="detailsInfo.taskTypeText"></text>
			</view>
			<view class="border-bottom bg-box flex align-center padding-lr padding-tb u-font-13">
				<text class="text-black text-bold u-font-13">任务状态：</text>
				<text class="text-blue" v-if="detailsInfo.priority==1||detailsInfo.priority==4">未开始</text>
				<text class="text-blue" v-if="detailsInfo.priority==2">已接收</text>
				<text class="text-blue" v-if="detailsInfo.priority==3">已完成</text>
			</view>
			<view class="border-bottom bg-box flex align-center padding-lr padding-tb u-font-13">
				<text class="text-black  text-bold u-font-13">优先级：</text>
				<text class="text-blue" v-if="detailsInfo.priority==1">一级</text>
				<text class="text-blue" v-if="detailsInfo.priority==2">二级</text>
				<text class="text-blue" v-if="detailsInfo.priority==3">三级</text>
			</view>
			<view class="border-bottom bg-box flex align-center padding-lr padding-tb u-font-13">
				<text class="text-black  text-bold u-font-13">计划开始时间：</text>
				<text class="margin-right-sm u-font-13">{{detailsInfo.planEndTime}}</text>
			</view>
			<view class="border-bottom bg-box flex align-center padding-lr padding-tb u-font-13">
				<text class="text-black  text-bold u-font-13">计划结束时间：</text>
				<text class="margin-right-sm">{{detailsInfo.planEndTime}}</text>
			</view>
			<view class="border-bottom bg-box flex align-center padding-lr padding-tb u-font-13 " v-if="detailsInfo.actualStartTime ">
				<text class="text-black  text-bold u-font-13">实际开始时间：</text>
				<text class="margin-right-sm">{{detailsInfo.actualStartTime}}</text>
			</view>
			<view class="border-bottom bg-box flex align-center padding-lr padding-tb u-font-13" v-if="detailsInfo.actualEndTime">
				<text class="text-black  text-bold u-font-13">实际结束时间：</text>
				<text class="margin-right-sm">{{detailsInfo.actualEndTime}}</text>
			</view>
			
			<view class="bg-box flex align-center padding-lr padding-top u-font-13">
				<text class="text-black  text-bold u-font-13">任务内容：</text>
			</view>
			<view class="bg-box flex align-center padding-lr padding-tb u-font-13" >
				<text class="margin-right-sm">{{detailsInfo.content}}</text>
			</view>
			
			<view class="text-box-line"></view>
			<view class="cu-bar no-card bg-box border-bottom padding-tb-xs">
				<view class="action">
					<text class="text-sm">任务进展</text>
				</view>
				<view><text class="cuIcon-right text-black padding-lr"></text></view>
			</view>
			<view class="cu-bar no-card bg-box border-bottom padding-tb-xs">
				<view class="action">
					<text class="text-sm">任务计划</text>
				</view>
				<view><text class="cuIcon-right text-black padding-lr"></text></view>
			</view>
			<view class="cu-bar no-card bg-box border-bottom padding-tb-xs" @click="goToTaskProblem">
				<view class="action">
					<text class="text-sm">任务问题</text>
				</view>
				<view><text class="cuIcon-right text-black padding-lr"></text></view>
			</view>
			<view class="cu-bar no-card bg-box padding-tb-xs">
				<view class="action">
					<text class="cuIcon-file text-blue "></text>
					<text class="text-sm">文件</text>
				</view>
				<view><text class="cuIcon-right text-black padding-lr"></text></view>
			</view>
			
			<view class="text-box-line"></view>
			<view class="cu-bar bg-box border-bottom margin-top-sm">
				<view class="action">
					<view class="text-black text-bold">评论</view>
				</view>
			</view>
			<view class="cu-card bg-box">
				<comment-list :commentList="opinionList"></comment-list>
			</view>
			
			<!-- <view class="send-content padding text-left bg-box margin-top-sm">
				<textarea v-model="remark" class="text-sm" placeholder="请输入评论意见"/>
			</view>
			<view class="art-botton">
				<view class="bg-blue round padding-tb-sm"  @click="sureOpinion">发送</view>
			</view> -->
			<comment-box ref="commentBox" placeholder="评论..." rightText="发送" :height="70" type="textarea" :autoHeight="true"
				:leftIconSize="30" leftIconName="edit-pen-fill" @sure="sureOpinion"></comment-box>
		</form>
	</view>
</template>

<script>
	import commentList from '@/components/custom/pages/commentList.vue';
	import commentBox from '@/components/custom/pages/commentBox.vue';
	export default {
		components:{
			commentList,
			commentBox
		},
		data() {
			return {
				uuid: '',
				detailsInfo: '',
				opinionList: [],
				remark: "",
			};
		},
		methods: {

		},
		onLoad(options) {
			this.uuid = options.uuId;
			console.log(this.uuid);
			this.getDetail()
		},
		methods: {
			goToTaskProblem(){
				console.log("去任务详情-----")
			},
			sureOpinion(remark){
				console.log("remark",remark)
				if(!remark){
					uni.showToast({
						title: "讨论回复不能为空！",
						icon:'none',
						duration: 1000,
					});
				} else {
					uni.showToast({
						title: remark,
						icon:'none',
						duration: 1000,
					});
				}
				this.$refs.commentBox.clear()
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
			}
		}
	}
</script>

<style scoped lang="scss">
/deep/.u-collapse-title{
	font-size: 13px;
}
/deep/.u-collapse-content{
	font-size: 13px;
	font-weight: normal;
	margin-bottom: 10px;
}
/deep/.u-collapse-body{
}
// .container{
// 	background: #fff;
// }
.cu-form-group uni-input,
.cu-form-group uni-textarea{
	font-size: 13px;
}
.cu-form-group uni-textarea{
	border: 1px solid #e7e7e7;
	border-radius: 10px;
	padding:10px 15px;
	margin: 0;
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
.send-content{
	border-radius: 5px;
}
</style>
