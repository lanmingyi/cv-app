<template>
<view class="container" :class="[vtheme]">
	<view class="art-box">
		<view class="banner padding">
			<view class="banner-title text-xl text-bold text-black">{{banner.title}}</view>
		</view>
		<view class="article-meta padding   ">
			<text class="article-author">{{banner.creator}}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{banner.datetime}}</text>
		</view>
		<view class="article-content text-black margin-top">
			<!-- <rich-text :nodes="content"></rich-text> -->
			<view v-html="content"></view>
		</view>
		
		<view class="file-content text-bold">
			<view>附件信息</view>
		</view>
		<uni-table class="file-table"  border emptyText="暂无更多数据" >
		    <!-- 表头行 -->
		    <uni-tr>
		        <uni-th align="left">文件名称</uni-th>
		        <uni-th align="left">文件大小</uni-th>
		        <uni-th align="left">操作</uni-th>
		    </uni-tr>
		    <!-- 表格数据行 -->
		    <uni-tr>
		        <uni-td>1.jpg</uni-td>
		        <uni-td>12kb</uni-td>
		        <uni-td>下载</uni-td>
		    </uni-tr>
		</uni-table>
		
	
		<view class="file-content text-bold" id="opinion">
			<view>传阅意见</view>
		</view>
		<view class="art-opinion">
			<view v-for="(item,index) in opinionList" :key="index" class="text-sm">
				{{index+1}}、{{item.name}} <span class="padding">于</span> {{item.time}}发起意见:
				<view class="text-black   padding-lr">{{item.content}}</view>
			</view>
		</view>
	</view>
	<view class="send-content padding text-left bg-box margin-top">
		<textarea v-model="remark" class="text-sm" placeholder="传阅意见"/>
	</view>
	<view class="art-botton">
		<button class="mini-btn light bg-green" size="mini" @click="sureOpinion">发送</button>
	</view>
</view>
</template> 

<script>
	import uniTable from '@/components/uni-table/uni-table.vue';
	export default {
		components:{
			uniTable
		},
		data() {
			return {
				banner: {},
				content: '',
				title: '',
				opinionList: [{
					name: '张三三',
					content: '同意',
					time: '2021-01-28 21:04:02'
				},{
					name: '李斯思',
					content: '同意',
					time: '2021-01-30 21:04:02'
				}],
				showModal:false,
				remark:'',
			}
		},
		onShareAppMessage() {
			return {
				path: '/pages/system/article_details/article_details?query=' + JSON.stringify(this.banner)
			}
		},
		onLoad(event) {
			this.banner = {
				image_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				title: '医院主任贪百万被抓问这么严重吗',
				creator: '张莹莹',
				datetime: '2021-01-30',
			}
			
			uni.setNavigationBarTitle({
			title:'医院主任贪百万被抓问这么严重吗'
			})
			// this.content = "TopJUI前端框架,致力于打造既美观实用又能快速开发的后台管理前端框架，解决传统EasyUI的性能和功能问题"
			this.content = `<p>现实生活中，一些人对于辐射的理解是有偏差的，所以下面的一幕引起网友的吐槽也是情理之中的事情。</p><p>1月27日，<strong>山东青岛一女子爆料自家门上被贴纸条。楼下一住户因妻子怀孕了怕辐射，便要求楼上邻居闲时关掉WiFi。</strong></p><p>随后该女子用家中孩子的回帖，对楼下住户进行“反击”，回帖显示：孩子平时要上网课，不能关WiFi，如果不行就请其搬走。</p><p>网友看完这个一幕后纷纷表示：一个敢贴，一个敢回，不过以辐射为借口确实有点过分了。</p><p>此前，也曾发生过孕妇的丈夫担心wifi信号辐射影响妻子健康，禁止全楼居民使用WiFi的事情。该事件在微博上被迅速扩散，短时间内转发过万，评论上千，引发了广大用户对于WiFi辐射的普遍担忧。</p><p>重庆大学通信工程学院教授、博士生导师贾云健对此还公开科普，<strong>实验证明WiFi的功率并不大，产生的辐射比手机还要小得多，只要是符合国家标准并且是正规厂家生产的无线路由器，就不会对人体的健康造成影响，“辐射危害人体健康”的担忧纯属杞人忧天。</strong></p><p>同时，贾云健表示，WiFi信号主要靠电波传播，穿透能力较弱，而且随着距离的增大，信号会逐步减弱，辐射也会逐步降低，所以一墙之隔和楼上楼下的邻居更无需担心，WiFi辐射穿墙后几乎可以忽略不计，很难对人体健康产生危害。</p><p><img src="https://x0.ifengimg.com/res/2021/1565B299AAE67371AF2C4EB15B4B402E736A3F09_size76_w292_h425.jpeg"><br></p>`
			// this.getDetail();
		},
		methods: {
			sendOpinion(){
				// var el = document.getElementById('opinion')
				// this.$nextTick(()=>{
				// 	window.scrollTo({'behavior': 'smooth', 'top': el.offsetTop})
				// 	setTimeout(()=>{
				// 		this.remark = ''
				// 		this.showModal = true
				// 	},300)
				// })
				this.remark = ''
				this.showModal = true
			},
			sureOpinion(){
				console.log("remark",this.remark)
				if(!this.remark){
					uni.showToast({
						title: "传阅意见不能为空！",
						icon:'none',
						duration: 1000,
					});
				} else {
					uni.showToast({
						title: this.remark,
						icon:'none',
						duration: 1000,
					});
				}
			},
			hideModal(e) {
				this.showModal = false
			},
			getDetail() {
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + this.banner.post_id,
					success: (result) => {
						if (result.statusCode == 200) {
							this.content = result.data.content;
						} else {
							this.content = FAIL_CONTENT;
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.art-container{
	
}
.cu-bar .action{
	font-size: 28rpx!important;
	margin: 0 30rpx !important;
}
.art-box{
	width: 95%;
	background: #fff;
	border-radius: 10rpx;
	margin: 0 auto;
	position: relative;
	.banner{
		padding-bottom: 10upx !important;
	}
	.banner-title{
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-word;
		display: -webkit-box;
		-webkit-line-clamp: 2;//指定行数
		-webkit-box-orient: vertical; 
	}
	.article-meta{
		padding-top: 0 !important;
		border-bottom: 1px solid #e7e7e7;
		display: flex;
		align-items: center;
		.article-text{
			margin-left: 10px;
		}
	}
	.article-content{
		padding: 0 30rpx;
		margin-bottom: 50rpx;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.file-content{
		width: 95%;
		margin: 0 auto;
	}
	.art-opinion{
		width: 95%;
		margin: 0 auto;
		padding: 0 30rpx;
		padding-bottom: 40rpx;
	}
}
.send-content{
	width: 95%;
	margin: 20rpx auto 0;
	border-radius: 10rpx;
}
.art-botton{
	// position: fixed;
	// bottom: 0;
	// left: 0;
	// right: 0;
	// z-index: 3!important;
	margin: 60rpx 0;
	text-align: center;
}
.file-table{
	width: 95%;
	margin: 0 auto;
	min-width: 95% !important;
	margin-bottom: 40rpx;
}
.uni-table-th:last-child(),.uni-table-td:last-child(){
	width: 20%;
}
.uni-table-th,.uni-table-td{
	width: 40%;
	padding: 8rpx 10rpx;
	font-size: 24rpx;
}


</style>
