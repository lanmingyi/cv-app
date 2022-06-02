<!--
 * @Description: 附件列表
 * @Author: 张夕雅
-->
<template>
	<view>
		<!-- <view class="bg-box" v-if="fileList.length > 0">
			<view class="files-box padding-lr padding-top-sm" v-for="(item,index) in fileList" :key="index">
				<view class="flex align-start justify-between text-blue">
					<text class="u-font-13"> {{item.fileName}}</text>
					<text class="cuIcon-down" @click="downFiles(item)"></text>
				</view>
			</view>
		</view> -->
		<view class="bg-box margin-lr-sm">
			<Ttable
				:columns="columns"
				:loadData="fileList"
				:fontSize="26"
				:scroll="{y: '200px'}">
				<template v-slot:serial="{text, record, index }">
					<text>{{ index + 1 }}</text>
				</template>
				<template v-slot:action="{text, record }">
					<text class="flex align-center justify-around font-second">
						<text @click="downFiles(record)">下载</text>
					</text>
				</template>
			</Ttable>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			fileList:{
				type: Array,
				default: ()=>[]
			}
		},
		data() {
			return {
				columns:[{
					title: '#',
					dataIndex: 'serial',
					scope:true,
					width: '15%'
				},{
					title: '附件名',
					dataIndex: 'fileName',
					width: '65%',
				},{
					title: '操作',
					dataIndex: 'action',
					width: '20%',
					scope:true
				},]
			}
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
	.files-pos-fixed {
		position: fixed;
		bottom: 400rpx;
		right: 0;
		z-index: 5;
	}

	.files-box-right {
		border-radius: 10px 0 0 10px;
	}
</style>
