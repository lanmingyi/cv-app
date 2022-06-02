<!--
 * @Author: 张夕雅
 * @Date: 2021-07-13
 * @Description: 将数据通过formItem组件解析处理，生成控件
 -->

<template>
	<u-form :model="model" ref="uForm">
		<from-item v-for="(item,index) in list" :key="index" :record="item"></from-item>
	</u-form>
</template>

<script>
	import fromItem from './fromItem'
	export default {
		components:{fromItem},
		props:{
			list: {
				type:Array,
				default:()=>[]
			},
			rules: {
				type:Array,
				default:()=>[]
			},
			model: {
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				fromList: {},
				form: null,
			}
		},
		onReady() {
			
		},
		mounted() {
			this.$nextTick(function(){
				this.$refs.uForm.setRules(this.rules);
				console.log("from",this.rules,this.from)
				this.form = this.$refs.uForm
			})
			// console.log('表单数据',this.list)
		},
		onLoad() {
			
		},
		methods: {
			formSubmit(){
				var that = this
				let url = ''
				
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
