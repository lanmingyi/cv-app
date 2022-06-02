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
					<view class="list_item_left">车牌号</view>
					<view class="list_item_right">湘A11111</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">目的地</view>
					<view class="list_item_right">长沙</view>
				</view>
				<view class="list_item">
					<view class="list_item_left">用车事由</view>
					<view class="list_item_right">接送客户</view>
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
