<template>
	<view class="container" :class="[vtheme]">
		<view v-if="emptyType===0" class="empty text-center margin-tb-xl">
			<image src="@/static/img/loading.gif"></image>
			<text class="text-grey text-opacity5 ">加载中...</text>
		</view>
		<view v-if="emptyType===1" class="empty text-center">
			<u-empty text="邮件不存在" mode="page" icon-size="200"></u-empty>
		</view>
		<view class="bg-box" v-if="emptyType===2">
			<view class=" padding-bottom-sm margin-lr flex align-start justify-between">
				<view class="action padding-tb-sm">
					<view class="">
						<view class="text-balck text-bold text-xl margin-right-sm margin-bottom-sm">河南省治理教育乱收费工作联席会议办公室发文处理室发文处理</view>
						<view class="flex align-center text-bold">
							<view class="text-font-13">张莹莹</view>
							<view class="margin-left text-font-13">2021-01-28 21:04:46</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="supplieData.explain" class="margin-lr-xl padding-tb-sm border-top-dashed">
				{{supplieData.explain}}
			</view>
			<view class="text-box-line"></view>
			
			<view class="margin-lr">
				<view class="flex align-start border-bottom padding-tb-sm">
					<view class="  text-black text-bold">发件人：</view>
					<view class="text-black">
						<view class="text-sm">张莹莹</view>
						<view class="text-sm">1540595745@qq.com</view>
					</view>
				</view>
				<view class="flex align-start padding-tb-sm">
					<view  class="  text-black text-bold">收件人：</view>
					<view class="text-black">
						<view class="text-sm">张莹莹</view>
						<view class="text-sm">1540595745@qq.com</view>
					</view>
				</view>
			</view>
			
			<view class="text-box-line"></view>
			
			<view class="  text-black margin-lr padding-top-sm">
				<view>美股散户血洗华尔街的故事，今晚依旧继续，但万万没想到的是！华尔街把网线拔掉，把股票代码清除了！美股散户血洗华尔街的故事，今晚依旧继续，但万万没想到的是！华尔街把网线拔掉，把股票代码清除了！美股散户血洗华尔街的故事，今晚依旧继续，但万万没想到的是！华尔街把网线拔掉，把股票代码清除了！美股散户血洗华尔街的故事，今晚依旧继续，但万万没想到的是！华尔街把网线拔掉，把股票代码清除了！美股散户血洗华尔街的故事，今晚依旧继续，但万万没想到的是！华尔街把网线拔掉，把股票代码清除了！</view>
			</view>
			<view class="  text-blue margin-lr padding-top-sm">
				<text class="cuIcon-form text-blue margin-right-sm"></text>
				<text>附件</text>		
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
