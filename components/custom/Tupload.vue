<!--
 * @Description: 文件上传
 * @Author: 张夕雅
-->
<template>
	<view style="width:100%">
		<u-upload
			:action="$baseUrl + action" 
			:name="fileName"
			:header="headersParams"
			:form-data="data"
			:file-name="fileName"
			:file-list="uploadList"
			:uploadText="uploadText" 
			:maxSize="maxSize" 
			:maxCount="maxCount" 
			:multiple="multiple"
			:width="width" 
			:height="height" 
			:sourceType="sourceType" 
			:previewFullImage="previewFullImage" 
			:showProgress="showProgress" 
			:deletable="deletable" 
			@on-change="uploadChange"
			@on-remove="uploadRemove"
		></u-upload>
	</view>
</template>

<script>
	export default {
		name: 'Tupload',
		props:{
			fileList:Array,//图片列表
			action: String,
			headers:Object,
			data:Object,
			fileName: String,
			uploadText: String,
			maxSize:{  //单个文件最大大小
				type: [String,Number],
				default:Number.MAX_VALUE
			},
			maxCount:{ //最大选择图片数量
				type: [String,Number],
				default:10
			},
			width:{
				type: [String,Number],
				default:200
			},
			height:{
				type: [String,Number],
				default:200
			},
			sourceType: {
				type:Array,
				default:()=>['album', 'camera'] //album：相册   camera：相机
			},
			multiple: { //是否多选
				type:Boolean,
				default:true
			},
			previewFullImage: { //是否可预览
				type:Boolean,
				default:true
			},
			showProgress : { //显示进度条
				type:Boolean,
				default:true
			},
			deletable:{ //显示删除按钮
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				headersParams : {},
				uploadList:[],
				selectList:[]
			};
		},
		watch:{
			headers:{
				deep: true,
				immediate: true,
				handler(newVal, oldVal) {
					let params = {
						token : uni.getStorageSync('token')
					}
					this.headersParams = Object.assign(params,this.headers)
					console.log("headersParams",this.headersParams)
				},
			}
		},
		mounted() {
			this.uploadList = []
			this.selectList = this.fileList
			if(this.fileList && this.fileList.length > 0){
				this.fileList.forEach(el=>{
					this.uploadList.push({
						url: el
					})
				})
			}
		},	
		methods:{
			//图片上传成功触发
			uploadChange(res, index, lists){
				let upload = []
				lists.forEach(el=>{
					if(el.response && el.progress == 100){
						upload.push(el.response.filePath)
					} else if(el.progress == 100){
						upload.push(el.url)
					}
				})
				this.selectList = upload
				this.$emit('change',upload)
			},
			//删除触发
			uploadRemove(index, lists){
				let upload = []
				lists.forEach(el=>{
					if(el.progress == 100){
						upload.push(el.response.filePath)
					} else if(el.progress == 100){
						upload.push(el.url)
					}
				})
				this.selectList = upload
				this.$emit('change',upload)
			},
		}
	}
</script>

<style lang="scss">

</style>
