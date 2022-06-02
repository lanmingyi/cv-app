<template>
	<view class="container" :class="[vtheme]">
		<u-cell-group>
			<u-cell-item :border-bottom="false" title="系统默认" :arrow="true" @click="changeTheme('default','系统默认')">
			</u-cell-item>
			<u-cell-item :border-bottom="false" title="经典绿色" :arrow="true" @click="changeTheme('green','经典绿色')">
			</u-cell-item>
		<!-- 	<u-cell-item :border-bottom="false" title="经典黑色" :arrow="true" @click="changeTheme('black','经典黑色')">
			</u-cell-item> -->
		</u-cell-group>
	</view>
	
</template>

<script>
	import {mapMutations,mapActions} from 'vuex'
	export default {
		components: {
		},
		data() {
			return {
				title: 'nav-default',
				hasSetText: false,
				hasSetBg: false,
				theme: 'default-theme'
			}
		},
		methods: {
			...mapMutations(['SET_THEME']),
			changeTheme(theme, name){
				this.SET_THEME(theme)
				uni.showToast({
					title: `切换`+ name +`主题成功！`,
					icon: 'none'
				})
				console.log("store",uni.getStorageSync('theme'))
				setTimeout(()=>{
					uni.navigateBack()
				},500)
			},
		}
	}
</script>

<style lang="scss">
</style>
