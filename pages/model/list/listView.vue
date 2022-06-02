<template>
	<view class="container" :class="[vtheme]">
		<view class="bg-box">
			<!-- 查询 -->
			<view class="search-top">
				<view v-if="searchList && searchList.length > 0" >
					<view class="font-second margin-right-sm flex align-center justify-center" @click="()=>{showPopup=true}">
						<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-xs" name="filter-fill1" :size="48"></u-icon>
						<text>查询</text>
					</view>
					<!-- 弹窗 -->
					<u-popup v-model="showPopup" mode="bottom" border-radius="28" length="60%" :closeable="true">
						<view class="popup-content pos-relative">
							<view class="padding-lr u-padding-top-80">
								<u-form :model="searchData" ref="uForm">
									<block v-for="(item,index) in searchList" :key="index">
										<u-form-item label-width="180" label-position="left" :label="item.filedName">
											<u-input :border="true" placeholder="请输入" v-model="searchData[item.filed]" type="text"></u-input>
										</u-form-item>
									</block>
								</u-form>
							</view>
							<view class="popup-absolute flex align-center justify-center">
								<view class="popup-box cu-btn bg-orange radius" @click="formReset">重置</view>
								<view class="popup-box cu-btn bg-olive radius" @click="formSubmit">完成</view>
							</view>
						</view>
					</u-popup>
					<view class="text-box-line"></view>
				</view>
			</view>
			
			<!-- 列表 -->
			<scroll-view scroll-y class="scroll-box" :style="{height: scrollHeight}" @scrolltolower="onreachBottom">
				<view v-if="emptyType==0" class="empty">
					<uni-load-more :status="loadingType"></uni-load-more>
				</view>
				<view v-if="emptyType==1" class="empty">
					<u-empty :text="emptyText" mode="list" icon-size="200"></u-empty>
				</view>
				<view v-if="emptyType== 2">
					<view>
						<u-swipe-action class="swiper-action" :show="item.show" :index="index" v-for="(item, index) in formList" :key="item.uuid" @click="(index,index1)=>{click(index,index1,item)}"
							@open="open" :options="options" @content-click="goFromDetail(item, index)">
							<view class="padding-lr padding-tb-sm border-bottom">
								<view class="font-second">
									<text>库名：</text>
									<text>{{item.warehouseName}}</text>
								</view>
								<view class="font-second">
									<text>创建人：</text>
									<text>{{item.creator}}</text>
								</view>
								<view class="font-second">
									<text>创建时间：</text>
									<text>{{item.createTime}}</text>
								</view>
							</view>
						</u-swipe-action>
					</view>
					<view class="uni-tab-bar-loading">
						<uni-load-more :status="loadingType"></uni-load-more>
					</view>
				</view>
			</scroll-view>
			
			<view v-if="showAdd" class="pos-fixed width-80 round cu-botton-submit text-xxl text-center" @click="addFrom">+</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uuid: '',
				scrollHeight: '0px',
				emptyType: 0,
				emptyText: '暂无数据',
				loadingType: 'loading',
				pageNo: 1,
				formList:[],
				modelList:[],
				searchData: {},
				searchList:[],
				showAdd:false,
				url: {
					getData:'/office/oaWorkSupplies/getPageSet',
					delete: '/office/oaWorkSupplies/deleteBatch'
				},
				showAction: false,
				options: [{
						text: '编辑',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
			}
		},
		onLoad(o) {
			this.uuid = o.uuid
			this.getData()
			this.$nextTick(function(){
				this.$u.getRect('.search-top').then(res => {
					this.scrollHeight = 'calc(100vh - var(--status-bar-height) - '+ res.height + ')'
				})
			})
		},
		onShow(){
		},
		methods: {
			onreachBottom(){
				if(this.loadingType == 'more'){
					this.getData()
				}
			},
			refshList(){
				this.pageNo = 1
				this.loadingType = 'loading'
				this.formList = []
				this.getData()
			},
			getData(params){
				const that = this
				let url = that.url.getData
				let paramsData = {
					pageNo:that.pageNo,
					pageSize: 20,
					...params
				}
				that.$http
					.post(url,paramsData , {
						params: {},
					})
					.then(res => {
						if(res.statusCode == 200){
							let data = res.data;
							let list = data.rows
							that.pageNo++
							list.map((val, index) => {
								val.show = false
							})
							that.$nextTick(function(){
								that.formList = that.formList.concat(list);  //列表数据
								that.emptyType = 2
								if (that.formList.length == 0) {
									that.loadingType = 'nomore'
									that.emptyType = 1
								} else {
									if (that.pageNo > data.totalPage) {
										that.loadingType = 'nomore';
									} else {
										that.loadingType = 'more';
									}
								}
								that.showAdd = true
								uni.hideLoading()
							})
						} else {
							that.showAdd = false
							that.emptyText = res.data.message ? res.data.message : '获取数据失败'
							that.emptyType = 1
							that.loadingType = 'more';
							uni.hideLoading()
						}
					})
					.catch(err => {});
			},
			addFrom(){
				uni.navigateTo({
					url:'../from/fromView?type=add'
				})
			},
			goFromEdit(item){
				uni.navigateTo({
					url:'../from/fromView?type=edit&uuid=' + item.uuid
				})
			},
			goFromDetail(item){
				console.log(item)
				uni.navigateTo({
					url:'../from/fromDetailView?type=edit&uuid=' + item.uuid
				})
			},
			click(index, index1,item) {
				if(index1 == 1) {
					this.formList[index].show = false;
					this.goFromDelete(item,index)
				} else {
					//编辑
					this.formList[index].show = false;
					this.goFromEdit(item)
				}
			},
			open(index) {
				this.formList[index].show = true;
				this.formList.map((val, idx) => {
					if (index != idx) this.formList[idx].show = false;
				})
			},
			goFromDelete(item,index){
				let that = this
				let params = {
					uuid: item.uuid
				}
				that.$http.post(that.url.delete,params , {
						params: {},
					})
					.then(res => {
						that.$u.toast(res.data.message)
						if(res.statusCode == 200){
							that.formList.splice(index, 1)
						}
					})
					.catch(err => {});
			},
			formReset(){
				this.searchData = {}
			},
			formSubmit(){
				uni.showLoading({
					title: "搜索中..."
				})
				this.showPopup = false
				this.searchData = data
				this.pageNo = 1
				this.formList = []
				this.getData()
			},
		}
	}
</script>

<style lang="scss" scoped>
.scroll-box{
	width: 100vw;
	height: calc(100vh - 100rpx);
}
.swiper-action{
	width: 100vw;
}
</style>
