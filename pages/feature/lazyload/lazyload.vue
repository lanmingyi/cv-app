<template>
	<view id="page" class="bg-white">
		<view class="margin">
		<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
			<view class="grace-text-small grace-center" style="margin:20px 0;">
				<text>根据屏幕滚动位置动态加载，图片来自国外，展示较慢。\n 懒加载目的在于节省网络开销，不能解决页面抖动。</text>
			</view>
			<view class="grace-imgitems">
				<view class="grace-items" v-for="(item, index) in news" :key="index">
					<!-- '/imgs/imgbanner.png' 代表本地占位图 真实环境请保证占位图与真实图片宽高比 -->
					<image :src="isShow[index] ? item.imgurl : '../../static/imgs/imgde.png'" class="grace-img-lazy" mode="widthFix"></image>
						<view class="grace-imgitems-text">{{item.title}}</view>
				</view>
			</view>
		</view>
		<graceLoading :loadingType="loadingType"></graceLoading>
		</view>
	</view>
</template>
<script>
//新闻内容演示数据
var dataForDemo = [
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/KBTL72KIFS.jpg", title: "示例1" },
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/7CXRBZ8BWN.jpg", title: "示例2" },
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/JXSAF8KN0P.jpg", title: "示例3" },
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/DS9NEZUCVL.jpg", title: "示例4" },
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/DAZUVWO0HJ.jpg", title: "示例5" },
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/IF7AS3V2G8.jpg", title: "示例6" },
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/GDOZAHTORQ.jpg", title: "示例7" },
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/R1B4BWDUF4.jpg", title: "示例8" },
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/KAUFJW1PEQ.jpg", title: "示例9" },
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/NJVNNNG7TM.jpg", title: "示例10" },
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/WLSKXFCPJ7.jpg", title: "示例11" },
	{ imgurl: "https://cdn.stocksnap.io/img-thumbs/280h/3ULUVOVPW3.jpg", title: "示例12" }
]; 
var page = 1;//模拟一个页码
var _self;
var  graceLazyload = require("@/graceUI/graceLazyload.js");
import graceLoading from "@/graceUI/components/graceLoading.vue";
export default {
	data() {
		return {
			news : [],//新闻数据【模拟】
			isShow : [],//需要展示的图片记录
			//加载更多的loading
			loading: false,
			loadingType: 0,
			isEnd: false
		};
	},
	onLoad: function (options) {
		//onload 时模拟从api加载数据 
		_self = this;
		this.getList();
		
	},
	onBackPress:function(){
		page = 1;
		this.loadingType = 0,
		this.isEnd = false
	},
	//页面滚动时启动懒加载 
	//此处如果图片在滚动区域内则监听滚动区域事件并传递 滚动区域的 scrollTop 值给 load函数
	onPageScroll : function(e){
		graceLazyload.load(e.scrollTop, _self);
	},
	//加载更多模拟
	onReachBottom : function(){
		//避免多次触发
		if (this.loadingType === 1 || this.isEnd) { return; }
		this.loadMoreFunc();
	},
	methods: {
		//初始化加载数据模拟函数（也可以用于下拉刷新）
		getList : function(){
			this.news = dataForDemo;
			//填充好数据后立即执行一次 懒加载
			//此处如果数据来自远程api，应在request请求成功后执行下面的代码
			graceLazyload.load(0, this);
		},
		loadMoreFunc : function(){
			//如果page > 3 代表加载了全部数据
			if (page > 3) {
				this.isEnd = true;
				this.loadingType = 2;
				return;
			}
			//展示loading
			this.loadingType = 1;
			//追加数据(延迟2秒 模拟网络请求)
			setTimeout(function () {
				_self.news = _self.news.concat(dataForDemo);
				//累加页码
				_self.loadingType = 0;
				page++;
			}, 1000);
		}
	},
	components:{
		graceLoading
	}
}
</script>
<style>
</style>