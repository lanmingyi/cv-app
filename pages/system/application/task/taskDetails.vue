<template>
	<view class="container">
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">任务名称</text>
				</view>
				<view class="action">
					<view v-text="detailsInfo.title"></view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">任务类型</text>
				</view>
				<view class="action">
					<view v-text="detailsInfo.taskTypeText"></view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">任务状态</text>
				</view>
				<view class="action">
					<view class="" v-if="detailsInfo.taskType==1||detailsInfo.taskType==4">未开始</view>
					<view class="" v-if="detailsInfo.taskType==2">已接收</view>
					<view class="" v-if="detailsInfo.taskType==3">已完成</view>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">优先级</text>
				</view>
				<view class="action">
					<view class="list_item_right" v-if="detailsInfo.priority==1">一级</view>
					<view class="list_item_right" v-if="detailsInfo.priority==2">二级</view>
					<view class="list_item_right" v-if="detailsInfo.priority==3">三级</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">计划开始时间</text>
				</view>
				<view class="action">
					<view class="list_item_right" v-text="detailsInfo.planEndTime"></view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">计划结束时间</text>
				</view>
				<view class="action">
					<view class="list_item_right" v-text="detailsInfo.planEndTime"></view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">实际开始时间</text>
				</view>
				<view class="action">
					<view class="list_item_right" v-text="detailsInfo.actualStartTime"></view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">实际结束时间</text>
				</view>
				<view class="action">
					<view class="list_item_right" v-text="detailsInfo.actualEndTime"></view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">指派人</text>
				</view>
				<view class="action">
					<view v-text="detailsInfo.assigner"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				uuid:'',
				detailsInfo:''
			};
		},
		methods:{
			
		},
		onLoad(options) {
			
			this.uuid = options.uuId;
			console.log(this.uuid);
			this.getDetail()
			
		},
		methods:{
			getDetail(){
				this.$http
					.post('/office/oaTaskBase/getDetailByUuid', {uuid:this.uuid}, {
						params: {},
					})
					.then(res => {
						this.detailsInfo =  res.data;  
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: err.data.message,
							icon: 'none'
						});
					});
			}
		}
	}
</script>

<style>

</style>
