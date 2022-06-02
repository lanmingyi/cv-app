<template>
	<view class="container" :class="[vtheme]">
		<navTabList :navList="navList" @changeTabNav="changeNav" :selectedIndex='selectedIndex'></navTabList>
		<view v-show="selectedIndex==0" class="tab-content">
			<view class="cu-card dynamic" v-for="(item,index) in list" :key="index">
				<view class="cu-item shadow" @tap="goDetail" :data-uuid="item.uuid">
					<view class="text-content margin-top">
						<view>{{item.title}}</view>
					</view>
					<view class="text-gray   padding space">
						<view class="rank">紧急程度：{{item.rankText}}</view>
						<view>
							<text class="iconfont icon-zuozhe1 text-left text-blue"></text>{{item.creator}}
						</view>
						<view><text class="cuIcon-attentionfill text-right  margin-lr-xs text-red"></text>{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="selectedIndex==1" class="tab-content">
			<view class="cu-card dynamic" v-for="(item,index) in getList" :key="index">
				<view class="cu-item shadow" @tap="goDetail" :data-uuid="item.uuid">
					<view class="text-content margin-top">
						<view>{{item.title}}</view>
					</view>
					<view class="text-gray   padding space">
						<view class="rank">紧急程度：{{item.rankText}}</view>
						<view>
							<text class="iconfont icon-zuozhe1 text-left text-blue"></text>{{item.creator}}
						</view>
						<view><text class="cuIcon-attentionfill text-right  margin-lr-xs text-red"></text>{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="selectedIndex==2" class="tab-content">
			<view class="cu-card dynamic" v-for="(item,index) in downList" :key="index">
				<view class="cu-item shadow" @tap="goDetail" :data-uuid="item.uuid">
					<view class="text-content margin-top">
						<view>{{item.title}}</view>
					</view>
					<view class="text-gray   padding space">
						<view class="rank">紧急程度：{{item.rankText}}</view>
						<view>
							<text class="iconfont icon-zuozhe1 text-left text-blue"></text>{{item.creator}}
						</view>
						<view><text class="cuIcon-attentionfill text-right  margin-lr-xs text-red"></text>{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navTabList from '@/components/m-navList.vue'

	var _self, x, y;
	export default {
		data() {
			return {
				navList:[
					{name:'待办'},
					{name:'在办'},
					{name:'我的'}
				],
				selectedIndex:0,
				list:[],
				getList:[],
				downList:[],
				pages:1, 
				rows:10,
			};
		},
		onLoad() {
			_self = this;
			_self.getMessage();
			_self.getListInfo();
			_self.downListInfo();
			
		},
		onReachBottom: function () {
		
			//显示加载
			uni.showLoading({
			  title: '加载中',
			})
			//执行翻页事件
			this.getMessage();
		  },
		methods:{
			/* 切换导航栏 */
			changeNav(index){
				this.selectedIndex = index
				uni.pageScrollTo({
					scrollTop:0,
					duration:300
				})
			},
			// 获取待办传阅信息
			getMessage: function () {
		
				var that = this;
				that.$http
					.post('/office/oaChuanyue/getPageSet', {pages:that.pages,
						rows:that.rows}, {
						params: {},
					})
					.then(res => {
						if(that.list.length<res.data.total){
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
			
			// 获取收到传阅信息
			getListInfo: function () {
				var that = this;
				that.$http
					.post('/office/oaChuanyue/getReceivePageSet', {}, {
						params: {},
					})
					.then(res => {
						that.res = '请求结果 : ' + JSON.stringify(res);
						that.getList = res.data.rows;
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: err.data.message,
							icon: 'none'
						});
					});
			},
			// 获取历史传阅
			downListInfo: function () {

				var that = this;
				that.$http
					.post('/office/oaChuanyue/getLssuedPageSet', {pages:that.pages,
						rows:that.rows}, {
						params: {},
					})
					.then(res => {
						that.downList = res.data.rows;
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
					url:'circulate_details/circulate_details?uuId=' + uuId
				});
			},

		},
		components: {
			navTabList
		}
	}
</script>

<style lang="scss">
.tab-content{
	padding-top: 44px;
}
.iconfont{
	font-size: 10px;
}
.space{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	
}
.rank{
	width: 100%;
}
.cu-card.dynamic>.cu-item{
	margin-bottom: 0;
}
</style>
