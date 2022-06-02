<template>
	<view class="container" :class="[vtheme]">
		<view class="bg-box">
			
			<!-- 界面 -->
			<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom">
				<view class="font-main text-bold">界面</view>
			</view>
			<view class="cu-list grid col-4">
				<view class="cu-item animation-slide-bottom" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList" :key="index" @tap="navTo(item.url)">
					<view
						:style="{background: colorType()}"
						class="margin-auto box-font-list flex align-center justify-center">
						<view class="iconfont" :class="['icon-' + item.cuIcon,'text-white']"></view>
					</view>
					<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
				</view>
			</view>
			
			<!-- 文件 -->
			<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom">
				<view class="font-main text-bold">文件</view>
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
			
			<!-- 表单组件 -->
			<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom">
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
			
			<!-- 地图 -->
			<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom">
				<view class="font-main text-bold">地图</view>
			</view>
			<view class="cu-list grid col-4">
				<view class="cu-item animation-slide-bottom" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList5" :key="index" @tap="navTo(item.url)">
					<view
						:style="{background: colorType()}"
						class="margin-auto box-font-list flex align-center justify-center">
						<view class="iconfont" :class="['icon-' + item.cuIcon,'text-white']"></view>
					</view>
					<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
				</view>
			</view>
			
			<!-- 媒体 -->
			<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom">
				<view class="font-main text-bold">媒体</view>
			</view>
			<view class="cu-list grid col-4">
				<view class="cu-item animation-slide-bottom" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList5" :key="index" @tap="navTo(item.url)">
					<view
						:style="{background: colorType()}"
						class=" margin-auto box-font-list flex align-center justify-center">
						<view class="iconfont" :class="['icon-' + item.cuIcon,'text-white']"></view>
					</view>
					<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
				</view>
			</view>
			
			<!-- 设备相关 -->
			<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom">
				<view class="font-main text-bold">设备相关</view>
			</view>
			<view class="cu-list grid col-4">
				<view class="cu-item animation-slide-bottom" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList6" :key="index" @tap="navTo(item.url)">
					<view
						:style="{background: colorType()}"
						class="margin-auto box-font-list flex align-center justify-center">
						<view class="iconfont" :class="['icon-' + item.cuIcon,'text-white']"></view>
					</view>
					<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
				</view>
			</view>
			
			<!-- 扩展组件 -->
			<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom">
				<view class="font-main text-bold">扩展组件</view>
			</view>
			<view class="cu-list grid col-4">
				<view class="cu-item animation-slide-bottom" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList7" :key="index" @tap="navTo(item.url)">
					<view
						:style="{background: colorType()}"
						class="margin-auto box-font-list flex align-center justify-center">
						<view class="iconfont" :class="['icon-' + item.cuIcon,'text-white']"></view>
					</view>
					<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
				</view>
			</view>
			
			<!-- 其他组件 -->
			<view class="padding-lr padding-top-xl padding-bottom-sm border-bottom">
				<view class="font-main text-bold">其他组件</view>
			</view>
			<view class="cu-list grid col-4">
				<view class="cu-item animation-slide-bottom" :style="{animationDelay: delayTime(index)}" v-for="(item, index) in cuIconList11" :key="index" @tap="navTo(item.url)">
					<view
						:style="{background: colorType()}"
						class="margin-auto box-font-list flex align-center justify-center">
						<view class="iconfont" :class="['icon-' + item.cuIcon,'text-white']"></view>
					</view>
					<view class="text-center font-second padding-top-xs">{{ item.name }}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				accordionActive: '',
				cuIconList: [
					{cuIcon: 'zujian-danchuang',color: 'red',name: '模态弹窗',url: 'modal/modal'},
					{cuIcon: 'huihua',color: 'blue',name: '创建绘画',url: 'canvas/canvas'},
					{cuIcon: 'liebiao',color: 'yellow',name: 'list',url: '../component/list/list'},
					{cuIcon: 'qiapian',color: 'olive',name: '卡片',url: '../component/card/card'},
					{cuIcon: 'timeAxis',color: 'green',name: '时间轴',url: 'timeline/timeline'},
					{cuIcon: 'buzhoutiao',color: 'pink',name: '步骤',url: 'steps/steps'},
					{cuIcon: 'jindutiao',color: 'orange',name: '进度条',url: 'progressbar/progressbar'},
					{cuIcon: 'bianpinghuatubiaosheji-',color: 'brown',name: '标签',url: 'badge/badge'},
					{cuIcon: 'huadonganniux',color: 'red',name: '滑动操作',url: 'swipe_action/swipe_action'},
					{cuIcon: 'fuwenben',color: 'blue',name: '富文本编辑',url: 'md_editor/md_editor'},
					{cuIcon: 'shoushijiesuo',color: 'yellow',name: '图案解锁',url: 'gesture/gesture'},
					{cuIcon: 'lunbo3x',color: 'olive',name: '轮播',url: 'swiper/swiper'},
					{cuIcon: 'kujialeqiyezhan_mohutuozhuaichicun',color: 'green',name: '拖拽缩放',url: 'movable_view/movable_view'},
					{cuIcon: 'tonggao',color: 'puper',name: '通告栏',url: 'noticeBar/noticeBar'},
					{cuIcon: 'bim_donghua',color: 'blue',name: '消息提醒',url: 'alert/alert'},
					// {cuIcon: 'shequ',color: 'red',name: '聊天',url: './component/chat/chat'},
				],
				cuIconList2: [
					{cuIcon: 'shangchuan',color: 'red',name: '上传文件',url: 'upload_file/upload_file'},
					{cuIcon: 'xiazai',color: 'blue',name: '下载文件',url: 'download_file/download_file'},
					{cuIcon: 'shanchu-',color: 'yellow',name: '删除文件',url: 'file/file'},
					{cuIcon: 'icon-test',color: 'olive',name: '图片选择',url: 'up_images/up_images'},
					{cuIcon: 'cut',color: 'green',name: '图片裁剪',url: 'crop/crop'},
					{cuIcon: 'jiazai',color: 'orange',name: '图片懒加载',url: 'lazyload/lazyload'}
				],
				cuIconList3: [
					{cuIcon: 'anniuzu',color: 'red',name: 'button',url: '../component/button/button'},
					{cuIcon: 'duoxuanti',color: 'blue',name: 'checkbox',url: '../component/checkbox/checkbox'},
					{cuIcon: 'biaodan',color: 'yellow',name: 'form',url: '../component/form/form'},
					{cuIcon: 'shurukuang',color: 'olive',name: 'input',url: '../component/input/input'},
					// {cuIcon: 'tables',color: 'green',name: 'select',url: '../component/select/select'},
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
				cuIconList4: [
					{cuIcon: 'ditu',color: 'red',name: '获取当前位置',url: 'get_location/get_location'},
					{cuIcon: 'ditu2',color: 'blue',name: '地图查看位置',url: 'open_location/open_location'},
					{cuIcon: 'ditu1',color: 'yellow',name: '地图选择位置',url: 'choose_location/choose_location'}
				],
				cuIconList5: [
					{cuIcon: 'video',color: 'red',name: 'video',url: 'video/video'},
					{cuIcon: 'yinle',color: 'blue',name: '音乐',url: 'music/music'},
					{cuIcon: 'yuyin',color: 'yellow',name: '语音识别',url: 'voice/voice'},
					{cuIcon: 'audio',color: 'olive',name: 'audio',url: '../component/audio/audio'},
					{cuIcon: 'shipin',color: 'green',name: '视频',url: 'video_uniapp/video_uniapp'},
					{cuIcon: 'mn_shangchuantupian_fill',color: 'red',name: '上传图片',url: 'up_images/up_images'},
					{cuIcon: 'luyin',color: 'red',name: '录音',url: 'voice/voice'},
					{cuIcon: 'xiazaibendi',color: 'blue',name: '保存媒体到本地',url: 'save_media/save_media'},
					{cuIcon: 'yinpinzhuan999',color: 'yellow',name: '背景音频',url: 'bg_audio/bg_audio'},
				],
				cuIconList6: [
					{cuIcon: 'wangluo',color: 'red',name: '手机网络状态',url: 'get_network_type/get_network_type'},
					{cuIcon: 'xitong',color: 'pink',name: '手机系统信息',url: 'get_system_info/get_system_info'},
					{cuIcon: 'saoma',color: 'green',name: '扫码',url: 'scan_code/scan_code'},
					{cuIcon: 'erweima',color: 'red',name: '二维生成器',url: 'qrcode/qrcode'},
					{cuIcon: 'zhendong',color: 'olive',name: '震动',url: 'vibrate/vibrate'},
					{cuIcon: 'liangdu',color: 'orange',name: '屏幕亮度',url: 'brightness/brightness'},
					{cuIcon: 'lanya',color: 'blue',name: '蓝牙',url: '../component/bluetooth/bluetooth'},
					{cuIcon: 'jurassic_scissors',color: 'yellow',name: '剪贴板',url: 'clipboard/clipboard'}
				],
				cuIconList7: [
					{cuIcon: 'tubiao',color: 'green',name: '图表',url: 'wxcharts/wxcharts'},
					{cuIcon: 'zhifu',color: 'red',name: '发起支付',url: 'payment/payment'},
					{cuIcon: 'fenxiang',color: 'olive',name: '分享',url: 'share/share'},
					{cuIcon: 'choujiang',color: 'orange',name: '抽奖活动',url: 'lotteryDraw/lotteryDraw'},
				],
				cuIconList11: [
					{cuIcon: 'tubiao1',color: 'pink',name: '图标',url: 'icon/icon'},
					{cuIcon: 'bim_donghua',color: 'pink',name: '动画库',url: 'animate/animate'},
					{cuIcon: 'chouti',color: 'blue',name: '抽屉',url: 'drawer/drawer'},
					{cuIcon: 'chuizhijuli',color: 'orange',name: '垂直导航',url: 'verticalnav/verticalnav'},
					{cuIcon: 'xiangqing',color: 'olive',name: '操作条',url: 'bar/bar'},
					{cuIcon: 'shaloudaojishi',color: 'green',name: '倒计时',url: 'count_down/count_down'},
					{cuIcon: 'pingfen',color: 'red',name: '星级评分',url: 'star/star'},
					{cuIcon: 'yingyongshangdian',color: 'brown',name: '打开外部应用',url: 'scheme/scheme'},
					{cuIcon: 'fenye',color: 'blue',name: '分页器',url: 'pagination/pagination'},
					{cuIcon: 'liebiao1',color: 'yellow',name: '右侧索引列表',url: 'index_list/index_list'},
					{cuIcon: 'denglu',color: 'red',name: '登录',url: 'login/login'},
					{cuIcon: 'zhucehuiyuan',color: 'blue',name: '注册、登录',url: 'register/register'},
					{cuIcon: 'jurassic_role',color: 'puper',name: '获取用户信息',url: 'getUserInfo/getUserInfo'},
				],
			};
		},
		onLoad() {
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			changeAccordion: function(e) {
				var accordionIndex = e.currentTarget.id;
				if (this.accordionActive == accordionIndex) {
					accordionIndex = '';
				}
				this.accordionActive = accordionIndex;
			},
			navTo(e){
				uni.navigateTo({
					url:e
				})
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
