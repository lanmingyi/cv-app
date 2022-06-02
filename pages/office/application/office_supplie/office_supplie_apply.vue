<template>
	<view class="container" :class="[vtheme]">
		<view v-if="emptyType===0" class="empty text-center margin-tb-xl">
			<image src="@/static/img/loading.gif"></image>
			<text class="text-grey text-opacity5 ">加载中...</text>
		</view>
		<view v-if="emptyType===1" class="empty text-center">
			<image src="@/static/img/empty.png"></image>
			<view class="text-grey text-opacity5 margin-tb-xl">页面丢失</view>
		</view>
		<view class="bg-box" v-if="emptyType===2">
			<view class="bg-box padding-bottom-sm margin-lr flex align-start justify-between">
				<view class="action padding-tb-sm">
					<view class="">
						<view class="text-balck text-bold text-xxl margin-right-sm">{{supplieData.useName}}</view>
						<view class="text-balck text-bold text-font-13 ">{{supplieData.warehouseAdministrator}}</view>
						<view class="flex align-center text-bold">
							<view class="text-font-13">{{supplieData.useTypeName}}</view>
							<view class="margin-left text-font-13">现存数量：{{supplieData.counts}}</view>
						</view>
					</view>
				</view>
				<view class="cu-tag bg-orange light text-bold margin-top round">{{supplieData.suppliesName}}</view>
			</view>
			<view v-if="supplieData.explain" class="margin-lr padding-tb-sm border-top-dashed">
				{{supplieData.explain}}
			</view>
			<view class="text-box-line"></view>

			<u-form :model="applyData" :rules="rules" ref="uForm" :errorType="errorType"
				class="u-padding-bottom-80 u-margin-bottom-50">
				<view class="padding-lr">
					<u-form-item :border="false" label-width="180" label-position="top" label="申请数量" prop="applyNum">
						<u-input :border="false" v-model="applyData.applyNum" type="text" placeholder="不得大于现存数量">
						</u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="申请人" prop="applyName"
						class="border-bottom-none">
						<user-popup
							:value="applyData.applyName" 
							type="3" 
							placeholder="申请人" 
							@change="changeUserApply"
							iconName="man-add" 
							iconNameColor="cu-color-icon"></user-popup>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="审批人" prop="approvalName"
						class="border-bottom-none">
						<user-popup
							:value="applyData.approvalName" 
							type="3" 
							placeholder="审批人" 
							@change="changeUserApproval" 
							iconName="man-add" 
							iconNameColor="cu-color-icon"></user-popup>
					</u-form-item>
					<u-form-item label-width="180" label-position="top" label="申请备注" class="border-bottom-none">
						<u-input :border="false" v-model="applyData.remarks" type="textarea" placeholder="请输入">
						</u-input>
					</u-form-item>
				</view>

				<view class="text-box-line"></view>
			</u-form>

		</view>

		<view class="bottom-btn-appro flex align-center justify-center">
			<view class="cu-botton-submit text-center" @click="formSubmit">发起申请</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				emptyType: 0,
				productData: {},
				InputBottom: 0,
				commentValue: '',
				params: {},
				supplieData: {},
				showPop: false,
				isChoose: [],
				query: [],
				applyData: {
					approvalName: ''
				},
				rules: {
					applyNum: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					applyName: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}],
					approvalName: [{
						required: true,
						message: '必填',
						trigger: 'change',
					}]
				},
				errorType: ['message'],
				changeNum: 0
			};
		},
		onLoad(options) {
			// this.supplieData = JSON.parse(decodeURIComponent(options.details))
			this.params.uuid = options.uuId
			this.getSupplieDetails()
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getSupplieDetails() {
				var that = this;
				that.$http
					.post('/office/oaWorkSuplist/getDetailByUuid', {
						uuid: this.params.uuid
					}, {
						params: {},
					})
					.then(res => {
						this.supplieData = res.data
						this.emptyType = 2
					})
					.catch(err => {
						this.emptyType = 1
					});
			},
			changeUserApply(list, type){
				this.$nextTick(function(){
					this.applyData.applyName = list[0].name
					this.applyData.applyNameId = list[0].id
					this.$forceUpdate()
				})
			},
			changeUserApproval(list, type){
				this.$nextTick(function(){
					this.applyData.approvalName = list[0].name
					this.applyData.approvalNameId = list[0].id
					this.$forceUpdate()
				})
			},
			formSubmit() {
				var that = this
				that.$refs.uForm.validate(valid => {
					console.log(this.applyData)
					if (valid) {
						that.$http
							.post('/office/oaWorkLog/save', params, {
								params: {},
							})
							.then(res => {
								console.log("res----", res, res.data)
								uni.showToast({
									title: res.data.message,
									icon: 'none',
									duration: 1000
								});
								uni.navigateBack({
									delta: 1
								})
							})
							.catch(err => {});
					} else {
						console.log('验证失败');
					}
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.pos-absolute {
		position: absolute;
		z-index: 5;
		right: 20rpx;
		bottom: 40rpx;
	}

	.absolute-box {
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-radius: 50%;
	}

	.cu-form-group uni-input,
	.cu-form-group uni-textarea {
		font-size: 13px;
	}

	.cu-form-group uni-textarea {
		min-height: 200px !important;
		border: 1px solid #e7e7e7;
		border-radius: 10px;
		padding: 10px 15px;
	}

	.text-font-13 {
		font-size: 13px !important;
	}

	.botton-bottom {
		position: fixed;
		bottom: 20px;
		left: 0;
		right: 0;
		z-index: 5;

		.botton-input {
			width: 540rpx;
			line-height: 60rpx;
			height: 60rpx;
			padding-left: 20rpx;
			border-radius: 10rpx;

		}
	}

	.input-backGround {
		background: #f1f1f1;
	}

	.apply-box .border-bottom:last-child {
		border: none;
	}
</style>
