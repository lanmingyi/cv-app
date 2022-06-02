<!--
 * @Author: 张夕雅
 * @Date: 2021-07-13
 * @Description: 表单列表搜索字段
 -->
<template>
	<view class="search-box flex align-center justify-end">
		<view class="font-second margin-right-sm flex align-center justify-center" @click="()=>{showPopup=true}">
			<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-xs" name="filter-fill1" :size="48"></u-icon>
			<text>查询</text>
		</view>
		
		<u-popup v-model="showPopup" mode="bottom" border-radius="28" length="60%" :closeable="true">
			<view class="popup-content pos-relative">
				<view class="padding-lr u-padding-top-80">
					<u-form :model="searchData" ref="uForm">
						<block v-for="(item,index) in column" :key="index">
							<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="180" label-position="left" :label="item.filedName">
								<u-input :border="true" placeholder="请输入" v-model="searchData[item.filed]" type="text"></u-input>
							</u-form-item>
						</block>
					</u-form>
				</view>
				<view class="popup-absolute flex align-center justify-center">
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
				showPopup:false,
				searchData:{}
			}
		},
		mounted() {
			console.log("this.column",this.column)
		},
		methods: {
			formReset(){
				this.searchData = {}
			},
			formSubmit(){
				// console.log("data",this.searchData)
				uni.showLoading({
					title: "搜索中..."
				})
				this.showPopup = false
				this.$emit('search',this.searchData)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		width: 100%;
		height: 40px;
	}
	.popup-content{
		width: 100%;
		height: 100%;
	}
	.popup-absolute{
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: auto;
		width: 100%;
		.popup-box{
			width: 50%;
			height: 40px;
		}
	}
</style>
