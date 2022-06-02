<template>
	<view class="container" :class="[vtheme]">
		<view class="bg-box">
			<view class="search-top">
				<view v-if="searchField && searchField.length > 0">
					<from-search ref="fromSearch" :column="searchField" @search="searchFrom"></from-search>
					<view class="text-box-line"></view>
				</view>
			</view>
			<scroll-view scroll-y class="scroll-box" :style="[scrollStyle]"  @scrolltolower="onreachBottom">
				<view v-if="emptyType==0" class="empty">
					<uni-load-more :status="loadingType"></uni-load-more>
				</view>
				<view v-if="emptyType==1" class="empty">
					<u-empty :text="emptyText" mode="list" icon-size="200"></u-empty>
				</view>
				<view v-if="emptyType== 2">
					<from-list ref="fromList" 
						:list="formList" 
						:column="field" 
						class="swiper-action"
						@goFromEdit="goFromEdit" 
						@goFromDetail="goFromDetail" 
						@goFromDelete="goFromDelete">
					</from-list>
					
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
	import { list, searchList ,dataList} from  '@/components/custom/fromDesign/config/formList.js'; //数据模板
	
	import fromSearch from '@/components/custom/fromDesign/model/fromSearch'
	import fromList from '@/components/custom/fromDesign/model/fromList'
	export default {
		components:{
			fromList,
			fromSearch
		},
		data() {
			return {
				uuid: '',
				scrollHeight: '0px',
				emptyType: 0,
				scrollHeight: '0',
				emptyText: '暂无数据',
				loadingType: 'loading',
				pageNo: 1,
				formList:[],
				modelList:[],
				field: [],
				jsonData:[],
				searchField:[],
				tableSchema: '',
				tableName: '',
				showAdd:false,
				searchData: {},
				url: {
					save: '/system/sysAppDetailed/scanPreviewSave',
					updata: '/system/sysAppDetailed/scanPreviewUpdate',
					delete: '/system/sysAppDetailed/scanPreviewDeleteBatch'
				}
			}
		},
		onLoad(o) {
			console.log("e",o)
			this.uuid = o.uuid
			//获取高度
			// this.$nextTick(function(){
			// 	this.$u.getRect('.search-top').then(res => {
			// 		this.scrollHeight = 'calc(100vh - var(--status-bar-height) - '+ res.height + ')'
			// 	})
			// })
		},
		mounted() {
			
			this.getData()
		},
		computed:{
			scrollStyle(){
				let style = {}
				let height = this.searchField.length == 0 ? 0 : 50
				// #ifdef APP-PLUS
				height += 44
				// #endif
				style.height = 'calc(100vh - var(--status-bar-height) - '+ height + 'px)'
				return style;
			},
		},
		onShow(){
		},
		methods: {
			onreachBottom(){
				console.log("触底了")
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
				let url = '/system/sysAppDetailed/scanPreview'
				let paramsData = {
					pageNo:that.pageNo,
					pageSize: 20,
					basicsUuid : that.uuid,
					...params,
					...that.searchData
				}
				that.$http
					.post(url,paramsData , {
						params: {},
					})
					.then(res => {
						if(res.data.pageSet){
							let json = JSON.parse(res.data.formData)  //表单json 数据 
							json.map((val, index) => {
								val.options.name = that.toHump(val.options.name)// 转驼峰
							})
							that.jsonData = json
							uni.setStorage({
								key:'jsonData',
								data:json
							})
							console.log("json",that.jsonData)
							
							that.field = res.data.listData //列表展示字段
							that.searchField = res.data.searchData   //搜索展示字段
							that.tableSchema = res.data.tableSchema
							that.tableName = res.data.tableName
							
							let data = res.data.pageSet;
							let list = data.rows
							that.pageNo++
							list.map((val, index) => {
								val.show = false
								list[index] = that.lineToObjectHump(val)
							})
							console.log("list---",list)
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
								console.log("formList---",that.formList)
							})
						} else {
							that.showAdd = false
							that.emptyText = res.data.message ? res.data.message : '获取数据失败'
							that.emptyType = 1
							that.loadingType = 'more';
							uni.hideLoading()
						}
					})
					.catch(err => {uni.hideLoading()});
			},
			addFrom(){
				uni.navigateTo({
					url:'../from/from?type=add&tableSchema=' + this.tableSchema + '&tableName=' + this.tableName
				})
			},
			goFromEdit(item){
				uni.navigateTo({
					url:'../from/from?type=edit&tableSchema=' + this.tableSchema + '&tableName=' + this.tableName + '&uuid=' + item.uuid
				})
			},
			goFromDetail(item){
				console.log(item)
				uni.navigateTo({
					url:'../from/fromDetail?type=edit&tableSchema=' + this.tableSchema + '&tableName=' + this.tableName + '&uuid=' + item.uuid
				})
			},
			goFromDelete(item,index){
				let that = this
				let params = {
					tableSchema: that.tableSchema,
					tableName: that.tableName,
					uuid: item.uuid
				}
				console.log("params---delete",params)
				that.$http.post(that.url.delete,params , {
						params: {},
					})
					.then(res => {
						that.$u.toast(res.data.message)
						if(res.statusCode == 200){
							that.$refs.fromList.deleteData(index)
						}
					})
					.catch(err => {});
			},
			searchFrom(data){
				console.log("data",data)
				this.searchData = data
				this.pageNo = 1
				this.formList = []
				uni.showLoading({
					title:'加载中...'
				})
				this.getData()
			},
		}
	}
</script>

<style lang="scss" scoped>
.scroll-box{
	width: 100vw;
	height: calc(100vh - 100rpx - var(--status-bar-height));
}
.swiper-action{
	width: 100vw;
}
</style>
