<!--
 * @Description: 财务列表
 * @Author: 张夕雅
-->
<template>
	<view>
		<view class="bg-box" v-for="(childItem,index) in list" :key="index" @click="goToDetail(childItem)">
			<view class="padding-lr">
				<view class="task-title padding-top flex align-center justify-between">
					<view class="flex align-center">
						<view class="font-main text-cut padding-right-xs">{{childItem.serialNumber}}</view>
						<view class="">
							<text class="font-three radius padding-lr-xs">( {{childItem.projectTypeName}} )</text>
						</view>
					</view>
					<view>
						<view >
							<text :class="childItem.state=='officeFinanceLoanState02' ? 'tag-bg-second' : (childItem.state=='officeFinanceLoanState03' ? 'tag-bg-three' : 'tag-bg-main')" class="radius padding-lr-xs u-font-12 u-padding-top-2 u-padding-bottom-2">{{childItem.stateName}}</text>
							<u-icon name="arrow-right padding-left-xs" size="20" ></u-icon>
						</view>
					</view>
				</view>
				<view class="task-info padding-bottom border-bottom">
						<view class="u-padding-top-4"></view>
						<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="user1"></u-icon>{{childItem.loanUser}}</view>
						
						<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-second margin-right-sm" name="jine"></u-icon>{{childItem.paymentMoney || childItem.reimbursementMoney || childItem.loanMoney}} 元</view>
						
						<view class="font-three"><u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="shijian1"></u-icon>{{childItem.fillingDate}}</view>
						<view class="font-three flex align-start"><text class="u-padding-top-4">事由：</text><view class="font-second text-cut">{{childItem.subjectMatter}}</view></view>
						
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {};
		},
		onLoad() {},
		methods: {
			// 跳转到详情
			goToDetail(item) {
				console.log("details", item)
				this.$emit('goToDetail', item.uuid)
			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/.u-dropdown__menu__item {
		justify-content: flex-start !important;
		padding-left: 35rpx;
	}

	.pos-absolute {
		position: absolute;
		z-index: 1;
		right: 0;
		top: 0;
	}

	.absolute-box {
		width: 100rpx;
		height: 100rpx;
		line-height: 96rpx;
		text-align: center;
		border-radius: 0 0 0 80%;
	}

	.text-transformRight30 {
		transform: rotate(30deg);
		display: block;
	}
</style>
