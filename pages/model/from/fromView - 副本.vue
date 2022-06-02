<template>
	<view class="container " :class="[vtheme]">
		<view class="bg-box padding-lr">
			<u-form :model="model" ref="uForm" :rules="rules" :errorType="errorType">
				<!-- text left-icon：label图标； clearable:显示清除图标；border:是否显示边框；trim是否自动去除两端空格 height:初始高度；auto-height：自动增加高度-->
				<u-form-item label-width="180" required label-position="left" label="库名" prop="warehouseName">
					<u-input :border="false" placeholder="请输入库名" v-model="model.warehouseName" type="text" clearable :trim="true" ></u-input>
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
					<u-input :border="false" placeholder="请选择日期" v-model="model.time" @click="()=>{show = true}" iconName="man-add" iconNameColor="cu-botton-text-tips"></u-input>
					<u-picker mode="time" v-model="show" :minuteStep="30" :params="timeParams" 
						@confirm="changeTime" :showTimeTag="false"></u-picker>
				</u-form-item>
				<!-- 开关选择器 size：开关按钮大小-->
				<u-form-item label-position="left" label="开关选择器" prop="switch" label-width="180">
					<u-switch v-model="model.switch" :size="40" @change="changeSwitch" :active-value='0' :inactive-value='1'></u-switch>
				</u-form-item>
				<!-- 评分 current：默认选择几个星星；count：星星总数-->
				<u-form-item label-position="left" label="评分" prop="rate" label-width="180">
					<u-rate v-model="model.rate" :current="3" :count="6"></u-rate>
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
	import TInput from '@/components/custom/TInput.vue'
	export default {
		components:{dictSelect,pickerSelect,deptPopup,TInput},
		data() {
			return {
				fromList:[],//表单数据
				type: '',
				params: {},
				show:false,
				selectShow:false,
				model: {
					warehouseName: '',
					age: '',
					password: '',
					type: '年会',
					typeValue: "meeting.type01",
					intro: '',
					likeFruit: ['notice_01'],
					payType: 'security_01',
					time: '',
					switch: true,
					rate: '1',
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
				timeParams: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
					timestamp: true,
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
			// 时间选择回调
			changeTime(e){
				let input = ''
				if (this.timeParams.year) input += e.year;
				if (this.timeParams.month) input += '-' + e.month;
				if (this.timeParams.day) input += '-' + e.day;
				if (this.timeParams.hour) input += ' ' + e.hour;
				if (this.timeParams.minute) input += ':' + e.minute;
				if (this.timeParams.second) input += ':' + e.second;
				this.model.time = input
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
