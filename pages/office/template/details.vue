<template>
	<view class="container" :class="[vtheme]">
		<view v-if="emptyType===0" class="empty text-center margin-tb-xl">
			<text class="cuIcon-loading text-grey loadingIcon margin-right-sm"></text>
			<text class="text-grey text-opacity5 ">加载中...</text>
		</view>
		<view v-if="emptyType===1" class="empty text-center">
			<u-empty text="页面丢失" mode="page" icon-size="200"></u-empty>
		</view>
		<view class="art-box padding-bottom-xs" v-if="emptyType===2">
			<view class="banner padding" id="container-title">
				<view class="banner-title text-xl text-bold text-black">{{data.newsTitle}}</view>
			</view>
			<view class="article-meta padding u-font-13 text-gray">
				<text class="article-author">{{data.publisher}}</text>
				<text class="article-text">发表于</text>
				<text class="article-time margin-left-sm">{{data.releaseTime}}</text>
			</view>
			<view class="article-content text-black margin-top">
				<view v-html="data.content"></view>
			</view>

			<view class="cu-bar bg-box border-bottom">
				<view class="action">
					<view class="text-black text-bold">附件</view>
				</view>
			</view>
			<view class="cu-card bg-box" id="files">
				<oss-files :fileList="fileList"></oss-files>
			</view>

			<!-- 附件页面定点滚动 -->
			<page-scroll ref="scrollRight" />
		</view>
	</view>
</template>

<script>
	import uniTable from '@/components/uni-table/uni-table.vue';
	import ossFiles from '@/components/custom/pages/ossFiles.vue';
	import pageScroll from '@/components/custom/pages/pageScroll.vue';
	export default {
		components: {
			uniTable,
			ossFiles,
			pageScroll
		},
		data() {
			return {
				data: {},
				content: '',
				title: '',
				fileList: [{}, {}, {}, {}, {}],
				showModal: false,
				remark: '',
				params: {},
				emptyType: 0,
				timer: null
			}
		},
		onShareAppMessage() {
			return {
				path: '/pages/system/article_details/article_details?query=' + JSON.stringify(this.banner)
			}
		},
		onPageScroll(e) {
			if (e.scrollTop > 800) {
				this.$refs.scrollRight.gotoTopTips()
			} else {
				this.$refs.scrollRight.gotoBottomTips()
			}
		},
		onLoad(options) {
			this.params.uuid = options.uuId
			console.log("params.uuid----", this.params)
			this.getDetail();
		},
		methods: {
			getDetail() {
				var that = this;
				that.$http
					.post('/office/oaNewsBase/getDetailByUuid', {}, {
						params: this.params,
					})
					.then(res => {
						this.data = res.data
						uni.setNavigationBarTitle({
						    title: this.data.newsTitle
						});
						this.emptyType = 2
					})
					.catch(err => {
						this.emptyType = 1
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.art-container {
		width: 100%;
	}

	.cu-bar .action {
		font-size: 28rpx !important;
		margin: 0 30rpx !important;
	}

	.art-box {
		// width: 95%;
		background: #fff;
		border-radius: 10rpx;
		margin: 0 auto;
		position: relative;
		// margin-bottom: 50rpx;
		padding-bottom: 50rpx;

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
			padding: 0 30rpx;
			margin-bottom: 50rpx;

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
</style>
