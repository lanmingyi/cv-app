<template>
	<view class="content">
		<view class="container" :class="[vtheme]"></view>
		<swiper :indicator-dots="true" :autoplay="autoplay" :interval="2000" :duration="1000" class="swiper"
			:style="{'height':windowHeight}" @animationfinish="animationfinish" @change="changeSwiper" :circular="false">
			<swiper-item>
				<view class="swiper-item bg-container" :style="{'height':windowHeight}">
					<view class="loading">
						<view class="loading_font margin-bottom-max" :animation="animationData2">
							<view class="info text-blue text-xl"><text class="line line_one"></text>助力企业信息化品牌建设</view>
							<view class="name text-blue text-xl"><text class="name_info">ZUOYOUKEJI</text><text class="line"></text>
							</view>
						</view>
						<view class="loading_box flex align-center justify-center ">
							<image style="width: 100rpx;height: 100rpx;overflow: hidden;"  src="@/static/img/AI.png"/>
							<view class="loading_name margin-left">明图科技</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" :style="{'height':windowHeight}">
					<view class="loadingTwo">
						<view class="Ttitle flex align-center justify-between" :style="{'height': imgHeight}" :animation="animationData">
							<image style="width:85%;margin: 0 auto;height: 75%;" src="@/static/img/yindao2.png" />
						</view>
						<view class="text-center padding-top-xl padding-lr-sm" :animation="animationData7">
							<text class="text-bold text-xl">智能审批</text>
							<view class="padding-top-sm">碎片时间高效利用</view>
							<view class="padding-top-sm">随时随地手机办公</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" :style="{'height':windowHeight}">
					<view class="loadingTwo">
						<view class="Ttitle flex align-center justify-between" :style="{'height': imgHeight}" :animation="animationData">
							<image style="width:85%;margin: 0 auto;height: 75%;" src="@/static/img/yindao1.png" />
						</view>
						<view class="text-center padding-top-xl padding-lr-sm" :animation="animationData7">
							<text class="text-bold text-xl">消息提示</text>
							<view class="padding-top-sm">信息即时、方便查看</view>
						</view>
					</view>
					<view class="loading_box flex align-center justify-center">
						<view class="bg-blue round padding-tb-sm text-center" style="width:50%;" @click="goLogin">立即体验</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<!-- <view class="count" @tap="goLogin">跳过<text class="time">{{timer}}</text>S</view> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				windowHeight: '603px', //定义手机屏幕高度值变量
				imgHeight: '100%',
				// timer : 12
				animationData: {},
				animationData2: {},
				animationData7: {},
				autoplay: true,
			}
		},
		onShow: function() {
			var animation = uni.createAnimation({
				duration: 300,
				timingFunction: "ease",
				delay: 0
			})
			this.animation = animation
			// logo
			this.animation.translate3d(0, -50, 0).step()
			this.animation.translate3d(0, 0, 0).step()
			this.animationData = animation.export()

			// 佐佑
			this.animation.translate3d(0, 3000, 0).step()
			this.animation.translate3d(0, 0, 0).step()
			this.animationData2 = animation.export()
			
			setTimeout(function() {
				this.animation.rotate3d(0, 1, 0, 90).step()
				this.animation.rotate3d(0, 1, 0, -20).step()
				this.animation.rotate3d(0, 1, 0, -5).step()
				this.animationData7 = animation.export()
			}.bind(this), 7000)
		},
		onLoad() {
			var that = this;
			uni.hideToast()
			uni.removeStorage({
				key:'location'
			})
			uni.getSystemInfo({ //获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
				success: function(res) {
					that.windowHeight = res.windowHeight + 'px';
					that.imgHeight = Number(res.windowHeight - 350) + 'px'
					console.log('手机屏幕高度为' + that.windowHeight);
				}
			});
		},
		methods: {
			changeSwiper(e){
				this.autoplay = true;
			},
			animationfinish(e) {
				console.log(JSON.stringify(e.detail.current));
				//判断到最后一张后，停止动画
				if (e.detail.current == 2) {
					console.log('动画已经播放结束');
					this.autoplay = false;
				}
			},
			// 跳转到登录页
			goLogin: function() {
				console.log("denglu")
				uni.redirectTo({
					url: '/pages/login/login'
				});
			}
		}
	}
</script>
<style lang="scss">
	.content {
		width: 100%;
	}

	.swiper {
		width: 100%;
		/* 	height: 100vw; */
		/* background: red; */
	}

	.swiper-item>image {
		width: 100%;
		height: 100%;
	}

	.count {
		position: absolute;
		top: 2%;
		right: 4%;
		background: rgba(0, 0, 0, .5);
		border-radius: 10upx;
		padding: 10upx;
		color: #fff;
	}

	.time {
		padding: 0 10upx;
	}

	.go_login {
		position: absolute;
		z-index: 99999;
		bottom: 15%;
		left: 50%;
		transform: translate(-50%, 0);
	}

	uni-button[type=primary] {
		width: 320upx;
		height: 80upx;
		background: transparent;
		border: 1px solid #3AAAFE;
		outline: none;
		line-height: 80upx;
		color: #3AAAFE;
	}
	
	.bg-container{
		background: url('@/static/img/bg.png');
		background-size: 100% 100%;
	}

	.container {
		position: absolute;
		background: #fff;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		z-index: -1;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		opacity: 0.9;
	}

	.loading {
		padding-top: 25%;
	}

	.loading_img {
		width: 100rpx;
		height: 100rpx;
		
		image {
			width: 100%;
			height: 100%;
		}
	}

	.loading_font {
		display: flex;
		justify-content: center;
		margin-top: 10%;
	}
	
	.loading_box{
		position: absolute;
		bottom: 10%;
		z-index: 2;
		width: 100vw;
	}

	.loading_name {
		font-size: 18px;
		font-weight: 700;
		white-space: nowrap;
	}

	.name,
	.info {
		width: 30upx;
		line-height: 1.2;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin: 0 20upx;
	}

	.name_info {
		word-wrap: break-word;
		/*英文的时候需要加上这句，自动换行*/
		writing-mode: vertical-lr;
		/*从左向右 从右向左是 writing-mode: vertical-rl;*/
		writing-mode: tb-lr;
		/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
		line-height: 2;
		letter-spacing: 10upx;
	}

	.line {
		display: block;
		width: 15upx;
		height: 100upx;
		background: #007AFF;
	}

	.line_one {
		margin-bottom: 60upx;
	}

	.logo_name {
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translate(-50%, 0);
		text-align: center;
		font-size: 24px;
		font-weight: 700;

	}

	.router {
		position: absolute;
		right: 10%;
		bottom: 5%;
		color: #000;
		text-align: right;
		margin-top: 50%;
	}

	.Ttitle {
		text-align: center;
		font-size: 24px;
		font-weight: 700;
	}

	.loadingTwo {
		padding-top: 20%;
	}

	.loading_info {
		padding: 80upx 60upx;
		font-size: 16px;
		font-family: "方正胖头鱼简体";

	}

	.logo_name {
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
	}

	.maininfo {
		position: relative;
		margin-top: 5%;
	}

	.info_one {
		display: flex;
		flex-direction: column;
		line-height: 1.4;
		font-size: 18px;
		text-align: center;

	}

	.font {
		color: #fff;
		font-size: 50px;
	}

	.two {
		position: absolute;
		left: 7%;
		top: 38%;
	}

	.three {
		position: absolute;
		right: 7%;
		top: 38%;
	}

	.five {
		position: absolute;
		left: 20%;
		top: 95%;
	}

	.six {
		position: absolute;
		right: 20%;
		top: 95%;
	}
</style>
