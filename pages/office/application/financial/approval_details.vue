<template>
	<view class="container" :class="[vtheme]">
		<view v-if="emptyType==0" class="empty text-center margin-tb padding-top-xl">
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="emptyType==1" class="empty text-center margin-tb padding-top-xl">
			<u-empty text="页面消失了" mode="page" icon-size="200"></u-empty>
		</view>
		<view v-if="emptyType==2" >
			<u-form :model="detailsData" ref="uForm"  class="u-padding-bottom-75 bg-box">
				<view class="padding-tb-sm padding-lr">
					<view class="font-main text-bold padding-right-sm">
						{{title}}
					</view>
				</view>
				
				<view class="text-box-line"></view>
				<view class="padding-lr">
					<u-form-item label-width="180" label-position="top" label="流水号" >
						<u-input :border="false" v-model="detailsData.serialNumber" type="text" disabled></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="填报时间" >
						<u-input :border="false" v-model="detailsData.fillingDate" type="text" disabled></u-input>
					</u-form-item>
					
					<view  v-if="detailsData.projectType == 'officeFinanceProjectType01' || detailsData.projectType == 'officeFinanceProjectType04' || detailsData.projectType == 'officeFinanceProjectType05'">
						<u-form-item label-width="180" label-position="top" label="借款是由" >
							<u-input :border="false"  v-model="detailsData.subjectMatter" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="借款人" >
							<u-input :border="false"  v-model="detailsData.loanUser" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="借款人单位" >
							<u-input :border="false"  v-model="detailsData.loanDepartmentName" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="还款日期" >
							<u-input :border="false"  v-model="detailsData.loanRepaymentDateStr" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="借款金额" >
							<u-input :border="false"  v-model="detailsData.loanMoney" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="金额大写" >
							<u-input :border="false"  v-model="detailsData.loanMoneyCapitalization" type="text" disabled></u-input>
						</u-form-item>
					</view>
					
					<view v-if="detailsData.projectType == 'officeFinanceProjectType02'">
						<u-form-item label-width="180" label-position="top" label="报销类型" >
							<u-input :border="false"  v-model="detailsData.reimbursementType" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="报销人" >
							<u-input :border="false"  v-model="detailsData.loanUser" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="报销人单位" >
							<u-input :border="false"  v-model="detailsData.loanDepartmentName" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="报销是由" >
							<u-input :border="false"  v-model="detailsData.loanDepartmentName" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="报销明细" >
							<view style="width: 100%;">
								<view class="flex align-center justify-around text-center padding-tb-sm bg-gray u-font-13">
									<text style="width: 25%;border-right: 1px solid #000000;">分类项</text>
									<text style="width: 25%;border-right: 1px solid #000000;">事由</text>
									<text style="width: 25%;border-right: 1px solid #000000;">单据(张)</text>
									<text style="width: 25%;">金额(元)</text>
								</view>
								<view class="flex align-center justify-around text-center padding-tb-sm border-top bg-gray u-font-13" v-for="(item,index) in detailList" :key="index">
									<text style="width: 25%;border-right: 1px solid #e7e7e7;">{{item.classification}}</text>
									<text style="width: 25%;border-right: 1px solid #e7e7e7;">{{item.subjectMatter}}</text>
									<text style="width: 25%;border-right: 1px solid #e7e7e7;">{{item.bill}}</text>
									<text style="width: 25%;">{{item.amountOfMoney}}</text>
								</view>
							</view>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="报销金额" >
							<u-input :border="false"  v-model="detailsData.reimbursementMoney" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="金额大写" >
							<u-input :border="false"  v-model="detailsData.reimbursementMoneyCapitalization" type="text" disabled></u-input>
						</u-form-item>
					</view>
					
					<view v-if="detailsData.projectType == 'officeFinanceProjectType03'">
						<u-form-item label-width="180" label-position="top" label="付款事由" >
							<u-input :border="false"  v-model="detailsData.loanDepartmentName" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="付款人" >
							<u-input :border="false"  v-model="detailsData.loanUser" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="付款人单位" >
							<u-input :border="false"  v-model="detailsData.loanDepartmentName" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="付款金额" >
							<u-input :border="false"  v-model="detailsData.paymentMoney" type="text" disabled></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="top" label="金额大写" >
							<u-input :border="false"  v-model="detailsData.paymentMoneyCapitalization" type="text" disabled></u-input>
						</u-form-item>
					</view>
					
					<u-form-item label-width="180" label-position="top" label="备注" class="border-bottom-none">
						<u-input :border="false"  v-model="detailsData.remarks" type="text" disabled></u-input>
					</u-form-item>
				</view>
				
				<!-- <view class="text-box-line"></view>
				<view class="font-main text-bold bg-box padding-tb-sm padding-lr">
					<text>流程</text>
				</view> -->
				
				<!-- <view v-if="type && type == 'approval'">
					<view class="text-box-line"></view>
					<view class="font-main text-bold bg-box padding-tb-sm padding-lr">
						<text>流程意见</text>
					</view>
					<view class="cu-form-group bg-box">
						<textarea maxlength="-1" v-model="processComments" placeholder="请输入流程意见"></textarea>
					</view>
				</view> -->
			</u-form>
			
			<view class="bottom-btn-appro-two flex align-center justify-center" v-if="type && type == 'approval' && detailsData.state!='officeFinanceLoanState03'">
				<view class="cu-botton-delete text-center" @click="formSubmit('no')">驳回</view>
				<view class="cu-botton-submit text-center" @click="formSubmit('yes')">同意</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {uniLoadMore},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				detailsData: {},
				title: '',
				detailList: [],
				uuid: '',
				type: '',
				emptyType: 0,
				loadingType: 'loading',
				processComments: ''
			};
		},
		onLoad(options) {
			let uuid = options.uuId
			this.uuid = options.uuId
			this.type = options.type
			this.getList(this.uuid)
			this.$nextTick(()=>{
				this.getData(uuid)
			})
		},
		methods: {
			changeColl(e){
				console.log("点击了",e)
			},
			getData(uuid){
				var that = this;
				that.$http
					.post('/office/officeFinance/getDetailByUuid', {uuid: uuid}, {
						params: {},
					})
					.then(res => {
						if(res.data){
							setTimeout(()=>{
								that.emptyType = 2
								that.detailsData = res.data
								if(res.data.projectType == 'officeFinanceProjectType01'){ //借款
									that.title = '借款申请'
								} else if(res.data.projectType == 'officeFinanceProjectType02'){ //支出报销
									that.title = '支出报销'
								} else if(res.data.projectType == 'officeFinanceProjectType03'){ //付款申请
									that.title = '付款申请'
								} else if(res.data.projectType == 'officeFinanceProjectType04'){ //延迟还款
									that.title = '延迟还款'
								} else if(res.data.projectType == 'officeFinanceProjectType05'){ //还款申请
									that.title = '还款申请'
								}
								console.log("22222",that.emptyType)
							},500)
						} else {
							console.log("11111")
							that.emptyType = 1
							that.loadingType = 'nomore'
						}
					})
					.catch(err => {
						that.emptyType = 1
					});
			},
			getList(uuid){
				var that = this;
				that.$http
					.post('/office/officeReimbursementDetails/getPageSet', {financeUuid: uuid}, {
						params: {},
					})
					.then(res => {
						this.detailList = res.data.rows
						console.log("this.detailList------",this.detailList)
					})
					.catch(err => {});
			},
			formSubmit(type){
				var state = type === 'yes' ? 'officeFinanceLoanState03' : 'officeFinanceLoanState05'
				this.$http
					.post('/office/officeFinance/update', {
						uuid: this.uuid,
						state: state
					}, {
						params: {},
					})
					.then(res => {
						if (res === 1 || res.statusCode === 200) {
							this.$u.toast('操作数据成功')
							setTimeout(()=>{
								uni.setStorage({
									key:'onFresh',
									data: true
								})
								uni.navigateBack();
							},300)
						} else {
							uni.showToast({title: "操作数据失败!",icon: 'none',duration: 1000,});
						}
					})
				console.log("this.processComments")
			},
		}
	};
</script>

<style lang="scss" scoped>


</style>
