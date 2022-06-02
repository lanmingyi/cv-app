<template>
	<u-popup mode="bottom" height="100%" v-model="show">
		<view class="content">
			<view class="container-box" :class="[vtheme]">
				<view class="bg-box">
					<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
						<view class="padding-lr">
							<u-form-item label-width="180" label-position="top" label="标题" prop="title" :required="true">
								<u-input :border="false" placeholder="" v-model="model.title" type="text"></u-input>
							</u-form-item>
							<u-form-item label-width="180" label-position="top" label="姓名" prop="name" >
								<u-input :border="false" placeholder="" v-model="model.name" type="text"></u-input>
							</u-form-item>
							<u-form-item label-width="180" label-position="top" label="性别" prop="sex" >
								<dict-select
									:value="model.sexText"
									type="select"
									:border="false"
									:list="sexList"
									@change="changeSex"></dict-select>
							</u-form-item>
							<u-form-item label-width="180" label-position="top" label="年龄" prop="age" >
								<u-input :border="false" placeholder="" v-model="model.age" type="number"></u-input>
							</u-form-item>
						</view>
					</u-form>
				</view>
				<view class="pos-absolute-bottom bottom-btn-appro-two bg-box flex align-center justify-center">
					<view class="cu-botton-delete text-center" @click="formCancel()">取消</view>
					<view class="cu-botton-submit text-center" @click="formSubmit()">确定</view>
				</view>
			</view>
		</view>
	</u-popup>
	
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		props:{
			mdl:Object,
			show: {
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				model: {
					title: ''
				},
				sexList:[{
					label: '女',
					value: 0
				},{
					label: '男',
					value: 1
				}],
				rules: {
					title: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
				},
				errorType: ['message'],
			};
		},
		watch:{
			mdl: {
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					let data = this.sexList.filter(e=>e.value == newVal.sex)
					console.log(this.sexList,data)
					if(data.length > 0)newVal.sexText = data[0].label
					this.model = Object.assign({},newVal)
					// this.model = val
				},
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(options) {
		},
		methods: {
			onLoadData(item){
				let data = this.sexList.map(e=>e.value == item.sex)
				item.sexText = data[0].label
				this.model = Object.assign({},item)
				// this.model = item
			},
			changeSex(label,value){
				this.model.sexText = label
				this.model.sex = value
			},
			formCancel(){
				this.$refs.uForm.resetFields() //重置表单
				this.$emit('cancel')
			},
			formSubmit(){
				var that = this
				let url = ''
				that.$refs.uForm.validate(valid => {
					if (valid) {
						console.log("that.model",that.model)
						that.$emit('ok',that.model)
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
