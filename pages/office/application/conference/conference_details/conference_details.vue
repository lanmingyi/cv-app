<template>
	<view id="mine_detail">
		<view class="mine_list">
			<view class="mine_list">
				<view class="list_item">
					<view class="list_item_left">地点</view>
					<view class="list_item_right">会议室</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">主题</view>
					<view class="list_item_right">周例会</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">日期</view>
					<view class="list_item_right">2019-03-01  周五</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">时间</view>
					<view class="list_item_right">16:00</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">发起人</view>
					<view class="list_item_right">赵峡策</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">签到模式</view>
					<view class="list_item_right">普通签到</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">会议内容</view>
					<view class="list_item_right">上周工作总结，下周工作计划上周工作总结，下周工作计划上周工作总结，下周工作计划上周工作总结，下周工作计划上周工作总结，下周工作计划</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">参与人员</view>
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
