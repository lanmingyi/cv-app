<template>
	<view>
		<view class="navBar">
			<view class="nav" v-for="(item,index) in navList" :key="index" 
			:class="[selectedIndex==index?'active':'']" 
			@click="changeNav(index)">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			navList:{
				type:Array
			},
			selectedIndex:{
				type:Number
			}
		},
		data() {
			return {
			}
		},
		methods:{
			changeNav(index){
				this.$emit('changeTabNav',index)
			}
		}
	}
</script>

<style lang="scss">
.navBar{
	width: 100%;
	height: 90upx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid #f2f2f2;
	background: #fff;
	position: fixed;
	top: 0;
	/* #ifdef  H5 */
	top: 44px;
	/* #endif*/  
	z-index: 9999;
	.nav{
		height: 100%;
		width: 33.3333%;
		text-align: center;
		line-height: 90upx;
		&.active{
			border-bottom: 2px solid #3aaafe;
		}
	}
}
</style>
