<template>
	<view id="page">
		<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
			<view class="grace-form">
				<form @submit="formSubmit">
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>本周完成工作</view>
						<view class="grace-form-r">
							<textarea placeholder="请输入工作内容" name="desc"></textarea>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>本周工作总结</view>
						<view class="grace-form-r">
							<textarea placeholder="请输入工作内容" name="desc"></textarea>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>下周工作计划</view>
						<view class="grace-form-r">
							<textarea placeholder="请输入工作内容" name="desc"></textarea>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>需协调工作</view>
						<view class="grace-form-r">
							<textarea placeholder="请输入需协调工作" name="desc"></textarea>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label"><text class="grace_must">*</text>备注</view>
						<view class="grace-form-r">
							<textarea placeholder="请输入信息" name="desc"></textarea>
						</view>
					</view>
					<view class="btn">
						<button formType="submit" type="primary" style="width:90%;">提交</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	
	data() {
		return {
			
		}
	},
	methods:{
		formSubmit : function(e){
			wx.showToast({title:'请观察控制台', icon:'none'});
			console.log(JSON.stringify(e.detail.value));
		},
	}
}
</script>
<style>
	.grace_must{
		color: red;
	}
	.grace-common-border{
		border: none;
	}
	.grace-form-r{
		text-align: left;
		display: flex;
		justify-content: flex-end;
	}
	.grace-form uni-picker{
		width: 30%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.grace-form uni-textarea{
		height: 170upx;
	}
	.btn{
		width: 95%;
		position: fixed;
		bottom: 10%;
		margin: 0;
		padding: 0;
	}
	.btn>button{
		background: #fff;
		outline: none;
		border: 1px solid #ccc;
		color: #666;
	}
	uni-button:after{
		border: none;
	}
</style>
