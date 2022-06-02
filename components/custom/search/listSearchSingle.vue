<!--
 * @Author: 张夕雅
 * @Date: 2021-07-21
 * @Description: 单个搜索条件搜索组件
 * <list-search-single class="bg-box" :column="searchColumn" @search="searchFrom" :showLabel="false" :borderBottom="false"></list-search-single>
 -->
<template>
	<view class="search-box flex align-center">
		<view class="search-box flex align-center justify-between padding-lr-sm">
			
			<u-form :model="model" ref="uForm" v-if="model" :borderBottom="borderBottom" class="flex align-center " style="width: 120px;">
				<u-form-item
					v-if="
						[
							'text',
							'select',,
						].includes(model.type)
					"
					label-position="left" 
					:label="model.showLabel ? model.filedName : ''" 
					label-width="180" 
					:prop="model.filed"
					style="width: 100%;padding: 0;"
					:borderBottom="borderBottom">
					<!-- 输入框 -->
					<block v-if="model.type == 'text'">
						<u-search v-model="model.value" :placeholder="model.placeholder" @change="(e)=>{changeInput(e,model.filed)}" shape="round" :clearabled="true" :show-action="false" input-align="left"></u-search>
					</block>
				<!-- 下拉框 -->
					<block v-if="model.type == 'select'" class="flex align-center justify-between">
						<dict-select
							type="select"
							:value="model.valueText"
							@change="(label,value)=>{handleChange(label,value,model.filed)}"
							:placeholder="model.placeholder"
							:disabled="false"
							:border="true"
							:list="model.list"
							:height="model.height"
							dataType="static"
							valueFeiled="value"
							textFeiled="text"
							code="meetingsType"
							mode="single-column"
							url="/system/dicSet/getDicItemByCode">
						</dict-select>
					</block>
				</u-form-item>
			</u-form>
			<view class="popup-box cu-btn bg-orange radius margin-left-xl" @click="formReset">重置</view>
		</view>
	</view>

</template>

<script>
	import dictSelect from '../dictSelect.vue'
	export default {
		components:{dictSelect},
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
				model:{},
				searchData: {},
				timer: null
			}
		},
		mounted() {
			this.model = this.column[0]
		},
		methods: {
			formReset() {
				let list = this.column[0]
				list.valueText = ''
				list.value = ''
				this.model = {}
				this.$nextTick(function(){
					this.searchData = {}
					this.model = list
					this.formSubmit()
				})
			},
			handleChange(label, value, key) {
				this.model.valueText = label
				this.model.value = value
				this.searchData = {
					[key]:value
				}
				this.formSubmit()
			},
			changeInput(value,key){
				this.model.value = value
				this.searchData = {
					[key]:value
				}
				if(this.timer){
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(()=>{
					this.formSubmit()
				},500)
			},
			formSubmit() {
				console.log("this.searchData",this.searchData)
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
</style>
