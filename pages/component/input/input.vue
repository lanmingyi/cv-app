<template>
	<view id="page">
		<view class="uni-common-mt">
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 可自动聚焦的input
				</view>
			</view>
			<view class="cu-form-group">
				<input focus placeholder="自动获得焦点"></input>
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 键盘右下角按钮显示为搜索
				</view>
			</view>
			<view class="cu-form-group">
				<input placeholder="键盘右下角按钮显示为搜索" name="input"></input>
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 控制最大输入长度的input
				</view>
			</view>
			<view class="cu-form-group">
				<input maxlength="10" placeholder="最大输入长度为10" />
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 实时获取输入值：{{inputValue}}
				</view>
			</view>
			<view class="cu-form-group">
				<input @input="onKeyInput" placeholder="输入同步到view中" />
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 控制输入的input
				</view>
			</view>
			<view class="cu-form-group">
				<input @input="replaceInput" v-model="changeValue" placeholder="连续的两个1会变成2" />
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 控制键盘的input
				</view>
			</view>
			<view class="cu-form-group">
				<input ref="input1" @input="hideKeyboard" placeholder="输入123自动收起键盘" />
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 数字输入的input
				</view>
			</view>
			<view class="cu-form-group">
				<input type="number" placeholder="这是一个数字输入框" />
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 密码输入的input
				</view>
			</view>
			<view class="cu-form-group">
				<input password type="text" placeholder="这是一个密码输入框" />
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 带小数点的input
				</view>
			</view>
			<view class="cu-form-group">
				<input type="digit" placeholder="带小数点的数字键盘" />
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 身份证输入的input
				</view>
			</view>
			<view class="cu-form-group">
				<input type="idcard" placeholder="身份证输入键盘" />
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 控制占位符颜色的input
				</view>
			</view>
			<view class="cu-form-group">
				<input placeholder-style="color:#F76260" placeholder="占位符字体是红色的" />
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 带清除按钮的输入框
				</view>
			</view>
			<view class="cu-form-group">
				<view class="with-fun">
					<input placeholder="带清除按钮的输入框" :value="inputClearValue" @input="clearInput" />
					<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
				</view>
			</view>
			<view class="cu-bar bg-box solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 可查看密码的输入框
				</view>
			</view>
			<view class="cu-form-group margin-bottom">
				<view class="with-fun">
					<input placeholder="请输入密码" :password="showPassword" />
					<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
				</view>
			</view>

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'input',
				focus: false,
				inputValue: '',
				showClearIcon: false,
				inputClearValue: '',
				changeValue: '',
				showPassword: true,
				src: '../../../static/eye-1.png'
			}
		},
		methods: {
			onKeyInput: function(event) {
				this.inputValue = event.target.value
			},
			replaceInput: function(event) {
				var value = event.target.value;
				if (value === '11') {
					this.changeValue = '2';
				}
			},
			hideKeyboard: function(event) {
				if (event.target.value === '123') {
					uni.hideKeyboard();
				}
			},
			clearInput: function(event) {
				this.inputClearValue = event.target.value;
				if (event.target.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() {
				this.inputClearValue = '';
				this.showClearIcon = false;
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			}
		}
	}
</script>

<style>
	.with-fun{
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
</style>
