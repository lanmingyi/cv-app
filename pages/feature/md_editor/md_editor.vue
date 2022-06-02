<template>
	<view class="container" :class="[vtheme]">
		<view class="page-body">
			<ly-markdown :showPreview="showPreview" :textareaData.sync="textareaData" :textareaHtml.sync="textareaHtml"></ly-markdown>
		</view>
	</view>
</template>

<script>
	import lyMarkdown from '@/components/ly-markdown/ly-markdown.vue'
	export default {
		components: {
			lyMarkdown
		},
		data() {
			return {
				textareaData: "",
				textareaHtml:"",
				showPreview:false
			}
		},
		watch:{
			"textareaData":function(){
				this.showPreview = true;
			}
		}
	}
</script>

<style>
	page{
		background-color: white;
	}
</style>
