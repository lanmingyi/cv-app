<template>
	<view class="container" :class="[vtheme]">
		<view class="bg-box radius margin">
			
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				InputBottom: 0,
				commentValue: '',
				reservList: [{userName: '张莹莹',check: true},{userName: '李峰',check: false},{userName: '领导',check: false},{userName: '程俊杰',check: true},
				{userName: '李峰',check: true},{userName: '张莹莹',check: false},{userName: '领导',check: false},{userName: '程俊杰',check: true}],
				assetsList:[{
					name: '办公椅',num: '25',applyTime: '2021-04-25 14:12:00'
				},{
					name: '显示屏',num: '8',applyTime: '2021-04-25 14:23:00'
				}],
				processList: [{
					status: 1,
					desc: "发起流程了",
					sendTime: "2021-04-12 15:30",  
					sendName: "张莹莹"
				},
				{
					status: 1,
					desc: "同意",
					sendTime: "2021-04-13 09:32",
					sendName: "李凤"
				},
				{
					status: 2,
					desc: "驳回",
					sendTime: "2021-04-12 15:30",
					sendName: "程晓国"
				}]
			};
		},
		onLoad() {
			var token = '';
			uni.getStorage({
				key: 'token',
				success: function(res) {
					token = res.data;
					if (!token) {
						uni.showModal({
							title: '未登录',
							content: '请重新登录!'
						});
						setTimeout(function() {
							uni.reLaunch({
								url: '../login/login'
							});
						}, 500);
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
		}
	};
</script>

<style lang="scss" scoped>
</style>
