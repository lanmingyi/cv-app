<template>
	<view class="container" :class="[vtheme]">
		<view class="margin-bottom-max bg-box">
			<u-form :model="documentData" :rules="rules" ref="uForm" :errorType="errorType">
				<view class="padding-lr">
					<u-form-item label-width="180" label-position="top" label="文号" prop="documentCode">
						<u-input :border="false" placeholder="文号" v-model="documentData.documentCode" type="text"></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="top" label="公文标题" prop="title">
						<u-input :border="false" placeholder="公文标题" v-model="documentData.title" type="text"></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="left" label="发文单位" prop="assigner">
						<u-input :border="false" placeholder="发文单位" v-model="documentData.assigner" type="select" @click="gouserPopup" disabled iconName="man-add" iconNameColor="text-red"></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="left" label="紧急程度" prop="sort">
						<u-input :border="false" placeholder="紧急程度" v-model="documentData.sort" type="number"></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="left" label="添加正文" prop="planEndTime">
						<u-input :border="false" type="select" v-model="documentData.planEndTime" placeholder="计划结束时间" disabled iconName="clock" iconNameColor="text-red"></u-input>
					</u-form-item>
					
					<u-form-item label-width="180" label-position="top" label="添加附件" prop="content" class="border-bottom-none">
						<u-input :border="false" placeholder="添加附件" v-model="documentData.content" type="textarea" :rows="4"></u-input>
					</u-form-item>
				</view>
				
			</u-form>
		</view>
		
		<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
			<view class="bg-blue text-center" @click="formSubmit">确定</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		components: {},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				documentData: {},
				rules: {
					title: [
						{
							required: true,
							message: '必填',
							trigger: 'change',
						}
					]
				},
				errorType: ['message'],
			};
		},
		onLoad() {
		},
		methods: {
			formSubmit(){
			},
			init(){
				// const params = {
				// 	fileUrl: 'https://zysd-test1.oss-cn-beijing.aliyuncs.com/辞职证明.doc',
				// 	uuid: '10K',
				// 	uploadType: 'oss',
				// };
				// 新建 template值 {"word", "excel", "ppt"}
				// this.$http.post('/office/wps/createTemplateFile', {template: 'word'})
				// 	.then((res) => {
				// 		console.log("res",res.data)
				// 		let data = res.data
				// 		this.SET_WPAURL(data.Token.wpsUrl)
				// 		let href =   'http://' + location.host + '/#/pages/office/application/document/document_add'
				// 		console.log("href",href)
				// 		window.open(href, '_blank');
				// 	})
				// 	.catch((err) => {
				// 		uni.showToast({
				// 			title: err,
				// 			icon: 'none'
				// 		})
				// 	});
				// 编辑
				// this.$http.post('/office/wps/getViewUrlWebPath', params)
				// 	.then((res) => {
				// 		console.log("res",res.data)
				// 		let data = res.data
				// 		this.SET_WPAURL(data.Token.wpsUrl)
				// 		let href =   'http://' + location.host + '/#/pages/office/application/document/document_add'
				// 		console.log("href",href)
				// 		window.open(href, '_blank');
				// 	})
				// 	.catch((err) => {
				// 		uni.showToast({
				// 			title: err,
				// 			icon: 'none'
				// 		})
				// 	});
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
