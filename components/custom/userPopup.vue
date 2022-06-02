<!--
 * @Description: 选择组织用户（多选、单选）
 * type: 1   多选 （不包含选择父级连带自己）
 * type: 3   单选 （不包含选择父级连带自己）
 * item: 已经选择数据数组  (过滤显示)
 * @Author: 张夕雅
 * $refs.userPop.onRefresh({type:'3',item: items})
-->
<template>
	<!-- @mousewheel.prevent  禁止鼠标滚轮事件 -->
	<view class="bg-box" style="width:100%" :class="[vtheme]" @mousewheel.prevent>
		
		<block v-if="type && type == '1'">
			<view class="flex align-center justify-between">
				<u-checkbox-group style="width: 90%;min-height: 35px;">
					<u-checkbox :labelSize="24" :iconSize="24" :size="24" v-model="item.checked" v-for="(item, index) in checkList" :key="item.uuid"
						:name="item.name" @change="(e)=>{changeCheckBox(e,index)}">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
				<u-icon :class="iconNameColor" :name="iconName" size="28" @click="()=>{clickShow()}"></u-icon>
			</view>
		</block>
		<block v-if="type && type == '3'">
			<u-input type="select"
				style="width:100%"
				v-model="defaultValue"
				:placeholder="placeholder"
				:border="border"
				@click="()=>{clickShow()}"
				:iconName="iconName"
				:iconNameColor="iconNameColor"/>
		</block>
		<u-popup v-model="showPop" mode="bottom" length="60%" :mask="true" :closeable="true" close-icon-pos="top-right"
			:mask-close-able="false" @close="()=>{$emit('cancle')}">
			<view class="u-padding-top-80 bg-box">
				<user-tree :height=" height + 'px'" :checkList="checkList" v-if="tree.length>0" :props="prop" @sendValue="confirm" :isCheck="true" :trees="tree" @getData="getOrganizationList(1)"/>
				<view class="pos-absolute-bottom bottom-btn-appro flex align-center justify-center">
					<view class="cu-botton-submit text-center" @click="backConfirm">确认 <span v-if="type== 1">( {{checkList.length}} )</span> </view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import userTree from '@/components/custom/userTree.vue';
	export default {
		name: 'userPopup',
		components: {
			userTree
		},
		props:{
			value:String,
			placeholder:{
				type:String,
				default:'请输入'
			},
			border: {
				type: Boolean,
				default:false,
			},
			type:{
				type:String,
				default:3 //单选
			},
			iconName:{
				type:String,
				default:'arrow-down'
			},
			iconNameColor:{
				type:String,
				default:'default-icon'
			}
		},
		data() {
			return {
				tree: [],
				checkList: [],
				defaultValue: '',
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
				height: 260,
				showPop:false
			}
		},
		onReady() {
			uni.showLoading({
				title:"加载中"
			})
			setTimeout(()=>{
				this.getOrganizationList(1)
			},400)
		},
		watch:{
			value:{
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					console.log("val",newVal,oldVal)
					this.defaultValue = newVal
				},
			}
		},
		methods: {
			clearList(){
				this.checkList = []
			},
			clickShow(){
				this.showPop = true
				let data = {
					item : this.checkList
				}
				this.onRefresh(data)
			},
			onRefresh(o){
				/**  type值
					type：1   多选 （不包含选择父级连带自己）
					type：3   单选 （不包含选择父级连带自己）
				**/
				// this.type = o.type
				if(this.type==0){
					this.prop=this.aprop;
					this.checkList = o.item
					this.checks()
				}else if(this.type==1){
					this.prop=this.bprop;
					this.checkList = o.item
					this.checks()
				}else if(this.type==2){
					this.prop=this.cprop;
				}else{
					this.prop=this.dprop;
				}
				if(this.tree.length == 0){
					this.checkList = []
					this.getOrganizationList(1)
				}
				this.$nextTick(function(){
					this.$u.getRect('.u-drawer-content').then(res => {
						this.height = Number(res.height - 140)
					})
				})
			},
			getOrganizationList(id){
				var that = this;
				that.tree = []
				that.$http
					.post('/mdata/organization/getListByLevelId', {
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
			//去掉选中
			changeCheckBox(e,index){
				if(e && !e.value){
					this.checkList.splice(index,1)
					this.$emit('change',this.checkList)
				}
			},
			//获取选中的
			confirm(val) {
				this.checkList = val
			},
			backConfirm() {
				this.showPop = false
				this.$emit('change',this.checkList,this.type)
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
