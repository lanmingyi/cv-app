<!--
 * @Author: 张夕雅
 * @Date: 2021-07-13
 * @Description: 表单列表搜索字段
 -->
<template>
	<view class="search-box flex align-center justify-end">
		<view class="font-second margin-right-sm flex align-center justify-center" @click="()=>{showPopup=true}">
			<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-xs" name="filter-fill1" :size="48">
			</u-icon>
			<text>查询</text>
		</view>

		<u-popup v-model="showPopup" mode="bottom" border-radius="28" length="60%" :closeable="true">
			<view class="popup-content pos-relative">
				<view class="padding-lr u-padding-top-80">
					<u-form :model="searchData" ref="uForm">
						<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180"
							label-position="left" label="客户状态">
							<u-input :border="true" type="select" :select-open="stateShow" v-model="searchData.state"
								placeholder="请选择" @click="()=>{stateShow = true}" style="width: 100%;"></u-input>
						</u-form-item>
						<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180"
							label-position="left" label="日期范围">
							<u-input :border="true" type="select" :select-open="selectShow" v-model="searchData.typeText"
								placeholder="请选择" @click="()=>{selectShow = true}" style="width: 100%;"></u-input>
						</u-form-item>
					</u-form>
				</view>
				<u-select mode="single-column" :list="stateList" v-model="stateShow"
					@confirm="(e)=>{selectConfirm('state',e)}"></u-select>
				<u-select mode="single-column" :list="typeList" v-model="selectShow"
					@confirm="(e)=>{selectConfirm('type',e)}"></u-select>
				<view class="popup-absolute flex align-center justify-around padding-lr padding-bottom-sm">
					<view class="popup-box cu-btn bg-orange radius" @click="formReset">重置</view>
					<view class="popup-box cu-btn bg-olive radius" @click="formSubmit">完成</view>
				</view>
			</view>
		</u-popup>
	</view>

</template>

<script>
	export default {
		props: {
			column: {
				type: Array,
				default: () => []
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
				selectShow: false,
				searchData: {}
			}
		},
		mounted() {
			console.log("this.column", this.column)
		},
		methods: {
			formReset() {
				this.searchData = {}
				this.$forceUpdate()
				console.log("this.searchData", this.searchData)
			},
			selectConfirm(type, e) {
				console.log("e", e, type)
				this.searchData[type] = e[0].value
				if(type == 'type'){
					this.searchData.typeText = e[0].label
				}
			},
			formSubmit() {
				uni.showLoading({
					title: "搜索中..."
				})
				this.showPopup = false
				this.$emit('search', this.searchData)
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
