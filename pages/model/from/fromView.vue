<template>
	<view class="container " :class="[vtheme]">
		<view class="bg-box padding-lr">
			<u-form :model="model" ref="uForm" :rules="rules" :errorType="errorType">
				<!-- text left-icon：label图标； clearable:显示清除图标；border:是否显示边框；trim是否自动去除两端空格 height:初始高度；auto-height：自动增加高度-->
				<u-form-item label-width="180" required label-position="left" label="库名" prop="warehouseName">
					<u-input :border="false" placeholder="请输入库名" v-model="model.warehouseName" type="text" clearable :trim="true" ></u-input>
					<!-- <t-input :record="model"></t-input> -->
				</u-form-item>
				<!-- number clearable:显示清除图标；maxlength：字符最大长度；border:是否显示边框；trim是否自动去除两端空格 height:初始高度；auto-height：自动增加高度-->
				<u-form-item  label-width="180" label-position="left" label="年龄" prop="age">
					<u-input :border="false" placeholder="请输入年龄" v-model="model.age" type="number" clearable maxlength="16" :trim="true" ></u-input>
				</u-form-item>
				<!-- password clearable:显示清除图标；border:是否显示边框；password-icon:是否显示密码图标-->
				<u-form-item label-width="180" label-position="left" label="密码" prop="password">
					<u-input :password-icon="true" :border="false" type="password" v-model="model.password" placeholder="请输入密码"></u-input>
				</u-form-item>
				<!-- 下拉选择框-->
				
				<!-- dict-select 
					disabled：是否禁用；
					placeholder：下拉框提示语；
					mode：下拉框配置；
					border：边框显示；
					list：静态资源数组 ；
					dataType：数据类型（static/dynamic/dictCode）；
					valueFeiled：文本字段；
					textFeiled： 数据字段；
					code：code值；
					url：动态url;
					wrap：是否换行显示
				-->
				<u-form-item label-position="left" label="类型" label-width="180" prop="type">
					<dict-select
						type="select"
						:value="model.type"
						@change="selectConfirm"
						placeholder="请选择类型"
						:disabled="false"
						:border="false"
						:list="mettingList"
						dataType="dictCode"
						valueFeiled="value"
						textFeiled="text"
						code="meetingsType"
						mode="single-column"
						url="/system/dicSet/getDicItemByCode">
					</dict-select>
				</u-form-item>
				<!-- Textarea clearable:显示清除图标；maxlength：字符最大长度；border:是否显示边框；trim是否自动去除两端空格 height:初始高度；auto-height：自动增加高度-->
				<u-form-item label-position="left" label="简介" prop="intro" label-width="180">
					<u-input type="textarea" :border="false" placeholder="请填写简介" v-model="model.intro" height="100" :auto-height="true" />
				</u-form-item>
				<!-- 复选框 shape：样式；label-disabled：文字可点击：width:宽度；wrap：是否每个独占一行-->
				<u-form-item label-position="left" label="通知方式" label-width="180" prop="likeFruit">
					<dict-select
						type="checkbox"
						:value="model.likeFruit"
						@change="checkGroupChange"
						:disabled="false"
						:list="checkboxList"
						dataType="dictCode"
						valueFeiled="value"
						textFeiled="text"
						code="meetingNotice"
						shape="square"
						:wrap="false"
						url="/system/dicSet/getDicItemByCode">
					</dict-select>
				</u-form-item>
				<!-- 单选框 shape：样式；label-disabled：文字可点击;width:宽度；wrap：是否每个独占一行-->
				<u-form-item label-position="left" label="设备保障" prop="payType" label-width="180">
					<dict-select
						type="radio"
						:value="model.payType"
						@change="radioGroupChange"
						:disabled="false"
						:list="radioList"
						dataType="dictCode"
						valueFeiled="value"
						textFeiled="text"
						code="security"
						shape="circle"
						:wrap="false"
						url="/system/dicSet/getDicItemByCode">
					</dict-select>
				</u-form-item>
				<!-- 日期 mode：时间选择器；minuteStep：分钟步长； params:配置年，日，月，时，分，秒参数是否可以选择和回显 showTimeTag： 是否显示时间中文提示-->
				<u-form-item label-position="left" label="日期" prop="time" label-width="180">
					<!-- picker-select  
						mode ：类型
							time ：时间
							region ： 区域
						record
							disabled：是否禁用；
							placeholder：下拉框提示语；
							border：边框显示；
							value: 值
							required: 是否必填
							params: { 时间、区域获取数据配置参数
								//time : {
									year: true,
									month: true,
									day: true,
									hour: true,
									minute: true,
									second: true,
									timestamp: true,
								}
								//region : {
									province: true,
									city: true,
									area: true
								}
							}
							areaCode: mode为region生效  默认选择地址
					-->
					<picker-select 
						mode="time"
						type="select"
						:border="true"
						placeholder="请选择" 
						:disabled="false" 
						:value="model.time"
						:params="timeParams"
						@change="(e)=>{handleChange(e,'time')}"></picker-select>
				</u-form-item>
				<!-- 开关选择器 size：开关按钮大小-->
				<u-form-item label-position="left" label="开关选择器" prop="switch" label-width="180">
					<u-switch v-model="model.switch" :size="40" @change="changeSwitch" :active-value='0' :inactive-value='1'></u-switch>
				</u-form-item>
				<!-- 评分 current：默认选择几个星星；count：星星总数-->
				<u-form-item label-position="left" label="评分" prop="rate" label-width="180">
					<u-rate v-model="model.rate" :current="3" :count="6"></u-rate>
				</u-form-item>
				<!-- 上传 action：上传地址；uploadText：文字显示；maxCount：上传最大数量；showProgress：显示进度条；file-list：上传文件列表；deletable：显示删除按钮-->
				<u-form-item label-position="left" label="上传" prop="upload" label-width="180">
					<Tupload
						action="https://vue.misboot.com/document/oss/upload" 
						uploadText="上传图片" 
						maxCount="1" 
						:showProgress="true" 
						:file-list="[]" 
						:deletable="true" 
						@change="(list)=>{handleChange(list,'upload')}"
					></Tupload>
				</u-form-item>
				<!-- 滑动选择器 min：最小值；max：最大值 范围0-100；step：步长；disabled：是否禁用-->
				<u-form-item label-position="left" label="滑动选择" prop="slider" label-width="180">
					<u-slider
						style="width: 100%;"
						v-model="model.slider" 
						min="0" 
						max="100" 
						step="1" 
						:disabled="false"
					></u-slider>
				</u-form-item>
				<!-- 级联选择器 -->
				<u-form-item label-position="left" label="级联选择" prop="cascader" label-width="180">
					<dict-select
						type="select"
						mode="mutil-column-auto"
						:value="model.cascader"
						:selectValue="[]"
						@change="(label,value)=>{handleChange(value,'cascader')}"
						:disabled="false"
						:list="cascaderList"	
						dataType="static"
						valueFeiled="value"
						textFeiled="text"
						code="security"
						url="/system/dicSet/getDicItemByCode">
					</dict-select>
				</u-form-item>
				<!-- 文本 仅显示 v-html：文本值；fontSize：字体大小；color：字体颜色-->
				<u-form-item label-position="left" label="文本" prop="text" label-width="180">
					<text
						v-html="model.text"
						:fontSize="16"
						color="#f40" >
					</text>
				</u-form-item>
				<!-- 省市区选择 -->
				<u-form-item label-position="left" label="省市区" prop="areaCode" label-width="180">
					<picker-select 
						mode="region" 
						type="select"
						@change="(code,text)=>{handleChange(code,'areaCode',text,'areaText')}"
						:value="model.areaCode" 
						:areaText="model.areaText"  
						:border="true"
						placeholder="请选择" 
						:defaultParams="areaParams"></picker-select>
				</u-form-item>
				<!-- 组织机构 
				deptData：
					border: 显示边框,
					placeholder: 占位符,
					value: 值
				-->
				<u-form-item label-position="left" label="组织机构" prop="dept" label-width="180">
					<dept-popup 
						:value="model.dept"
						:border="true"
						placeholder="请选择" 
						@change="(list,e)=>{handleChange(e,'dept')}"
						></dept-popup>
				</u-form-item>
			</u-form>
		</view>
		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="cu-botton-submit text-center" @click="formSubmit">提交</view>
		</view>
	</view>
</template>

<script>
	import dictSelect from '@/components/custom/dictSelect.vue'
	import pickerSelect from '@/components/custom/pickerSelect.vue'
	import deptPopup from '@/components/custom/deptPopup.vue'
	export default {
		components:{dictSelect,pickerSelect,deptPopup},
		data() {
			return {
				fromList:[],//表单数据
				type: '',
				params: {},
				sliderValue: 30,
				show:false,
				selectShow:false,
				model: {
					warehouseName: '',
					age: '',
					password: '',
					type: 'meeting.type02',
					intro: '',
					cascader:'1,2,4',
					likeFruit: ['notice_01','notice_02'],
					payType: 'security_01',
					areaText: ["北京市", "市辖区", "东城"],
					areaCode: ["11", "1101", "110101"],
					time: '2021-08-25',
					switch: true,
					rate: '1',
					upload: '',
					slider: 30,
					text: '文本区'
				} ,//表单数据验证必须存在
				rules:{
					warehouseName :[{
						required: true,
						message: '请输入库名',
						trigger: 'blur' ,
					}]
				},
				checkboxList: [
					{
						name: '荔枝',
						checked: false,
						disabled: false
					},
					{
						name: '香蕉',
						checked: false,
						disabled: false
					},
					{
						name: '橙子',
						checked: false,
						disabled: false
					}
				],
				radioList: [
					{
						name: '支付宝',
						checked: true,
						disabled: false
					},
					{
						name: '微信',
						checked: false,
						disabled: false
					},
					{
						name: '现金',
						checked: false,
						disabled: false
					}
				],
				cascaderList:[{
					value: 1,
					label: '选项1',
					title: '选项1',
					key: 1,
					scopedSlots: {
						title: "custom"
					},
					children: [{
						value: 2,
						label: '选项1-1',
						title: '选项1-1',
						key: 2,
						scopedSlots: {
							title: "custom"
						},
						children: [{
								value: 3,
								label: '选项1-1-1',
								title: '选项1-1-1',
								key: 3,
								scopedSlots: {
									title: "custom"
								}
							},
							{
								value: 4,
								label: '选项1-1-2',
								title: '选项1-1-2',
								key: 4,
								scopedSlots: {
									title: "custom"
								}
							}
						]
					}]
				}, {
					value: 8,
					label: '选项2',
					title: '选项2',
					key: 8,
					scopedSlots: {
						title: "custom"
					},
					children: [{
						value: 9,
						label: '选项2-1',
						title: '选项2-1',
						key: 9,
						scopedSlots: {
							title: "custom"
						},
						children: [{
							value: 10,
							label: '选项2-2',
							title: '选项2-2',
							key: 10,
							scopedSlots: {
								title: "custom"
							}
						}]
					}]
				}],
				timeParams: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				areaParams :{
					province: true,
					city: true,
					area: true
				},
				deptData:{
					border: true,
					placeholder: '请选择',
					value: ''
				},
				mettingList: [],
				errorType: ['message'],
				url : {
					getData : '/office/oaWorkSupplies/getDetailByUuid',
					save: '/office/oaWorkSupplies/save',
					updata: '/office/oaWorkSupplies/update',
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(o) {
			this.type = o.type
			this.params.uuid = o.uuid
			if(o.type == 'edit'){
				this.getDetailData()
				uni.hideLoading()
			} else {
				uni.hideLoading()
			}
			// this.getDicItemByCode()
		},
		methods: {
			//获取详情数据
			getDetailData(){
				let that = this
				let params = {
					...that.params
				}
				that.$http.post(that.url.getData,params , {
						params: {},
					})
					.then(res => {
						if(res.statusCode == 200){
							that.model = res.data
							for(let key in that.model){
								that.model[key] = that.isNull(that.model[key]) ? '' : that.model[key]
							}
						}
					})
					.catch(err => {});
			},
			//获取数据字典值
			getDicItemByCode(){
				let that = this
				let url = '/system/dicSet/getDicItemByCode'
				//下拉框
				that.$http.post(url, {code : 'meetingsType'}, {
						params: {},
					}).then(res => {
						that.mettingList = res.data
					}).catch(err => {});
				//单选
				that.$http.post(url, {code : 'security'}, {
						params: {},
					}).then(res => {
						res.data.forEach((val)=>{
							val.checked = false,
							val.disabled = false
						})
						that.radioList = res.data
					}).catch(err => {});
				//复选
				that.$http.post(url, {code : 'meetingNotice'}, {
						params: {},
					}).then(res => {
						res.data.forEach((val)=>{
							val.checked = false,
							val.disabled = false
						})
						that.checkboxList = res.data
					}).catch(err => {});
			},
			handleChange(value,valueKey,label,labelKey){
				this.model[valueKey] = value
				if(label && labelKey)this.model[labelKey] = label
				this.$forceUpdate()
			},
			changeSwitch(e){
				console.log("e",e)
				// this.model.switch = e;
			},
			//单选框回调事件
			radioGroupChange(e){
				this.model.payType = e;
			},
			//复选框回调事件
			checkGroupChange(e){
				this.model.likeFruit = e;
			},
			//下拉回调事件
			selectConfirm(label,value){
				this.model.type = label
				this.model.typeValue = value
			},
			//级联回调事件
			handleCascaderChange(e){
				this.model.cascader = e;
			},
			// 省市区回调事件
			changeRegion(code,text){
				this.model.areaCode = code
				this.model.areaText = text
			},
			// 时间选择回调
			changeTime(e){
				this.model.time = e
			},
			//组织机构选择回调
			handlePickerChange(list,value){
				this.model.area = value
			},
			//表单验证
			formSubmit(){
				let that = this
				let url = ''
				that.$nextTick(function(){
					let from = that.$refs.uForm
					console.log(that.model)
					from.validate(valid => {
						if (valid) {
							if(that.type == 'add'){
								url = that.url.save
							} else {
								url = that.url.updata
							}
							let params = {
								...that.model
							}
							that.$http.post(url, params, {
									params: {},
								})
								.then(res => {
									that.$u.toast(res.data.message)
									if(res.data.statusCode===200){
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
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
