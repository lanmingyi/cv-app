<template>
	<view class="container" :class="[vtheme]">
		<view class="margin-padding-max bg-box">
			<u-form :model="detailsData" :rules="rules" ref="uForm" :errorType="errorType">
				<view class="padding-lr">
					<u-form-item label-width="180" label-position="left" label="填报时间" prop="fillingDate">
						<picker-select
							mode="time" 
							type="text"
							:value="detailsData.fillingDate"
							@change="(e)=>{confirm(e,'fillingDate')}"></picker-select>
					</u-form-item>
					<view v-if="type == 0">
						<u-form-item label-width="180" label-position="left" label="借款是由" prop="subjectMatter" :required="true">
							<u-input :border="false" placeholder="" v-model="detailsData.subjectMatter" type="text">
							</u-input>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="借款人" prop="loanUser" :required="true">
							<user-popup
								ref="userPop" 
								:value="detailsData.loanUser" 
								type="3" 
								placeholder="" 
								@change="changeUser" 
								iconName="man-add" 
								iconNameColor="cu-color-icon"></user-popup>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="借款人单位" prop="loanDepartmentName">
							<u-input :border="false" placeholder="" v-model="detailsData.loanDepartmentName"
								type="select" disabled iconName=""></u-input>
						</u-form-item>
						<u-form-item label-width="180" label-position="left" label="还款日期" prop="loanRepaymentDateStr" :required="true">
							<picker-select
								mode="time" 
								:value="detailsData.loanRepaymentDateStr" 
								placeholder=""
								iconName="clock" 
								iconNameColor="cu-color-icon"
								:params="params"
								@change="(e)=>{confirm(e,'loanRepaymentDateStr')}"></picker-select>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="借款金额(元)" prop="loanMoney" :required="true">
							<u-input :border="false" placeholder="" v-model="detailsData.loanMoney" type="text"
								@input="changeNum"></u-input>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="金额大写"
							prop="loanMoneyCapitalization">
							<u-input :border="false" placeholder="" v-model="detailsData.loanMoneyCapitalization"
								type="text" disabled></u-input>
						</u-form-item>
					</view>

					<view v-if="type == 1">
						<u-form-item label-width="180" label-position="left" label="付款事由" prop="subjectMatter" :required="true">
							<u-input :border="false" placeholder="" v-model="detailsData.subjectMatter" type="text">
							</u-input>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="付款人" prop="loanUser" :required="true">
							<user-popup
								ref="userPop" 
								:value="detailsData.loanUser" 
								type="3" 
								placeholder="" 
								@change="changeUser" 
								iconName="man-add" 
								iconNameColor="cu-color-icon"></user-popup>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="付款人单位" prop="loanDepartmentName">
							<u-input :border="false" placeholder="" v-model="detailsData.loanDepartmentName"
								type="select" disabled iconName=""></u-input>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="付款日期" prop="collectionDateStr" :required="true">
							<picker-select
								mode="time" 
								:value="detailsData.collectionDateStr" 
								placeholder=""
								iconName="clock" 
								iconNameColor="cu-color-icon"
								:params="params"
								@change="(e)=>{confirm(e,'collectionDateStr')}"></picker-select>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="付款金额(元)" prop="paymentMoney" :required="true">
							<u-input :border="false" placeholder="" v-model="detailsData.paymentMoney" type="text"
								@input="changePayment"></u-input>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="金额大写"
							prop="paymentMoneyCapitalization">
							<u-input :border="false" placeholder="" v-model="detailsData.paymentMoneyCapitalization"
								type="text" disabled></u-input>
						</u-form-item>
					</view>

					<u-picker mode="time" v-model="showEndTime" :params="params" @confirm="confirm"></u-picker>

					<view v-if="type ==2">
						<u-form-item label-width="180" label-position="left" label="报销类型" prop="reimbursementType" :required="true">
							<dict-select
								type="select"
								mode="mutil-column-auto"
								:value="detailsData.reimbursementText"
								@change="confirmType"
								:border="false"
								:list="typeList">
							</dict-select>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="报销人" prop="loanUser" :required="true">
							<user-popup
								ref="userPop" 
								:value="detailsData.loanUser" 
								type="3" 
								placeholder="" 
								@change="changeUser" 
								iconName="man-add" 
								iconNameColor="cu-color-icon"></user-popup>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="报销人单位" prop="loanDepartmentName">
							<u-input :border="false" placeholder="" v-model="detailsData.loanDepartmentName"
								type="select" disabled iconName=""></u-input>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="报销是由" prop="subjectMatter" :required="true">
							<u-input :border="false" placeholder="" v-model="detailsData.subjectMatter" type="text"></u-input>
						</u-form-item>

						<u-form-item label-width="180" label-position="top" label="报销明细" prop="subjectMatter" :required="true">
							<view style="width: 100%;">
								<view
									class="flex align-center justify-around text-center padding-tb-sm bg-gray u-font-13">
									<text style="width: 20%;border-right: 1px solid #000000;">分类项</text>
									<text style="width: 20%;border-right: 1px solid #000000;">事由</text>
									<text style="width: 20%;border-right: 1px solid #000000;">单据(张)</text>
									<text style="width: 20%;border-right: 1px solid #000000;">金额(元)</text>
									<text style="width: 20%;" class="cu-color-submit" @click="addLine">新增</text>
								</view>
								<view
									class="flex align-center justify-around text-center padding-tb-sm border-top bg-gray u-font-13"
									v-for="(item,index) in detailList" :key="index">
									<input class="u-font-13" style="width: 20%;border-right: 1px solid #000000;"
										name="input" v-model="item.classification"></input>
									<input class="u-font-13" style="width: 20%;border-right: 1px solid #000000;"
										name="input" v-model="item.subjectMatter"></input>
									<input class="u-font-13" style="width: 20%;border-right: 1px solid #000000;"
										name="input" v-model="item.bill"></input>
									<input class="u-font-13" style="width: 20%;border-right: 1px solid #000000;"
										name="input" v-model="item.amountOfMoney" @input="changeReim"></input>
									<text style="width: 20%;" class="cu-color-delete" @click="deleteLine(item,index)">删除</text>
								</view>
							</view>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="报销金额(元)" prop="reimbursementMoney">
							<u-input :border="false" placeholder="" v-model="detailsData.reimbursementMoney"
								type="text" disabled></u-input>
						</u-form-item>

						<u-form-item label-width="180" label-position="left" label="金额大写"
							prop="reimbursementMoneyCapitalization">
							<u-input :border="false" placeholder=""
								v-model="detailsData.reimbursementMoneyCapitalization" type="text" disabled></u-input>
						</u-form-item>

					</view>

					<u-form-item label-width="180" label-position="top" label="备注" prop="remarks"
						class="border-bottom-none">
						<u-input :border="false" placeholder="" v-model="detailsData.remarks" type="textarea"
							:rows="4"></u-input>
					</u-form-item>
				</view>

				<view class="text-box-line"></view>
				<view class="font-main text-bold bg-box padding-tb-sm padding-lr">
					<text>流程</text>
				</view>
			</u-form>
		</view>

		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="cu-botton-submit text-center" @click="formSubmit">发起申请</view>
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
		components: {
			uniLoadMore,
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				title: '',
				uuid: '',
				type: '',
				emptyType: 0,
				loadingType: 'loading',
				processComments: '',
				showEndTime: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
					timestamp: true,
				},
				isChoose: [],
				query: [],
				logReceive: '',
				logReceiveName: '',
				showType: false,
				typeList: [],
				detailList: [],
				detailsData: {
					fillingDate: '',
					subjectMatter: '',
					loanUser: '',
					loanDepartmentName: '',
					loanRepaymentDateStr: '',
					loanMoney: '',
					collectionDateStr: '',
					paymentMoney: '',
					paymentMoneyCapitalization: '',
					reimbursementType: '',
					reimbursementTypeSon: '',
					reimbursementMoney: '',
					reimbursementMoneyCapitalization: ''
				},
				rules: {
					fillingDate: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					subjectMatter: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					loanUser: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					loanDepartmentName: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					loanRepaymentDateStr: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					loanMoney: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					collectionDateStr: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					paymentMoney: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					reimbursementType: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					reimbursementTypeSon: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					// reimbursementMoney: [{
					// 	required: true,
					// 	message: '必填',
					// 	trigger: 'change',
					// }],
				},
				errorType: ['message'],
				showPop:false,
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(options) {
			this.getTypeList('A678492BBD7942EA8E96E85B27112154')
			let index = options.index
			this.type = options.index
			if (index == 0) {
				this.title = '借款申请'
			} else if (index == 1) {
				this.title = '付款申请'
			} else if (index == 2) {
				this.title = '支出报销'
			}
			uni.setNavigationBarTitle({
				title: this.title
			});
			this.detailsData.fillingDate = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
		},
		methods: {
			openShowType() {
				this.$nextTick(() => {
					this.showType = true
				})
			},
			getTypeList(pid) {
				var that = this;
				that.$http
					.post('/system/codeItem/getListByPid', {
						pid: pid
					}, {
						params: {},
					})
					.then(res => {
						let type = res.data
						type.forEach(val => {
							let list = {
								value: val.id,
								label: val.text,
								uuid: val.uuid,
								code: val.code,
								children: []
							}
							that.typeList.push(list)
							that.getTypeSonList(val.id)
						})
					})
			},
			getTypeSonList(pid) {
				var that = this;
				that.$http
					.post('/system/codeItem/getListByPid', {
						pid: pid
					}, {
						params: {},
					})
					.then(res => {
						let type = res.data
						type.forEach(val => {
							let list = {
								value: val.id,
								label: val.text
							}
							that.typeList.forEach(val => {
								if (val.value == pid) {
									val.children.push(list)
								}
							})
						})
					})
			},
			//  : uuid
			changeUser(list, type) {
				this.$nextTick(() => {
					this.detailsData.loanUser = list[0].name
					this.detailsData.loanUserId = list[0].id
					this.detailsData.loanDepartmentName = list[0].departmentName
					this.detailsData.loanDepartmentId = list[0].pid
					this.$forceUpdate()
				})
			},
			changeColl(e) {
				console.log("点击了", e)
			},
			confirmType(label,value) {
				let labelList = label.split('-')
				let valueList = value.split(',')
				this.$nextTick(function() {
					this.detailsData.reimbursementTypeUuid = valueList[0]
					this.detailsData.reimbursementText = label
					this.detailsData.reimbursementType = labelList[0]
					this.detailsData.reimbursementTypeSon = labelList[1]
					this.$forceUpdate()
				})
			},
			confirm(e,prop) {
				this.$nextTick(function() {
					this.detailsData[prop] = e
					this.$forceUpdate()
				})
			},
			changeNum(e) {
				this.detailsData.loanMoneyCapitalization = this.changeCapital(Number(e))
			},
			changePayment(e) {
				this.detailsData.paymentMoneyCapitalization = this.changeCapital(Number(e))
			},
			changeReim() {
				// this.detailsData.PaymentCapitalization= this.changeCapital(Number(e.target.value))
				var num = ''
				this.detailList.forEach(val => {
					num = Number(num) + Number(val.amountOfMoney)
				})
				this.detailsData.reimbursementMoney = num != 0 ? num : ''
				this.detailsData.reimbursementMoneyCapitalization = this.changeCapital(Number(num))
			},
			addLine() {
				console.log("123")
				var parmas = {
					classification: '',
					subjectMatter: '',
					bill: '',
					loanSerialNumber: '',
					amountOfMoney: ''
				}
				this.detailList.push(parmas)
			},
			deleteLine(item, index) {
				console.log("item.index", item, index)
				this.$nextTick(() => {
					this.detailList.splice(index, 1)
					this.changeReim()
				})
			},
			getData(uuid) {
				var that = this;
				that.$http
					.post('/office/officeFinance/getDetailByUuid', {
						uuid: uuid
					}, {
						params: {},
					})
					.then(res => {
						if (res.data) {
							setTimeout(() => {
								that.emptyType = 2
								that.detailsData = res.data
								if (res.data.projectType == 'officeFinanceProjectType01') { //借款
									that.title = '借款申请'
								} else if (res.data.projectType == 'officeFinanceProjectType02') { //支出报销
									that.title = '支出报销'
								} else if (res.data.projectType == 'officeFinanceProjectType03') { //付款申请
									that.title = '付款申请'
								} else if (res.data.projectType == 'officeFinanceProjectType04') { //延迟还款
									that.title = '延迟还款'
								} else if (res.data.projectType == 'officeFinanceProjectType05') { //还款申请
									that.title = '还款申请'
								}
								console.log("22222", that.emptyType)
							}, 500)
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
			getList(uuid) {
				var that = this;
				that.$http
					.post('/office/officeReimbursementDetails/getPageSet', {
						financeUuid: uuid
					}, {
						params: {},
					})
					.then(res => {
						this.detailList = res.data.rows
						console.log("this.detailList------", this.detailList)
					})
					.catch(err => {});
			},
			formSubmit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						var that = this;
						let url = ''
						this.detailsData.loanRepaymentDateStr = this.detailsData.loanRepaymentDateStr ? moment(this
							.detailsData.loanRepaymentDateStr).format('YYYY-MM-DD HH:mm:ss') : ''
						let params = {
							...this.detailsData,
							isRelease: 'yes'
						}
						if (this.type == 0) { //借款申请
							url = '/office/officeFinance/saveLoan'
						} else if (this.type == 1) { //付款申请
							url = '/office/officeFinance/savePayment'
						} else if (this.type == 2) { //报销
							url = '/office/officeFinance/saveReimbursement'
							params = {
								isRelease: 'yes',
								officeFinance: JSON.stringify(this.detailsData),
								officeReimbursementDetailsStr: JSON.stringify(this.detailList)
							}
						}
						console.log("url----", url, params)
						that.$http.post(url, params, {
								params: {},
							})
							.then(res => {
								that.$u.toast('申请成功')
								setTimeout(()=>{
									uni.navigateBack();
								},300)
								// that.$nextTick(() => {
								// 	// var pages = getCurrentPages();
								// 	// var currPage = pages[pages.length - 1]; //当前页面
								// 	// var prevPage = pages[pages.length - 2]; //上一个页面
								// 	// prevPage.$vm.changeData()//h5写法
								// 	uni.navigateBack();
								// })
							})
					} else {
						console.log('验证失败');
					}
				});
			},
			formReset() {
				if (!this.processComments) {
					uni.showToast({
						title: '请输入驳回意见！',
						icon: 'none',
						duration: 1000
					});
				}
				console.log("this.processComments")
			},
			changeCapital(n) {
				if (n == 0) {
					// return "零";
					return "";
				}
				if (!/^(\+|-)?(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
				var unit = "仟佰拾亿仟佰拾万仟佰拾元角分",
					str = "";
				n += "00";
				var a = parseFloat(n);
				if (a < 0) {
					n = n.substr(1);
				}
				var p = n.indexOf('.');
				if (p >= 0) {
					n = n.substring(0, p) + n.substr(p + 1, 2);
				}
				unit = unit.substr(unit.length - n.length);
				for (var i = 0; i < n.length; i++)
					str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
				if (a > 0) {
					return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(
						/(亿)万|壹(拾)/g,
						"$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
				} else {
					return "负" + str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(
						/(亿)万|壹(拾)/g,
						"$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
				}
			},
		}
	};
</script>

<style lang="scss" scoped>

</style>
