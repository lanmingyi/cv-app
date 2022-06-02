<!--
 * @Description: 下拉选择  单选  多选
 * @Author: 黄婷
-->
<template>
	<div style="width: 100%;">
		<block v-if="type=='select'">
			<u-input :border="border" type="select" :select-open="selectShow" :value="values" :placeholder="placeholder"
				@click="clickShow" :height="height" style="width: 100%;" :inputAlign="inputAlign"></u-input>
			<u-select :mode="mode" :list="selectList" v-model="selectShow" :default-value="defaultlist" @confirm="selectConfirm" :disabled="disabled"></u-select>
		</block>
		<block v-else-if="type=='checkbox'">
			<u-checkbox-group @change="changeCheckBox" :wrap="wrap" :shape="shape">
				<u-checkbox v-model="item.checked" v-for="(item, index) in selectList" :key="index" :disabled="disabled"
					:name="item.value" >
					{{ item.label }}
				</u-checkbox>
			</u-checkbox-group>
		</block>
		<block v-else-if="type=='radio'">
			<u-radio-group v-model="values" @change="radioGroupChange" :wrap="wrap" :shape="shape">
				<u-radio 
					v-for="(item, index) in selectList" :key="index" 
					:name="item.value"
					:disabled="disabled"
				>
					{{item.label}}
				</u-radio>
			</u-radio-group>
		</block>
	</div>
</template>

<script>
	export default {
		name: 'dictSelect',
		props: {
			value:{//默认值
				type: [String,Array,Number],
				default: ''
			},
			border: {//边框
				type: Boolean,
				default: true
			},
			list: Array,//静态数组
			type: {//组件类型
				type: String,
				default: 'select'
			},
			dataType: {//数据类型
				type: String,
				default: 'static'//static/dynamic/dictCode
			},
			url:{//动态url
				type: String,
				default: ''
			},
			valueFeiled:{//数据字段
				type: String,
				default: 'value'
			},
			textFeiled:{//数据字段
				type: String,
				default: 'text'
			},
			code:String,//字典code
			disabled: {//禁用
				type: Boolean,
				default: false
			},
			mode:{//下拉框配置
				type: String,
				default: 'single-column'//'single-column', 'mutil-column', 'mutil-column-auto'
			},
			wrap: { //是否换行
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default:'请选择'
			},
			shape:{ //选择框图标样式 'circle'	,'square'
				type: String,
				default:'circle'
			},
			inputAlign:{
				type: String,
				default:'left'
			},
			// 高度，单位rpx
			height: {
				type: [Number, String],
				default: ''
			},
			// 默认值
			selectValue :{
				type: Array,
				default: ()=> []
			}
		},
		data() {
			return {
				selectShow: false,
				selectList: [],
				values:'',
				deflist:[]
			}
		},
		watch: {
			dataType: {
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					if(newVal==='static'){
						this.selectList = this.list
					} else if(newVal==='dynamic'){
						this.getDataList()
					} else {
						this.getDataListByCode()
					}
				},
			},
			list: {
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					console.log("newVal",newVal)
					this.selectList = newVal ? newVal : []
				},
			},
			selectValue: {
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					this.defaultlist = newVal?newVal:[]
				},
			},
			selectList: {
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					//替换文本值
					if(this.type == 'select'){
						let values = this.value ? this.value.split(',') : []
						this.getDefaultData(newVal,values,0)
					} else if(this.type == 'radio'){
						this.values = this.value ? this.value : ''
					} else {
						this.values = this.value ? this.value : []
					}
				}
			},
		},
		methods: {
			clickShow(){
				if(!this.disabled){
					this.selectShow = true
				}
			},
			//获取vlaues显示值  和下拉默认值
			getDefaultData(list,valuesList,num){
				list && list.forEach((e,index)=>{
					if(e.value == valuesList[num]){
						this.defaultlist.push(index)
						this.values += this.values == '' ? e.label : '-' + e.label
						if(e.children){
							num++;
							this.getDefaultData(e.children,valuesList,num)
						}
					}
				})
			},
			// 获取动态数据
			getDataList(){
				this.selectList = []
				this.$http
					.post(this.url, {}, {
						params: {},
					}).then(res => {
						if(this.valueFeiled||this.textFeiled){
							res.data.forEach(val => {
								let data = {
									label: val[this.textFeiled],
									value: val[this.valueFeiled]
								}
								let check = {}
								if(this.type == 'checkbox'){
									check = {
										checked : this.value.includes(data.value) ? true : false
									}
								}
								data = Object.assign(check,data)
								this.selectList.push(data)
							})
						} else {
							this.selectList = res.data
						}
						
					})
			},
			// 获取字典code数据
			getDataListByCode(){
				this.selectList = []
				this.$http
					.post('/system/dicSet/getDicItemByCode', {code:this.code}, {
						params: {},
					}).then(res => {
						res.data.forEach(val => {
							let data = {
								label: this.textFeiled?val[this.textFeiled]:val.text,
								value: this.valueFeiled?val[this.valueFeiled]:val.value
							}
							let check = {}
							if(this.type == 'checkbox'){
								check = {
									checked : this.value.includes(data.value) ? true : false
								}
							}
							data = Object.assign(check,data)
							this.selectList.push(data)
						})
					})
			},
			// 下拉框选中事件
			selectConfirm(e) {
				this.values = ''
				this.defaultlist = []
				let valueList= ''
				let textValue = ''
				e.map((val, index) => {
					textValue += textValue == '' ? val.value : ',' + val.value;
				})
				valueList = textValue.split(',')
				console.log("e",e)
				this.getDefaultData(this.selectList,valueList,0)
				this.$emit('change',this.values,textValue)
			},
			// 复选框选中事件
			changeCheckBox(val){
				this.$emit('change',val)
			},
			// 单选按钮选中事件
			radioGroupChange(val){
				this.$emit('change',val)
			}
		}
	}
</script>

<style scoped>

</style>
