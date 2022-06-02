<template>
	<view id="u_details">
		<view class="details_bg"></view>
		<view class="de_main">
			<view class="head_img">
				<view class="h_img_info"><image v-bind:src="avatar" mode=""></image></view>
			</view>
			<view class="grace-bg-box grace-common-mt">
				<view class="grace-list">
					<view class='items'>
						<view class="icons">
							姓名
						</view>
						<view class="title" v-text="userName"></view>
					</view>
					<view class='items'>
						<view class="icons">
							<text>性别</text>
						</view>
						<view class="title" v-if="sex =='2'">女</view>
						<view class="title" v-if="sex =='1'">男</view>
					</view>
					<view class='items'>
						<view class="icons">
							<text>年龄</text>
						</view>
						<view class="title" v-text="age"></view>
					</view>
					<view class='items'>
						<view class="icons">
							<text>部门</text>
						</view>
						<view class="title" v-text="orgName"></view>
					</view>
					<view class='items'>
						<view class="icons">
							<text>职位</text>
						</view>
						<view class="title" v-text="postText"></view>
					</view>
					<view class='items'>
						<view class="icons">
							<text>所在地</text>
						</view>
						<view class="title" v-text="province+city+district"></view>
					</view>
					<view class='items'>
						<view class="icons">
							<text>电话</text>
						</view>
						<view class="title" v-text="cellphone"></view>
					</view>
					<view class='items'>
						<view class="icons">
							<text>邮箱</text>
						</view>
						<view class="title" v-text="email"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="uni-padding-wrap uni-common-mt contact">
			<button type="primary"@tap="contact">发消息</button>
			<button type="primary" @tap="call">打电话</button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: '',
				userNameId: '', 
				userName:'',
				postText:'',
				pages:'',
				orgName:'',
				cellphone:'',
				email:'',
				province:'',
				city:'',
				district:'',
				sex:'',
				age: '',
				uuid:'',
				detail:{}
			};
		},
		onLoad(options) {
			var uuid = options.uuId;
			console.log(uuid);
			uni.request({
				url: this.$baseUrl+'/mdata/user/getDetailByUuid',
				dataType:'json',
				method:'POST', 
				header: {
					'content-type' : 'application/json',
					'token':this.$store.state.token
				},
				data:{
					uuid:uuid
				},
				success:(res) => {
					this.res = '请求结果 : ' + JSON.stringify(res);
					this.uuid = res.data.uuid,
					this.userNameId = res.data.userNameId,
					this.userName = res.data.userName,
					this.orgName = res.data.orgName,
					this.email = res.data.email,
					this.postText = res.data.postText,
					this.province = res.data.province,
					this.cellphone = res.data.cellphone,
					this.city = res.data.city,
					this.district = res.data.district,
					this.avatar = res.data.avatar
					this.sex = res.data.sex,
					this.age = res.data.age,
					this.orgName = res.data.orgName
					// console.log(res.data.uuid)
				},
				fail:(error) => {
					console.log(error)
				}
			});
		},
		methods:{
			call : function(){
				uni.makePhoneCall({
					phoneNumber: '',
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			contact : function(){
				uni.navigateTo({
					url: '../chat/chat',
					success: res => {},
					fail: () => {},
					complete: () => {}
			
				})
			}
		}
	}
</script>

<style>
#u_details{
	width: 100%;
	font-size: 14px;
}
.head_img{
	width: 100%;
	height: 400upx;
	background: url(@/static/img/user_info_bg.jpg) no-repeat;
	background-size: 100% 100%;
	position: relative;
	margin-bottom: 20upx;
}
.h_img_info{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	width: 200upx;
	height: 200upx;
	border-radius: 50%;
	background: #ccc;
	overflow: hidden;
}
.h_img_info>image{
	width: 100%;
	height: 100%;
}
uni-image{
	width: 100%;
}
.grace-list{
	padding: 0;
}
.grace-list .items .icons{
	width: 100upx;
	font-size: 16px;
	color: #999;
	margin: 0 20upx;
}
.grace-list .items .title{
	border: none;
	padding: 0;
}
.items{
	border-bottom: 1px solid #ccc;
	display: flex;
	align-items: center;
	padding: 20upx 0;
}
.contact{
	display: flex;
	justify-content: space-around;
	position: fixed;
	bottom: 20upx;
	
}
uni-button[type=primary]{
	background: #3AAAFE;
}
.contact>button{
	width: 40%;
}
</style>
