<template>
	<view class="container" :class="[vtheme]">
		<view class="flex align-center bg-box" style="height: 40px;">
			<view class=" margin-left bg-blue light u-font-13  padding-lr padding-tb-xs radius" @click="fitZoom(0.05)">
				放大</view>
			<view class="margin-left bg-blue light u-font-13  padding-lr padding-tb-xs radius" size="default"
				@click="fitZoom(-0.05)">缩小</view>
		</view>
		<div id="canvas" ref="bpmnViewer"></div>
	</view>
</template>

<script>
	import BpmnViewer from '@/utils/flow'
	export default {
		components: {},
		data() {
			return {
				bpmnViewer: null,
				bpmnModeler: null,
				templateXml: '',
				scale: 1.0,
				selectedIndex: 0,
				noticeList: [],
				params: {
					pageNo: 1,
					pageSize: 10,
				},
				loadingType: 'loading', //加载更多状态
				emptyType: '0',
			};
		},
		onShow() {},
		mounted() {
			this.$nextTick(function() {
				this.initBpmnModeler()
			})
		},
		methods: {
			initBpmnModeler() {
				// 避免缓存，每次清一下
				this.bpmnViewer && this.bpmnViewer.destroy();
				// 初始化画布
				this.bpmnViewer = new BpmnViewer({
					container: '#canvas'
				});
				this.getData();
			},
			getData() {
				var that = this;
				let url = 'https://vue.misboot.com/workflow/apiFlowableProcessInstance/clickStartProcess'
				let params = {
					modelKey: 'tyqjlc',
					taskId: 'b42a3263-d999-11eb-86bc-00ff362a41ad',
					processInstanceId: 'b4296f0b-d999-11eb-86bc-00ff362a41ad',
					nodeId: 'Activity_0yo4wf1',
					processDefinitionId: 'tyqjlc:1:25592b87-d994-11eb-b417-00ff362a41ad'
				}
				that.$http.post(url, params, {
						params: {},
					})
					.then(res => {
						let lists = res.data.lists
						console.log("res----", lists)
						this.initBpmn(lists.flowDesign)
					})
					.catch(err => {});
			},
			initBpmn(xml) {
				this.bpmnViewer.importXML(xml, (err) => {
					this.addModelerListener();
				})
			},
			//监听节点事件
			addModelerListener() {
				const eventBus = this.bpmnViewer.get('eventBus');
			},
			//画布缩放
			fitZoom(val) {
				let newScale = !val ? 1.0 : this.scale + val <= 0.2 ? 0.2 : this.scale + val;
				this.bpmnViewer.get('canvas').zoom(newScale);
				this.scale = newScale;
			},
		},
	}
</script>


<style lang="scss">
	#canvas {
		width: 100%;
		height: calc(100vh - 40px);
		background: #fff url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+) repeat !important;
	}
	/deep/.bjs-powered-by {
		display: none;
	}
</style>
