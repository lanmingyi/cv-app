<template>
	<view id="data-table">
		<graceHeader title="数据表格" desc="请规划好布局后修改对应的样式"></graceHeader>
		<!-- 数据表格开始 -->
		<view class="title">
			<!-- 左侧区域 -->
			<view class="table-left">
				<view class="table-title">
					左侧标题
				</view>
				<view class="table-title" v-for="(item, index) in leftTitle" :key="index">名称{{item}}</view>
			</view>
			<!-- 右侧侧区域 -->
			<scroll-view class="table-right" scroll-x="true">
				<view class="table-title">
					<view>标签1</view>
					<view>标签2</view>
					<view>标签3</view>
					<view>标签4</view>
				</view>
				<view class="rows" v-for="(item, index) in rightData" :key="index">
					<view class="items">1.55</view>
					<view class="items colorYellow">95.88%</view>
					<view class="items">16.25%</view>
					<view class="items colorYellow">2018-09-26</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
//此数组仅用于演示循环数据
var forData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
export default {
	data() {
		return {
			leftTitle : forData,
			rightData : forData
		}
	}
}
</script>
<style>
/* 说明 请规划 .rows 的宽度 如内部有4个项目 每个 200 upx 则宽度 = 200 * 4 upx */
#data-table{
	width: 100%;
}
.title {
	width: 100%;
	height: 100upx;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	text-align: center;
}
.table{display:flex; flex-wrap:nowrap; justify-content:space-between; width:100%;}
.table-right{
	width:539upx;
}
.table-left{
	display: grid;
	text-align: center;
	width:200upx;
	height: 0;
	margin-right: 10upx;
}
.table-title{
	border-bottom: 1upx solid #e6e6e6;
	height: 100upx;
	line-height: 100upx;
	background-color: white;
}
.table-right .table-title{
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	text-align: center;
	width:800upx;
}
.table-right .table-title view{
	line-height: 100upx;
	height: 100upx;
	line-height:100upx;
	font-size:30upx;
	text-align:center;
	width:100%;
}
.table-right .rows view{
	line-height: 100upx;
	height: 100upx;
	text-align: center;
	width:200upx;
	border-bottom: 1upx solid #e6e6e6;
}
.table-right .rows{
	background-color: white;
	line-height: 100upx;
	height: 100upx;
	width:800upx;
	display:flex;
	flex-wrap:nowrap;
}
/* 颜色示例 */
.colorYellow{color:#F4711E !important;}
</style>
