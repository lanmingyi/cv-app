<template>
	<view class="wrapper" id="page">
		<view class="ser_bg"></view>
		<view v-if="isHistory" class="history-box">
			<view v-if="historyList.length > 0">
				<view class="history-title">
					<text>搜索历史</text>
					<text class="uni-icon uni-icon-trash" @click="clearSearch"></text>
				</view>
				<view class="history-content">
					<view class="history-item" v-for="(item, index) in historyList" :key="index">
						{{ item.name }}
					</view>
				</view>
			</view>
			<view v-else class="no-data">您还没有历史记录</view>
		</view>
	<!-- 	<view v-else class="history-box">
			<view v-if="historyList.length > 0" class="history-list-box">
				<view
					class="history-list-item"
					v-for="(item, index) in historyList"
					:key="index" 
					@click="listTap(item)"
				>
					<rich-text :nodes="item.nameNodes"></rich-text>
				</view>
			</view>
			<view v-else class="no-data">没有搜索到相关内容</view>
		</view> -->
		<view class="phone_list" >
			<view class="p_list_item" v-for="(item,id) in list" :key="id" v-if="show">
				<view class="rows_item" >
					<view class="p_list_item_left" @tap="goDetail" :data-uuid="item.uuid">
						<view class="left_img" ><image v-bind:src="item.avatar" mode=""></image></view>
						<view class="left_info">
							<view><text v-text="item.userName"></text></view>
							<view><text v-text="item.orgName"></text></view>
						</view>
					</view>
					<view class="list_item_right">
						<text class="font imsg" @click="go_chat(item)">&#xe62a;</text>
						<text class="font tel" @tap="call">&#xe622;</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import util from '@/components/amap-wx/js/util.js';

export default {
	data() {
		return {
			historyList: [],
			isHistory: true,
			list: [],
			flng: true,
			timer: null,
			pages:1,
			rows:20,
			show:false
		};
	},
	onLoad() {
		// 本示例用的是高德 sdk ，请根据具体需求换成自己的服务器接口。
		// this.amapPlugin = util.mapInit();
		this.historyList = uni.getStorageSync('search:history');
		this.getUser();
	},
	methods: {
		/**
		 * 列表点击
		 */
		listTap(item) {
			item = JSON.parse(JSON.stringify(item));
			// 如果当前是历史搜索页面 ，那么点击不储存,直接 跳转
			if (this.history) {
				return;
			} else {
				this.isHistory = true;

				// 去做一些相关搜索功能 ，这里直接返回到上一个页面
				// 点击列表存储搜索数据
				util.setHistory(item);
				uni.navigateBack();
			}
		},
		//获取用户信息
		getUser() {
			//获取存储
			let list = [];
			for (let i = 1; i < 11; i++) {
				list.push(i);
			}
			this.list = list;
			uni.request({
				url:  this.$baseUrl+'/mdata/user/getPageSet', 
				dataType:'json',
				method:'POST', 
				header: {
					'content-type' : 'application/x-www-form-urlencoded',
					'token':this.$store.state.token
				},
				success:(res) => {
					this.res = '请求结果 : ' + JSON.stringify(res);
					//赋值
					this.list = res.data.rows
				},
				fail:(error) => {
					console.log(error)
				}
			});
		},
		/**
		 * 清理历史搜索数据
		 */
		clearSearch() {
			uni.showModal({
				title: '提示',
				content: '是否清理全部搜索历史？该操作不可逆。',
				success: res => {
					if (res.confirm) {
						this.historyList = util.removeHistory();
					}
				}
			});
		},
		//拨打电话
		call : function(){
			var tel = '';
			
			//获取存储的联系方式
			uni.getStorage({
				key:'tel',
				success: function (res) {
					tel = res.data;
					console.log(tel);
					
					uni.makePhoneCall({
						phoneNumber : tel,
						success: () => {
							console.log("拨打电话成功！"); 
						}
					})
				}
			});
			
		},
		//点击进入详情页
		goDetail:function (e) {
			//创建绑定数据
			var uuId = e.currentTarget.dataset.uuid;
			console.log('uuId:' + uuId);    
			uni.navigateTo({
				url: '../u_details/u_details?uuId=' + uuId
			});
		},
		go_chat: function (item) {
			
			console.log(JSON.stringify(item))
			
			plus.webview.create('https://app.help-itool.com/Page/sesstion/View/Im/chat/i.html','iSesstion',null,{
				
				// 会话名称
				title:item.userName,
				
				// 对方 UserKey [type long]
				toUserKey:item.cellphone,
				
				// 头像
				headImg: item.avatar,
				
				// [0|1]可选 0点对点，1群组会话
				sessionType:0 
			});
			
		
			
			return;
			
			// 下载
			uni.downloadFile({
				url: 'https://www.help-itool.com//Content/app/init.js', //仅为示例，并非真实的资源
				success: function (res) {
					if (res.statusCode === 200) {
						
						console.log('下载成功');
						console.log(JSON.stringify(res))
						
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success: function (res) {
								var savedFilePath = res.savedFilePath;
								console.log(res.savedFilePath)
								var webview = plus.webview.create('http://renjian.163.com/', 'asd');
								webview.setJsFile(savedFilePath);
								webview.show('slide-in-right')
							}
						});
						
					}
				}
			});
		
		},

	},
	/**
	 * 当 searchInput 输入时触发
	 */
	onNavigationBarSearchInputChanged(e) {
		let text = e.text;
		if (!text) {
			this.isHistory = true;
			this.historyList = [];
			this.historyList = uni.getStorageSync('search:history');
			
			return;
			
		} else {
			this.isHistory = false;
			
		}
		
		
	},
	/**
	 * 点击软键盘搜索按键触发
	 */
	onNavigationBarSearchInputConfirmed(e) {
		let text = e.text;
		if (!text) {
			this.isHistory = true;
			this.historyList = [];
			this.historyList = uni.getStorageSync('search:history');
			uni.showModal({
				title: '提示',
				content: '请输入内容。',
				success: res => {
					if (res.confirm) {
					}
				}
			});
			return;
		} else {
			this.show = true;
			this.isHistory = false;
			console.log(text)
			let list = [];
			for (let i = 1; i < 11; i++) {
				list.push(i);
			}
			this.list = list;
		
			const data = {
				pages:this.pages,
				rows:this.rows,
				filterRules:JSON.stringify([
					{
						field:'userName',
						op:'contains',
						value:text
					}
				])
			}
			uni.request({
				url:  this.$baseUrl+'/mdata/user/getPageSet', 
				dataType:'json',
				method:'POST', 
				data:data,
				header: {
					'content-type' : 'application/x-www-form-urlencoded',
					'token':this.$store.state.token
				},
				success:(res) => {
					this.res = '请求结果 : ' + JSON.stringify(res);
					//赋值
					this.list = res.data.rows
					
					//循环输出用户的联系方式
					// var tel = JSON.stringify(res.data.rows.cellphone);
					for(var i = 0;i<=list.length;i++){
						var tel = JSON.stringify(res.data.rows[i].cellphone);
						console.log(tel);
					}
					
					//存储联系方式
					uni.setStorage({
						key: 'tel',
						data: tel
					});
					
				},
				fail:(error) => {
					console.log(error)
				}
			});
		}
	},
};
</script>

<style>
	/* .ser_bg{
		width: 100%;
		height: 100%;
		position: absolute;
		top:0;
		left: 0;
		background: url(@/static/img/ser_bg.jpg) no-repeat;
		background-size: 100% 100%;
		z-index: -1;
		opacity: 0.5;
	} */
.history-title {
	display: flex;
	justify-content: space-between;
	padding: 20upx 30upx;
	padding-bottom: 0;
	font-size: 34upx;
	color: #333;
}
.history-title .uni-icon {
	font-size: 40upx;
}
.history-content {
	display: flex;
	flex-wrap: wrap;
	padding: 15upx;
}
.history-item {
	padding: 4upx 35upx;
	border: 1px #f1f1f1 solid;
	background: #fff;
	border-radius: 50upx;
	margin: 12upx 10upx;
	color: #999;
}
.history-list-box {
	/* margin: 10upx 0; */
}
.history-list-item {
	padding: 30upx 0;
	margin-left: 30upx;
	border-bottom: 1px #EEEEEE solid;
	font-size: 28upx;
}

.no-data {
	text-align: center;
	color: #999;
	margin: 100upx;
}
	.con_list{
		padding: 20upx 40upx;
		border-bottom: 1px solid #ccc;
	}
	.con_list>navigator,.con_list_left{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.c_list_img{
		width: 60upx;
		height: 60upx;
		background: #3aaafe;
		border-radius: 10upx;
		margin-right: 20upx;
		text-align: center;
		line-height: 1.5;
		position: relative;
	}
	.msg{
		font-size: 18px;
		color: #fff;
	}
	.dot{
		width: 20upx;
		height: 20upx;
		background: red;
		border-radius: 50%;
		position: absolute;
		left: 45upx;
		top: -10upx;
	}
	.c_list_l_msg{
		font-size: 14px;
	}
	.c_list_info{
		width: 360upx;
		margin-left: 10upx;
		overflow:hidden;
	    text-overflow:ellipsis;
	    white-space:nowrap;
		color: #ccc;
	}
	.con_list_right{
		font-size: 14px;
		color: #666;
	}
.selecte,.p_list_item,.p_list_item_left{
	display: flex;
	justify-content: center;
	align-items: center
}
.se{
	position: absolute;
	left: 100upx;
	z-index: 999;
}
.imsg{
	margin-right: 40upx;
}
.tel,.imsg{
	color: #3aaafe;
	font-size: 20px;
}
.selecte>input{
	width: 85%;
	background: #fff;
	text-align: center;
}
.selecte>button{
	font-size: 16px;
	width: 150upx;
	height: 50upx;
	line-height: 50upx;
	background: transparent;
	color: #3aaafe;
	border: none;
	outline: none;
}
uni-button:after{
	border: none;
}
uni-button{
	margin-right: 0;
}
.rows_item{
	width: 100%;
	display: flex;
	padding: 20upx 40upx;
	border-bottom: 1px solid #ccc;
	justify-content: space-between;
	align-items: center;
}
.left_img{
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 20upx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.left_img>image{
	width: 100%;
	height: 100%;
}
.tel[data-v-e3dcd060]{
	font-size: 30px;
}
/* .grace-scroll-do .grace-items uni-image{
	width: 100%;	
} */
uni-image{
	height: 100%;
}
.grace_img{
	width: 130upx;
	height: 100upx;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 20upx;
}
.grace_img>image{
	width: 100%;
}
.grace-list{
	border: none;
	padding: 0;
}
.grace-accordion-title{
	border-bottom: 1px solid #ccc;
	padding-top: 0;
	align-items: center;
}
.f_msg{
	width: 100upx;
	height: 100upx;
	background: #3AAAFE;
	border-radius: 50%;
	position: fixed;
	bottom: 5%;
	right: 10%;
	color: #fff;
	font-size: 26px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
