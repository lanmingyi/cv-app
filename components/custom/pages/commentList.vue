<!--
 * @Description: 评论意见列表
 * @Author: 张夕雅
-->
<template>
	<view>
		<view class=" bg-box comment-box" v-if="commentList.length > 0">
			<view class="border-bottom-dashed padding-tb-sm margin-lr"
				v-for="(item,index) in commentList" :key="index">
				<view class="content u-font-13 flex align-center justify-between">
					<text class="text-grey">{{index+1}} 、{{item.userName}}</text>
					<text class="text-grey">{{item.createTime}}</text>
				</view>
				<view class="action u-font-13">
					<text class="text-gray" style="word-break: break-all;">{{item.content}}</text>
				</view>
			</view>
		</view>
		<view class=" bg-box" v-else>
			<view class="padding-lr font-three  text-left margin-tb">暂无</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			commentList:{
				type: Array,
				default: ()=>[]
			}
		},
		data() {
			return {}
		},
		onLoad(options) {},
		methods: {
			downFiles() {
				console.log("下载文件")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-box .border-bottom-dashed:last-child{
		border: none;
	}
</style>
