<template>
	<view class="container " :class="[vtheme]">
		<view class="bg-box padding-lr" v-if="model">
			<u-form :model="model" ref="uForm" :error-type="errorType">
				<from-item v-for="(item,index) in fromList" :key="index" :record="item" @change="changeValue" labelPosition="left"></from-item>
			</u-form>
		</view>
		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="cu-botton-submit text-center" @click="formSubmit">提交</view>
		</view>
	</view>
</template>

<script>
	import { basicsList } from  '@/components/custom/fromDesign/config/formItemsConfig.js';  //数据模板
	import fromItem from '@/components/custom/fromDesign/model/fromItem'
	export default {
		// fromNode
		components:{fromItem},
		data() {
			return {
				type: '',
				uuid: '',	
				tableSchema: '',
				tableName: '',
				fromList:[],//表单数据
				rules: {}, //表单规则
				model: {} ,//表单数据验证必须存在,
				errorType: ['border-bottom'] ,//验证不通过提示方式
				url: {
					save: '/system/sysAppDetailed/scanPreviewSave',
					updata: '/system/sysAppDetailed/scanPreviewUpdate',
					delete: '/system/sysAppDetailed/scanPreviewDeleteBatch'
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		watch:{
			fromList(list) {
				let data = {}//表单数据验证必须存在,
				list.forEach(val=>{
					data[val.options.name] = !this.isNull(val.options.value) ? val.options.value : ''
				})
				this.model = data
			}
		},
		onLoad(o) {
			uni.showLoading({
				title:'加载中...'
			})
			this.type = o.type
			this.uuid = o.uuid
			this.tableSchema = o.tableSchema
			this.tableName = o.tableName
			
			// this.fromList = basicsList
			// uni.hideLoading()
			
			if(o.type == 'edit'){
				this.getDetailData()
				uni.hideLoading()
			} else {
				this.fromList = uni.getStorageSync('jsonData')
				uni.hideLoading()
			}
			
			//添加表单验证规则
			if(this.fromList.length > 0){
				let rule = []//表单规则
				let whiteList = ['checkbox','area','upload']
				this.fromList.forEach(val=>{
					if(val.options.required){
						let list = {
							[val.options.name]:[{
								required: true,
								message: '请输入 ' + val.options.name,
								trigger: ['blur','change'],
								type: whiteList.includes(val.type) ? 'array' : null
							}]
						}
						rule = Object.assign(list,rule)
					}
				})
				this.rules = rule
				console.log("this.rules",this.rules)
			}
		},
		methods: {
			getDetailData(){
				let that = this
				let params = {
					tableSchema: that.tableSchema,
					tableName: that.tableName,
					uuid: that.uuid
				}
				that.$http.post('/system/sysAppDetailed/scanPreviewGetDetailByUuid ',params , {
						params: {},
					})
					.then(res => {
						if(res.statusCode == 200){
							let data = res.data[0]
							for(let key in data){
								data[key] = that.isNull(data[key]) ? '' : data[key]
							}
							//处理表单
							this.fromList = this.mergeFromList(data)
						}
					})
					.catch(err => {});
			},
			changeValue(value,key){
				this.model[key] = value
				this.$nextTick(()=>{
					console.log("model---",this.model)
					this.$forceUpdate()
				})
			},
			formSubmit(){
				let that = this
				let url = ''
				that.$nextTick(function(){
					console.log("model----",that.model)
					that.$refs.uForm.validate(valid => {
						if (valid) {
							if(that.type == 'add'){
								url = that.url.save
							} else {
								url = that.url.updata
							}
							that.model = {
								...that.model,
								uuid: that.type == 'add' ? '' : that.uuid
							}
							that.model = that.objectHumpToLine(that.model)  //驼峰转下划线
							let params = {
								tableSchema: that.tableSchema,
								tableName: that.tableName,
								...that.model
							}
							that.$http.post(url,params , {
									params: {},
								})
								.then(res => {
									that.$u.toast(res.data.message)
									if(res.data.statusCode == 200){
										var pages = getCurrentPages();
										var prevPage = pages[pages.length - 2]; //上一个页面
										prevPage.$vm.refshList()
										uni.navigateBack()
									}
								})
								.catch(err => {});
						} else {
							that.$u.toast('验证失败')
						}
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
