<!--
 * @Description: 评论回复（含 @ 功能）
 * @Author: 张夕雅
-->
<template>
	<view class="pos-relative bg-box">
		<view class="padding-lr padding-top">
			<editor class="ql-container padding-top u-font-13" style="height:100%;" placeholder="请输入评论(必填)"
				:show-img-size="true" :show-img-toolbar="true" :show-img-resize="true" @ready="onEditorReady"
				id="editor" @statuschange="statuschange" @input="editInput" @blur="editBlur" @focus="editFocus"
				ref="editor" @keyup.delete="editDelete" @keyup.enter="editEnter" @click.stop="editClick"></editor>
			<!-- <u-input type="textarea" :rows="4" v-model="remark" placeholder="请输入" @keyup.delete="editDelete"/> -->
		</view>
		<view class="padding-lr">
			<view class="u-font-16 text-blue border-bottom" @click="clickUser">@</view>
			<view class="bottom-btn-appro u-margin-top-80 flex align-center justify-center">
				<view class="cu-botton-submit text-center" @click="formSubmit">发送</view>
			</view>
		</view>
		<user-pop :showPop.sync="showPop" @cancle="()=>{showPop = false}" ref="userPop" @change="getRemarkUser"></user-pop>
	</view>
</template>

<script>
	import userPop from './userPop.vue'
	export default {
		components:{userPop},
		props: {},
		data() {
			return {
				remark: '',
				checkUserList: [],
				isChoose: [],
				query: [],
				showPop: false,
				parentNodeId: '',
				html: "",
				editorRef: null,
				setEditorRef: null,
				editorContent: '',
				showPopState: false,
				content: '',
				editorOption: {
					placeholder: '编辑评论内容',
					modules: {
						toolbar: {
							container: [], // 工具栏选项
						}
					}
				},
			}
		},
		onLoad() {
		},
		onReady() {},
		onShow() {},
		mounted() {
			this.$nextTick(function() {

			})
		},
		methods: {
			onEditorBlur(quill) {
				console.log('editor blur!', quill)
			},
			onEditorFocus(quill) {
				console.log('editor focus!', quill)
			},
			onEditorReady(quill) {
				console.log('editor ready!', quill)
			},
			onEditorChange({
				quill,
				html,
				text
			}) {
				console.log('editor change!', quill, html, text)
				this.content = html
			},
			clear() {
				this.checkUserList = []
				this.editorCtx.clear({
					success: (res) => {
						console.log('清除成功')
					}
				})
			},
			clickUser() {
				this.editFocus()
				console.log("this.$refs.userPop",this.$refs.userPop)
				if (this.$refs.userPop) {
					this.showPop = true
					let items = this.checkUserList.length > 0 ? JSON.stringify(this.checkUserList) : JSON
						.stringify(this.query)
					this.$refs.userPop.onRefresh({
						type: '1',
						item: items
					})
				}
			},
			onEditorReady(e) {
				uni.createSelectorQuery()
					.in(this)
					.select('.ql-container')
					.fields({
						size: true,
						context: true
					}, res => {
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
			editInput(e) {},
			editClick() {
				this.editorCtx.removeFormat()
				// let parentNodeId = ''
				// let selection = window.getSelection()
				// let anchorNode = selection.anchorNode
				// let parentNode = selection.anchorNode.parentNode
				// console.log("anchorNode",anchorNode)
				// console.log("parentNode",parentNode)
				// parentNodeId = parentNode.id ? parentNode.id : ''
				// console.log("parentNodeId",parentNodeId)
			},
			editFocus(e) {
				// this.$refs.editor.focus()
			},
			editBlur(e) {},
			editEnter(e) {
				
			},
			editDelete(e) {
				console.log("e",e)
			},
			statuschange(e) {
				var detail = e.detail;
			},
			getContent() {
				let content = ""
				this.editorCtx.getContents({
					success: res => {
						content = res;
					}
				})
				return content;
			},
			formSubmit() {
				// this.listVerification()
				console.log("checkUserList", this.checkUserList)
				if (!this.getContent().text) {
					uni.showToast({
						title: "评论不能为空！",
						icon: 'none',
						duration: 1000,
					});
				} else {
					let remark = this.getContent().text.replace(/\n/mg, ' ')
					this.$emit("sure", remark, this.checkUserList)
					this.$nextTick(function() {
						this.checkUserList = []
						this.$refs.userPop.clearList()
					})
				}
			},
			listVerification() {
				console.log("this.$refs.edito",this.$refs.editor)
				let data = Object.assign([], this.checkUserList)
				let newData = []
				let dom = this.$refs.editor.$el.childNodes
				console.log("节点---",dom,)
				if(dom){
					let node = dom.firstChild
					console.log("node---",node)
					let nodeChild = node.children
					if(nodeChild){
						nodeChild.forEach(val=>{
							val.childNodes.forEach(e=>{
								let list = data.find(el => el.uuid == e.id)
								// console.log("list",list)
								if (list) newData.push(list)
								// console.log("newData",newData)
							})
						})
					}
				}
				this.checkUserList = newData
			},
			getRemarkUser(list) {
				if (list) {
					let newData = []
					list.forEach((val, index) => {
						let data = this.checkUserList.find(e => e.uuid == val.uuid)
						if (!data) {
							newData.push(val)
							
							this.editorCtx.format('color', '#0081ff')
							this.editorCtx.format('contenteditable', 'false')
							this.editorCtx.insertText({
								text: ' @' + val.name + ' '
							})
						}
					})
					console.log("newData", newData)
					let setData = [...new Set(newData)]
					this.checkUserList = this.checkUserList.concat(setData)
					console.log("this.checkUserList------end", this.checkUserList)
				}
				this.editorCtx.removeFormat()
				this.showPop = false
			},
			updateEditor(){
				this.$nextTick(function(){
					let dom = this.$refs.editor.$el.childNodes
					// console.log("dom",this.$refs.editor,dom)
					if(dom){
						let node = dom[0]
						let nodeChild = node.children
						// console.log("node",node,nodeChild)
						if(nodeChild){
							nodeChild.forEach(val=>{
								console.log("val",val,val.tagName,val.childNodes)
								val.childNodes.forEach(e=>{
									if(e.tagName=='SPAN' && e.outerText){
										// console.log("e",e)
										let username = e.outerText
										let userData = this.checkUserList.find(e => e.name == username)
										// console.log("userData",userData,e.innerHTML,e.outerText)
										if(userData){
											e.outerHTML = '<span id="' + userData.uuid +'" contenteditable="true" style="color:#0081ff">' +' @' + userData.name + ' </span>'
										}
									}
								})
							})
						}
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'quill/dist/quill.core.css';
	@import 'quill/dist/quill.snow.css';
	@import 'quill/dist/quill.bubble.css';

	/deep/.ql-editor p {
		// display: inline-block !important;
		word-break: break-all;
	}

	/deep/.ql-toolbar {
		display: none;
	}

	/deep/.ql-container {
		padding: 10px;
		border-top: 1px solid #ccc !important;
		height: auto !important;
		min-height: 80px;
	}
</style>
