<!--
 * @Description: 表格组件
 * @Author: 张夕雅
-->
<template>
	<view class="bg-box" style="width: 100%;">
		<u-table
			:border-color="borderColor"
			:align="align"
			:bg-color="bgColor"
			:padding="padding"
			:fontSize="fontSize"
			:color="color"
			>
			<!-- 表头显示 -->
			<block v-if="columnsList.length > 0">
				<scroll-view :style="[scrollStyle]" scroll-y scroll-x>
					<u-tr class="u-tr scroll-x-top" :style="{ 'background-color' : columnBgColor}">
						<u-th class="u-th" 
							v-for="(column,columnIndex) in columnsList" 
							:width="column.width"
							:style="{'width':column.width}"  
							:key="columnIndex">
								<text :style="[fontStyle]">{{column.title}}</text>
						</u-th>
					</u-tr>
					<!-- 数据空判断 -->
					<block v-if="loadDataList.length == 0">
					   <u-empty class="padding-tb-xl" text="数据为空" mode="data"></u-empty>
					</block>
					<!-- 数据循环 -->
					<block v-else>
						<u-tr class="u-tr" v-for="(data,dataIndex) in loadDataList" :key="dataIndex">
							<u-td class="u-td" 
								v-for="(item,index) in columnsList" 
								:width="item.width" 
								:style="{'width':item.width}"  
								:key="index">
								<block v-if="item.scope">
									<slot :name="item.dataIndex" :text="data[item.dataIndex]" :record="data" :index="dataIndex"/>
								</block>
								<text v-else :style="[fontStyle]">{{data[item.dataIndex]}}</text>
							</u-td>
						</u-tr>
					</block>
				</scroll-view>
			</block>
			<!-- 分页 -->
		</u-table>
	</view>
</template>

<script>
	export default {
		name: 'Ttable',
		props:{
			columns:Array,   //表格头部
			loadData:Array,  //表格数据
			scroll: {  //表格高度
				type: Object,
				default:{
					x: 'auto',
					y: '400px'
				}
			},
			align:{  //单元格对齐方式
				type: String,
				default:'center',//left center right
			},
			padding: {  //表格字体间距
				type:String,
				default:'10rpx'
			},
			fontSize: {  //字体大小
				type: Number,
				default:28//单位rpx
			},
			columnBgColor: {  //表头背景颜色
				type: String,
				default:'#f5f6f8'
			},
			bgColor: {  //表格背景颜色
				type: String,
				default:'#ffffff'
			},
			borderColor: {  //表格边框颜色
				type: String,
				default:'#e4e7ed'
			},
			color: {  //字体颜色
				type: String,
				default:'#606266'
			}
		},
		data(){
			return {
				columnsList: [],
				loadDataList: []
			}
		},
		watch:{
			columns: {
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					newVal.forEach(e=>{
						e.width = e.width ? e.width : '20%'
					})
					this.columnsList = newVal?newVal:[]
				},
			},
			loadData: {
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					this.loadDataList = newVal?newVal:[]
					console.log("loadDataList",this.loadDataList,this.columns)
				},
			},
		},
		computed: {
			scrollStyle(){
				let style = {};
				style.height = this.scroll.y
				style.width = this.scroll.x
				return style;
			},
			fontStyle() {
				let style = {};
				style.fontSize = this.fontSize + 'rpx';
				style.overflow = 'hidden'
				style.textOverflow = 'ellipsis'
				style.whiteSpace = 'nowrap'
				return style;
			}
		},
		mounted(){
		},
	}
</script>

<style scoped lang="scss">
.u-table{
	overflow-x: scroll;
	position: relative;
	.scroll-x-top{
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.u-th,
	.u-td{
		min-height: 36px;
	}
	.u-th{
		background-color: inherit;
		border-color: inherit;
	}
}
</style>
