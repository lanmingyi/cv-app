<!--
 * @Description: 选择组织用户（多选、单选）
 * 
 * @Author: 张夕雅
-->
<template>
	<!-- @mousewheel.prevent  禁止鼠标滚轮事件 -->
	<view class="pos-relative bg-white " @mousewheel.prevent>
		<u-popup class="user_box" mode="bottom" v-model="visibleState" length="60%" :closeable="true" close-icon-pos="top-right"
			:mask-close-able="false" @close="()=>{visibleState=false,$emit('update:visible',false)}" >
			<view class="u-padding-top-80">
				<user-tree :height=" height + 'px'" :checkList="checkList" v-if="tree.length>0" :props="prop"
					@sendValue="confirm" :isCheck="true" :trees="tree" @getData="getOrganizationList" />
			</view>
			<view class="bottom-btn-appro flex align-center justify-center pos-absolute-bottom">
				<view class="bg-blue text-center round" @click="backConfirm">确定({{checkList.length}})</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// import XiaoluTree from '@/components/xiaolu-tree/tree.vue';
	export default {
		components: {
			// XiaoluTree
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				tree: [],
				checkList: [],
				prop: {
					label: 'name',
					children: 'children',
					multiple: true,
					checkStrictly: true,
					showIcon: 'show',
				},
				height: 260,
				type: '',
				visibleState: false
			}
		},
		watch: {
			visible(newVal) {
				this.visibleState = newVal
			}
		},
		onLoad(o) {
			
		},
		onReady() {
			uni.showLoading({
				title: "加载中"
			})
			setTimeout(() => {
				// this.tree=dataList;
				this.getOrganizationList(1)
			}, 400)
		},
		methods: {
			onRefresh(list) {
				console.log("list----", list)
				if(this.tree.length == 0) {
					this.checkList = []
					this.getOrganizationList(1)
				}
				this.visibleState = true
				this.$nextTick(function(){
					this.$u.getRect('.uni-scroll-view-content').then(res => {
						this.height = Number(res.height - 140)
						console.log("this.height",this.height);
					})
				})
			},
			clearList(){
				this.checkList = []
			},
			getOrganizationList(id) {
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
						list.forEach(val => {
							let data = {
								children: [],
								id: val.id,
								uuid: val.uuid,
								pid: val.pid,
								levelId: val.levelId,
								name: val.text,
								department: true,
								user: true, //为true没有下一级,
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
				this.checkList = [...new Set(val)]
			},
			backConfirm() {
				console.log("this.checkList", this.checkList)
				this.$emit('update:visible', false);
				this.visibleState = false
				this.$emit('change', this.checkList)
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
