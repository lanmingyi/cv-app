<template>
	<view id="page" :pages = "pages" class="big_bg">
	    <view class="cu-card dynamic" v-for="(item,index) in list" :key="index">
	    	<view class="cu-item shadow" @tap="goDetail" :data-uuid="item.uuid">
	    		<view class="text-content margin-top">
	    			<view>{{item.title}}</view>
	    		</view>
	    		<view class="text-gray   padding space">
	    			<view>
	    				<text class="iconfont icon-zuozhe1 text-left text-blue"></text>{{item.creator}}
	    			</view>
	    			<view><text class="cuIcon-attentionfill text-right  margin-lr-xs text-red"></text>{{item.createTime}}</view>
	    		</view>
	    	</view>
	    </view>
	</view>
</template>

<script>
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	export default {
		data() {
			return {
				list:[],
				pages:1,
			    rows:10,
				dataArray: []
			};
		},
		
		components: {
			uniPagination
		},
		onLoad() {
			var that = this;
			that.getMessage();
		},
// 		/**
// 		* 页面上拉触底事件的处理函数
// 		*/
		onReachBottom: function () {
		
			//显示加载
			uni.showLoading({
			  title: '加载中',
			})
			//执行翻页事件
			this.getMessage();
		  },

		methods:{
			// 获取待办传阅信息
			getMessage: function () {

				var that =  this;
				that.$http
					.post('/system/topicBase/getPageSet', {pageNo:that.pages,
						pageSize:that.rows}, {
						params: {},
					})
					.then(res => {
						if(that.list.length<res.data.totalCount){
							that.pages = that.pages + 1;// 请求成功后page+1
							
							that.list = that.list.concat(res.data.rows);//请求结果
						}
						else{
							setTimeout(function(){
								uni.showToast({
									icon:'none',
									title:'数据已全部加载！'
								})
							},1000)
						}
						setTimeout(function () {
							uni.hideLoading();
						},500);
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: err.data.message,
							icon: 'none'
						});
					});
				
			},
			// 跳转到详情
			goDetail: function (e) {
				var uuId = e.currentTarget.dataset.uuid;
				console.log('uuId:' + uuId);  
				uni.navigateTo({
					url:'community_details/community_details?uuId=' + uuId
				});
			}
			
		}
	}
</script>

<style>
.iconfont{
	font-size: 10px;
}
.space{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	
}
.grace-padding{
	padding: 0;
	margin: 0 auto;
	background: #fff;
}
.nav_info{
	width: 100%;
}
.grace-common-border{
	border: none;
}
.grace-news-list-items{
	width: 90%;
	padding: 20upx;
	margin: 0 auto;
	background: #fff;
	margin-top: 20upx;
	-webkit-box-shadow:rgba(0,0,0,0.12) 0px 3px 13px 1px;
	-moz-box-shadow:rgba(0,0,0,0.12) 0px 3px 13px 1px;
	box-shadow:rgba(0,0,0,0.12) 0px 3px 13px 1px;
	border-radius: 10px;
}
.list_title{
	font-size: 32upx;
	font-weight: 520;
}
.grace-text-overflow{
	display: flex;
	justify-content: space-between;
}
.grace-news-list-info{
	line-height: 20upx;
}
.font{
	font-size: 12px;
	color: #ccc;
	vertical-align: top;
}
.info_right{
	text-align: right;
}
.grace-tab-current{
	border-bottom: 2px solid #3AAAFE !important;
	color: #3AAAFE;
}
.grace-tab-title uni-view{
	width: 33.3333%;
	height: 80upx;
	padding: 0;
	margin: 0;
	font-size: 14px;
	font-weight: 400;
}
.getpage{
	padding: 20upx;
}
.cu-card.dynamic>.cu-item{
	margin-bottom: 0;
}
</style>
