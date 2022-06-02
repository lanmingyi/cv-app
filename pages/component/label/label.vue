<template>
	<view id="page">
		<view class="uni-common-mt">
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 表单组件在label内
				</view>
			</view>
			<checkbox-group class="block" @change="CheckboxChange">
				<label class="cu-form-group">
					<view class="title">{{checkbox[0].name}}</view>
					<checkbox :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A"></checkbox>
				</label>
				<label class="cu-form-group">
					<view class="title">{{checkbox[1].name}}</view>
					<checkbox :class="checkbox[1].checked?'checked':''" :checked="checkbox[1].checked?true:false" value="B"></checkbox>
				</label>
			</checkbox-group>

			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> label用for标识表单组件
				</view>
			</view>
			<radio-group class="block" @change="radioChange">
				<label class="cu-form-group" v-for="(item,index) in radioItems" :key="index">
					<label class="label-2-text" :for="item.name">
						<text>{{item.value}}</text>
					</label>
					<radio :id="item.name" :value="item.name" :checked="item.checked"></radio>
				</label>
			</radio-group>
			
			
			<checkbox-group class="block" @change="CheckboxChange2">
				<label>
					<view class="cu-bar bg-box solid-bottom">
						<view class="action">
							<text class="cuIcon-title text-orange "></text> 有多项时默认选中第一个
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">{{checkbox2[0].name}}</view>
						<checkbox :class="checkbox2[0].checked?'checked':''" :checked="checkbox2[0].checked?true:false" value="A"></checkbox>
					</view>
					<view class="cu-form-group">
						<view class="title">{{checkbox2[1].name}}</view>
						<checkbox :class="checkbox2[1].checked?'checked':''" :checked="checkbox2[1].checked?true:false" value="B"></checkbox>
					</view>
				</label>
				<view class="text-blue text-center">点击该label下的区域默认选中第一个checkbox</view>
			</checkbox-group>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				checkbox: [{
						name: '中国',
						value: 'A',
						checked: true
					},
					{
						name: '美国',
						value: 'B',
						checked: false
					}
				],
				checkbox2: [{
						name: '中国',
						value: 'A',
						checked: true
					},
					{
						name: '美国',
						value: 'B',
						checked: false
					}
				],
				radioItems: [{
						name: 'CHN',
						value: '中国',
						checked: 'true'
					},
					{
						name: 'USA',
						value: '美国'
					}
				],
				hidden: false
			}
		},
		methods: {
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
			CheckboxChange2(e) {
				var items = this.checkbox2,
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
			radioChange: function(e) {
				var checked = e.target.value
				var changed = {}
				for (var i = 0; i < this.radioItems.length; i++) {
					if (checked.indexOf(this.radioItems[i].name) !== -1) {
						changed['radioItems[' + i + '].checked'] = true
					} else {
						changed['radioItems[' + i + '].checked'] = false
					}
				}
			},
		}
	}
</script>

<style>
	.uni-list-cell {
		justify-content: flex-start
	}

	.uni-list .label-3 {
		padding: 0;
	}
</style>
