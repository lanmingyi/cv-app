<template>
	<view class="edit-container"> 
		<!-- 操作工具 -->
		<view class="tool-view" > 
			<view class="tool">
				<editor-icon class="single" type="&#xe6f3;" font-size="36rpx" title="插入图片" @click="insertImage"></editor-icon>
				<editor-icon class="single" type="&#xe6e7;" font-size="36rpx" title="加粗" @click="setBold" :color="showBold ? activeColor : '#666666'"></editor-icon>
				<editor-icon class="single" type="&#xe6fe;" font-size="36rpx" title="斜体" @click="setItalic" :color="showItalic ? activeColor : '#666666'"></editor-icon>
				<editor-icon class="single" type="&#xe6f8;" font-size="36rpx" title="分割线" @click="setIns" :color="showIns ? activeColor : '#666666'"></editor-icon>
				<editor-icon class="single" type="&#xe6e3;" font-size="36rpx" title="标题" @click="setHeader" :color="showHeader ? activeColor : '#666666'"></editor-icon>
				<editor-icon class="single" type="&#xe6f1;" font-size="36rpx" title="居中" @click="setCenter" :color="showCenter ? activeColor : '#666666'"></editor-icon>
				<editor-icon class="single" type="&#xe6ed;" font-size="36rpx" title="居右" @click="setRight" :color="showRight ? activeColor : '#666666'"></editor-icon>
				<!-- <editor-icon class="single" type="&#xe6f9;" font-size="36rpx" title="修改文字样式" @click="showMore" :color="showMoreTool ? activeColor : '#666666'"></editor-icon> -->
				<editor-icon class="single" type="&#xe6eb;" font-size="36rpx" title="分割线" @click="insertDivider"></editor-icon>
				<editor-icon class="single" type="&#xe6e8;" font-size="36rpx" title="撤销" @click="undo"></editor-icon>
				<editor-icon class="single" type="&#xe705;" font-size="36rpx" title="重做" @click="redo"></editor-icon>
				<!-- <editor-icon class="single" type="&#xeb8a;" font-size="36rpx" title="设置" @click="showSetting"></editor-icon> -->
			</view>
			<!-- 文字相关操作 -->
			<view class="font-more" :style="{ height: showMoreTool ? '80rpx' : 0 }">
				<editor-icon class="single" type="&#xe6e7;" font-size="36rpx" title="加粗" @click="setBold" :color="showBold ? activeColor : '#666666'"></editor-icon>
				<editor-icon class="single" type="&#xe6fe;" font-size="36rpx" title="斜体" @click="setItalic" :color="showItalic ? activeColor : '#666666'"></editor-icon>
				<editor-icon class="single" type="&#xe6f8;" font-size="36rpx" title="分割线" @click="setIns" :color="showIns ? activeColor : '#666666'"></editor-icon>
				<editor-icon class="single" type="&#xe6e3;" font-size="36rpx" title="标题" @click="setHeader" :color="showHeader ? activeColor : '#666666'"></editor-icon>
				<editor-icon class="single" type="&#xe6f1;" font-size="36rpx" title="居中" @click="setCenter" :color="showCenter ? activeColor : '#666666'"></editor-icon>
				<editor-icon class="single" type="&#xe6ed;" font-size="36rpx" title="居右" @click="setRight" :color="showRight ? activeColor : '#666666'"></editor-icon>
			</view>
			<view class="setting-layer-mask" v-if="showSettingLayer" @click="showSetting"></view>
			<view class="setting-layer" v-if="showSettingLayer">
				<view class="single" @click="release(true)">
					<editor-icon class="icon" type="&#xe639;" ></editor-icon>
					<view>公开发布</view>
				</view>
				<view class="single" @click="release(false)">
					<editor-icon class="icon" type="&#xe655;" ></editor-icon>
					<view>私密保存</view>
				</view>
			</view>
		</view>
		<editor
			class="ql-container"
			:placeholder="placeholder"
			:show-img-size="true"
			:show-img-toolbar="true"
			:show-img-resize="true"
			@ready="onEditorReady"
			id="editor"
			@statuschange="statuschange"
			@focus="editFocus" 
			@blur="editBlur"
			ref="editot"
		></editor>
	</view>
</template>

<script>
import editorIcon from './icons.vue';
export default {
	props: {
		// 点击图片时显示图片大小控件
		showImgSize: {
			type: Boolean,
			default: false
		},
		// 点击图片时显示工具栏控件
		showImgToolbar: {
			type: Boolean,
			default: false
		},
		// 点击图片时显示修改尺寸控件
		showImgResize: {
			type: Boolean,
			default: false
		},
		// 占位符
		placeholder: {
			type: String,
			default: '开始输入...'
		},
		// 图片上传的地址
		uploadFileUrl: {
			type: String,
			default: '#'
		},
		// 上传文件时的name
		fileKeyName: {
			type: String,
			default: 'file'
		},
		// 上传图片时，http请求的header
		header: {
			type: Object
		},
		// 初始化html
		html: {
			type: String
		}
	},
	computed:{
		
	},
	data() {
		return {
			showMoreTool: false,
			showBold: false,
			showItalic: false,
			showIns: false,
			showHeader: false,
			showCenter: false,
			showRight: false,
			showSettingLayer: false,
			activeColor: '#F56C6C'
		};
	},
	components: {
		editorIcon
	},
	created() {
		
	},
	methods: {
		onEditorReady(e) {
			uni.createSelectorQuery()
				.in(this)
				.select('.ql-container')
				.fields({
					size: true,
					context: true
				},res => {
					this.editorCtx = res.context;
					this.editorCtx.setContents({
						html: this.html
					})
				})
				.exec();
		},
		undo() {
			this.editorCtx.undo();
		},
		// 插入图片
		insertImage() {
			console.log("uploadFileUrl",this.uploadFileUrl,this.$upLoadUrl)
			uni.chooseImage({
				count: 9, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: async(res) => {
					var tempFilePaths = res.tempFilePaths;
					uni.showLoading({
						title: '正在上传中...'
					})
					for (let temp of tempFilePaths) {
						// 图片上传服务器
						await uni.uploadFile({
							url: this.$upLoadUrl,
							filePath: temp,
							name: this.fileKeyName,
							header:{
								token:uni.getStorageSync('token'),
							},
							success: res => {
								// 上传完成后处理
								console.log("res",res)
								let data = JSON.parse(res.data)
								if(data.statusCode == 200){
									this.editorCtx.insertImage({
										src: data.filePath,  // 此处需要将图片地址切换成服务器返回的真实图片地址
										alt: '图片',
										success: function(e) {}
									});
								} else {
									uni.showToast({
										title: '图片上传失败',
										icon: 'none'
									})
								}
								uni.hideLoading()
							},
							
						});
					}
				}
			});
		},
		insertDivider() {
			this.editorCtx.insertDivider();
		},
		redo() {
			this.editorCtx.redo();
		},
		showMore() {
			this.showMoreTool = !this.showMoreTool;
			this.editorCtx.setContents()
		},
		setBold() {
			this.showBold = !this.showBold;
			this.editorCtx.format('bold');
		},
		setItalic() {
			this.showItalic = !this.showItalic;
			this.editorCtx.format('italic');
		},
		checkStatus(name, detail, obj) {
			if (detail.hasOwnProperty(name)) {
				this[obj] = true;
			} else {
				this[obj] = false;
			}
		},
		statuschange(e) {
			var detail = e.detail;
			this.checkStatus('bold', detail, 'showBold');
			this.checkStatus('italic', detail, 'showItalic');
			this.checkStatus('ins', detail, 'showIns');
			this.checkStatus('header', detail, 'showHeader');
			if (detail.hasOwnProperty('align')) {
				if (detail.align == 'center') {
					this.showCenter = true;
					this.showRight = false;
				} else if (detail.align == 'right') {
					this.showCenter = false;
					this.showRight = true;
				} else {
					this.showCenter = false;
					this.showRight = false;
				}
			} else {
				this.showCenter = false;
				this.showRight = false;
			}
		},
		setIns() {
			this.showIns = !this.showIns;
			this.editorCtx.format('ins');
		},
		setHeader() {
			this.showHeader = !this.showHeader;
			this.editorCtx.format('header', this.showHeader ? 'H2' : false);
		},
		setCenter() {
			this.showCenter = !this.showCenter;
			this.editorCtx.format('align', this.showCenter ? 'center' : false);
		},
		setRight() {
			this.showRight = !this.showRight;
			this.editorCtx.format('align', this.showRight ? 'right' : false);
		},
		showSetting() {
			this.showSettingLayer = !this.showSettingLayer;
		},
		async editFocus() {
			
		},
		editBlur() {
			
		},
		getContent(){
			let content = ""
			this.editorCtx.getContents({
				success: res => {
					content =  res;
				} 
			})
			return content;
		},
		release(isPublic) {
			this.showSettingLayer = false;
			this.editorCtx.getContents({
				success: res => {
					Object.assign(res, {
						isPublic: isPublic
					})
					this.$emit('editOk', res);
				} 
			})
		},
	}
};
</script>

<style></style>
<style scoped>
.edit-container {
	width: 100%;
	box-sizing: border-box;
	/* padding-bottom: 120rpx; */
}
/deep/.ql-editor p{
	font-size: 14px;
	word-break: break-all;
}
/deep/.ql-editor.ql-blank:before {
	color: #c8c7cc;
  font-style: normal;
	font-size: 14px;
}
.ql-container {
	line-height: 160%;
	font-size: 34rpx;
	width: 100%;
	height: auto;
	margin: 0 auto;
} 
.tool-view{
	width: 100%;
	position: relative;
	border-bottom: 1px solid #c8c7cc;
	margin-bottom: 25rpx;
}
.tool {
	/* height: 100rpx; */
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
	background: #fff;
	padding: 16rpx 0;
}

.font-more {
	position: absolute;
	left: 0;
	bottom: -80rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	/* background: rgb(235, 235, 235); */
	overflow: hidden;
	transition: all 0.1s;
	background: #f3f3f3;
	border-radius: 10px;
}

.setting-layer {
	position: absolute;
	bottom: 100rpx;
	background: #fff;
	width: 250rpx;
	right: 20rpx;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	border-radius: 8rpx;
}
.setting-layer .single {
	height: 80rpx;
	font-size: 32rpx;
	padding: 0 30rpx;
	display: flex;
	align-items: center;
	line-height: 80rpx;
	flex-direction: row;
	color: #666;
}
.setting-layer .single .icon {
	margin-right: 20rpx;
}
.setting-layer-mask{
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: transparent; 
}
</style>
