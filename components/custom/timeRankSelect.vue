<!--
 * @Description: 时间区间选择范围
 * @Author: 张夕雅
-->
<template>
	<view class="flex align-center justify-center">
		<u-form-item label-width="60" label-position="left" label="" :prop="startProp"
			class="border-bottom-none u-padding-0">
			<picker-select
				ref="startTime"
				mode="time" 
				type="text"
				:value="startTime" 
				placeholder="开始时间"
				:disabled="true"
				:params="params"
				inputAlign="center"
				@change="confirmStart"></picker-select>
		</u-form-item>
		<view class="border-center"></view>
		<u-form-item label-width="60" label-position="left" label="" :prop="endProp"
			class="border-bottom-none u-padding-0">
			<picker-select
				ref="endTime"
				mode="time" 
				type="text"
				:value="endTime" 
				placeholder="结束时间"
				:disabled="true"
				inputAlign="center"
				:params="params"
				@change="confirmEnd"></picker-select>
		</u-form-item>
	</view>
</template>

<script>
	export default{
		name: 'timeRankSelect',
		props:{
			start:String,  //开始时间值
			end:String,    //结束时间值
			startProp:String,    //开始时间字段
			endProp:String,			//结束时间字段
			dateTimestamp:Object,    //时间戳数组
			params:{
				type:Object,
				default() {
					return {
						year: true,
						month: true,
						day: true,
						hour: false,
						minute: false,
						second: false,
						province: true,
						city: true,
						area: true,
						timestamp: true,
					};
				}
			},
		},
		data(){
			return{
				startTime: '',
				endTime: '',
			}
		},
		watch:{
			start(val){
				this.startTime = val
			},
			end(val){
				this.endTime = val
			},
		},
		methods:{
			confirmStart(e,timestamp) {
				this.dateTimestamp.start = timestamp
				if (this.dateTimestamp.start && this.dateTimestamp.end) {
					if (this.dateTimestamp.start + Number(30 * 60) >= this.dateTimestamp.end) {
						uni.showToast({
							title: "预定开始时间不能大于结束时间且预约最小时长为30分钟",
							icon: 'none',
						});
					}
					this.startTime = null
					this.$refs.startTime.loadData(null)
				} else {
					if (this.dateTimestamp.start + 100 < parseInt((new Date().valueOf()) / 1000)) {
						uni.showToast({
							title: "不可选择过去时间",
							icon: 'none',
						});
						this.startTime = null
						this.$refs.startTime.loadData(null)
					} else {
						this.startTime = e
						this.$refs.startTime.loadData(e)
						this.$emit('change',e,this.dateTimestamp,this.startProp)
					}
				}
			},
			openEnd() {
				console.log("this.dateTimestamp.start",this.dateTimestamp.start,!this.dateTimestamp.start)
				if (!this.dateTimestamp.start) {
					uni.showToast({
						title: "请选择预定开始时间",
						icon: 'none',
					});
				} else {
					this.showEndTime = true
				}
			},
			confirmEnd(e,timestamp) {
				if(!this.dateTimestamp.start){
					uni.showToast({
						title: "请选择预定开始时间",
						icon: 'none',
					});
					return;
				}
				this.dateTimestamp.end = timestamp
				if (this.dateTimestamp.start && this.dateTimestamp.end) {
					if (this.dateTimestamp.start + Number(30 * 60) >= this.dateTimestamp.end) {
						uni.showToast({
							title: "预定结束时间不能大于开始时间且预约最小时长为30分钟",
							icon: 'none',
						});
						this.endTime = null
						this.$refs.endTime.loadData(null)
					} else {
						if (this.dateTimestamp.end + 100 < parseInt((new Date().valueOf()) / 1000)) {
							uni.showToast({
								title: "不可选择过去时间",
								icon: 'none',
							});
						} else {
							this.endTime = e
							this.$refs.endTime.loadData(e)
							this.$emit('change',e,this.dateTimestamp,this.endProp)
						}
					}
				}
			},
		}
	}
</script>

<style>
</style>
