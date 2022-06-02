<!--
 * @Description: picker选择器  （时间、地区选择）
 * @Author: 张夕雅
-->
<template>
	<view style="width:100%">
		<u-input 
			:type="type"
			:style="`width:${width}`"
			v-model="defaultValue"
			:placeholder="placeholder"
			:maxlength="maxlength"
			:border="border"
			:disabled="disabled"
			@click="()=>{timeChange()}"
			:input-align="inputAlign"
			:iconName="iconName"
			:iconNameColor="iconNameColor"/>
		<u-picker 
			v-model="show"
			:mode="mode" 
			:params="defaultParams"
			:minuteStep="minuteStep"
			:area-code="areaCodeValue" 
			@confirm="confirm"
		></u-picker>
	</view>
</template>

<script>
	export default {
		name: 'pickerSelect',
		props:{
			mode:String, //time、region、selector、multiSelector
			record:Object,
			value:{
				type: [String,Array],
				default: ''
			},
			type:{
				type:String,
				default:'select'
			},
			placeholder:String,
			maxlength:String,
			inputAlign:String,
			disabled:{
				type: Boolean,
				default:false
			},
			border:{
				type: Boolean,
				default:false
			},
			minuteStep: {
				type: Number,
				default:1
			},
			width:{
				type:String,
				default:'100%'
			},
			areaText:{
				type:Array,
				default:()=>[]
			},
			params:{
				type:Object,
				default() {
					return {
						year: true,
						month: true,
						day: true,
						hour: true,
						minute: true,
						second: true,
						province: true,
						city: true,
						area: true,
						timestamp: true,
					};
				}
			},
			iconName:{
				type:String,
				default:'arrow-down'
			},
			iconNameColor:{
				type:String,
				default:'default-icon'
			}
		},
		data() {
			return {
				show:false,
				defaultValue: '',
				areaCodeValue: [],
				areaTextValue: [],
				defaultParams: {},
				timeParams: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
					timestamp: true,
				},
				regionParams : {
					province: true,
					city: true,
					area: true
				}
			};
		},
		watch:{
			mode:{
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					if(newVal == 'time'){
						this.defaultValue = this.value
					} else if(newVal == 'region'){
						this.areaText.forEach(el=>{
							this.defaultValue += this.defaultValue == '' ? el : '-' + el
						})
						this.areaCodeValue = this.value
					}
				},
			}
		},
		mounted() {
			if(!this.params){
				this.defaultParams = this.params
			} else {
				if(this.mode == 'time'){
					this.defaultParams = this.timeParams
				} else if(this.mode == 'region'){
					this.defaultParams = this.regionParams
				}
			}
		},	
		methods:{
			loadData(val){
				console.log("val",val)
				this.defaultValue = val
			},
			timeChange(option){
				this.show = true
				if(this.mode == 'time')this.defaultParams = this.params
				if(this.mode == 'region')this.defaultParams = this.regionParams
			},
			confirm(e){
				let input = '';
				let timestamp = ''
				if(this.mode == 'region'){  //地区
					this.defaultValue = e.province.label + '-' + e.city.label + '-' + e.area.label
					this.areaCodeText = [e.province.label, e.city.label, e.area.label]
					this.areaCodeValue = [e.province.value, e.city.value, e.area.value]
					this.$emit('change', this.areaCodeValue,this.areaCodeText)
				} else if(this.mode == 'time') {  //时间
					if (this.params.year) input += e.year;
					if (this.params.month) input += '-' + e.month;
					if (this.params.day) input += '-' + e.day;
					if (this.params.hour) input += ' ' + e.hour;
					if (this.params.minute) input += ':' + e.minute;
					if (this.params.second) input += ':' + e.second;
					if (this.params.timestamp) timestamp = e.timestamp;
					this.defaultValue = input
					this.$emit('change', this.defaultValue,timestamp)
				}
			},
		}
	}
</script>

<style lang="scss">

</style>
