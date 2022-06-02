<template>
	<view class="container" :class="[vtheme]">
		<view v-if="emptyType===0" class="empty text-center margin-tb-xl">
			<image src="@/static/img/loading.gif"></image>
			<text class="text-grey text-opacity5 ">加载中...</text>
		</view>
		<view v-if="emptyType===1" class="empty text-center">
			<image src="@/static/img/empty.png"></image>
			<view class="text-grey text-opacity5 margin-tb-xl">页面丢失</view>
		</view>
		<view class="art-box bg-box" v-if="emptyType===2">
			<view class="banner padding" id="container-title">
				<view class="banner-title text-bold text-main-title u-font-32">{{data.title}}</view>
			</view>
			<view class="article-meta padding-lr padding-bottom-sm u-font-13 text-gray flex align-center justify-between border-bottom">
				<view class="font-three">
					<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="user1"></u-icon><text
						class="article-author">{{data.creator}}</text>
				</view>
				<view class="font-three">
					<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" name="shijian1"></u-icon><text
						class="article-time">{{data.create_time}}</text>
				</view>
			</view>
			<view class="article-content padding-lr bg-box margin-top">
				<view v-html="data.content"></view>
			</view>

			<view class="text-box-line"></view>
			<view class="cu-bar bg-box border-bottom">
				<view class="action">
					<u-icon class="icon-text-color padding-right-sm" name="attach"></u-icon>
					<view class="font-main">附件</view>
				</view>
			</view>
			<view class="cu-card bg-box padding-bottom-xl" id="files">
				<oss-files :fileList="filesList"></oss-files>
			</view>

			<view class="text-box-line"></view>
			<view class="cu-bar bg-box border-bottom">
				<view class="action">
					<u-icon class="icon-text-color padding-right-sm" name="pushpin"></u-icon>
					<view class="font-main">传阅意见</view>
				</view>
			</view>
			<view class="cu-card bg-box">
				<comment-list :commentList="opinionList"></comment-list>
			</view>
		</view>
		<view v-if="emptyType == 2" class="comment-box">
			<view class="text-box-line"></view>
			<comment-pop ref="commentPop" :showPop.sync="showPop" placeholder="传阅意见..." @close="()=>{showPop = false}"
				@sure="sureOpinion"></comment-pop>
		</view>

		<!-- 附件页面定点滚动 -->
		<!-- <page-scroll v-if="emptyType===2" ref="scrollRight" /> -->
	</view>
</template>

<script>
	import uniTable from '@/components/uni-table/uni-table.vue';
	import ossFiles from '@/components/custom/pages/ossFiles.vue';
	import pageScroll from '@/components/custom/pages/pageScroll.vue';
	import commentList from '@/components/custom/pages/commentList.vue';
	import commentBox from '@/components/custom/pages/commentBox.vue';
	import commentPop from '@/components/custom/pages/commentPop.vue';
	import moment from 'moment/min/moment.min.js'
	export default {
		components: {
			uniTable,
			ossFiles,
			pageScroll,
			commentList,
			commentBox,
			commentPop
		},
		data() {
			return {
				data: {},
				content: '',
				title: '',
				filesList: [],
				opinionList: [],
				showModal: false,
				showSend: false,
				params: {},
				emptyType: 0,
				scrollTop: 400,
				mode: 'square',
				bottom: 200,
				right: 40,
				top: 400,
				icon: 'arrow-up',
				iconStyle: {
					color: '#2979ff',
					fontSize: '38rpx'
				},
				customStyle: {
					backgroundColor: '#a0cfff',
					color: '#2979ff'
				},
				tips: '顶部',
				showPop: false,
				hiddenPopup: {
					'height': '100%',
					'overflow': 'hidden'
				}
			}
		},
		onShareAppMessage() {
			return {
				path: '/pages/system/article_details/article_details?query=' + JSON.stringify(this.banner)
			}
		},
		onPageScroll(e) {
			// if (e.scrollTop > 450) {
			// 	this.$refs.scrollRight.gotoTopTips()
			// } else {
			// 	this.$refs.scrollRight.gotoBottomTips()
			// }
		},
		onLoad(options) {
			console.log("options----", options)
			this.params.uuid = options.uuId
			if (options.selectedIndex && options.selectedIndex == 1) {
				this.showSend = true
			} else {
				this.showSend = false
			}
		},
		onShow() {
			this.$nextTick(function() {
				uni.setStorage({
					key: 'check_order_key',
					data: '0',
					success: function() {}
				});
				this.getDetail()
				if (this.filesList.length == 0) this.getFilesData()
				if (this.opinionList.length == 0) this.getOpinion()
				this.$u.getRect('.comment-box').then(res => {
					this.hiddenPopup.height = `calc(100vh - ${res.height})`
					console.log("height", this.hiddenPopup.height);
				})
			})
		},
		methods: {
			closeShowPop() {
				this.showPop = false
			},
			sureOpinion(remark, list) {
				console.log("remark",remark,list)
				let content = `${remark}${'\n'}`
				uni.showToast({
					title: remark + '\n',
					icon: 'none',
					duration: 1000,
				});
				let data = []
				if (list) {
					list.forEach(val => {
						data.push(val.uuid)
					})
				}
				this.$http
					.post('/office/oaChuanyue/chuanyueComment', {
						chuanyueUuid: this.params.uuid,
						opinion: content,
						uuid: data
					}, {
						params: {},
					})
					.then(res => {
						if (res.data.statusCode === 200) {
							uni.showToast({
								title: "传阅成功！",
								icon: 'none',
							});
							this.showPop = false
							this.$nextTick(() => {
								if (this.$refs.commentPop) this.$refs.commentPop.clear()
								this.opinionList = []
								this.getOpinion()
							})
						} else {
							uni.showToast({
								title: "传阅失败!",
								icon: 'none',
							});
						}
					})
			},
			hideModal(e) {
				this.showModal = false
			},
			getDetail() {
				var that = this;
				that.$http
					.post('/office/oaChuanyue/getDetailByUuid', this.params, {
						params: {},
					})
					.then(res => {
						if(res.statusCode == 200){
							this.data = res.data
							uni.setNavigationBarTitle({
								title: this.data.title
							});
							this.data.create_time = moment(res.data.create_time).format('yyyy-MM-DD HH:mm:ss')
							this.emptyType = 2
						}
					})
					.catch(err => {
						this.emptyType = 1
					});
			},
			getFilesData() {
				var that = this;
				that.$http
					.post('/document/ossFile/getPageSet', {
						puuid: this.params.uuid
					}, {
						params: {},
					})
					.then(res => {
						this.filesList = res.data.rows
					})
					.catch(err => {});
			},
			getOpinion() {
				var that = this;
				that.$http
					.post('/office/oaChuanyueReceiver/getListByChaungyueUuids', {
						chuanyueUuid: this.params.uuid
					}, {
						params: {},
					})
					.then(res => {
						if (res.data) {
							res.data.forEach(val => {
								let list = {
									userName: val.personName,
									createTime: val.createTime,
									content: val.remark
								}
								this.opinionList.push(list)
							})
						} else {
							this.opinionList = []
						}
					})
					.catch(err => {});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.art-container {
		width: 100%;
	}

	.hiddenPopup {
		height: 100vh;
		overflow: hidden;
	}

	.art-botton {
		width: 80%;
		margin: 60rpx auto;
		text-align: center;
	}

	.cu-bar .action {
		font-size: 28rpx !important;
		margin: 0 30rpx !important;
	}

	.art-box {
		// width: 95%;
		border-radius: 10rpx;
		margin: 0 auto;
		position: relative;

		.banner {
			padding-bottom: 10upx !important;
		}

		.banner-title {
			text-align: left;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-word;
			display: -webkit-box;
			-webkit-line-clamp: 2; //指定行数
			-webkit-box-orient: vertical;
		}

		.article-meta {
			padding-top: 0 !important;
			border-bottom: 1px solid #e7e7e7;
			display: flex;
			align-items: center;

			.article-text {
				margin-left: 10px;
			}
		}

		.article-content {

			img {
				width: 100%;
				height: 100%;
			}
		}

		.file-content {
			width: 95%;
			margin: 0 auto;
		}

		.art-opinion {
			width: 95%;
			margin: 0 auto;
			padding: 0 30rpx;
			padding-bottom: 40rpx;
		}
	}

	.send-content {
		border-radius: 10rpx;
	}

	.file-table {
		width: 95%;
		margin: 0 auto;
		min-width: 95% !important;
		margin-bottom: 40rpx;
	}

	.uni-table-th:last-child(),
	.uni-table-td:last-child() {
		width: 20%;
	}

	.uni-table-th,
	.uni-table-td {
		width: 40%;
		padding: 8rpx 10rpx;
		font-size: 24rpx;
	}
</style>
