<template>
	<view id="page">
		<view class="grace-list">
			<view class='items' @tap="go_tel">
				<view class="icons">
					<text class="font">&#xe602;</text>
				</view>
				<view class="title">通讯录</view>
				<view class="arrow-right"></view>
			</view>
		</view>
		<htmlchat class="content"></htmlchat>	
	</view>
</template>

<script>
	import htmlchat from '../htmlchat/htmlchat';
	var _self, x, y;
	export default {
		components: {
			htmlchat
		},
		data() {
			
		},
		methods:{
			
			go_tel :function () {
				uni.navigateTo({
					url:"../telephone"
				})
			}
		}
	}
</script>

<style>
	.grace-list{
		padding: 0;
	}
	.grace-list .items{
		align-items: center;
	}
	.grace-list .items .icons{
		width: 70upx;
		height: 70upx;
		margin: 0 0 0 20upx;
		display: flex;
		text-justify: inter-cluster;
		align-items: center;
	}
	.font{
		display: flex;
		width: 100%;
		color: #3AAAFE;
		font-size: 30px;
	}
	.grace-list .items .title{
		padding: 30upx;
		margin: 0;
	}
	.grace-list .items .arrow-right{
		height: 100%;
		line-height: 2.8;
	}
</style>
