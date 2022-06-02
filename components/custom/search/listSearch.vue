<!--
 * @Author: 张夕雅
 * @Date: 2021-07-21
 * @Description: 2个或低于2个搜索条件组件
 * <list-search class="bg-box" :column="searchColumn" @search="searchFrom" :showLabel="false" :borderBottom="false"></list-search>
 -->
<template>
	<view class="search-box flex align-center">
		<view class="search-box flex align-center justify-between ">
			<u-form :model="searchData" ref="uForm" v-if="fileList" :borderBottom="borderBottom" class="flex align-center">
				<block v-for="(item,index) in fileList" :key="index" >
					<list-item :record="item" @change="changeValue" style="width: 110px; padding: 0;" class="margin-lr-xs" :showLabel="showLabel" :borderBottom="borderBottom"></list-item>
				</block>
			</u-form>
			<view class="popup-box cu-btn bg-orange radius" @click="formReset">重置</view>
			<view class="popup-box cu-btn bg-orange radius margin-right-xs" @click="()=>{showPopup=true}">
				<text class="">筛选</text>
			</view>
		</view>
		
		<u-popup v-model="showPopup" mode="bottom" border-radius="28" length="60%" :closeable="true">
			<view class="popup-content pos-relative">
				<view class="padding-lr u-padding-top-80">
					<u-form :model="searchData" ref="uForm">
						<block v-for="(item,index) in fileSearchList" :key="index">
							<list-item :record="item" @change="changeFromValue" style="width: 100%;" class="margin-lr-xs" :showLabel="true" :borderBottom="false"></list-item>
						</block>
					</u-form>
				</view>
				<view class="popup-absolute flex align-center justify-center padding-tb-sm">
					<view class="popup-container cu-btn bg-orange radius margin-right-xl" @click="formResetFrom">重置</view>
					<view class="popup-container cu-btn bg-olive radius" @click="formSubmitFrom">完成</view>
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
			columnList: {
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
				fileList:[],
				fileSearchList:[],
				searchData: {},
				searchFromData:{},
				showPopup:false
			}
		},
		mounted() {
			this.fileList = this.column.slice(0)
			this.fileSearchList = this.columnList.slice(0)
		},
		methods: {
			clear(){
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
			formReset() {
				this.formResetFrom()
				this.$nextTick(function(){
					this.formSubmit()
				})
			},
			selectConfirm(type, e) {
				console.log("111")
				this.searchData[type] = e
				this.formSubmit()
			},
			changeValue(label,value,key){
				console.log("123")
				this.searchData[key] = value
				this.fileSearchList.map(val=>{
					if(val.filed == key){
						val.valueText = label
						val.value = value
					}
				})
				this.formSubmit()
			},
			formSubmit() {
				uni.showLoading({
					title: "搜索中..."
				})
				this.showPopup = false
				this.$emit('search', this.searchData)
			},
			changeFromValue(label,value,key){
				this.searchData[key] = value
				this.fileList.map(val=>{
					if(val.filed == key){
						val.valueText = label
						val.value = value
					}
				})
			},
			formResetFrom(){
				let list = this.columnList.slice(0)
				list.forEach(val=>{
					val.valueText = ''
					val.value = ''
				})
				this.fileSearchList = []
				this.$nextTick(function(){
					this.searchData = {}
					this.fileSearchList = list
				})
				let listTwo = this.column.slice(0)
				listTwo.forEach(val=>{
					val.valueText = ''
					val.value = ''
				})
				this.fileList = []
				this.$nextTick(function(){
					this.searchData = {}
					this.fileList = listTwo
				})
			},
			formSubmitFrom(){
				console.log("this.searchFromData",this.searchData)
				this.$emit('search', this.searchData)
				this.showPopup = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		width: 100vw;
		height: 40px;
	}

	.popup-content {
		width: 100%;
		height: 100%;
	}
	.popup-box{
		width: 55px;
		height: 28px;
		line-height: 28px;
		font-size: 13px;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.popup-container{
		width: 100px;
		height: 34px;
		line-height: 34px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
