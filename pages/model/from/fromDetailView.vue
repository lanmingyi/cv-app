<template>
	<view class="container " :class="[vtheme]">
		<view v-if="emptyType===0" class="empty text-center margin-tb-xl">
			<image src="@/static/img/loading.gif"></image>
			<text class="text-grey text-opacity5 ">加载中...</text>
		</view>
		<view v-if="emptyType===1" class="empty text-center">
			<image src="@/static/img/empty.png"></image>
			<view class="text-grey text-opacity5 margin-tb-xl">页面丢失</view>
		</view>
		<view v-if="emptyType===2" class="bg-box">
			<view class="padding-lr">
				<u-form :model="model" ref="uForm">
					<u-form-item label-width="180" label-position="left" label="库名：" >
						<u-input :border="false" v-model="model.warehouseName" type="text" disabled></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="创建人：" >
						<u-input :border="false" v-model="model.creator" type="text" disabled></u-input>
					</u-form-item>
					<u-form-item label-width="180" label-position="left" label="创建时间：" >
						<u-input :border="false" v-model="model.createTime" type="text" disabled></u-input>
					</u-form-item>
				</u-form>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emptyType: 0,
				model :{},
				params: {},
			}
		},
		onLoad(o) {
			this.params.uuid = o.uuid
			uni.showLoading({
				title:'加载中...'
			})
			setTimeout(()=>{
				this.getData()
			},300)
		},
		methods: {
			changeValue(){},
			getData(){
				let that = this
				let params = {
					...that.params
				}
				that.$http.post('/office/oaWorkSupplies/getDetailByUuid',params , {
						params: {},
					})
					.then(res => {
						uni.hideLoading()
						this.model = res.data
						this.emptyType = 2
					})
					.catch(err => {
						this.emptyType = 1
					});
			},
		}
	}
</script>

<style>

</style>
