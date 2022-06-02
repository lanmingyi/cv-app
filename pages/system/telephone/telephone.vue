<template>
	<view id="telephone">
		<!-- <view  class="head"><text class="head_info">通讯录</text><navigator url="#"><uni-icon type="personadd" size="30"></uni-icon></navigator></view> -->
		<view class="selecte" @tap="searchInfo"><mSearch @search="search($event, 0)"></mSearch></view>
		<!-- <view class="tel_bg"></view> -->
		<view class="firends">
			<view class="f_title">您可能认识></view>
			<view class="grace-list">
				<view class="items" v-for="(item, index) in fList" :key="index" :data-id="index">
					<view class="icons"><image v-bind:src="item.url"></image></view>
					<view class="title">
						<span v-text="item.name"></span>
						<span v-text="item.info"></span>
					</view>
					<view class="del" @tap="clickDel" :data-id="index"><span class="fonticon">X</span></view>
				</view>
			</view>
		</view>

		<view class="classify">
			<view class="body-view">
				<scroll-view class="swiper-one-list" scroll-y="true">
					<view class="grace-bg-white grace-common-mt">
						<view class="grace-list">
							<!-- 全部 -->
							<view class="grace-accordion-items">
								<view
									:class="[accordionActive == 'grace-accordion-1' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
									id="grace-accordion-1"
									@tap="changeAccordion"
								>
									<view class="icons list_con">
										<view class="font font15"></view>
										<view class="title">全部</view>
									</view>
									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-up" v-if="accordionActive == 'grace-accordion-1'"></text>
									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-down" v-else></text>
								</view>
								<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-1'">
									<view class="grace-list" style="border:none;">
										<view class="phone_list">
											<view class="p_list_item" v-for="(item, id) in rows" :key="id">
												<view class="rows_item">
													<view class="p_list_item_left" @tap="goDetail" :data-uuid="item.uuid">
														<view class="left_img"><image v-bind:src="item.avatar" mode=""></image></view>
														<view class="left_info">
															<view v-if="item.userName === ''"><text>未知</text></view>
															<view v-else><text v-text="item.userName"></text></view>
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
								</view>
							</view>
							<!-- 总经理部 -->
							<view class="grace-accordion-items">
								<view
									:class="[accordionActive == 'grace-accordion-2' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
									id="grace-accordion-2"
									@tap="changeAccordion"
								>
									<view class="icons list_con">
										<view class="font font15"></view>
										<view class="title">总经理部</view>
									</view>

									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-up" v-if="accordionActive == 'grace-accordion-2'"></text>
									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-down" v-else></text>
								</view>
								<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-2'">
									<view class="grace-list" style="border:none;">
										<view class="phone_list">
											<view class="p_list_item" v-for="(item, id) in rows" :key="id">
												<view class="rows_item" v-if="item.orgId == '3'">
													<view class="p_list_item_left" @tap="goDetail" :data-uuid="item.uuid">
														<view class="left_img"><image v-bind:src="item.avatar" mode=""></image></view>
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
								</view>
							</view>
							<!-- 人力资源部 -->
							<view class="grace-accordion-items">
								<view
									:class="[accordionActive == 'grace-accordion-3' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
									id="grace-accordion-3"
									@tap="changeAccordion"
								>
									<view class="icons list_con">
										<view class="font font15"></view>
										<view class="title">人力资源部</view>
									</view>

									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-up" v-if="accordionActive == 'grace-accordion-3'"></text>
									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-down" v-else></text>
								</view>
								<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-3'">
									<view class="grace-list" style="border:none;">
										<view class="phone_list">
											<view class="p_list_item" v-for="(item, id) in rows" :key="id">
												<view class="rows_item" v-if="item.orgId == '4'">
													<view class="p_list_item_left" @tap="goDetail" :data-uuid="item.uuid">
														<view class="left_img"><image v-bind:src="item.avatar" mode=""></image></view>
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
								</view>
							</view>
							<!-- 财务运营部 -->
							<view class="grace-accordion-items">
								<view
									:class="[accordionActive == 'grace-accordion-4' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
									id="grace-accordion-4"
									@tap="changeAccordion"
								>
									<view class="icons list_con">
										<view class="font font15"></view>
										<view class="title">财务运营部</view>
									</view>

									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-up" v-if="accordionActive == 'grace-accordion-4'"></text>
									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-down" v-else></text>
								</view>
								<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-4'">
									<view class="grace-list" style="border:none;">
										<view class="phone_list">
											<view class="p_list_item" v-for="(item, id) in rows" :key="id">
												<view class="rows_item" v-if="item.orgId == '5'">
													<view class="p_list_item_left" @tap="goDetail" :data-uuid="item.uuid">
														<view class="left_img"><image v-bind:src="item.avatar" mode=""></image></view>
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
								</view>
							</view>
							<!-- 综合办公室 -->
							<view class="grace-accordion-items">
								<view
									:class="[accordionActive == 'grace-accordion-5' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
									id="grace-accordion-5"
									@tap="changeAccordion"
								>
									<view class="icons list_con">
										<view class="font font15"></view>
										<view class="title">综合办公室</view>
									</view>

									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-up" v-if="accordionActive == 'grace-accordion-5'"></text>
									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-down" v-else></text>
								</view>
								<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-5'">
									<view class="grace-list" style="border:none;">
										<view class="phone_list">
											<view class="p_list_item" v-for="(item, id) in rows" :key="id">
												<view class="rows_item" v-if="item.orgId == '6'">
													<view class="p_list_item_left" @tap="goDetail" :data-uuid="item.uuid">
														<view class="left_img"><image v-bind:src="item.avatar" mode=""></image></view>
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
								</view>
							</view>
							<!-- 桌面研发部 -->
							<view class="grace-accordion-items">
								<view
									:class="[accordionActive == 'grace-accordion-6' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
									id="grace-accordion-6"
									@tap="changeAccordion"
								>
									<view class="icons list_con">
										<view class="font font15"></view>
										<view class="title">桌面研发部</view>
									</view>

									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-up" v-if="accordionActive == 'grace-accordion-6'"></text>
									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-down" v-else></text>
								</view>
								<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-6'">
									<view class="grace-list" style="border:none;">
										<view class="phone_list">
											<view class="p_list_item" v-for="(item, id) in rows" :key="id">
												<view class="rows_item" v-if="item.orgId == '8'">
													<view class="p_list_item_left" @tap="goDetail" :data-uuid="item.uuid">
														<view class="left_img"><image v-bind:src="item.avatar" mode=""></image></view>
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
								</view>
							</view>
							<!-- 移动端研发部 -->
							<view class="grace-accordion-items">
								<view
									:class="[accordionActive == 'grace-accordion-7' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
									id="grace-accordion-7"
									@tap="changeAccordion"
								>
									<view class="icons list_con">
										<view class="font font15"></view>
										<view class="title">移动端研发部</view>
									</view>

									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-up" v-if="accordionActive == 'grace-accordion-7'"></text>
									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-down" v-else></text>
								</view>
								<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-7'">
									<view class="grace-list" style="border:none;">
										<view class="phone_list">
											<view class="p_list_item" v-for="(item, id) in rows" :key="id">
												<view class="rows_item" v-if="item.orgId == '9'">
													<view class="p_list_item_left" @tap="goDetail" :data-uuid="item.uuid">
														<view class="left_img"><image v-bind:src="item.avatar" mode=""></image></view>
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
								</view>
							</view>
							<!-- 物联网研发部 -->
							<view class="grace-accordion-items">
								<view
									:class="[accordionActive == 'grace-accordion-8' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
									id="grace-accordion-8"
									@tap="changeAccordion"
								>
									<view class="icons list_con">
										<view class="font font15"></view>
										<view class="title">物联网研发部</view>
									</view>
									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-up" v-if="accordionActive == 'grace-accordion-8'"></text>
									<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-down" v-else></text>
								</view>
								<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-8'">
									<view class="grace-list" style="border:none;">
										<view class="phone_list">
											<view class="p_list_item" v-for="(item, id) in rows" :key="id">
												<view class="rows_item" v-if="item.orgId == '10'">
													<view class="p_list_item_left" @tap="goDetail" :data-uuid="item.uuid">
														<view class="left_img"><image v-bind:src="item.avatar" mode=""></image></view>
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
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- <view class="f_msg" @tap="go_chatlist"><text class="font">&#xe60d;</text></view> -->
	</view>
</template>

<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

var _self, x, y;
export default {
	components: {
		mSearch,
		uniIcon,
		uniLoadMore
		// contact
	},
	data() {
		return {
			loadingType: 0,
			contentText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			accordionActive: '',
			scrollLeft: 0,
			isClickChange: false,
			currentTab: 0,
			pages: 1,
			total: '',
			uuid: '',
			menuTabs: [
				{
					name: '消息'
				}
			],
			show: true,
			swiperDateList: [[], [], [], [], [], []],
			//2个按钮的宽度
			btn1Width: 70,
			btn2Width: 70,
			//2个按钮的总宽 = btn1Width + btn23Width【uni-app 模板内不建议复杂运算请手动配置】
			deleteBtnWidth: 140,
			//正在滑动的索引
			scrollIndex: -1,
			//正在删除的索引
			deleteIndex: -1,
			//模拟数据
			fList: [{ url: '../../../static/img/per_01.jpg', name: '马爸爸', info: '1位共同好友' }, { url: '../../../static/img/per_01.jpg', name: '小腾', info: '1位共同好友' }],
			rows: []
		};
	},
	onLoad: function(options) {
		var that = this;
		that.getUser();

		_self = this;

		// 			setTimeout(function () {
		// 				console.log('start pulldown');
		// 			}, 1000);

		// 			uni.startPullDownRefresh({
		// 				success: res => {},
		// 			});  //这里表示当进入页面的时候就开始执行下拉刷新动画
	},
	onReachBottom() {
		this.getUser();
	},
	/**
	 * 当 searchInput 配置 disabled 为 true 时触发
	 */
	onNavigationBarSearchInputClicked(e) {
		console.log('事件执行了');
		uni.navigateTo({
			url: '/pages/system/telephone/search/search'
		});
	},
	/**
	 *  点击导航栏 buttons 时触发
	 */
	onNavigationBarButtonTap() {
		uni.showModal({
			title: '提示',
			content: '用户点击了功能按钮，这里仅做展示。',
			success: res => {
				if (res.confirm) {
					console.log('用户点击了确定');
				}
			}
		});
	},
	methods: {
		//获取用户信息
		getUser() {
			let rows = [];
			for (let i = 1; i < 11; i++) {
				rows.push(i);
			}
			this.rows = rows;

			uni.request({
				url: this.$baseUrl+'/mdata/user/getPageSet',
				dataType: 'json',
				method: 'POST',
				header: {
					'content-type': 'application/json',
					token: this.$store.state.token
				},
				success: res => {
					this.res = '请求结果 : ' + JSON.stringify(res);
					//赋值
					this.rows = res.data.rows;

					//循环输出用户的联系方式

					for (var i = 0; i <= rows.length; i++) {
						var tel = JSON.stringify(res.data.rows[i].cellphone);
						var orgName = JSON.stringify(res.data.rows[i].orgName);
						console.log(orgName);
					}

					//存储联系方式
					uni.setStorage({
						key: 'tel',
						data: tel
					});
				},
				fail: error => {
					console.log(error);
				}
			});
		},

		// 删除
		clickDel: function(e) {
			var index = e.target.dataset.id;

			uni.showModal({
				content: '不感兴趣？',
				success: res => {
					if (res.confirm) {
						_self.fList.splice(index, 1);
					}
				}
			});
		},
		//点击进入详情页
		goDetail: function(e) {
			//创建绑定数据
			var uuId = e.currentTarget.dataset.uuid;
			console.log('uuId:' + uuId);
			uni.navigateTo({
				url: 'u_details/u_details?uuId=' + uuId
			});
		},
		go_chat: function(item) {
			console.log(JSON.stringify(item));

			plus.webview.create('https://app.help-itool.com/Page/sesstion/View/Im/chat/i.html', 'iSesstion', null, {
				// 会话名称
				title: item.userName,

				// 对方 UserKey [type long]
				toUserKey: item.cellphone,

				// 头像
				headImg: item.avatar,

				// [0|1]可选 0点对点，1群组会话
				sessionType: 0
			});

			return;

			// 下载
			uni.downloadFile({
				url: 'https://www.help-itool.com//Content/app/init.js', //仅为示例，并非真实的资源
				success: function(res) {
					if (res.statusCode === 200) {
						console.log('下载成功');
						console.log(JSON.stringify(res));

						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success: function(res) {
								var savedFilePath = res.savedFilePath;
								console.log(res.savedFilePath);
								var webview = plus.webview.create('http://renjian.163.com/', 'asd');
								webview.setJsFile(savedFilePath);
								webview.show('slide-in-right');
							}
						});
					}
				}
			});
		},
		searchInfo: function() {
			uni.navigateTo({
				url: 'search/search'
			});
		},
		changeAccordion: function(e) {
			var accordionIndex = e.currentTarget.id;
			if (this.accordionActive == accordionIndex) {
				accordionIndex = '';
			}
			this.accordionActive = accordionIndex;
		},

		getWidth: function(id) {
			//得到元素的宽高
			return new Promise((res, rej) => {
				uni.createSelectorQuery()
					.select('#' + id)
					.fields(
						{
							size: true,
							scrollOffset: true
						},
						data => {
							res(data);
						}
					)
					.exec();
			});
		},

		//拨打电话
		call: function() {
			var tel = '';

			//获取存储的联系方式
			uni.getStorage({
				key: 'tel',
				success: function(res) {
					tel = res.data;
					console.log(tel);

					uni.makePhoneCall({
						phoneNumber: tel,
						success: () => {
							console.log('拨打电话成功！');
						}
					});
				}
			});
		}
	}
};
</script>

<style>
.grace-accordion-title {
	width: 100%;
}
#telephone {
	padding-bottom: 120upx;
	background: #fafafa;
}
.classify {
	margin-top: 30upx;
	border-top: 1px solid #e2e2e2;
}

.firends .del {
	padding-right: 30upx;
}
.firends,
.classify {
	background: #fff;
}
.grace-list .items .title {
	height: 100%;
	justify-content: center;
}
.f_title {
	padding: 10upx 20upx;
}
.items .icons {
	width: 100upx;
	height: 100upx;
	overflow: hidden;
	border-radius: 50%;
}
.items .icons > image {
	width: 100%;
	height: 100%;
}
.items .title {
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 14px;
}
.items .title > span:nth-of-type(2) {
	font-size: 12px;
	color: #ccc;
}
.del {
	display: flex;
	align-items: center;
}
.grace-list {
}
/* .tel_bg{
	background: url(../../../static/img/tel_bg.jpg) no-repeat;
	width: 100%;
	height: 100%;
	position: absolute;
	top:0;
	left: 0;
	
	background-size: 100% 100%;
	opacity: 0.5;
	z-index: -1;
} */
.body-view {
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
	width: 100%;
	align-items: flex-start;
	justify-content: center;
}

.top-menu-view {
	display: flex;
	white-space: nowrap;
	align-items: center;
	width: 100%;
	background-color: #ffffff;
	height: 80upx;
	border-bottom: 1px solid #ccc;
	/* 在这里设置导航条高度 */
}
.menu-one-view {
	width: 50%;
	text-align: center;
	background: transparent;
}
.top-menu-view .menu-one-view {
	display: inline-block;
	white-space: nowrap;
	height: 100%;
}

.top-menu-view .menu-one-view .menu-one {
	/* 在这里写 单个按钮样式 */
	margin-left: 25upx;
	margin-right: 25upx;
	position: relative;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.top-menu-view .menu-one-view .menu-one .menu-one-txt {
	height: 40upx;
	font-weight: 400;
	color: #000;
	line-height: 40upx;
}

.top-menu-view .menu-one-view .menu-one .menu-one-bottom {
	position: absolute;
	bottom: 0;
	width: 100%;
}

.top-menu-view .menu-one-view .menu-one .menu-one-bottom .menu-one-bottom-color {
	width: 60%;
	height: 4upx;
}

.top-menu-view .menu-one-view .menu-one-act {
	/* 在这里写 单个按钮样式 */
	margin-left: 25upx;
	margin-right: 25upx;
	position: relative;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.top-menu-view .menu-one-view .menu-one-act .menu-one-txt {
	height: 40upx;
	font-weight: 400;
	color: #3aaafe;
	line-height: 40upx;
}

.top-menu-view .menu-one-view .menu-one-act .menu-one-bottom {
	position: absolute;
	bottom: 0;
	width: 100%;
	display: flex;
	justify-content: center;
}

.top-menu-view .menu-one-view .menu-one-act .menu-one-bottom .menu-one-bottom-color {
	width: 100%;
	height: 4upx;
	background: #3aaafe;
}
.serach .content .content-box .input.center[data-v-d22c29e4] {
	width: 100%;
	text-align: center;
}
.swiper-box-list {
	flex: 1;
	width: 100%;
	height: 1320upx;
}

.swiper-one-list {
	height: 100%;
	width: 100%;
}

.swiper-one-list .swiper-list-entity {
	width: 100%;
	height: 112upx;
	text-align: center;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
}
.con_list {
	padding: 20upx 40upx;
	border-bottom: 1px solid #ccc;
}
.con_list > navigator,
.con_list_left {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.c_list_img {
	width: 60upx;
	height: 60upx;
	background: #3aaafe;
	border-radius: 10upx;
	margin-right: 20upx;
	text-align: center;
	line-height: 1.5;
	position: relative;
}
.msg {
	font-size: 18px;
	color: #fff;
}
.dot {
	width: 20upx;
	height: 20upx;
	background: red;
	border-radius: 50%;
	position: absolute;
	left: 45upx;
	top: -10upx;
}
.fonticon {
	display: block;
	width: 40upx;
	height: 40upx;
	line-height: 40upx;
	text-align: center;
	border: 1px solid #666;
	border-radius: 50%;
}
.c_list_l_msg {
	font-size: 14px;
}
.c_list_info {
	width: 360upx;
	margin-left: 10upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #ccc;
}
.con_list_right {
	font-size: 14px;
	color: #666;
}
.selecte,
.p_list_item,
.p_list_item_left {
	display: flex;
	justify-content: center;
	align-items: center;
}
.se {
	position: absolute;
	left: 100upx;
	z-index: 999;
}
.imsg {
	margin-right: 40upx;
}
.tel,
.imsg {
	color: #3aaafe;
	font-size: 40upx;
}
.selecte > input {
	width: 85%;
	background: #fff;
	text-align: center;
}
.selecte > button {
	font-size: 16px;
	width: 150upx;
	height: 50upx;
	line-height: 50upx;
	background: transparent;
	color: #3aaafe;
	border: none;
	outline: none;
}
uni-button:after {
	border: none;
}
uni-button {
	margin-right: 0;
}
.rows_item {
	width: 100%;
	display: flex;
	padding: 20upx 40upx;
	border-bottom: 1px solid #ccc;
	justify-content: space-between;
	align-items: center;
}
.left_img {
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 20upx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.left_img > image {
	width: 100%;
	height: 100%;
}
.tel[data-v-e3dcd060] {
	font-size: 30px;
}
/* .grace-scroll-do .grace-items uni-image{
	width: 100%;	
} */
uni-image {
	height: 100%;
}
.grace-list,
.grace-bg-white {
	background: transparent;
}
.grace_img {
	width: 130upx;
	height: 100upx;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 20upx;
}
.grace_img > image {
	width: 100%;
}
.grace-list {
	border: none;
	padding: 0;
}
.grace-accordion-title {
	border-bottom: 1px solid #ccc;
	padding-top: 0;
	align-items: center;
}
.f_msg {
	width: 100upx;
	height: 100upx;
	background: #3aaafe;
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
