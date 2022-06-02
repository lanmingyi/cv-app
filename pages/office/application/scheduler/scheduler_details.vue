<template>
	<view class="container" :class="[vtheme]">
		<view v-if="schedulerData" class="bg-box">
			<view class="cu-bar bg-box">
				<view class="action">
					<text class="text-black text-bold">{{schedulerData.title}}</text>
				</view>
			</view>
			<view class="cu-bar padding-bottom">
				<view class="margin-left">
					<view class="font-second">
						{{schedulerData.startDate}} - {{schedulerData.endDate}}
					</view>
					<view class="font-three margin-right-sm text-wrap">{{schedulerData.text}}</view>
				</view>
			</view>

			<view class="text-box-line"></view>
			<view class="cu-bar flex align-center justify-between border-bottom">
				<view class="action">
					<view class="font-second">组织人：</view>
					<view class="font-second">{{schedulerData.organizer}}</view>
				</view>
			</view>
			<view class="cu-bar flex align-center justify-between">
				<view class="action">
					<view class="font-second">参与人：</view>
				</view>
			</view>
			<view class="margin-lr padding-bottom flex align-center flex-wrap " v-if="schedulerData.joinUser">
				<view class="" v-for="(item,index) in joinList" :key="index">
					<view class="margin-right">
						<text class="cu-tag light round bg-blue">{{item}}</text>
					</view>
				</view>
			</view>
			<view class="margin-lr padding-bottom flex align-center flex-wrap" v-else>
				<view class="font-three">暂无</view>
			</view>

			<view class="text-box-line"></view>
			<view class="cu-bar bg-box border-bottom">
				<view class="action">
					<view class="text-black text-bold">评论</view>
				</view>
			</view>
			<view class="padding-tb">
				<comment-list :commentList="opinionList"></comment-list>
			</view>
			<view class="botton-bottom flex align-center justify-center padding-tb-sm bg-box">
				<input class="botton-input solid-bottom input-backGround margin-right-sm border-box shadow-blur"
					v-model="commentValue" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
					placeholder="评论"></input>
				<button class="cu-btn bg-blue shadow-blur" @click="sendComment">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import commentList from '@/components/custom/pages/commentList.vue';
	export default {
		components: {
			commentList
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				opinionList: [],
				schedulerData: {},
				InputBottom: 0,
				commentValue: '',
				uuid: '',
				joinList: []
			};
		},
		onLoad(options) {
			this.uuid = options.uuId
			this.getDetails(options.uuId)
			this.getCommentList()
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			fifterData(date) {
				if(date){
					let str2 = date.split(" ")
					return str2[1]
				}
			},
			getDetails(uuid) {
				console.log("uuid", uuid)
				var that = this;
				that.$http
					.post('/office/scheduler/getDetailByUuid', {
						uuid: uuid
					}, {
						params: {},
					})
					.then(res => {
						that.schedulerData = res.data
						that.joinList = res.data.joinUser.split(",")
					})
					.catch(err => {});
			},
			getCommentList(){
				var that = this;
				that.$http
					.post('/office/oaSchedulerComment/getCommentList', {
						pid: that.uuid
					}, {
						params: {},
					})
					.then(res => {
						that.opinionList = res.data
					})
					.catch(err => {});
			},
			sendComment() {
				console.log("评论值----", this.commentValue)
				if(!this.commentValue){
					uni.showToast({
					    title: '请给与评论意见！',
							icon: 'none',
					    duration: 1000
					});
				} else {
					this.$http
						.post('/office/oaSchedulerComment/saveCommentData', {
							uuid: this.uuid,
							comment: this.commentValue
						}, {
							params: {},
						})
						.then(res => {
							if (res.data === 1 || res.data.statusCode === 200){
								this.commentValue = ''
								uni.showToast({
								    title: '发送成功',
										icon: 'none',
								    duration: 1000
								});
								this.opinionList = []
								this.getCommentList()
							} else {
								uni.showToast({
								    title: '发送失败！',
										icon: 'none',
								    duration: 1000
								});
							}
						})
						.catch(err => {});
				}
			},
			formSubmit() {
				let tips = ""
				if (!this.conplaint.purchaseVolume) {
					tips = "请输入采购量！"
				} else if (!this.conplaint.companyName) {
					tips = "请输入公司名称！"
				} else if (!this.conplaint.contacts) {
					tips = "请输入联系人！"
				} else if (!this.conplaint.telephone) {
					tips = "请输入联系电话！"
				} else if (!this.conplaint.email) {
					tips = "请输入联系邮箱！"
				} else {
					tips = "请输入投诉意见！"
				}
				if (tips) {
					uni.showToast({
						title: tips,
						icon: 'none',
						duration: 1000
					});
				} else {
					console.log("投诉建议", this.conplaint)
				}
			},
			formReset() {
				console.log('清空数据')
				this.conplaint = {
					purchaseVolume: '',
					companyName: '',
					contacts: '',
					telephone: '',
					email: '',
					remarks: ''
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.pos-strike {
		position: sticky;
		top: 0;
		z-index: 5;
	}

	.cu-form-group uni-input,
	.cu-form-group uni-textarea {
		font-size: 13px;
	}

	.cu-form-group uni-textarea {
		min-height: 200px !important;
		border: 1px solid #e7e7e7;
		border-radius: 10px;
		padding: 10px 15px;
	}

	.text-font-13 {
		font-size: 13px !important;
	}

	.botton-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 5;

		.botton-input {
			width: 540rpx;
			line-height: 60rpx;
			height: 60rpx;
			padding-left: 20rpx;
			border-radius: 10rpx;

		}
	}

	.input-backGround {
		background: #f1f1f1;
		font-size: 12px;
	}
</style>
