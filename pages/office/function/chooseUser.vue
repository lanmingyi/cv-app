<template>
	<view class="container bg-box">
		<xiaolu-tree :checkList="checkList" v-if="tree.length>0" :props="prop" @sendValue="confirm" :isCheck="true" :trees="tree" @getData="getOrganizationList"/>
		<view class="btn box_sizing">
			<!-- <button class="sureBtn" type="primary" @click="backConfirm">确认</button> -->
			<view class="bg-blue round padding-tb-sm text-center" @click="backConfirm">确认</view>
		</view>
	</view>
</template>

<script>
	import XiaoluTree from '@/components/xiaolu-tree/tree.vue';
	export default {
		components: {
			XiaoluTree
		},
		data() {
			return {
				tree: [],
				checkList: [],
				prop:{},
				aprop: {
					label: 'name',
					children: 'children',
					multiple:true,
					showIcon:'show', 
				},
				bprop: {
					label: 'name',
					children: 'children',
					multiple:true,
					checkStrictly:true,
					showIcon:'show', 
				},
				cprop: {
					label: 'name',
					children: 'children',
					multiple:false,
					nodes:false,
					showIcon:'show', 
				},
				dprop: {
					label: 'name',
					children: 'children',
					multiple:false,
					nodes:true,
					showIcon:'show', 
				},
				dxprop: {
					label: 'name',
					children: 'children',
					multiple:true,
					checkStrictly:false,
					nodes:false,
					showIcon:'show', 
				},
				type:''
			}
		},
		onLoad(o) {
			this.type = o.type
			if(o.type==0){
				this.prop=this.aprop;
				this.checkList = JSON.parse(o.item)
				this.checks()
			}else if(o.type==1){
				this.prop=this.bprop;
				this.checkList = JSON.parse(o.item)
				this.checks()
			}else if(o.type==2){
				this.prop=this.cprop;
			}else{
				this.prop=this.dprop;
			}
		},
		onReady() {
			uni.showLoading({
				title:"加载中"
			})
			setTimeout(()=>{
				// this.tree=dataList;
				this.getOrganizationList(1)
			},400)
		},
		methods: {
			getOrganizationList(id){
				console.log("id-----",id)
				var that = this;
				that.$http
					.post('/mdata/organization/getListByLevelId', {
						levelId: id
					}, {
						params: {}
					})
					.then(res => {
						let list = res.data
						list.forEach(val=>{
							let data = {
								children : [],
								id: val.id,
								uuid: val.uuid,
								pid: val.pid,
								levelId : val.levelId,
								name: val.text,
								department : true,
								user : true, //为true没有下一级,
								// user : val.state == 'closed' ? false : true, //为true没有下一级,
							}
							that.tree.push(data)
						})
						console.log("this.tree",that.tree)
						uni.hideLoading()
					})
					
			},
			//检查默认选中,要是字段钟本身包含了checked字段就不需要这个
			checks() {
				var that = this;
				for (var i = 0, len = that.tree.length; i < len; i++) {
					for (var j = 0, lens = that.checkList.length; j < lens; j++) {
						if (that.checkList[j].id === that.tree[i].id) {
							that.$set(that.tree[i], 'checked', true)
							break
						} else {
							that.$set(that.tree[i], 'checked', false)
						}
					}
				}
			},
			//获取选中的
			confirm(val) {
				this.checkList = val
			},
			backConfirm() {
				console.log("this.checkList",this.checkList)
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				console.log("prevPage----",prevPage)
				// prevPage.query = this.checkList//小程序写法
				// prevPage.$vm.query = this.checkList//h5写法
				prevPage.$vm.changeUser(this.checkList,this.type)//h5写法
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.box_sizing {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.btn {
		position: fixed;
		bottom: 0;
		padding: 10px;
		background-color: #fff;
		width: 100%;

		.sureBtn {
			background-color: #f57a00;
			color: #fff;
		}
	}
</style>
