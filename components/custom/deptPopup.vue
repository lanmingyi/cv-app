<!--
 * @Description: 弹窗显示选择组织（多选、单选）
 * type: 1   多选 （不包含选择父级连带自己）
 * type: 2   单选 （不包含选择父级连带自己）
 * item: 已经选择数据数组  (过滤显示)
 * @Author: 张夕雅
 * $refs.userPop.onRefresh({type:'2',item: items})
-->
<template>
	<!-- @mousewheel.prevent  禁止鼠标滚轮事件 -->
	<view class="bg-box" style="width:100%" :class="[vtheme]" @mousewheel.prevent>
		<u-input type="select"
			style="width:100%"
			v-model="defaultValue"
			:placeholder="placeholder"
			:border="border"
			@click="clickShow"/>
		<u-popup v-model="showPop" mode="bottom" length="60%" :mask="true" :closeable="true" close-icon-pos="top-right"
			:mask-close-able="false" @close="()=>{$emit('cancle')}">
			<view class="u-padding-top-80 bg-box">
				<dept-tree :height=" height + 'px'" :checkList="checkList" v-if="tree.length>0" :url="url" :props="prop" @sendValue="confirm" :isCheck="true" :trees="tree" @getData="getOrganizationList(1)"/>
				<view class="pos-absolute-bottom bottom-btn-appro flex align-center justify-center">
					<view class="cu-botton-submit text-center" @click="backConfirm">确认 <span v-if="type== 1">( {{checkList.length}} )</span> </view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import deptTree from '@/components/custom/deptTree.vue';
	export default {
		name: 'deptPopup',
		components: {
			deptTree
		},
		props:{
			value:{  //默认值
				type:[String,Number,Array],
				default:''
			},
			placeholder:{  //占位符
				type: String,
				default:'请选择'
			},
			border :{ //显示边框
				type:Boolean,
				default:true
			}
		},
		watch:{
			value:{
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					this.defaultValue = newVal
				},
			}
		},
		data() {
			return {
				defaultValue: '',
				tree: [],
				checkList: [],
				prop:{},
				// 多选
				bprop: {
					label: 'name',
					children: 'children',
					multiple:true,
					checkStrictly:true,
					showIcon:'show', 
				},
				// 单选
				dprop: {
					label: 'name',
					children: 'children',
					multiple:false,
					nodes:true,
					showIcon:'show', 
				},
				type:'',
				showPop:false,
				height: 260,
				url: {
					fartherUrl: '/mdata/organization/getListByLevelId',
					expandUrl: '/mdata/organization/getListByPid'
				}
			}
		},
		onLoad(o) {
		},
		onReady() {
			uni.showLoading({
				title:"加载中"
			})
			setTimeout(()=>{
				this.getOrganizationList(1)
			},400)
		},
		methods: {
			clearList(){
				this.checkList = []
			},
			clickShow(){
				this.showPop = true
				this.onRefresh({type:2,item:null})
			},
			onRefresh(o){
				/**  type值
					type：1   多选 （不包含选择父级连带自己）
					type：2   单选 （不包含选择父级连带自己）
				**/
				this.type = o.type
				if(o.type == 1){
					this.prop = this.bprop;
					this.checkList = !o.item ? [] : JSON.parse(o.item)
					this.checks()
				}else if(o.type == 2){
					this.prop = this.dprop;
				}
				if(this.tree.length == 0){
					this.checkList = []
					this.getOrganizationList(1)
				}
				this.$nextTick(function(){
					// $u.getRect -> uviewjs :获取节点信息
					this.$u.getRect('.u-drawer-content').then(res => {
						this.height = Number(res.height - 140)
					})
				})
			},
			// 获取组织机构树
			getOrganizationList(id){
				var that = this;
				that.tree = []
				that.$http
					.post(that.url.fartherUrl, {
						levelId: id,
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
			// 选中返回
			backConfirm() {
				this.defaultValue = ''
				this.checkList.forEach((e,index)=>{
					this.defaultValue = this.defaultValue == '' ? e.name : '-' + e.name
				})
				this.showPop = false
				this.$emit('change',this.checkList,this.defaultValue)
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
		padding: 20px;
		background-color: #fff;
		width: 100%;

		.sureBtn {
			background-color: #f57a00;
			color: #fff;
		}
	}
</style>
