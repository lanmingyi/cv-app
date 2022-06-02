<!--
 * @Author: 张夕雅
 * @Date: 2021-07-13
 * @Description: 传入record数据，通过判断record.type，来渲染对应的组件
 * <from-item v-for="(item,index) in fromList" :key="index" :record="item" @change="changeValue" labelPosition="left"></from-item>
 -->

<template>
	<u-form-item 
		v-if="
			!(record.options.hidden === true) &&
				[
					'textBox',
					'textarea',
					'datePicker',
					'inputSelect',
					'pwdBox',
					'numberBox',
					'radio',
					'checkbox',
					'select',
					'rate',
					'switch',
					'upload',
					'text',
					'slider',
					'cascader',
					'area',
					'dept'
				].includes(record.type)
			"
			:label="record.options.label"
			:label-position="labelPosition"
			:prop="record.options.name"
			:left-icon="record.icon"
			:label-width="180"
			:leftIconStyle="{color: '#888', fontSize: '32rpx'}"
			:required ="record.options.required">
		<!-- 输入框 多行文本框  数字输入框 密码输入框-->
		<u-input 
			v-if="['textBox','textarea','numberBox','pwdBox'].includes(record.type)"
			:style="`width:${record.options.width}`"
			:value="record.options.value"
			:disabled="record.options.disabled"
			:placeholder="record.options.placeholder"
			autocomplete="off"
			:type="record.options.type"
			:allowClear="record.options.clearable"
			:maxLength="record.options.maxLength"
			:border="record.options.border"
			:input-align="record.options.inputAlign"
			@input="(e)=>{handleChange(e,record.options.name)}"
			></u-input>
		<!-- 下拉选择框 -->
		<dict-select
			v-else-if="record.type === 'inputSelect'"
			type="select"
			mode="single-column"
			:value="record.options.value"
			@change="(label,value)=>{handleChange(value,record.options.name)}"
			:disabled="record.options.disabled"
			:border="record.options.border"
			:list="record.options.staticList"
			:dataType="record.options.dynamic"
			:code="record.options.dynamicKey"
			:url="record.options.url">
		</dict-select>
		<!-- 复选框 -->
		<dict-select
			v-else-if="record.type === 'checkbox'"
			type="checkbox"
			:value="record.options.value"
			@change="(e)=>{handleChange(e,record.options.name)}"
			:disabled="record.options.disabled"
			:border="record.options.border"
			:list="record.options.staticList"
			:dataType="record.options.dynamic"
			:iconSize="record.options.iconSize"
			:shape="record.options.shape"
			:size="record.options.size"
			:code="record.options.dynamicKey"
			:mode="record.options.mode"
			:url="record.options.url"
			:wrap="record.options.wrap">
		</dict-select>
		<!-- 单选框 -->
		<dict-select
			v-else-if="record.type === 'radio'"
			type="radio"
			:value="record.options.value"
			@change="(e)=>{handleChange(e,record.options.name)}"
			:disabled="record.options.disabled"
			:border="record.options.border"
			:list="record.options.staticList"
			:dataType="record.options.dynamic"
			:code="record.options.dynamicKey"
			:mode="record.options.mode"
			:url="record.options.url"
			:wrap="record.options.wrap">
		</dict-select>
		<!-- 日期选择器 -->
		<picker-select 
			v-else-if="record.type === 'datePicker'" 
			mode="time" 
			type="select"
			:record="record.options" 
			:border="record.options.border"
			:width="record.options.width"
			:placeholder="record.options.placeholder" 
			:disabled="record.options.disabled" 
			:maxlength="record.options.maxlength" 
			:value="record.options.value"
			:inputAlign="record.options.inputAlign" 
			:iconName="record.options.iconName" 
			:iconNameColor="record.options.iconNameColor"
			:params="record.options.params"
			:minuteStep="record.options.minuteStep" 
			@change="(e)=>{handleChange(e,record.options.name)}"/>
		<!-- 开关选择器 -->
		<u-switch 
			:style="`width:${record.options.width}`"
			v-else-if="record.type === 'switch'"
			v-model="record.options.value"
			:disabled="record.options.disabled"
			:active-color="record.options.activeColor"
			:inactive-color="record.options.inactiveColor"
			@change="(e)=>{handleChange(e,record.options.name)}">
		</u-switch>
		<!-- 评分 -->
		<u-rate 
			:style="`width:${record.options.width}`"
			v-else-if="record.type === 'rate'"
			v-model="record.options.value"
			:current="record.options.value"
			:count="record.options.count"
			:size="record.options.size"
			:disabled="record.options.disabled"
			:gutter="record.options.gutter"
			:active-color="record.options.activeColor"
			:inactive-color="record.options.inactiveColor"
			@change="(e)=>{handleChange(e,record.options.name)}">
		</u-rate>
		<!-- 上传 -->
		<Tupload
			v-else-if="record.type === 'upload'"
			:action="record.options.action" 
			:fileList="record.options.value"
			:headers="record.options.headers" 
			:data="record.options.data" 
			:fileName="record.options.fileName" 
			:uploadText="record.options.uploadText" 
			:maxSize="record.options.maxSize" 
			:maxCount="record.options.maxCount" 
			:multiple="record.options.multiple"
			:width="record.options.width" 
			:height="record.options.height" 
			:sourceType="record.options.sourceType" 
			:previewFullImage="record.options.previewFullImage" 
			:showProgress="record.options.showProgress" 
			:deletable="record.options.deletable" 
			@change="(list)=>{handleChange(list,record.options.name)}"
		>
		</Tupload>
		<!-- 滑动选择器 -->
		<u-slider 
			style="width: 100%;"
			v-else-if="record.type === 'slider'"
			v-model="record.options.value" 
			:min="record.options.min" 
			:max="record.options.max" 
			:step="record.options.step" 
			:block-width="record.options.blockWidth" 
			:height="record.options.height" 
			:inactive-color="record.options.inactiveColor"
			:active-color="record.options.activeColor" 
			:block-color="record.options.blockColor"
			:disabled="record.options.disabled"
			@end="handleChange(record.options.value,record.options.name)"
		></u-slider>
		<!-- 级联选择器 -->
		<dict-select
			v-else-if="record.type === 'cascader'"
			type="select"
			mode="mutil-column-auto"
			:value="record.options.value"
			:selectValue="record.options.defaultValue"
			@change="(label,value)=>{handleChange(value,record.options.name)}"
			:disabled="record.options.disabled"
			:border="record.options.border"
			:list="record.options.list"
			:dataType="record.options.dynamic"
			:code="record.options.dynamicKey"
			:url="record.options.url">
		</dict-select>
		<!-- 文本 仅展示不可修改-->
		<text
			v-else-if="record.type === 'text'"
			v-html="record.options.value" 
			:width="record.options.width" 
			:fontSize="record.options.fontSize" 
			:color="record.options.color" 
			:bold="record.options.bold" 
			:oblique="record.options.oblique" 
			:underline="record.options.underline" 
			:lineThrough="record.options.lineThrough"
		>
		</text>
		<!-- 省市区 -->
		<picker-select 
			v-else-if="record.type === 'area'" 
			mode="region" 
			type="select"
			:border="record.options.border"
			:width="record.options.width"
			:value="record.options.value"
			:areaText="record.options.areaText"
			:placeholder="record.options.placeholder" 
			:maxlength="record.options.maxlength" 
			:inputAlign="record.options.inputAlign" 
			:iconName="record.options.iconName" 
			:iconNameColor="record.options.iconNameColor"
			:defaultParams="record.options.defaultParams"
			@change="(code,text)=>{handleChange(code,record.options.name)}"/>
		</picker-select>
		<!-- 组织机构 -->
		<dept-popup 
			v-else-if="record.type === 'dept'" 
			:value="record.options.value"
			:border="record.options.border"
			:placeholder="record.options.placeholder" 
			@change="(list,e)=>{handleChange(e,record.options.name)}"/>
		</dept-popup>
	</u-form-item>
</template>

<script>
	export default {
		props:{
			record: { //表单数据
				type:Object
			},
			labelPosition: { //表单结构  top  left
				type:String,
				default:'left'
			}
		},
		data() {
			return {
				showSelect:false,
				selectList: [],
				showTime :false,
				seleteKey: null,
				timeKey: null,
				sliderValue:30
			}
		},
		methods: {
			handleChange(value,key) {
				this.$nextTick(()=>{
					this.record.options.value = value
					console.log("-----value-----",value,key)
					this.$emit('change',value,key)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
