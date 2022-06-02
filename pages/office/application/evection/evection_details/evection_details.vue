<template>
	<view id="mine_detail">
		<view class="mine_list">
			<view class="mine_list">
				<view class="list_item">
					<view class="list_item_left">开始时间</view>
					<view class="list_item_right">2019-03-01  8:30</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">结束时间</view>
					<view class="list_item_right">2019-03-20  17:30</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">出发城市</view>
					<view class="list_item_right">湖南长沙</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">目的城市</view>
					<view class="list_item_right">北京</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">交通工具</view>
					<view class="list_item_right">飞机</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">出差天数</view>
					<view class="list_item_right">普通签到</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">出差备注</view>
					<view class="list_item_right">为客户解决问题</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">同行人员</view>
					<view class="list_item_right">
						<text>赵峡策</text>
						<text>宋景明</text>
						<text>罗章恒</text>
						<text>黄婷</text>
					</view>
				</view>
			</view>
			<view class="btn">
				<button type="primary"></button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		onLoad(options) {
			var uuid = options.taskId;
			console.log(uuid);
			uni.request({
				url: this.$baseUrl+'/office/oaLeave/getDetailByUuid', 
				dataType:'json',
				method:'POST', 
				header: {
					'content-type' : 'application/json',
					'token':token
				},
				data:{
					uuid:uuid
				},
				success:(res) => {
					this.res = '请求结果 : ' + JSON.stringify(res);
					
					// console.log(res)
				},
				fail:(error) => {
					console.log(error)
				}
			});
		}
	}
</script>

<style>
.list_item{
	padding: 20upx;
	/* display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: nowrap; */
	border-bottom: 1px solid #ccc;
}
.list_item_left{
	width: 130upx;
	color: #999;
	float: left;
}
</style>
