<template>
	<scroll-view class="page">
		<uni-collapse>
			<uni-collapse-item :show-animation="true" title="主题">
				<view class="change_item">
					<radio-group class="uni-flex" name="bg">
						<view class="bg_color">
							<text>默认主题</text>
							<radio value="默认" @click="setBg" checked="checked" />
						</view>
						<view class="bg_color">
							<text>橙色主题</text>
							<radio value="orange" @click="setBg2" />
						</view>
						<view class="bg_color">
							<text>绿色主题</text>
							<radio value="green" @click="setBg3" />
						</view>
						<view class="bg_color">
							<text>紫色主题</text>
							<radio value="purple" @click="setBg4" />
						</view>
						<view class="bg_color">
							<text>黑色主体</text>
							<radio value="black" @click="changeTips" />
						</view>
					</radio-group>
				</view>
			</uni-collapse-item>
			<navigator data-v-08e544e4="" class="uni-list" url="on-compass-change/on-compass-change">
				<uni-view data-v-08e544e4="" class="uni-list-cell uni-collapse">
					<uni-view data-v-08e544e4="" class="uni-list-cell-navigate uni-navigate-right">监听罗盘数据</uni-view>
				</uni-view>
			</navigator>
			<navigator data-v-08e544e4="" class="uni-list" url="../../feature/get_system_info/get_system_info">
				<uni-view data-v-08e544e4="" class="uni-list-cell uni-collapse">
					<uni-view data-v-08e544e4="" class="uni-list-cell-navigate uni-navigate-right">获取系统信息</uni-view>
				</uni-view>
			</navigator>
		</uni-collapse>
	</scroll-view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			uniList,
			uniListItem
		},
		data() {
			return {
				title: 'nav-default',
				hasSetText: false,
				hasSetBg: false
			}
		},
		methods: {
			setBg() {
				this.hasSetBg = !this.hasSetBg;
				uni.setNavigationBarColor({
					frontColor: this.hasSetBg ? "#ffffff" : "#ffffff",
					backgroundColor: this.hasSetBg ? "#3aaafe" : "#3aaafe"
				})
			},
			setBg2() {
				this.hasSetBg = !this.hasSetBg;
				uni.setNavigationBarColor({
					frontColor: this.hasSetBg ? "#ffffff" : "#ffffff",
					backgroundColor: this.hasSetBg ? "#f37b1d" : "#f37b1d"
				})
			},
			setBg3() {
				this.hasSetBg = !this.hasSetBg;
				uni.setNavigationBarColor({
					frontColor: this.hasSetBg ? "#ffffff" : "#ffffff",
					backgroundColor: this.hasSetBg ? "#8dc63f" : "#8dc63f"
				})
			},
			setBg4() {
				this.hasSetBg = !this.hasSetBg;
				uni.setNavigationBarColor({
					frontColor: this.hasSetBg ? "#ffffff" : "#ffffff",
					backgroundColor: this.hasSetBg ? "#6739b6" : "#6739b6"
				})
			},
			changeTips(){
			},
		}
	}
</script>

<style>
	.bg_color {
		padding: 10upx 30upx;
		height: 100upx;
		line-height: 100upx;
		border-bottom: 1px solid #ccc;
		display: flex;
		justify-content: space-between;
	}
	
	.bg_color radio{
		height: 100upx;
		line-height: 100upx;
	}
	
	.change_item .uni-flex {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.uni-list::before {
		background: #fff;
	}

	.uni-list-cell-navigate {
		padding: 22upx 10upx;
	}

	.uni-collapse[data-v-42b78d78]:after {
		background: #fff;
	}
</style>
