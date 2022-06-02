<!--
 * @Author: 张夕雅
 * @Date: 2021-07-21
 * @Description: 头部下拉面板顶部自适应
 -->
<template>
	<view>
		<u-dropdown :close-on-click-mask="mask" ref="uDropdown" :borderBottom="borderBottom"
			:itemWidth="itemWidth" :height="height">
			<u-dropdown-item class="text-left" :value="value" :title="taskType" :options="tabList"
				@change="tabSelect"></u-dropdown-item>
		</u-dropdown>
	</view>
</template>

<script>
	export default {
		name: 'dropdownBox',
		props: {
			value: {
				type: [Number,String]
			},
			mask:{
				type:Boolean,
				default:true
			},
			borderBottom: {
				type:Boolean,
				default:true
			},
			taskType: {
				type: String
			},
			tabList: {
				type: Array,
				default: () => []
			},
			itemWidth: {
				type: String
			},
			height: {
				type: String
			}
		},
		data() {
			return {
			};
		},
		watch: {
		},
		onLoad() {
		},
		methods: {
			tabSelect(item){
				this.$emit('change',item)
			}
		},
		components: {}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-dropdown__content{
		top: calc(86rpx + var(--status-bar-height)) !important;
	}
</style>
