<template>
	<view class="container" :class="[vtheme]">
		<u-sticky>
			<!-- 	<u-tabs-swiper ref="uTabs" font-size="26" :list="navList" :current="current" @change="tabsChange"
			:is-scroll="false" swiperWidth="750" class="pos-strike"></u-tabs-swiper> -->
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==swiperCurrent?'text-theme cur':''" v-for="(item,index) in navList" :key="index" @tap="tabsChange(index)" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</u-sticky>
		 <!-- @transition="transition" @animationfinish="animationfinish" -->
		<swiper class="swiper-box" :current="swiperCurrent" :show-bar="false" :disable-touch="true" >
			<!-- 表单信息 -->
			<swiper-item class="swiper-item tab-content">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<view class="margin-top-sm" >
						<from-model ref="fromModel" :fromData="fromData"></from-model>
						<!-- <view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
							<view class="cu-botton-submit text-center"  @click="formSubmit">发布</view>
						</view> -->
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 审批流程 -->
			<swiper-item class="swiper-item tab-content">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<view class="margin-top-sm" >
						<flow-handle ref="flowHandle"></flow-handle>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 流程图 -->
			<swiper-item class="swiper-item tab-content">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<!-- <view class="margin-top-sm" >
						<flow-view ref="flowView" :xml="xml" :design="design"></flow-view>
					</view> -->
					<view class="margin-top-sm padding-top-xs padding-bottom bg-box">
						<view class="padding-sm font-main ">流程历史跟踪</view>
						<view class="padding-lr-xl">
							<u-time-line>
								<u-time-line-item v-for="(item,index) in stepList" :key="index">
									<template v-slot:content>
										<view class="padding-sm tag-bg-default radius u-margin-right-60">
											<view class="u-font-13 text-white">流程节点：{{item.activityName}}</view>
											<view class="u-font-13 text-white">执行人：{{item.userName}}</view>
											<view class="u-font-13 text-white">审批意见：{{item.comment.message}}</view>
											<view class="u-font-13 text-white">执行时间：{{item.comment.time}}</view>
										</view>
									</template>
								</u-time-line-item>
							</u-time-line>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import flowBox from '@/components/custom/pages/flowBox.vue'
	import fromModel from '@/components/custom/flow/fromModel.vue'
	// import flowView from '@/components/custom/flow/flowView.vue'
	import flowHandle from '@/components/custom/flow/flowHandle.vue'

	var _self, x, y;
	export default {
		components: {
			uniLoadMore,
			flowBox,
			fromModel,
			// flowView,
			flowHandle
		},
		data() {
			return {
				navList: [ {
					name: '表单',value: 1,type: ''
				},{
					name: '任务处理',value: 2,type: ''
				}, {
					name: '流程图',value: 3,type: ''
				}, ],
				selectedIndex: 0,
				list: [],
				getList: [],
				downList: [],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				timer: null,
				fromData: {},
				flowData: {},
				detailsInfo: {},
				stepList: [],
				changIndex: 0,
				xml:null,
				design:null,
			};
		},
		onLoad(o) {
			// uni.showLoading({
			// 	title:'加载中...'
			// })
			this.flowData = o
			console.log("o",this.flowData)
			this.getStep();
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index;
				if(index == 2){
					if(this.$refs.flowView)this.$refs.flowView.refresh(this.xml)
				}
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				if (this.taskList[current].children.length == 0) {
					this.getData(current)
				}
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				if(this.taskList[this.current].loadingType == 'more'){
					this.getData(this.current)
				}
			},
			// 获取流程数据
			getStep() {
				let url = ''
				if(this.tabIndex==2){
					url = '/workflow/apiFlowableTask/historyClickDetails'
				}
				else{
					url = '/workflow/apiFlowableProcessInstance/clickStartProcess'
				}
				this.$http
					.post(url, {taskId:this.flowData.taskId,
					processDefinitionId:this.flowData.processDefinitionId,
					processInstanceId:this.flowData.processInstanceId,
					modelKey:this.flowData.modelKey,
					nodeId:this.flowData.nodeId,
					businessKey:this.flowData.uuid})
				.then(res => {
						// if(res.data.statusCode===300||!res.data.businessData){
						// 	uni.showToast({
						// 		title: '此流程未与表单关联',
						// 		icon: 'none'
						// 	});
						// 	setTimeout(function(){
						// 		uni.navigateBack({
						// 			delta:1
						// 		})
						// 	},1000)
						// } else {
							uni.hideLoading()
							console.log("流程---------",res);
							this.design = res.data
							this.xml = res.data.lists.flowDesign
							this.detailsInfo = res.data.businessData;
							this.stepList = res.data.commentBeanList
							if (this.flowData.type == 'backlog') {
								this.btnText = res.data.flowNodeButtons
							}
							
							console.log(this.stepList[0].comment.message)
							let cur = true;
							this.stepList.forEach((e,index)=>{
								if (e.comment) {
									e.serchTime = this.myFunction(e.comment.time)
								}
								if (cur) {
									if (index != 0 && !e.comment) {
										console.log('www', index);
										this.changIndex = index;
										cur = false;
									}
								}
							})
						// }
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: '获取数据失败',
							icon: 'none'
						});
						setTimeout(()=>{
							uni.navigateBack()
						},500)
					});
				
			},
			// 跳转到详情
			goToDetail(e){
				//创建绑定数据
				console.log(this.cardList)
				var uuId = e.businessKey;
				console.log(uuId)
				if (this.swiperCurrent == 0) {
					uni.navigateTo({
						url: 'flowDetail?uuId=' + uuId + '&taskId=' + e.taskId + '&type=backlog' + '&processDefinitionId=' + e.processDefinitionId +'&processInstanceId='+e.processInstanceId +'&index='+this.swiperCurrent+'&nodeId='+e.nodeId+'&modelKey='+e.modelKey
					});
				}if (this.swiperCurrent == 1) {
					uni.navigateTo({
						url: 'flowDetail?uuId=' + uuId + '&taskId=' + e.taskId + '&type=backlog' + '&processDefinitionId=' + e.processDefinitionId +'&processInstanceId='+e.processInstanceId +'&index='+this.swiperCurrent+'&modelKey='+e.modelKey+'&nodeId='+e.nodeId
					});
				}  else {
					uni.navigateTo({
						url: 'flowDetail?uuId=' + uuId + '&processDefinitionId=' + e.processDefinitionId +'&index='+this.swiperCurrent +'&processInstanceId='+e.processInstanceId+'&modelKey='+e.procDefKey
					});
				}
			},
			myFunction(remarkime){
			    var dateee = new Date(remarkime).toJSON();
			    var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
			    return date
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		height: calc(100vh - 40px);
	}
</style>
