<template>
	<view id="checkbox">
		<view class="cu-bar bg-box solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 默认样式
			</view>
		</view>
		<checkbox-group class="bg-gray" @change="CheckboxChange1">
			<view class="cu-form-group bg-box" v-for="(item,index) in items" :key="item.value" :class="index==1?'margin-bottom':''" >
				<view class="title">{{item.name}}</view>
				<checkbox :class="item.checked?'checked':''" :checked="item.checked?true:false" :value="item.value"></checkbox>
			</view>
		</checkbox-group>
		
		<view class="cu-bar bg-box solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 推荐样式
			</view>
		</view>

		<checkbox-group class="block" @change="CheckboxChange">
			<view class="cu-form-group">
				<view class="title">复选选操作(checkbox)</view>
				<checkbox :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A"></checkbox>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">定义形状</view>
				<checkbox class='round' :class="checkbox[1].checked?'checked':''" :checked="checkbox[1].checked?true:false" value="B"></checkbox>
			</view>
			<view class="cu-form-group">
				<view class="title">定义颜色</view>
				<checkbox class='round blue' :class="checkbox[2].checked?'checked':''" :checked="checkbox[2].checked?true:false"
				 value="C"></checkbox>
			</view>
			<!-- #endif -->
		</checkbox-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						value: 'true',
						name: '选中',
						checked: true
					},
					{
						value: 'false',
						name: '未选中',
						checked: false
					},
					{
						value: 'USA',
						name: '美国',
						checked: false
					},
					{
						value: 'CHN',
						name: '中国',
						checked: true
					},
					{
						value: 'BRA',
						name: '巴西',
						checked: false
					},
					{
						value: 'JPN',
						name: '日本',
						checked: false
					},
					{
						value: 'ENG',
						name: '英国',
						checked: false
					},
					{
						value: 'FRA',
						name: '法国',
						checked: false
					},
				],
				checkbox: [
					{
						value: 'A',
						checked: true
					}, {
						value: 'B',
						checked: true
					}, {
						value: 'C',
						checked: false
					},
				]
			}
		},
		methods: {
			CheckboxChange1(e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
		}
	}
</script>

<style>
	#checkbox {
		width: 100%;
		padding: 20upx;
	}

	.uni-list-cell {
		justify-content: flex-start
	}
</style>
