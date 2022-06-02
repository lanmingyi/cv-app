<template>
	<view class="container" :class="[vtheme]">
		<swiper class="screen-swiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image :src="item.imgUrl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- 常用应用 -->
		<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom bg-white">
			<view class="font-main text-bold">常用应用</view>
		</view>
		<view class="cu-list grid col-4">
			<view class="cu-item animation-scale-up" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList" :key="index" @tap="navTo(item.url)">
				<view
					:style="{background: colorType()}"
					class="margin-auto box-font-list radius flex align-center justify-center">
					<view class="iconfont u-font-40" :class="['icon-' + item.cuIcon,'text-white']"></view>
				</view>
				<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
			</view>
		</view>
		
		<!-- 界面 -->
		<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom bg-white">
			<view class="font-main text-bold">界面</view>
		</view>
		<view class="cu-list grid col-4">
			<view class="cu-item animation-slide-bottom" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList1" :key="index" @tap="navTo(item.url)">
				<view
					:style="{background: colorType()}"
					class="margin-auto box-font-list flex align-center justify-center">
					<view class="iconfont" :class="['icon-' + item.cuIcon,'text-white']"></view>
				</view>
				<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
			</view>
		</view>
		
		<!-- 表单组件 -->
		<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom bg-white">
			<view class="font-main text-bold">表单组件</view>
		</view>
		<view class="cu-list grid col-4">
			<view class="cu-item animation-slide-bottom" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList3" :key="index" @tap="navTo(item.url)">
				<view
					:style="{background: colorType()}"
					class="margin-auto box-font-list flex align-center justify-center">
					<view class="iconfont" :class="['icon-' + item.cuIcon,'text-white']"></view>
				</view>
				<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
			</view>
		</view>
		
		<!-- 其他组件 -->
		<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom bg-white">
			<view class="font-main text-bold">其他组件</view>
		</view>
		<view class="cu-list grid col-4">
			<view class="cu-item animation-slide-bottom" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList2" :key="index" @tap="navTo(item.url)">
				<view
					:style="{background: colorType()}"
					class="margin-auto box-font-list flex align-center justify-center">
					<view class="iconfont" :class="['icon-' + item.cuIcon,'text-white']"></view>
				</view>
				<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	;
	import {
		mapState
	} from 'vuex';
	export default {

		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				swiperList: [
					{imgUrl: '../../static/img/banner01.jpg'},
					{imgUrl: '../../static/img/banner02.jpg'},
					{imgUrl: '../../static/img/banner03.jpg'}
				],
				cuIconList: [
					{cuIcon: 'shouye-1',color: 'blue',name: '任务',url: '../system/application/task/task'},
					{cuIcon: 'tongguanshuju',color: 'yellow',name: '社区',url: '../system/application/community/community'},
					{cuIcon: 'shouye-6',color: 'olive',name: '流程',url: '../system/application/flow/flow'},
					{cuIcon: 'contacts',color: 'yellow',name: '出差',url: '../system/application/evection/evection'},
					{cuIcon: 'shouye-5',color: 'green',name: '传阅',url: '../system/application/circulate/circulate'},
					{cuIcon: 'banzhengfuwu',name: '请假',url: '../system/application/leave/leave'},
					{cuIcon: 'home',color: 'blue',name: '会议',url: '../system/application/conference/conference'},
					{cuIcon: 'zhankai',color: 'blue',name: '更多',url: '../feature/feature'}	
				],
				cuIconList1: [
					{cuIcon: 'zujian-danchuang',color: 'red',name: '模态弹窗',url: '../feature/modal/modal'},
					{cuIcon: 'huihua',color: 'blue',name: '创建绘画',url: '../feature/canvas/canvas'},
					{cuIcon: 'liebiao',color: 'yellow',name: 'list',url: '../component/list/list'},
					{cuIcon: 'qiapian',color: 'olive',name: '卡片',url: '../component/card/card'},
					{cuIcon: 'timeAxis',color: 'green',name: '时间轴',url: '../feature/timeline/timeline'},
					{cuIcon: 'buzhoutiao',color: 'pink',name: '步骤',url: '../feature/steps/steps'},
					{cuIcon: 'jindutiao',color: 'orange',name: '进度条',url: '../feature/progressbar/progressbar'},
					{cuIcon: 'bianpinghuatubiaosheji-',color: 'brown',name: '标签',url: '../feature/badge/badge'},
					{cuIcon: 'huadonganniux',color: 'red',name: '滑动操作',url: '../feature/swipe_action/swipe_action'},
					{cuIcon: 'fuwenben',color: 'blue',name: '富文本编辑',url: '../feature/md_editor/md_editor'},
					{cuIcon: 'shoushijiesuo',color: 'yellow',name: '图案解锁',url: '../feature/gesture/gesture'},
					{cuIcon: 'lunbo3x',color: 'olive',name: '轮播',url: '../feature/swiper/swiper'},
					{cuIcon: 'kujialeqiyezhan_mohutuozhuaichicun',color: 'green',name: '拖拽缩放',url: '../feature/movable_view/movable_view'},
					{cuIcon: 'tonggao',color: 'puper',name: '通告栏',url: '../feature/noticeBar/noticeBar'},
					{cuIcon: 'bim_donghua',color: 'blue',name: '消息提醒',url: '../feature/alert/alert'},
				],
				cuIconList2: [
					{cuIcon: 'tubiao1',color: 'pink',name: '图标',url: '../feature/icon/icon'},
					{cuIcon: 'bim_donghua',color: 'pink',name: '动画库',url: '../feature/animate/animate'},
					{cuIcon: 'chouti',color: 'blue',name: '抽屉',url: '../feature/drawer/drawer'},
					{cuIcon: 'chuizhijuli',color: 'orange',name: '垂直导航',url: '../feature/verticalnav/verticalnav'},
					{cuIcon: 'xiangqing',color: 'olive',name: '操作条',url: '../feature/bar/bar'},
					{cuIcon: 'shaloudaojishi',color: 'green',name: '倒计时',url: '../feature/count_down/count_down'},
					{cuIcon: 'pingfen',color: 'red',name: '星级评分',url: '../feature/star/star'},
					{cuIcon: 'yingyongshangdian',color: 'brown',name: '打开外部应用',url: '../feature/scheme/scheme'},
					{cuIcon: 'fenye',color: 'blue',name: '分页器',url: '../feature/pagination/pagination'},
					{cuIcon: 'liebiao1',color: 'yellow',name: '右侧索引列表',url: '../feature/index_list/index_list'},
					{cuIcon: 'denglu',color: 'red',name: '登录',url: '../feature/login/login'},
					{cuIcon: 'zhucehuiyuan',color: 'blue',name: '注册、登录',url: '../feature/register/register'},
					{cuIcon: 'jurassic_role',color: 'puper',name: '获取用户信息',url: '../feature/getUserInfo/getUserInfo'},
				],
				cuIconList3: [
					{cuIcon: 'anniuzu',color: 'red',name: 'button',url: '../component/button/button'},
					{cuIcon: 'duoxuanti',color: 'blue',name: 'checkbox',url: '../component/checkbox/checkbox'},
					{cuIcon: 'biaodan',color: 'yellow',name: 'form',url: '../component/form/form'},
					{cuIcon: 'shurukuang',color: 'olive',name: 'input',url: '../component/input/input'},
					{cuIcon: 'shoucang-',color: 'brown',name: 'label',url: '../component/label/label'},
					{cuIcon: 'xuanzeqi',color: 'red',name: 'picker',url: '../component/picker/picker'},
					{cuIcon: 'duoxuan',color: 'blue',name: '多选picker',url: '../component/mpvue-picker/mpvue-picker'},
					{cuIcon: 'timeSelector',color: 'yellow',name: 'picker-view',url: '../component/picker-view/picker-view'},
					{cuIcon: 'danxuan',color: 'olive',name: 'radio',url: '../component/radio/radio'},
					{cuIcon: 'sliders',color: 'green',name: 'slider',url: '../component/slider/slider'},
					{cuIcon: 'switch',color: 'pink',name: 'switch',url: '../component/switch/switch'},
					{cuIcon: 'textarea',color: 'red',name: 'textarea',url: '../component/textarea/textarea'},
					{cuIcon: 'rili',color: 'puper',name: '日历',url: '../component/date/date'}
				],
			};
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if(e.index == 0){
				//调起app扫码
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						uni.navigateTo({
							url: '/pages/model/list/list?uuid=' + res.result
						});
					}
				});
			}
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
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url: url,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	};
</script>

<style lang="scss">

</style>
