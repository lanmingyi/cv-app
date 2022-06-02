<template>
	<view id="mine_detail">
		<view class="mine_list">
			<view class="mine_list">
				<view class="list_item">
					<view class="list_item_left">申请人</view>
					<view class="list_item_right">罗章恒</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">所在部门</view>
					<view class="list_item_right">研发部</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">开始时间</view>
					<view class="list_item_right">2019-03-01  11:10</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">结束时间</view>
					<view class="list_item_right">2019-03-01 16:00</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">加班时长</view>
					<view class="list_item_right">5小时</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">加班事由</view>
					<view class="list_item_right">工作任务未完成</view>
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
		onLoad() {
			
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
