<!--
 * @Author: 张夕雅
 * @Date: 2021-07-13
 * @Description: 根据列表数据返回
 -->

<template>
	<view >
		<u-swipe-action class="swiper-action" :show="item.show" :index="index" v-for="(item, index) in list" :key="item.uuid" @click="(index,index1)=>{click(index,index1,item)}"
			@open="open" :options="options" @content-click="clickColumn(item, index)">
			<view class="padding-lr padding-tb-sm border-bottom">
				<view class="font-second" v-for="(columnItem,columnIndex) in column" :key="columnIndex">
					<text v-text="columnItem.filedName"></text>：
					<text v-text="item[columnItem.filedToHump]"></text>
				</view>
			</view>
		</u-swipe-action>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			column: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				show: false,
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
		methods: {
			deleteData(index){
				this.list.splice(index, 1)
			},
			click(index, index1,item) {
				if(index1 == 1) {
					// this.list.splice(index, 1);
					// this.$u.toast(`删除了第${index}个cell`);
					//删除
					this.list[index].show = false;
					this.$emit('goFromDelete', item,index)
				} else {
					//编辑
					this.list[index].show = false;
					this.$emit('goFromEdit', item)
				}
			},
			open(index) {
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			clickColumn(item, index) {
				console.log("item.index", item, index)
				this.$emit('goFromDetail', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-action{
		width: 100vw;
	}
	// /deep/.u-swipe-view{
	// 	width: 100vw !important;
	// }
</style>
