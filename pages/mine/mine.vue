<template>
	<view class="container" :class="[vtheme]">
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<view class="user-info bg-theme pos-relative ">
				<navigator url="mine_details/mine_details" class="flex align-center justify-center ">
					<image v-if="!userInfo.avatar" class="mine-avatar"
						src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						mode="aspectFill">
					</image>
					<image v-else class="mine-avatar" :src="userInfo.avatar" mode="aspectFill"></image>
				</navigator>
			</view>
			<view class="flex align-center justify-between border-top padding-tb-sm bg-box" >
				<view class="text-center font-main text-center animation-slide-bottom" style="width: 50%;"  @click="goToPage('mine_details/mine_details')">
					<view class="font-main">
						<u-icon custom-prefix="custom-icon" class="margin-right-sm" :size="32" name="user1"></u-icon>
						<text >{{userInfo.userName}}</text>
					</view>
				</view>
				<view class="text-center animation-slide-bottom" style="width: 50%;border-left: 1px solid #e7e7e7;"  @click="goToPage('myQR/myQR')">
					<view class="flex align-center justify-center u-padding-top-4">
						<u-icon custom-prefix="custom-icon" class="font-main margin-right-sm" :size="36" name="erweima"></u-icon>
						<text class="font-main">二维码</text>
					</view>
				</view>
			</view>
			
			<view class="margin-lr">
				<view class="shadow-warp radius bg-box  margin-top">
					<view class="margin-lr padding-top border-bottom padding-bottom-sm flex align-center transition-box animation-slide-bottom"
						style="animation-delay: 0.1s;" @click="goToPage('../organize/index')">
						<u-icon size="38" name="grid" class="margin-right" style="color: #22ACF5"></u-icon>
						<text class="font-main" >通讯录</text>
					</view>
					<view class="margin-lr padding-top-sm padding-bottom-sm border-bottom flex align-center transition-box animation-slide-bottom"
						style="animation-delay: 0.2s;" @click="goToPage('password/password')">
						<u-icon size="38" name="lock-fill" class="margin-right" style="color: #ff9955"></u-icon>
						<text class="font-main">密码</text>
					</view>
					<view class="margin-lr padding-top-sm padding-bottom-sm border-bottom flex align-center transition-box animation-slide-bottom"
						@click="goToPage('theme/theme')" style="animation-delay: 0.3s;">
						<u-icon size="38" name="heart-fill" class="margin-right" style="color: #DF6856"></u-icon>
						<text class="font-main ">主题</text>
					</view>
				</view>
				<!-- <view class="text-box-line"></view> -->
				<view class="shadow-warp radius bg-box padding-botton-xs margin-top-sm">
					<view class="margin-lr padding-top padding-bottom-sm flex border-bottom align-center transition-box animation-slide-bottom"
						@click="goToPage('../feature/feature')" style="animation-delay: 0.4s;">
						<u-icon size="38" name="more-circle-fill" class="margin-right" style="color: #53AECE"></u-icon>
						<text class="font-main">更多</text>
					</view>
					<view class="margin-lr padding-top-sm padding-bottom-sm border-bottom flex align-center transition-box animation-slide-bottom"
						@click="showModal('viewModal')" style="animation-delay: 0.5s;" data-target="viewModal">
						<u-icon size="38" name="setting-fill" class="margin-right" style="color: #DF6856"></u-icon>
						<text class="font-main">设置</text>
					</view>
				</view>
			</view>

		</scroll-view>

		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>

		<!-- bg-brown -->
		<view class="DrawerWindow bg-theme-anamorphism" :class="modalName=='viewModal'?'show':''">
			<u-cell-group class="padding-tb-xl padding-lr shadow-lg">
				<u-cell-item :border-bottom="false" title="消息通知" :arrow="true" @click="goToPage('notice/notice')" class="border-bottom">
					<u-icon slot="icon" size="34" name="bell-fill" class="margin-right-sm tag-text-default"></u-icon>
				</u-cell-item>
				<u-cell-item :border-bottom="false" title="账号安全" :arrow="true" @click="goToPage('security/security')" class="border-bottom">
					<u-icon slot="icon" size="34" name="info-circle-fill" class="margin-right-sm tag-text-default">
					</u-icon>
				</u-cell-item>
				<u-cell-item :border-bottom="false" title="勿扰模式" :arrow="true"
					@click="goToPage('notiToggle/notiToggle')" class="border-bottom">
					<u-icon slot="icon" size="34" name="volume-off-fill" class="margin-right-sm tag-text-default">
					</u-icon>
				</u-cell-item>
				<u-cell-item :border-bottom="false" title="系统设置" :arrow="true" @click="goToPage('setting/setting')" class="border-bottom">
					<u-icon slot="icon" size="34" name="setting-fill" class="margin-right-sm tag-text-default"></u-icon>
				</u-cell-item>
				<u-cell-item :border-bottom="false" title="关于我们" :arrow="true" @click="goToPage('about/about')" class="border-bottom">
					<u-icon slot="icon" size="34" name="question-circle-fill" class="margin-right-sm tag-text-default">
					</u-icon>
				</u-cell-item>
				<u-cell-item :border-bottom="false" title="清除缓存" :arrow="true"
					@click="()=>{showClearCacheModal = true}">
					<u-icon slot="icon" size="34" name="reload" class="margin-right-sm tag-text-default">
					</u-icon>
				</u-cell-item>
			</u-cell-group>
			<view class="margin-lr flex align-center justify-center padding-tb-sm bg-box border-round"
				@click="()=>{showLoginOutModal = true}">
				<view class="text-center">退出登录</view>
			</view>
		</view>

		<u-modal ref="uModal" v-model="showLoginOutModal" :show-cancel-button="true" :show-title="false"
			:async-close="false" @confirm="bindLogout" content="您确定要退出登录吗？">
		</u-modal>

		<u-modal ref="uModal" v-model="showClearCacheModal" :show-cancel-button="true" :show-title="false"
			:async-close="false" @confirm="clearCache" content="清除缓存后需要重新登录,确定是否清除？">
		</u-modal>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';

	let that = this;
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	];
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	];
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userInfo: {},
				filePath: '',
				showLoginOutModal: false,
				showClearCacheModal: false,
				modalName: null,
				content: '',
				topHeight: "",
			};
		},
		components: {
			uniIcon
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'token'])
		},
		//导航栏点击事件
		onNavigationBarButtonTap(e) {
			console.log("success", e)
			if (e.index == 0) {
				uni.navigateTo({
					url: 'setting/index'
				});
			}
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			this.getUserInfo();
		},
		onUnload() {
			this.animationData = {}
		},
		onShow() {

			this.userInfo = uni.getStorageSync('userInfo')
			console.log("this.userInfo", this.userInfo)
			this.$nextTick(function() {
				this.$uGetRect('.user-info').then(res => {
					console.log("contentHeight-----", res)
					this.topHeight = res.height + 'px'
				})
			})


		},
		methods: {
			...mapMutations(['logout']),
			clearCache() {
				this.logout();
				uni.clearStorage() //清除全部缓存
				if (this.isWechat()) {
					uni.reLaunch({
						url: '/pages/login/author'
					});
				} else {
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			},
			toMyQR() {
				uni.navigateTo({
					url: 'myQR/myQR'
				});
			},
			bindLogin() {
				uni.navigateTo({
					url: '/pages/login/author'
				});
			},
			goToPage(url) {
				uni.navigateTo({
					url: url
				});
			},
			showModal(e) {
				console.log("e------", e)
				// this.modalName = e.currentTarget.dataset.target
				this.modalName = e
			},
			hideModal(e) {
				this.modalName = null
			},
			bindLogout() {
				this.logout();
				if (this.isWechat()) {
					uni.reLaunch({
						url: '/pages/login/author'
					});
				} else {
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				//                 if (this.forcedLogin) {
				//                     uni.reLaunch({
				//                         url: '../../index/index',
				//                     });
				//                 }
			},
			goDetail: function(e) {
				var uuId = e.currentTarget.dataset.uuid;
				console.log('uuId:' + uuId);
				uni.navigateTo({
					url: 'mine_details/mine_details?uuId=' + uuId
				});
			},
			chooseImage: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: res => {
						console.log(res);
						var avatar = res.tempFilePaths[0];

						console.log(avatar);
						uni.uploadFile({
							// url: this.$imageUpdate,
							filePath: avatar,
							fileType: 'file',
							name: 'file',
							header: {
								token: this.$store.state.token
							},
							success: res => {
								console.log(res);
								this.avatar = res.data.substring(13, 117);
								// this.getUserInfo();
								console.log(this.avatar);

								uni.request({
									method: 'POST',
									dataType: 'JSON',
									url: this.$baseUrl + '/document/oss/upload',
									data: {
										uuid: this.uuid,
										userNameId: this.userNameId,
										userName: this.userName,
										sex: this.sex,
										age: this.age || 0,
										postText: this.postText,
										post: this.post,
										avatar: this.avatar,
										telephone: this.telephone,
										email: this.email,
										cellphone: this.cellphone
									},
									header: {
										'content-type': 'application/x-www-form-urlencoded',
										token: token
									},
									success: res => {
										if (res.statusCode == 200) {
											uni.showToast({
												title: '修改成功',
												icon: 'success',
												duration: 1000
											});
										}
									},
									fail: err => {
										console.log('chooseImage fail', err);
									}
								});
							},
							fail: err => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								});
							}
						});
					},
					fail: err => {
						console.log('chooseImage fail', err);
					}
				});
			}
		},
		onLoad() {
			// this.getUserInfo();
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		onUnload() {
			this.avatar = '';
		}
	};
</script>

<style lang="scss" scoped>
	.container{
		height: calc(100vh -88rpx - 100rpx - var(–safe-area-inset-bottom) - var(–status-bar-height));
	}
	navigator {
		width: 100%;
		height: 100%;
	}

	.user-info {
		height: 187px;
		// min-height: 25vh;
		// padding: 70rpx 40rpx 0;
		// background: url('@/static/img/bg_main_03.jpg');
		// background-size: auto 100%;
		// background-position:center center;
		// background-repeat: no-repeat;
	}

	.mine-avatar {
		width: 170rpx;
		height: 170rpx;
		border-radius: 5px;
		overflow: hidden;
	}

	.pos-mine-absolute {
		width: 100%;
		position: absolute;
		left: 0;
		z-index: 3;
		top: 200rpx;

		.mine-info-box {
			width: 92%;
			margin: 0 auto;
			border-radius: 12px;
			box-shadow: 0 0 10px 1px #cfd5db;
		}
	}

	/deep/.u-cell-item-box {
		border-radius: 10rpx;
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100%;
		left: 0vw;
		// background-color: #f1f1f1;
		transition: all 0.4s;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100%;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100%;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	.DrawerPage .nav {
		flex: 1;
	}

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
