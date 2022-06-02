<!--
 * @Description: crm列表数据
 * @Author: 张夕雅
 * <crm-box class="bg-box" ref="crmbox" :list="list"></crm-box>
-->

<template>
	<view :class="[vtheme]">
		<view v-for="(item,index) in list" :key="index" class="margin-lr border-bottom padding-tb"
			@click="goDetail(item)">
			<view class="flex align-center justify-between">
				<view class="flex align-center">
					<u-icon custom-prefix="custom-icon" class="margin-right-sm"
						:style="{color:item.sex == '女' ? '#f40' : '#33a7ff'}" :size="28" name="yonghu"></u-icon>
					<text class="font-main">{{item.name ? item.name : '未命名'}}</text>
					<text class="font-second margin-left-sm">{{item.duty}}</text>
				</view>
				<view class="flex align-center">
					<text class="font-second" :style="{color: stateColor(item.state)}">{{item.state}}</text>
				</view>
			</view>
			<view class="flex align-center" v-if="item.company">
				<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" color="#999999"
					name="ditu1"></u-icon>
				<text class="font-three">{{item.company}}</text>
			</view>
			<view class="flex align-center justify-between">
				<view class="flex align-center" v-if="item.phone">
					<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" color="#999999"
						name="xinxibar_shouji"></u-icon>
					<text class="font-three">{{item.phone}}</text>
				</view>
				<view class="flex align-center" v-if="item.region">
					<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" color="#999999"
						name="ditu2"></u-icon>
					<text class="font-three">{{item.region}}</text>
				</view>
			</view>
			<view class="flex align-center justify-between" v-if="showIpadd">
				<view class="flex align-center" v-if="item.ipAddr">
					<u-icon custom-prefix="custom-icon" class="font-three icon-color-main margin-right-sm" color="#999999"
						name="IPguangchang"></u-icon>
					<text class="font-three">{{item.ipAddr}}</text>
				</view>
				<view class="flex align-center" v-if="item.ipRegion">
					<u-icon custom-prefix="custom-icon" class="font-three icon-color-main margin-right-sm" color="#999999"
						name="ditu"></u-icon>
					<view class="font-three text-cut" style="max-width: 180px;">{{item.ipRegion}}</view>
				</view>
			</view>
			<view class="flex align-center" v-if="showTimes">
				<u-icon custom-prefix="custom-icon" class="icon-color-main margin-right-sm" color="#FF0033"
					name="agriculture"></u-icon>
				<text class="font-three">{{item.loginTimes}} 次访问</text>
			</view>
			<view class="flex align-center flex-wrap u-padding-top-6" v-if="item.tag">
				<u-tag v-for="(child,el) in item.tag" :key="el" class="margin-right-sm" :text="child"
					:closeable="false" size="mini" show />
			</view>
			<view class="flex u-padding-top-6 align-center justify-between">
				<view class="flex align-center">
					<block v-if="item.belong">
						<u-icon custom-prefix="custom-icon" class="font-three icon-color-main margin-right-sm" color="#999999"
							name="user1"></u-icon>
						<text class="font-three" style="color:#33a7ff">{{item.belong}}</text>
					</block>
				</view>
				<view class="flex align-center" >
					<u-icon custom-prefix="custom-icon" class="font-three icon-color-main margin-right-sm" color="#999999"
						name="shijian1"></u-icon>
					<text class="font-three">{{item.createTime}}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	var _self, x, y;
	export default {
		props:{
			list: {
				type: Array,
				default: ()=>[]
			},
			showTimes: {
				type:[Boolean,String],
				default:false
			},
			showIpadd:{
				type:Boolean,
				default:true
			},
		},
		data() {
			return {
				loadingType: 'loading',//加载更多状态
				emptyType: '0'
			};
		},
		watch:{
		},
		onLoad() {
			_self = this
		},
		methods: {
			// 跳转到详情
			goDetail(item) {
				this.$emit('goDetail',item)
			},

		},
		components: {
		}
	}
</script>

<style lang="scss" scoped>
</style>
