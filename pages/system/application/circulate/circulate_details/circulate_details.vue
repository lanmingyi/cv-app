<template>
	<view id="page">
		<view class="cir_content">
			<view class="title"><text v-text="title"></text></view>
			<view class="small">
				<view class="author"><text class="font">&#xe659;</text><text v-text="creator"></text></view>
				<view class="time"><text class="font">&#xe607;</text><text v-text="create_time"></text></view>
			</view>
			<view class="content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '', 
				create_time:'',
				creator:'',
				rank_text:'',
				uuid:'',
				content:''
			};
		},
		methods:{
			
		},
// 		mounted() {
//             uni.createSelectorQuery().select('img').boundingClientRect(function(e){
//                 with:100%
//             }).exec()
//   		},		
		onLoad(options) {
			setTimeout(function () {
				console.log('start pulldown');
			}, 1000);
			//uni.startPullDownRefresh();
			uni.startPullDownRefresh({
				success: res => {},
			});  //这里表示当进入页面的时候就开始执行下拉刷新动画
			var uuid = options.uuId;
			
			this.$http
				.post('/office/oaChuanyue/getDetailByUuid', {uuid:uuid}, {
					params: {},
				})
				.then(res => {
					this.res = '请求结果 : ' + JSON.stringify(res);
					this.title = res.data.title,
					this.uuid = res.data.uuid,
					this.create_time = renderTime(res.data.create_time),
					this.creator = res.data.creator,
					this.rank_text = res.data.rank_text,
					this.content = res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
					 
					console.log(res);
					
					function renderTime(date) {
					  var dateee = new Date(date).toJSON();
					  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
					}
								
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err.data.message,
						icon: 'none'
					});
				});
			
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		}
	}
</script>

<style>
	#page{
		background: #fff;
	}
.cir_content{
	width: 95%;
	margin: 20upx auto;
}
.title{
	font-size: 18px;
	font-weight: 500;
}
.small{
	display: flex;
	justify-content: space-between;
	color: #666;
	font-size: 12px;
}
.content{
	margin-top: 20upx;
	width: 100%;
	overflow: hidden;
}
.author,.time{
	font-size: 12px;
}
.font{
	font-size: 12px;
	color: #ccc;
	vertical-align: top;
	margin-right: 10upx;
}

</style>
