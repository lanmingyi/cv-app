<template>
	<view>
		<navigator url="/pages/about/about"><button type="default">通过navigator组件跳转到about页面</button></navigator>
		<button type="default" @click="removeStorage()">删除指定缓存</button>
		<button type="default">跳转到about页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				name: ''
			}
		},
		onLoad(options) {
			console.log(options)
			this.type = options.type
			uni.setStorage({
				key: 'type',
				data: options.type,
				success: function () {
					console.log('success');
				}
			});
		},
		methods: {
			removeStorage(){
				uni.removeStorage({
				    key: 'type',
				    success: function (res) {
				        console.log('success');
				    }
				});
			}
			
		},
	};
</script>

<style>
</style>
