<template>
	<view id="table">
		<view class='title'>
			<view>姓名</view>
			<view>年龄</view>
			<view>性别</view>
			<view>班级</view>
		</view>
		<view class='body' v-for="(item, index) in students" :key="index" :style='index % 2 != 0 ? "background:#F1F2F3":""'>
			<view>{{item.name}}</view>
			<view>{{item.age}}</view>
			<view>{{item.gender}}</view>
			<view>{{item.classroom}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				students: [{
						name: "jack",
						age: 18,
						gender: "男",
						classroom: "一年级一班"
					},
					{
						name: "lucy",
						age: 18,
						gender: "女",
						classroom: "一年级二班"
					},
					{
						name: "小米",
						age: 19,
						gender: "男",
						classroom: "一年级五班"
					},
					{
						name: "lucy",
						age: 18,
						gender: "女",
						classroom: "一年级二班"
					},
					{
						name: "graceUI",
						age: 18,
						gender: "男",
						classroom: "hcoder"
					}
				]
			}
		},
	}
</script>
<style>
	#table {
		width: 100%;
		padding: 30upx;
		background-color: white;
	}

	.title {
		width: 100%;
		height: 100upx;
		background-color: #d8d9da;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		text-align: center;
	}

	.title view {
		line-height: 100upx;
		border-right: 1upx solid #a3a3a3;
	}
	
	.title view:last-child,.body view:last-child {
		border-right: none;
	}
	
	.body {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		text-align: center;
		background-color: #fcfbfe;
	}
	
	.body view {
		line-height: 100upx;
		border-right: 1upx solid #a3a3a3;
		border-top: 1upx solid #a3a3a3;
	}
</style>
