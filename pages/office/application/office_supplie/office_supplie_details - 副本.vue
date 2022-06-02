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
			<view class="bg-box margin-lr flex align-start justify-between">
				<view class="action padding-tb-sm">
					<view class="">
						<view class="text-balck text-bold margin-right-sm">{{supplieData.useName}}</view>
						<view class="text-balck text-bold text-font-13 ">{{supplieData.warehouseAdministrator}}</view>
						<view class="flex align-center">
							<view class="text-font-13">{{supplieData.useTypeName}}</view>
							<view class="margin-left text-font-13">{{supplieData.counts}}</view>
						</view>
					</view>
				</view>
				<view class="cu-tag bg-orange light text-bold margin-top round">{{supplieData.suppliesName}}</view>
			</view>
			<view v-if="supplieData.explain" class="margin-lr padding-tb-sm border-top-dashed">
				<view class="u-font-13">{{supplieData.explain}}</view>
			</view>
			<view class="text-box-line"></view>
			
			<view class="text-bold   text-black margin-lr padding-top-sm">
				<text>办公用品申请记录</text>		
			</view>
			<view class="margin-lr-xl apply-box">
				<view v-for="(item,index) in assetsList" :key="index" class="padding-tb-sm border-bottom flex align-start pos-relative">
					<view class="text-sm">{{index+1}}、</view>
					<view class="">
						<view class=" u-font-13 text-black">申请数量: <text class="margin-left-sm">{{item.num}}</text></view>
						<view class=" u-font-13 text-black">申请人: <text class="margin-left-sm">{{item.name}}</text></view>
						<view class=" u-font-13 text-black">申请时间: <text class="margin-left-sm">{{item.applyTime}}</text></view>
					</view>
					<view class="pos-absolute">
						<view v-if="item.status == 0" class="bg-blue light text-transform30 text-opacity5 text-sm absolute-box">审核中</view>
						<view v-if="item.status == 1" class="bg-green light text-transform30 text-opacity5 text-sm absolute-box">已同意</view>
						<view v-if="item.status == 2" class="bg-orange light text-transform30 text-opacity5 text-sm absolute-box">被驳回</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				emptyType: 0,
				productData: {},
				InputBottom: 0,
				commentValue: '',
				params:{},
				reservList: [{userName: '张莹莹',check: true},{userName: '李峰',check: false},{userName: '领导',check: false},{userName: '程俊杰',check: true},
				{userName: '李峰',check: true},{userName: '张莹莹',check: false},{userName: '领导',check: false},{userName: '程俊杰',check: true}],
				assetsList:[{
					name: '张莹莹',num: '25',applyTime: '2021-04-25 14:12:00',status: 2
				},{
					name: '李峰',num: '8',applyTime: '2021-04-25 14:23:00',status: 0
				},{
					name: '李峰',num: '8',applyTime: '2021-04-25 14:23:00',status: 1
				}],
				supplieData:{}
			};
		},
		onLoad(options) {
			// this.supplieData = JSON.parse(decodeURIComponent(options.details))
			this.params.uuid = options.uuId
			console.log("supplieData----",this.supplieData)
			this.getSupplieDetails()
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getSupplieDetails(){
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
		}
	};
</script>

<style lang="scss" scoped>
.pos-absolute{
	position: absolute;
	z-index: 5;
	right: 20rpx;
	bottom: 40rpx;
}
.absolute-box{
	width: 100rpx;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	border-radius: 50%;
}
.cu-form-group uni-input,
.cu-form-group uni-textarea{
	font-size: 13px;
}
.cu-form-group uni-textarea{
	min-height: 200px !important;
	border: 1px solid #e7e7e7;
	border-radius: 10px;
	padding:10px 15px;
}
.text-font-13{
	font-size: 13px !important;
}
.botton-bottom{
	position: fixed;
	bottom: 20px;
	left: 0;
	right: 0;
	z-index: 5;
	.botton-input{
		width: 540rpx;
		line-height: 60rpx;
		height: 60rpx;
		padding-left: 20rpx;
		border-radius: 10rpx;
		
	}
}
.input-backGround{
	background: #f1f1f1;
}
.apply-box .border-bottom:last-child{
	border: none;
}
</style>
