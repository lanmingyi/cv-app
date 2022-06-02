<template>
	<view class="container" :class="[vtheme]">
		<view class="margin-bottom-max bg-box">
			<u-form :model="supplieData" :rules="rules" ref="uForm" :errorType="errorType">
				<view class="padding-lr">
					<u-form-item label-width="180" label-position="top" :label="title+`单号`" prop="warehouseTicketNumbers" :required="true">
						<u-input :border="false" placeholder="" v-model="supplieData.warehouseTicketNumbers" type="text" disabled></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="left" label="数量" prop="counts" :required="true">
						<u-input type="number" v-model="supplieData.counts" :placeholder="countsText"></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="left" :label="title+`人`" prop="warehouseMan" :required="true">
						<user-popup
							ref="userPop" 
							:value="supplieData.warehouseMan" 
							type="3" 
							placeholder="" 
							@change="changeUser" 
							iconName="man-add" 
							iconNameColor="cu-color-icon"></user-popup>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="top" :label="title+`备注`" prop="remark">
						<u-input :border="false" placeholder="" v-model="supplieData.remark" type="textarea" :rows="4"></u-input>
					</u-form-item>
				</view>
			</u-form>
		</view>
		
		
		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="cu-botton-submit text-center" @click="formSubmit">新建</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import moment from 'moment';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {uniLoadMore},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				title: '仓库',
				isChoose: [],
				query:[],
				warehouseList: [],
				suplistList: [],
				supplieData: {
					warehouseTicketNumbers: '',
					warehouseName: '',
					useType: '',
					useName: '',
					useTypeName: '',
					counts: '',
					warehouseMan: '',
					warehouseManId: '',
					suplistUuid: '',
					warehouseUuid: '',
					remark: ''
				},
				countsText: '请输入',
				rules: {
					warehouseTicketNumbers: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
							type: 'number'
						}
					],
					counts: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					],
					warehouseMan:[
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					]
				},
				errorType: ['border-bottom'],
				url: {
					getSerialNumber: '/office/officeMeetingRegister/getSerialNumber',
					getDicItemByCode: '/system/dicSet/getDicItemByCode',
					getPageSetSupplies: '/office/oaWorkSupplies/getPageSet',
					getPageSetSuplist: '/office/oaWorkSuplist/getPageSet',
					getPageSetList: '/office/oaWorkSuplist/getPageSetList',
				},
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(o) {
			this.uuid = o.uuid
			this.type = o.type
			document
			if(o.type && o.type== 'put'){
				this.title = '入库'
				this.supplieData.type = 'entrySave'
			}else if(o.type && o.type== 'out'){
				this.title = '出库'
				this.supplieData.type = 'quitSave'
			}
			uni.setNavigationBarTitle({
			　　title: '用品' + this.title
			})
			this.getDate(o.uuid)
		},
		methods: {
			getDate(uuid){
				var that = this;
				that.$http
					.post(this.url.getSerialNumber, {}, {
						params: {},
					})
					.then(res => {
						this.supplieData.warehouseTicketNumbers = res.data
					})
				that.$http
					.post('/office/oaWorkSuplist/getDetailByUuid', {
						uuid: uuid
					}, {
						params: {},
					})
					.then(res => {
						this.supplieData.warehouseName = res.data.suppliesName
						this.supplieData.warehouseUuid = res.data.suppliesUuid
						this.supplieData.useName = res.data.useName
						this.supplieData.useType = res.data.useType
						this.supplieData.useTypeName = res.data.useTypeName
						this.supplieData.suplistUuid = res.data.uuid
						this.countsText = '现存数量' + res.data.counts
					})
					.catch(err => {
						this.emptyType = 1
					});
			},
			formSubmit(){
				var that = this
				let url = ''
				that.$refs.uForm.validate(valid => {
					console.log("that.supplieData",that.supplieData)
					if (valid) {
						that.$http.post('/office/oaWorkWarehouse/save', that.supplieData, {
								params: {},
							})
							.then(res => {
								uni.showToast({title: res.data.message,icon: 'none',duration: 1000});
								if(res.data.statusCode == 200){
									that.$u.toast('新建成功')
									setTimeout(()=>{
										uni.setStorage({
											key:'onFresh',
											data: true
										})
										uni.navigateBack();
									},300)
								}
							})
					} else {
						console.log('验证失败');
					}
				});
			},
			changeUser(list,type){
				this.$nextTick(()=>{
					this.supplieData.warehouseMan = list[0].name
					this.supplieData.warehouseManId = list[0].id
					this.$forceUpdate()
				})
			},
			handleChange(label,labelKey,value,valuekey){
				this.supplieData[labelKey] = label
				if(value&&valuekey)this.supplieData[valuekey] = value
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
