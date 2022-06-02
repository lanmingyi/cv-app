<template>
	<view class="container " :class="[vtheme]">
		<view class="bg-box padding-lr">
			<u-form :model="model" ref="uForm">
				<from-item v-for="(item,index) in fromList" :key="index" :record="item" @change="changeValue" labelPosition="top" :disabled="true"></from-item>
			</u-form>
		</view>
	</view>
</template>

<script>
	import fromItem from '@/components/custom/fromDesign/model/fromItem'
	export default {
		components:{fromItem},
		data() {
			return {
				fromList:[],//表单数据
				model :{},
				uuid: '',
				tableSchema:'',
				tableName: ''
			}
		},
		onLoad(o) {
			this.uuid = o.uuid
			this.tableSchema = o.tableSchema
			this.tableName = o.tableName
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
					tableSchema: that.tableSchema,
					tableName: that.tableName,
					uuid: that.uuid
				}
				that.$http.post('/system/sysAppDetailed/scanPreviewGetDetailByUuid ',params , {
						params: {},
					})
					.then(res => {
						if(res.statusCode == 200){
							let data = res.data[0]
							console.log("res.statusCode",data)
							//处理表单
							this.fromList = this.mergeFromList(data,'details')
							uni.hideLoading()
						}
					})
					.catch(err => {});
			},
		}
	}
</script>

<style>

</style>
