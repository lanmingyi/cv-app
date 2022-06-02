<!--
 * @Author: 张夕雅
 * @Date: 2021-07-21
 * @Description: 列表搜索表单字段
 * <list-search class="bg-box" ref="fromSearch" :column="searchColumn" @search="searchFrom" :showLabel="showLabel" :borderBottom="borderBottom"></list-search>
 -->
<template>
	<u-form-item 
		v-if="
			[
				'text',
				'select',,
			].includes(record.type)
		"
		label-position="left" 
		:label="showLabel ? record.filedName : ''" 
		label-width="180" 
		:prop="record.filed"
		:borderBottom="borderBottom">
		<!-- 输入框 -->
		<u-input
			class="flex align-center"
			v-if="record.type == 'text'"
			type="text"
			v-model="record.value"
			:height="record.height ? record.height : '70'"
			:placeholder="record.placeholder"
			:disabled="false"
			:border="true"
			:clearable="false"
			@input="(e)=>{changeInput(e,record.filed,record)}"
		>
		<!-- blur -->
		</u-input>
	<!-- 下拉框 -->
		<dict-select
			v-if="record.type == 'select'"
			type="select"
			:value="record.valueText"
			:selectValue="record.selectValue"
			@change="(label,value)=>{handleChange(label,value,record.filed)}"
			:placeholder="record.placeholder"
			:disabled="false"
			:border="true"
			:list="record.list"
			:height="record.height ? record.height : '70'"
			dataType="static"
			valueFeiled="value"
			textFeiled="text"
			code="meetingsType"
			mode="single-column"
			url="/system/dicSet/getDicItemByCode">
		</dict-select>
	</u-form-item>
</template>

<script>
	import dictSelect from '../dictSelect.vue'
	export default{
		components:{dictSelect},
		props:{
			record: {
				type:Object
			},
			showLabel: {
				type:Boolean,
				default:false
			},
			borderBottom: {
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				timer:null
			}
		},
		mounted() {
			
		},
		methods:{
			changeInput(value,key,item){
				let that = this
				if(that.timer){
					clearTimeout(that.timer)
				}
				that.timer = setTimeout(()=>{
					that.record.value = item.value
					that.$emit('change', item.value,item.value,key)
				},500)
			},
			handleChange(label,value,key) {
				let that = this
				that.record.valueText = label
				that.$emit('change', label,value,key)
			},
		},
	}
</script>

<style lang="scss" scoped>
	/deep/.u-input__input{
		display: flex;
		align-items: center;
	}
	/deep/.uni-input-wrapper{
		display: flex;
		align-items: center;
	}
</style>
