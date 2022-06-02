<!--
 * @Description: 评论回复（仅文字回复  不含其他扩展功能）
 * @Author: 张夕雅
-->
<template>
	<view class="padding-tb-sm bg-white">
		<view class="flex align-start justify-between bg-gray padding-tb-xs padding-lr-sm margin-lr-sm" style="border-radius: 20px">
			<u-icon :size="leftIconSize" :name="leftIconName" class="margin-right-sm text-blue u-padding-top-10"></u-icon>
			<u-input :type="type" :auto-height="autoHeight" :height="height" :placeholder="placeholder" v-model="remark"></u-input>
			<view class="padding-left-sm text-black u-font-13" @click="sure">{{rightText}}</view>
		</view>
	</view>
</template>

<script>
	var _self, x, y;
	export default {
		props:{
			placeholder: {
				type: String,
				default: '请输入'
			},
			height: {
				type: Number,
				default: 0
			},
			autoHeight: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: 'text'
			},
			// 左边icon
			leftIconSize: {
				type: Number
			},
			leftIconName: {
				type: String ,
				default: 'edit-pen-fill'
			},
			// 右边文字
			rightText: {
				type: String
			}
		},
		data() {
			return {
				loadingType: 'loading',//加载更多状态
				emptyType: '0',
				remark: ''
			};
		},
		onLoad() {
			_self = this;
		},
		methods: {
			// 跳转到详情
			sure(){
				this.$emit('sure',this.remark)
			},
			clear(){
				this.remark = ''
			},
		},
		components: {
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-input__textarea{
		padding: 0 !important;
		margin: 2px 0 5px 0;
		min-height: 0px !important;
	}
	/deep/.uni-textarea-wrapper{
		overflow-y: scroll;
	}
</style>
