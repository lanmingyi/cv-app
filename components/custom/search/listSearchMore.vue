<!--
 * @Author: 张夕雅
 * @Date: 2021-07-21
 * @Description: 列表多个搜索下拉组件
 * <list-search-more class="bg-box" :column="searchColumn" @search="searchFrom" :showLabel="true" :borderBottom="true"></list-search-more>
 -->
<template>
	<view class="search-box flex align-center justify-end">
		<view class="font-second margin-right-sm flex align-center justify-center" @click="()=>{showPopup=true}">
			<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-xs" name="filter-fill1" :size="48">
			</u-icon>
			<text>查询</text>
		</view>

		<!-- 底部弹窗 -->
		<u-popup v-model="showPopup" mode="bottom" border-radius="28" length="60%" :closeable="true">
			<view class="popup-content pos-relative">
				<view class="padding-lr u-padding-top-80">
					<u-form :model="searchData" ref="uForm" v-if="fileList" :borderBottom="borderBottom">
						<block v-for="(item,index) in fileList" :key="index" >
							<list-item :record="item" @change="changeValue" :showLabel="showLabel" :borderBottom="borderBottom"></list-item>
						</block>
					</u-form>
				</view>
				<view class="popup-absolute flex align-center justify-around padding-lr padding-bottom-sm">
					<view class="popup-box cu-btn bg-orange radius" @click="formReset">重置</view>
					<view class="popup-box cu-btn bg-olive radius" @click="formSubmit">完成</view>
				</view>
			</view>
		</u-popup>
	</view>

</template>

<script>
	import listItem from './listItem.vue'
	export default {
		components:{listItem},
		props: {
			column: {
				type: Array,
				default: () => []
			},
			showLabel :{
				type:Boolean,
				default:false
			},
			borderBottom :{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				stateShow: false,
				showPopup: false,
				filed: '',
				stateList: [{
					label: '待沟通',
					value: '待沟通'
				},{
					label: '需回访',
					value: '需回访'
				},{
					label: '无需求',
					value: '无需求'
				}, {
					label: '有需求',
					value: '有需求'
				}, {
					label: '决策中',
					value: '决策中'
				}, {
					label: '洽谈中',
					value: '洽谈中'
				}, {
					label: '已成单',
					value: '已成单'
				}],
				typeList: [{
					label: '今天',
					value: 'today'
				}, {
					label: '昨天',
					value: 'yesterday'
				}, {
					label: '前天',
					value: 'beforeYesterday'
				}, {
					label: '最近7天',
					value: 'Last7days'
				}, {
					label: '最近一个月',
					value: 'lastMonth'
				}, {
					label: '全部',
					value: 'defaultAll'
				}],
				fileList:[],
				dataList:[],
				selectShow: false,
				searchData: {}
			}
		},
		mounted() {
			this.fileList = this.column.slice(0)
		},
		methods: {
			formReset() {
				let list = this.column.slice(0)
				list.forEach(val=>{
					val.valueText = ''
					val.value = ''
				})
				this.fileList = []
				this.$nextTick(function(){
					this.searchData = {}
					this.fileList = list
				})
			},
			selectConfirm(type, e) {
				this.searchData[type] = e
			},
			formSubmit() {
				uni.showLoading({
					title: "搜索中..."
				})
				this.showPopup = false
				this.$emit('search', this.searchData)
			},
			changeValue(value,key){
				this.searchData[key] = value
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		width: 100%;
		height: 40px;
	}

	.popup-content {
		width: 100%;
		height: 100%;
	}

	.popup-absolute {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: auto;
		width: 100%;

		.popup-box {
			width: 45%;
			height: 40px;
		}
	}
</style>
