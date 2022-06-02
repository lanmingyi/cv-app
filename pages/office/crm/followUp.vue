<!-- 添加用户跟进页面 -->
<template>
	<view class="container" :class="[vtheme]">
		<view class="margin-bottom-max bg-box">
			<u-form :model="followData" :rules="rules" ref="uForm" :errorType="errorType">
				<view class="padding-lr">
					<u-form-item label-width="180" label-position="left" label="跟进类型" prop="type" :required="true">
						<dict-select type="select" :value="followData.type" @change="(e)=>{selectConfirm('type',e)}"
							placeholder="请选择类型" :disabled="false" :border="false" :list="typeList" dataType="static"
							valueFeiled="value" textFeiled="text" code="" inputAlign="right" mode="single-column"
							url="/system/dicSet/getDicItemByCode">
						</dict-select>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="客户状态" prop="state" :required="true">
						<dict-select type="select" :value="followData.state" @change="(e)=>{selectConfirm('state',e)}"
							placeholder="请选择" :disabled="false" :border="false" :list="stateList" dataType="static"
							valueFeiled="value" textFeiled="text" code="" inputAlign="right" mode="single-column"
							url="/system/dicSet/getDicItemByCode">
						</dict-select>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="意向程度" prop="tag" :required="true">
						<!-- <dict-select
							type="checkbox"
							:value="followData.tag"
							@change="checkGroupChange"
							:disabled="false"
							:list="checkboxList"
							dataType="static"
							valueFeiled="name"
							textFeiled="name"
							code=""
							shape="square"
							:wrap="false"
							url="">
						</dict-select> -->
						<view class="flex align-center flex-wrap">
							<view v-for="(item,index) in checkboxList" :key="index">
								<view class="font-second padding-tb-sm">{{item.title}}</view>
								<u-tag v-for="(child,el) in item.children" :key="el"
									class="margin-right-sm margin-bottom-xs" :text="child.label" :closeable="false"
									:type="child.type" show @click="clickTag(child)"/>
							</view>
						</view>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="内容备注" prop="remark" :required="true">
						<textarea placeholder="请输入" placeholder-style="font-size:13px" v-model="followData.remark"
							:rows="3" />
					</u-form-item>
				</view>
			</u-form>

			<view class="bottom-btn-appro flex align-center justify-center">
				<view class="cu-botton-submit text-center" @click="formSubmit">添加</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dictSelect from '@/components/custom/dictSelect.vue'
	export default {
		components: {
			dictSelect
		},
		data() {
			return {
				typeList: [{
					label: '电话沟通',
					value: '电话沟通'
				}, {
					label: '微信联系',
					value: '微信联系'
				}, {
					label: 'QQ联系',
					value: 'QQ联系'
				}, {
					label: '参加展会',
					value: '参加展会'
				}, {
					label: '拜访客户',
					value: '拜访客户'
				}, {
					label: '地推获客',
					value: '地推获客'
				}],
				stateList: [{
					label: '待沟通',
					value: '待沟通'
				}, {
					label: '无需求',
					value: '无需求'
				}, {
					label: '有需求',
					value: '有需求'
				}, {
					label: '决策中',
					value: '决策中'
				}, {
					label: '洽谈中',
					value: '洽谈中'
				}, {
					label: '已成单',
					value: '已成单'
				}],
				// checkboxList: [{
				// 		label: '无意向',
				// 		value: '无意向',
				// 		checked: false,
				// 		disabled: false,
				// 		type: 'info'
				// 	},
				// 	{
				// 		label: '一般意向',
				// 		value: '一般意向',
				// 		checked: false,
				// 		disabled: false,
				// 		type: 'info'
				// 	},
				// 	{
				// 		label: '高意向',
				// 		value: '高意向',
				// 		checked: false,
				// 		disabled: false,
				// 		type: 'info'
				// 	},
				// 	{
				// 		label: '多次留资',
				// 		value: '多次留资',
				// 		checked: false,
				// 		disabled: false,
				// 		type: 'info'
				// 	},
				// 	{
				// 		label: '需要回访',
				// 		value: '需要回访',
				// 		checked: false,
				// 		disabled: false,
				// 		type: 'info'
				// 	},
				// 	{
				// 		label: '空错号',
				// 		value: '空错号',
				// 		checked: false,
				// 		disabled: false,
				// 		type: 'info'
				// 	},
				// 	{
				// 		label: '恶意辱骂',
				// 		value: '恶意辱骂',
				// 		checked: false,
				// 		disabled: false,
				// 		type: 'info'
				// 	},
				// 	{
				// 		label: '联系不上',
				// 		value: '联系不上',
				// 		checked: false,
				// 		disabled: false,
				// 		type: 'info'
				// 	},
				// 	{
				// 		label: '非本人',
				// 		value: '非本人',
				// 		checked: false,
				// 		disabled: false,
				// 		type: 'info'
				// 	}
				// ],
				checkboxList: [{
					title: '客户类型',
					children:[{
						label: '国有企业',
						value: '国有企业',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '上市公司',
						value: '上市公司',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '外资企业',
						value: '外资企业',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '大型企业',
						value: '大型企业',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '中小企业',
						value: '中小企业',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '个人客户',
						value: '个人客户',
						checked: false,
						disabled: false,
						type: 'info'
					}]
				},{
					title: '意向程度',
					children:[{
						label: '无效客户',
						value: '无效客户',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '没有意向',
						value: '没有意向',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '一般意向',
						value: '一般意向',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '强烈意向',
						value: '强烈意向',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '已经成交',
						value: '已经成交',
						checked: false,
						disabled: false,
						type: 'info'
					}]
				},{
					title: '客户态度',
					children:[{
						label: '比较热情',
						value: '比较热情',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '一般应付',
						value: '一般应付',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '态度冷漠',
						value: '态度冷漠',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '厌恶反感',
						value: '厌恶反感',
						checked: false,
						disabled: false,
						type: 'info'
					}]
				},{
					title: '沟通情况',
					children:[{
						label: '需要回访',
						value: '需要回访',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '无法接通',
						value: '无法接通',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '电话未接',
						value: '电话未接',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '直接挂断',
						value: '直接挂断',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '不回信息',
						value: '不回信息',
						checked: false,
						disabled: false,
						type: 'info'
					}]
				}],
				followData: {
					type: '',
					remark: '',
					state: '',
					tag: [],
				},
				rules: {
					type: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					state: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					tag: [{
						required: true,
						message: '必填',
						trigger: 'change',
						type: 'array',
					}],
					remark: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}]
				},
				errorType: ['message'],
				phone: '',
				focus: false,
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
			getData() {
				let that = this
				that.$http
					.post('/office/crmCustomer/getDetailByPhone', {
						phone: that.phone
					}, {
						params: {},
					})
					.then(res => {
						if (res.statusCode == 200) {
							that.userData = res.data[0]
							for (let key in that.userData) {
								that.userData[key] = that.isNull(that.userData[key]) ? '' : that.userData[key]
							}
							let tagList = that.userData.tag.split(',')
							// let tagList = ['不回信息','直接挂断']
							this.followData.tag = tagList
							this.followData.state = that.isNull(res.data[0].state) ? '' : res.data[0].state
							console.log("tagList", this.followData)
							this.checkboxList.forEach(val => {
								val.children.forEach(e=>{
									if(tagList.includes(e.value)){
										e.checked = true
										e.type = 'primary'
									}
								})
							})
							this.$forceUpdate()
						}
					})
					.catch(err => {});
			},
			clickTag(item){
				item.checked = !item.checked
				item.type = item.checked ? 'primary' : 'info'
				this.checkTag()
			},
			checkTag(){
				let tag = []
				this.checkboxList.forEach(val=>{
					val.children.forEach(e=>{
						if(e.checked){
							tag.push(e.value)
						}
					})
				})
				console.log("tag",tag)
				this.followData.tag = tag
			},
			clickarea() {
				console.log("dainjil", this.$refs.textareaBox)
				this.$nextTick(function() {
					this.$refs.textareaBox.focus = true
				})
			},
			selectConfirm(type, e) {
				console.log("e", type, e)
				this.followData[type] = e
			},
			checkGroupChange(e) {
				console.log("e", e)
				this.followData.tag = e
			},
			formSubmit() {
				var that = this
				let url = ''
				let params = {
					phone: that.phone,
					...that.followData
				}
				console.log("data----", params)
				that.$refs.uForm.validate(valid => {
					if (valid) {
						that.$http
							.post('/office/crmCustomerTrack/save', params, {
								params: {},
							})
							.then(res => {
								that.$u.toast(res.data.message)
								if (res.data.statusCode == 200) {
									var pages = getCurrentPages();
									var prevPage = pages[pages.length - 2]; //上一个页面
									prevPage.$vm.refshList('follow')
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
	/deep/uni-textarea {
		width: 100% !important;
	}
</style>
