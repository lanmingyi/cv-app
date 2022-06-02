<template>
	<view id="page">
		<view class="classify">
			<view class="body-view">
				<scroll-view class="top-menu-view" scroll-x="true" :scroll-left="scrollLeft">
					<block v-for="(menuTab,index) in menuTabs" :key="index">
						<view class="menu-one-view" v-bind:id="'tabNum'+index" @click="swichMenu(index)">
							<view :class="[currentTab==index ? 'menu-one-act' : 'menu-one']">
								<view class="menu-one-txt">{{menuTab.name}}</view>
								<view class="menu-one-bottom">
									<view class="menu-one-bottom-color"></view>
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
				<swiper :current="currentTab" class="swiper-box-list" duration="300" @change="swiperChange">
					<block v-for="(swiperDate,index1) in swiperDateList" :key="index1">
						<swiper-item>
							<scroll-view class="swiper-one-list" scroll-y="true" @scrolltolower="loadMore(index1)">
								<view>
									 <view class="grace-scroll-do grace-bg-white grace-common-mt">
										 <scroll-view class="grace-scroll-x" scroll-x v-for="(item, index) in vacate" :scroll-left="scrollIndex == index ? 180 : 0" @touchstart='touchStart' @touchend='touchEnd' :data-id="index" scroll-with-animation="true" :key="index"> 
											<view class="uni-list-cell grace-items" hover-class="uni-list-cell-hover">
												<navigator url="leave_edit/leave_edit" class="grace-items">
													<view class="uni-triplex-row">
														<view class="uni-triplex-left">
															<navigator url="#" class="grace-items">
																 <view class="grace_img"><image :src="item.img" mode="widthFix"></image></view>
																 <view class="contents uni-triplex-left">
																	 <text class="uni-title uni-ellipsis">{{item.name}}</text>
																	 <text class="uni-text">请假类型：{{item.desc}}</text>
																	 <text class="uni-text uni-ellipsis">{{item.time}}</text>
																	 
																 </view>
															 </navigator>
														</view>
														<view class="uni-triplex-right">
															<text class="uni-h5">12:15</text>
															<text class="uni-text uni-ellipsis v_type">{{item.type}}</text>
														</view>
													</view>
												</navigator>
											 </view>
											 <view class="grace-items btn btn-first" :data-id="index" @tap="edit" :style="{width : index == deleteIndex ? '0px' : btn1Width + 'px', background:'#3aaafe', color: '#FFF'}">编辑</view>
											 <view class="grace-items btn" :data-id="index" @tap="removeMsg" :style="{width : index == deleteIndex ? deleteBtnWidth + 'px' : btn2Width+'px',background:'#FA5858',color: '#fff'}">删除</view>
										 </scroll-view>
									 </view>
								 </view>
							</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view class="swiper-one-list" scroll-y="true" @scrolltolower="loadMore(index1)">
								<view>
									 <view class="grace-scroll-do grace-bg-white grace-common-mt">
										 <scroll-view class="grace-scroll-x" scroll-x v-for="(item, index) in vacate2" :scroll-left="scrollIndex == index ? 180 : 0" @touchstart='touchStart' @touchend='touchEnd' :data-id="index" scroll-with-animation="true" :key="index"> 
											<view class="uni-list-cell grace-items" hover-class="uni-list-cell-hover">
												<navigator url="#" class="grace-items">
													<view class="uni-triplex-row">
														<view class="uni-triplex-left">
															<navigator url="leave_details/leave_details" class="grace-items">
																 <view class="grace_img"><image :src="item.img" mode="widthFix"></image></view>
																 <view class="contents uni-triplex-left">
																	 <text class="uni-title uni-ellipsis">{{item.name}}</text>
																	 <text class="uni-text">请假类型：{{item.desc}}</text>
																	 <text class="uni-text uni-ellipsis">{{item.time}}</text>
																	 
																 </view>
															 </navigator>
														</view>
														<view class="uni-triplex-right right_type">
															<text class="uni-h5">12:15</text>
															<text class="uni-text uni-ellipsis v_type">{{item.type}}</text>
														</view>
													</view>
												</navigator>
											 </view>
											<!-- <view class="grace-items btn btn-first" :data-id="index" @tap="edit" :style="{width : index == deleteIndex ? '0px' : btn1Width + 'px', background:'#5959D3', color: '#FFF'}">编辑</view>
											 <view class="grace-items btn" :data-id="index" @tap="removeMsg" :style="{width : index == deleteIndex ? deleteBtnWidth + 'px' : btn2Width+'px',background:'red',color: '#fff'}"> 删除</view>-->
										 </scroll-view>
									 </view>
								 </view>
							</scroll-view>
						</swiper-item>
					</block>
				</swiper>
			</view>	
		</view>
		<!-- 筛选 start -->
		<view class='grace-filter-options' :style="{'width':'90%', 'height' : filterHeight, 'padding':'0'}" v-if="showingIndex == 99">
			<form @submit='formsubmit' @reset='formReset'>
				<scroll-view scroll-y="true" :style="{'height':filterHeight}">
					<view style="width:96%; padding:15upx 2%;">
						<view class="grace-h5 grace-blod">状态</view>
						<view style='padding:20upx 0;' class="grace-select-tips">
							<radio-group name="where2" @change="changeFunc2">
								<label v-for="(item, index) in where2Tips" :key="index" :class="[item.checked ? 'grace-checked' : '']">
									<radio :value="item.value + ''" :checked="item.checked"></radio> {{item.name}}
								</label>
							</radio-group>
						</view>
						<view class="grace-h5 grace-blod">类型</view>
						<view style='padding:20upx 0;' class="grace-select-tips">
							<checkbox-group name="where1" @change="changeFunc">
								<label v-for="(item, index) in where1Tips" :key="index" :class="[item.checked ? 'grace-checked' : '']">
									<checkbox :value="item.value + ''" :checked="item.checked"></checkbox> {{item.name}}
								</label>
							</checkbox-group>
						</view>
						
						<!-- 占位视图组件 -->
						<view style="height:150upx;"></view>
					</view>
				</scroll-view>
				<!-- 按钮  -->
				<view class='grace-filter-buttons'>
					<view>
						重置
						<button form-type='reset' class="reset">重置</button>
					</view>
					<view>
						确定
						<button form-type='submit'>确定</button>
					</view>
				</view>
			</form>
		</view>
		<!-- 筛选 end -->
		<uni-fab
			:pattern="pattern"
			:content="content"
			:horizontal="horizontal"
			:vertical="vertical"
			:direction="direction"
			@trigger="trigger"
		></uni-fab>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import uniFab from '@/components/uni-fab.vue'
	var _self, x, y;
	export default {
		name: 'apply',
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				pages:1,
				total:'',
				uuid:'',
				
				swiperDateList: [[],[],[],[],[],[]],
				 //2个按钮的宽度
				btn1Width : 70,
				btn2Width : 70,
				//2个按钮的总宽 = btn1Width + btn23Width【uni-app 模板内不建议复杂运算请手动配置】
				deleteBtnWidth : 140,
				//正在滑动的索引
				scrollIndex : -1,
				//正在删除的索引
				deleteIndex : -1,
				
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				content: [
					{
						iconPath: '/static/img/icon/vacation.png',
						selectedIconPath: '/static/img/icon/vacation.png',
						text: '添加',
						active: false
					},
					{
						iconPath: '/static/img/icon/filtrate.png',
						selectedIconPath: '/static/img/icon/filtrate.png',
						text: '筛选',
						active: false
					},
				],
				//筛选条件
				showingIndex : 0,
				where1Tips:[
					{ name : "全部" , value : 1 , checked:true},
					{ name : "已审批" , value : 2 , checked: false},
					{ name : "审批中" , value : 3 , checked: false},
					{ name : "已撤销" , value : 4 , checked: false}
				],
				where2Tips: [
					{ name: "全部", value: 1 , checked: false },
					{ name: "事假", value: 2 , checked: true },
					{ name: "病假", value: 3 , checked: false },
					{ name: "出差", value: 4 , checked: false },
					{ name: "外出", value: 5 , checked: false}
				],
				//
				filterHeight : '80%'
			};
		},
		onLoad() {
			_self = this;
			setTimeout(function () {
				console.log('start pulldown');
			}, 1000);
			//uni.startPullDownRefresh();
			uni.startPullDownRefresh({
				success: res => {},
			});  //这里表示当进入页面的时候就开始执行下拉刷新动画
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
		methods:{
			swichMenu: async function(current) { //点击其中一个 menu
				if (this.currentTab == current) {  
					return false;
				} else {
					this.currentTab = current;
					this.setScrollLeft(current);
				}
			},
			swiperChange: async function(e) {
				let index = e.target.current;
				this.setScrollLeft(index);
				this.currentTab = index; 
			},
			setScrollLeft: async function(tabIndex) {
				let leftWidthSum = 0;
				for (var i = 0; i <= tabIndex; i++) {
					let nowElement = await this.getWidth('tabNum' + i);
					leftWidthSum = leftWidthSum + nowElement.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
			},
			getWidth: function(id) { //得到元素的宽高
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			
			removeMsg : function(e){
				var index = e.target.dataset.id;
				//删除确认
				if (this.deleteIndex != index){
					this.deleteIndex = index;
					setTimeout(function(){
						_self.deleteIndex = -1;
					}, 2000);
					return false;
				}
				this.scrollIndex = -1;
				setTimeout(function(){
					_self.vacate.splice(index, 1);
					_self.deleteIndex = -1;
				}, 500);
			},
			touchStart: function (e) {
				x = e.mp.changedTouches[0].clientX;
				y = e.mp.changedTouches[0].clientY;
			},
			touchEnd : function(e){
				x = x - e.mp.changedTouches[0].clientX;
				y = y - e.mp.changedTouches[0].clientY;
				if (Math.abs(x) < 50) { return; }
				if (Math.abs(x) < Math.abs(y)) { return; }
				var index = e.currentTarget.dataset.id;
				if (index == this.scrollIndex){return ;}
				_self.scrollIndex = index;
			},
			changStatus : function(e){
				var index = e.currentTarget.dataset.id;
				this.vacate[index].status = "编辑";
			},
			edit :function () {
				uni.navigateTo({
					url:"leave_edit/leave_edit"
				})
			},
			trigger(e) {
				console.log(e);
				this.content[e.index].active = !e.item.active;
				var num = e.index;
				console.log(num);
				if(num==0){
					uni.navigateTo({
						url:'leave_add/leave_add'
					})
				}
				else if(num==1){
					if(this.showingIndex != 0){this.showingIndex = 0; return ;} this.showingIndex = 99;
				}
			},
			//提交条件
			formsubmit : function(e){
				console.log(JSON.stringify(e.detail.value));
				uni.showModal({
					title: '请观察控制台',
					content: '条件以表单形式提交 ^_^'
				});
				_self.showingIndex = 0;
				this.getList();
			},
			//重置表单
			formReset : function(){
				for (var i = 0; i < _self.where1Tips.length; i++){
					_self.where1Tips[i].checked= false;
				}
				_self.where1Tips = _self.where1Tips;
				for (var i = 0; i < _self.where2Tips.length; i++) {
					_self.where2Tips[i].checked = false;
				}
				_self.where2Tips = _self.where2Tips;
				_self.showingIndex = 0;
				this.getList();
			},
			//筛选页面js
			changeFunc: function (e) {
				var checkVal = e.detail.value;
				var currentVal = this.where1Tips;
				for (var i = 0; i < currentVal.length; i++) {
					if (checkVal.indexOf(currentVal[i].value + '') != -1) {
						currentVal[i].checked = true;
					} else {
						currentVal[i].checked = false;
					}
				}
				this.where1Tips = currentVal;
			},
			changeFunc2: function (e) {
				var checkVal = e.detail.value;
				for (var i = 0; i < this.where2Tips.length; i++) {
					if (checkVal.indexOf(this.where2Tips[i].value + '') != -1) {
						this.where2Tips[i].checked = true;
					} else {
						this.where2Tips[i].checked = false;
					}
				}
				this.where2Tips = this.where2Tips;
			},
			//条件更新后执行统一函数（如重新读取数据等）
			getList : function(){
				console.log('条件更新后执行统一函数（如重新读取数据等）');
			}
		},
		components: {
			uniFab,
			uniIcon
		}
	}
</script>

<style>
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
	background-color: #FFFFFF;
	height: 80upx;
	border-bottom: 1px solid #ccc;
	/* 在这里设置导航条高度 */
}
.menu-one-view{
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
.swiper-box-list {
	flex: 1;
	width: 100%;
	height: 1320upx;
	background-color: #FFFFFF;
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
.grace-scroll-do .grace-items{
	margin: 0;
	height: 200upx;
	background: #FFF;
	align-items: center;
}
.grace_img{
	width: 100upx;
	height: 100upx;
	background: #3AAAFE;
	border-radius: 50%;
	margin-right: 20upx;
}
.uni-triplex-row{
	padding: 0 20upx 0 0;  
}
.uni-triplex-left{
	line-height: 1.5;
}
.v_type{
	color: #3AAAFE;
}
.grace-filter-options{
	top: 0;
	border: 1px solid #e2e2e2;
}
.grace-filter-buttons{
	bottom: 5px;
}
.grace-filter-buttons uni-view{
	height: 90upx;
	line-height: 90upx;
	border-top: 1px solid #e2e2e2;
}
.grace-filter-buttons uni-view:first-child{
	background: #00C777;
	color: #fff;
}
.grace-filter-buttons .reset{
	background: #00C777;
	color: #fff;
}
.uni-triplex-row{
	align-items: center;
}
</style>
