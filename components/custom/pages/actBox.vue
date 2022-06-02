<!--
 * @Description: 新闻、通知、公告公用列表 （数组参数需要在传进来前做处理）
 * name: 发布人
 * time: 发布时间
 * type: 类型判断 （public 公告  notice  通知 ）
 * @Author: 张夕雅
-->

<template>
	<view :class="[vtheme]">
		<view class="bg-box" v-for="(item,index) in list" :key="index">
			<view class="flex align-center padding-tb margin-lr border-bottom" @click="goDetail(item)" :data-uuid="item.uuid">
				<view  v-if="item.type" >
					<view :class="[item.type == 'office.public' ? 'tag-bg-four' : 'tag-bg-second']" class="box-font-list flex align-center justify-center margin-right u-font-16">
						<!-- <text v-if="item.type == 'office.public'" class="cuIcon-notificationfill"></text>
						<text v-if="item.type == 'office.notice'" class="cuIcon-noticefill"></text> -->
						
						<u-icon class="u-font-28" v-if="item.type == 'office.public'" custom-prefix="custom-icon" name="gonggao1"></u-icon>
						<u-icon class="u-font-28" v-if="item.type == 'office.notice'" custom-prefix="custom-icon" name="tongzhi2"></u-icon>
					</view>
				</view>
				<view v-else class="icon-default radius box-font-list flex align-center justify-center margin-right" :style="{background: colorType()}">
					<!-- <text>{{item.titleTips}}</text> -->
					<text>{{item.name.substring(item.name.length-2)}}</text>
				</view>
				<view class="art-list-right margin-left">
					<view class="font-main"><text class="text-cut block">{{item.title}}</text></view>
					<view class="flex align-center justify-between padding-top-xs">
						<view class="font-three">
							<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-xs" name="user1"></u-icon>
							<text>{{item.name}}</text>
						</view>
						<view class="font-three">
							<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-xs" name="shijian1"></u-icon>
							<text>{{item.time}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self, x, y;
	export default {
		props:{
			list: {
				type: Array,
				default: ()=>[]
			}
		},
		data() {
			return {
				loadingType: 'loading',//加载更多状态
				emptyType: '0'
			};
		},
		watch:{
			list: function(val){
				console.log("val",val)
				val.forEach(e=>{
					e.titleTips = e.name.substring(0,2)
				})
			}
		},
		onLoad() {
			_self = this
		},
		methods: {
			// 跳转到详情
			goDetail(item) {
				this.$emit('goDetail',item.uuid)
			},

		},
		components: {
		}
	}
</script>

<style lang="scss">
	.tab-content {
		padding-top: 44px;
	}

	.iconfont {
		font-size: 10px;
	}

	.space {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

	}

	.rank {
		width: 100%;
	}

	.cu-card.dynamic>.cu-item {
		margin-bottom: 0;
	}

	.write-box {
		width: 280rpx;
		height: 300rpx;
		border-radius: 15rpx;
	}

	.font-size-xl {
		font-size: 26px;
	}
</style>
