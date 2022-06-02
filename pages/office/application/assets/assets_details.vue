<template>
	<view class="container" :class="[vtheme]">
		<view class="bg-box padding-bottom-sm margin-lr-xl flex align-center justify-between border-bottom">
			<view class="action padding-tb-sm">
				<view class="">
					<view class="text-balck text-bold text-xxl margin-right-sm">张莹莹</view>
					<view class="text-balck text-bold text-font-13 ">财务部</view>
				</view>
			</view>
			<view class="cu-tag bg-orange light text-bold margin-top round   ">处理中</view>
		</view>
		<view class="margin-lr-xl padding-tb-sm">
			申请原因
		</view>
		<view class="text-box-line"></view>
		
		<view class="margin-lr-xl apply-box">
			<view v-for="(item,index) in assetsList" :key="index" class="padding-tb-sm border-bottom">
				<view class="  text-black">资产名称: <text class="margin-left-sm">{{item.name}}</text></view>
				<view class="  text-black">资产数量: <text class="margin-left-sm">{{item.num}}</text></view>
				<view class="  text-black">申请时间: <text class="margin-left-sm">{{item.applyTime}}</text></view>
			</view>
		</view>
		
		<view class="text-box-line "></view>
		<view class="cu-bar bg-box flex align-center justify-between">
			<view class="action">
				<view class="text-black text-bold">申请流转</view>
			</view>
		</view>
		<view class="cu-timeline padding-bottom-sm margin-bottom-max">
			<view v-for="(item,index) in processList" :key="index">
				<processList :item="item"></processList>
			</view>
		</view>
		
		<view class="botton-bottom flex align-center justify-center">
			<view class=" bg-orange shadow-blur padding-lr-xl padding-tb-xs round margin-right">驳回</view>
			<view class=" bg-green shadow-blur  padding-lr-xl padding-tb-xs round">同意</view>
		</view>
		
	</view>
</template>

<script>
	import processList from '@/components/custom/pages/process.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			processList
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				conplaint: {
					purchaseVolume: '',
					companyName: '',
					contacts: '',
					telephone: '',
					email: '',
					remarks: ''
				},
				productData: {},
				InputBottom: 0,
				commentValue: '',
				reservList: [{userName: '张莹莹',check: true},{userName: '李峰',check: false},{userName: '领导',check: false},{userName: '程俊杰',check: true},
				{userName: '李峰',check: true},{userName: '张莹莹',check: false},{userName: '领导',check: false},{userName: '程俊杰',check: true}],
				assetsList:[{
					name: '办公椅',num: '25',applyTime: '2021-04-25 14:12:00'
				},{
					name: '显示屏',num: '8',applyTime: '2021-04-25 14:23:00'
				}],
				processList: [{
					status: 1,
					desc: "发起流程了",
					sendTime: "2021-04-12 15:30",  
					sendName: "张莹莹"
				},
				{
					status: 1,
					desc: "同意",
					sendTime: "2021-04-13 09:32",
					sendName: "李凤"
				},
				{
					status: 2,
					desc: "驳回",
					sendTime: "2021-04-12 15:30",
					sendName: "程晓国"
				}]
			};
		},
		onLoad() {
			var token = '';
			uni.getStorage({
				key: 'token',
				success: function(res) {
					token = res.data;
					if (!token) {
						uni.showModal({
							title: '未登录',
							content: '请重新登录!'
						});
						setTimeout(function() {
							uni.reLaunch({
								url: '../login/login'
							});
						}, 500);
					}
				},
				fail: err => {
					console.log(err);
				}
			});
			this.productData = {
				productName: '铱金9-5火花塞',
				productType: '动力系统',
				productPrice: '888.00'
			}
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			sendComment(){
				console.log("评论值----",this.commentValue)
			},
			formSubmit(){
				let tips = ""
				if(!this.conplaint.purchaseVolume){
					tips = "请输入采购量！"
				} else if(!this.conplaint.companyName){
					tips = "请输入公司名称！"
				} else if(!this.conplaint.contacts){
					tips = "请输入联系人！"
				} else if(!this.conplaint.telephone){
					tips = "请输入联系电话！"
				} else if(!this.conplaint.email){
					tips = "请输入联系邮箱！"
				} else {
					tips = "请输入投诉意见！"
				}
				if(tips){
					uni.showToast({
					    title: tips,
							icon: 'none',
					    duration: 1000
					});
				} else {
					console.log("投诉建议",this.conplaint)
				}
			},
			formReset() {
				console.log('清空数据')
				this.conplaint = {
					purchaseVolume: '',
					companyName: '',
					contacts: '',
					telephone: '',
					email: '',
					remarks: ''
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
.pos-strike{
	position: sticky;
	top: 0;
	z-index: 5;
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
