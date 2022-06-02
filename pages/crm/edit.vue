<!-- 用户编辑页 -->
<template>
	<view class="container" :class="[vtheme]">
		<view class="margin-bottom-max bg-box">
			<u-form :model="userData" :rules="rules" ref="uForm" :errorType="errorType">
				<view class="padding-lr">
					<u-form-item label-width="180" label-position="left" label="客户姓名" prop="name" :required="false">
						<u-input :border="false" placeholder="" v-model="userData.name" type="text" input-align="right"></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="性别" prop="sex" :required="false">
						<u-input :border="false" placeholder="" v-model="userData.sex" type="text" input-align="right"></u-input>
						<dict-select
							type="select"
							:value="userData.sex"
							@change="(e)=>{selectConfirm('sex',e)}"
							placeholder="请选择"
							:disabled="false"
							:border="false"
							:list="sexList"
							dataType="static"
							valueFeiled="value"
							textFeiled="text"
							code=""
							mode="single-column"
							inputAlign="right"
							url="/system/dicSet/getDicItemByCode">
						</dict-select>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="手机号码" prop="phone" :required="false">
						<u-input :border="false" placeholder="" v-model="userData.phone" type="number" input-align="right" disabled></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="公司名称" prop="company" :required="false">
						<u-input :border="false" placeholder="" v-model="userData.company" type="text" input-align="right"></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="客户职务" prop="duty" :required="false">
						<u-input :border="false" placeholder="" v-model="userData.duty" type="text" input-align="right"></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="地域" prop="region"  :required="false">
						<u-input :border="false" placeholder="请选择地区" input-align="right" v-model="userData.region" type="select" :select-open="pickerShow" @click="()=>{pickerShow=true}"></u-input>
						<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="详细地址" prop="address" :required="false">
						<u-input :border="false" placeholder="" v-model="userData.address" type="text" input-align="right"></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="座机" prop="telephone" :required="false">
						<u-input :border="false" placeholder="" v-model="userData.telephone" type="text" input-align="right"></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="微信号" prop="weixin" :required="false">
						<u-input :border="false" placeholder="" v-model="userData.weixin" type="text" input-align="right"></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="QQ号" prop="qq" :required="false">
						<u-input :border="false" placeholder="" v-model="userData.qq" type="number" input-align="right"></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="邮箱" prop="email" :required="false">
						<u-input :border="false" placeholder="" v-model="userData.email" type="text" input-align="right"></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="top" label="备注" prop="remark" class="border-bottom-none" :required="false">
						<u-input :border="false" placeholder="" v-model="userData.remark" type="textarea" :rows="4"></u-input>
					</u-form-item>
				</view>
			</u-form>
			
			<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
				<view class="cu-botton-submit text-center" @click="formSubmit">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dictSelect from '@/components/custom/dictSelect.vue'
	export default {
		components:{dictSelect},
		data() {
			return {
				pickerShow:false,
				sexList:[{
					label: '男',
					value: '男'
				},{
					label: '女',
					value: '女'
				}],
				typeList:[{
					label: '待沟通',
					value: '待沟通'
				},{
					label: '发现机会',
					value: '发现机会'
				},{
					label: '明确需求',
					value: '明确需求'
				},{
					label: '购买决策',
					value: '购买决策'
				},{
					label: '成单',
					value: '成单'
				}],
				checkboxList: [{
					label: '无意向',
					value: '无意向',
					checked: false,
					disabled: false
				},
				{
					label: '一般意向',
					value: '一般意向',
					checked: false,
					disabled: false
				},
				{
					label: '高意向',
					value: '高意向',
					checked: false,
					disabled: false
				},
				{
					label: '多次留资',
					value: '多次留资',
					checked: false,
					disabled: false
				},
				{
					label: '需要回访',
					value: '需要回访',
					checked: false,
					disabled: false
				},
				{
					label: '空错号',
					value: '空错号',
					checked: false,
					disabled: false
				},
				{
					label: '恶意辱骂',
					value: '恶意辱骂',
					checked: false,
					disabled: false
				},
				{
					label: '联系不上',
					value: '联系不上',
					checked: false,
					disabled: false
				},
				{
					label: '非本人',
					value: '非本人',
					checked: false,
					disabled: false
				}],
				statusList: [{
					label: '启用',
					value: '启用'
				},{
					label: '禁用',
					value: '禁用'
				}],
				userData: {
					type:'',
					remark: '',
					status: '启用'
				},
				rules: {},
				errorType: ['message'],
				phone: ''
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(o) {
			this.phone = o.phone
			this.getData()
			
		},
		methods: {
			getData(){
				let that = this
				that.$http
					.post('/office/crmCustomer/getDetailByPhone', {
						phone: that.phone
					}, {
						params: {},
					})
					.then(res => {
						if(res.statusCode == 200){
							that.userData = res.data[0]
							for(let key in that.userData){
								that.userData[key] = that.isNull(that.userData[key]) ? '' : that.userData[key]
							}
							let tagList = that.userData.tag.split(',')
							that.userData.tag = that.isNull(res.data[0].tag) ? '' : res.data[0].tag.split(',')
							console.log("tagList",tagList)
							that.checkboxList.forEach(val=>{
								if(tagList.includes(val.label)){
									val.checked = true
								}
							})
							that.$forceUpdate()
						}
					})
					.catch(err => {});
			},
			selectConfirm(type,e){
				console.log("e",type,e)
				this.userData[type] = e
			},
			regionConfirm(e){
				console.log("e",e)
				this.userData.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			checkGroupChange(e){
				console.log("e",e)
				this.userData.tag = e
			},
			formSubmit(){
				var that = this
				let url = ''
				console.log("data----",that.userData)
				that.$refs.uForm.validate(valid => {
					if (valid) {
						that.$http
							.post('/office/crmCustomer/update', that.userData, {
								params: {},
							})
							.then(res => {
								that.$u.toast(res.data.message)
								if(res.data.statusCode == 200){
									var pages = getCurrentPages();
									var prevPage = pages[pages.length - 2]; //上一个页面
									prevPage.$vm.refshList('edit')
									uni.navigateBack()
								}
							})
							.catch(err => {});
					} else {
						console.log('验证失败');
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>

