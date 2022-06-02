<!--
 * @Description: 用户树数据选择
 * @Author: 张夕雅
-->
<template>
	<view :style="{'height': height,'overflow': 'scroll'}"  class="pos-relative bg-box" :class="vtheme">
		<view class="header pos-strike">
			<view class="title bg-box">
				<scroll-view scroll-x style="width: 100%;white-space: nowrap;" :scroll-left="scrollLeft">
					<view v-for="(item,index) in parent" class="inline-item" :key="index">
						<view class="inline-item font-main" v-if="index==0" @click="backTree(item,-1)">
							<text v-if="index==parent.length-1&&!isre" class="none">全部</text>
							<text v-else class="active">全部</text>
						</view>
						<view class="inline-item" @click="backTree(item,index)" v-if="index!=0">
							<text v-if="index!=0" class="iconfont icon-z043 iconclass"></text>
							<text v-if="index==parent.length-1" class="none inline-item font-main">
								{{item[props.label]}}
							</text>
							<text v-else class="active font-main">
								{{item[props.label]}}
							</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="text-box-line"></view>
		<view class="bg-box">
			<view class="container-list" v-if="tree.length > 0">
				<view class="common font-main" v-for="(item, index) in tree" :key="index" @click.stop="clickChange(item,index)">
					<label class="content">
						<!-- 多选选中 -->
						<view class="flex align-center content-box">
							<view v-if="props.showIcon == 'show'">
								<view class="checkbox class1" v-if="isCheck&&props.multiple&&!item.department">
									<text  v-if="item.checked" class="iconfont icon-xuanzhong txt icon-selected"></text>
									<text style="color: #b8b8b8;" v-else class="iconfont icon-weixuanzhong txt"></text>
								</view>
								<view class="checkbox class2" v-if="isCheck&&!props.multiple&&props.nodes&&!item.department" >
									<text  v-if="item.checked" class="txt iconfont icon-selected">
									</text>
									<text style="color: #b8b8b8;" v-else class="txt iconfont icon-weixuanzhong1">
									</text>
								</view>
								<view class="checkbox class13" v-if="isCheck&&!props.multiple&&!props.nodes">
									<text  v-if="item.checked" class="txt iconfont icon-selected">
									</text>
									<text style="color: #b8b8b8;" v-else class="txt iconfont icon-weixuanzhong1">
									</text>
								</view>
							</view>
							
							
							<!-- 只有人员才显示 department:false  user:true-->
							<view class="person" v-if="item.user  && !item.department">
								{{item[props.label].substring(item[props.label].length-2)}}
							</view>
							
							
							<view class="word font-main">{{item[props.label]}}</view>
						</view>
						
						<!-- 箭头显示 1.department为true 显示 2.-->
						<view class="right">
							<text v-if="item.department" class="iconfont icon-z043"></text>
						</view>
					</label>
				</view>
			</view>
			<view v-else class="empty text-center">
				<u-empty text="暂无人员" mode="list" icon-size="200"></u-empty>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		name: "userTree",
		props: {
			trees: {
				type: Array,
				default: () => {
					return []
				}
			},
			url:Object,//接口地址
			height: {
				type:String,
				default: ()=>{
					return '100vh'
				}
			},
			isCheck: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			checkList: {
				type: Array,
				default: () => []
			},
			searchIf: {
				type: Boolean,
				default: () => true
			},
			props: {
				type: Object,
				default: () => {
					return {
						label: 'name',
						children: 'children',
						multiple: false,
						checkStrictly: false,
						showIcon:'show', 
					}
				}
			}
		},
		data() {
			return {
				isre: false,
				tree: this.trees,
				allData: this.trees,
				parent: [1],
				searchResult: [],
				party_current: 100000,
				tochild: false,
				newCheckList: this.checkList,
				scrollLeft: 999
			}
		},
		methods: {
			clickChange: function(item,index){
				if(item.department){
					this.toChildren(item)
				} else if(this.isCheck && this.props.multiple&&! item.department){
					this.checkboxChange(item,index)
				} else if(this.isCheck&&!this.props.multiple&&this.props.nodes&&!item.department){
					this.checkbox(item,index)
				} else if (this.isCheck&&!this.props.multiple&&!this.props.nodes){
					this.checkbox(item,index)
				}
			},
			//多选
			checkboxChange: function(item, index) {
				var that = this;
				let status = !that.tree[index].checked,
					temp = Object.assign({}, item)
				if (item.checked) { //反选
					if (this.props.checkStrictly) {
						if (item.user) {
							that.$set(that.tree[index], 'checked', false)
							this.delUser(item.id)
						} else {
							that.$set(that.tree[index], 'checked', false)
							for (var index = 0, n = this.newCheckList.length; index < n; index++) {
								let temp = this.newCheckList[index];
								if (temp.id == item.id) {
									this.newCheckList.splice(index, 1)
									break
								}
							}
							this.delChild(item)
						}
					} else {
						that.$set(that.tree[index], 'checked', false)
						for (var index = 0, n = this.newCheckList.length; index < n; index++) {
							let temp = this.newCheckList[index];
							if (temp.id == item.id) {
								this.newCheckList.splice(index, 1)
								break
							}
						}
					}
				} else { //选中
					that.newCheckList.push(item)
					that.$set(that.tree[index], 'checked', true)
					if (this.props.checkStrictly) {
						this.chooseChild(item)
					}
				}
				that.$emit('sendValue', that.newCheckList)
			},
			delUser(id) {
				let that = this;
				for (var i = 0, len = that.newCheckList.length; i < len; i++) {
					if (that.newCheckList[i].id === id) {
						that.newCheckList.splice(i, 1)
						return
					}
				}
			},
			chooseChild(arr) {
				let that = this;
				if (!arr.user) {
					for (var i = 0, len = arr.children.length; i < len; i++) {
						let item = arr.children[i];
						item.checked = true
						that.newCheckList.push(item)
						if (!item.user) {
							this.chooseChild(item)
						}
					}
				}
				that.newCheckList = Array.from(new Set(that.newCheckList))
			},
			delChild(arr) {
				if (!arr.user) {
					for (var i = 0, len = arr.children.length; i < len; i++) {
						let item = arr.children[i];
						item.checked = false
						for (var index = 0, n = this.newCheckList.length; index < n; index++) {
							let temp = this.newCheckList[index];
							if (temp.id == item.id) {
								this.newCheckList.splice(index, 1)
								break
							}
						}
						if (!item.user) {
							this.delChild(item)
						}
					}
				}
			},
			//单选
			checkbox: function(item, index) {
				var that = this;
				let status = !that.tree[index].checked
				that.$set(that.tree[index], 'checked', status)
				if (that.newCheckList.length <= 0) {
					that.newCheckList = [that.tree[index]]
				} else if (that.newCheckList.length == 1) {
					this.tree.forEach(item => {
						if (item.id != this.tree[index].id) {
							item.checked = false
						}
					})
					that.newCheckList = []
					if (that.tree[index].checked) {
						that.newCheckList.push(that.tree[index])
					}
				}
				that.$emit('sendValue', that.newCheckList)
			},
			//到下一级
			toChildren(item) {
				let that = this;
				that.tochild = true
				let children = that.props.children
				if(item.department){
					that.getOrganizeList(item)
					that.$nextTick(() => {
						if (that.parent[0].id == item.id) {
						} else {
							that.parent.push(item)
						}
						that.scrollLeft += 200
					})
				} else {
					this.$emit('change', item)
				}
			},
			// 校验哪些选中了。单选
			checkIf() {
				let that = this;
				for (var i = 0, len = that.tree.length; i < len; i++) {
					for (var j = 0, lens = that.newCheckList.length; j < lens; j++) {
						if (that.newCheckList[j].id === that.tree[i].id) {
							that.$set(that.tree[i], 'checked', true)
							break
						} else {
							that.$set(that.tree[i], 'checked', false)
						}
					}
				}
			},
			//搜索
			confirmSearch(val) {
				this.searchResult = []
				this.search(this.allData, val)
				this.isre = true
				this.parent.splice(1, 6666)
				uni.showLoading({
					title: '正在查找'
				})
				setTimeout(() => {
					this.tree = this.searchResult
					uni.hideLoading()
				}, 300)
			},
			search(data, keyword) {
				var that = this
				let children = that.props.children
				for (var i = 0, len = data.length; i < len; i++) {
					if (data[i].name.indexOf(keyword) >= 0) {
						that.searchResult.push(data[i])
					}
					if (!data[i].user && data[i][children].length > 0) {
						that.search(data[i][children], keyword)
					}
				}
			},
			//返回其它层
			backTree(item, index) {
				let that = this;
				if (index == -1) {
					that.tree = that.allData
					that.parent.splice(1, 6666)
					that.isre = false
					// that.$refs.sea.clears()
				} else if (index == -2) {
					that.tree = that.searchResult
					that.parent.splice(1, 6666)
				} else {
					that.parent = that.parent.slice(0,index+1)
					that.tree = item[that.props.children]
					that.getOrganizeList(item)
				}
				if (that.props.multiple) return
				that.checkIf()
			},
			getOrganizeList(item){
				let that = this
				let ChildrenList = []
				let url = ""
				let params = {}
				if (item.levelId == 1) {
					url = '/mdata/organization/getListByPid'
					params = {
						levelId: 1,
						pid: item.id
					}
					that.$http
						.post(url, params, {
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
									user : val.state == 'closed' ? false : true, //为true没有下一级,
								}
								ChildrenList.push(data)
							})
							that.tree= ChildrenList
							that.checkIf()
							uni.hideLoading()
						})
				} else {
					url = '/mdata/user/getPageSet'
					params = {
						pageNo: 1,
						pageSize: 50,
						orgId: item.id
					}
					that.$http
						.post(url, params, {
							params: {}
						})
						.then(res => {
							let list = res.data.rows
							list.forEach(val=>{
								let data = {
									children : [],
									id: val.userNameId,
									uuid: val.uuid,
									pid: val.orgId,
									name: val.userName,
									departmentName: val.orgName,
									department : false,
									user : true
								}
								ChildrenList.push(data)
							})
							that.tree= ChildrenList
							that.checkIf()
							uni.hideLoading()
						})
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.flex_between_center {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.checkbox {
		position: relative;
		height: 18px;
		margin-left: 5px;
		margin-right: 0px;
		width: 18px;
		.color {
			color: #00aaff;
			background-color: #00aaff;
		}
		.txt {
			font-size: 22px;
			line-height: 18px;
			width: 100%;
			height: 100%;
			display: flex;
		}
	}
	.checkBorder {
		border: 1px solid #ecdee4;
	}
	.header {
		width: 100%;
		.title {
			height: 45px;
			padding: 0 16px;
			line-height: 45px;
			font-size: 15px;
			color: #606064;
			.iconclass {
				display: inline-block;
				margin: 0 6px;
				color: #D0D4DB;
				font-size: 14px;
			}
		}
	}
	.container-list {
		overflow-y: scroll;
		overflow-x: hidden;
		// padding-bottom: 160rpx;
		.common {
			// background-color: #fff;
			border-bottom: 1px solid #f4f4f4;
			padding-left: 5px;
			.content {
				display: flex;
				align-items: center;
				height: 50px;
				width: 100%;
				line-height: 50px;
				position: relative;
				font-size: 16px;
				.content-box{
					width: 80%;
				}
				.right {
					position: absolute;
					width: 20%;
					right: 15px;
					color: #babdc3;
					font-size: 16px;
					text-align: right;
				}
				.word {
					margin-left: 8px;
				}
			}
		}
	}
	.person {
		height: 32px;
		width: 32px;
		border-radius: 50%;
		border: 1px solid #ff9f44;
		background-color: #fff9f4;
		margin-left: 0px;
		color: #f57a00;
		line-height: 32px;
		font-size: 11px;
		text-align: center;
		margin-left: 10px;
	}
	.active {
		color: #4297ED !important;
	}
	.none {
		color: #666666;
	}
	.icon-selected{
		color: #0095F2!important;
		font-size: 20px!important;
	}
	.inline-item {
		display: inline-block
	}
	@import url("@/common/css/iconTree.css");
	.user_pop{
		.container-list{
			height: 50vh;
		}
	}
</style>
