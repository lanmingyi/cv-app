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
		props: {
			xml: {
				type: String
			},
			design: {
				type: Object
			}
		},
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
			// if(this.xml){
			// 	this.initBpmnModeler(xml)
			// }
			// this.initBpmnModeler()
		},
		methods: {
			refresh(xml) {
				this.initBpmnModeler(xml)
			},
			fitZoom(val) {
				let newScale = !val ? 1.0 : this.scale + val <= 0.2 ? 0.2 : this.scale + val;
				this.bpmnViewer.get('canvas').zoom(newScale);
				this.scale = newScale;
			},
			initBpmnModeler() {
				let canvas = this.$refs.bpmnViewer
				this.bpmnViewer = new BpmnViewer({
					container: canvas
				});
				// this.getData();
				this.initBpmn(this.xml)
			},
			async createNewDiagram(modelXml) {
				try {
					const result = await this.bpmnViewer.importXML(modelXml)
					console.log('result', result)
					// this.$refs.canvas.zoom('fit-viewport', 'auto');
					// 屏幕自适应
					const canvas = this.bpmnViewer.get('canvas')
					canvas.zoom('fit-viewport', 'auto')
					this.setNodeColor(['Activity_0c2cl2b'], 'nodeSuccess', canvas)
				} catch (err) {
					console.log(err.message, err.warnings)
				}
			},
			// 设置高亮颜色的class
			setNodeColor(nodeCodes, colorClass, canvas) {
				for (let i = 0; i < nodeCodes.length; i++) {
					canvas.addMarker(nodeCodes[i], colorClass)
				}
			},
			initBpmn(xml) {
				const self = this
				self.bpmnViewer.importXML(xml, (err) => {
					let canvas = self.bpmnViewer.get("canvas");
					canvas.zoom("fit-viewport", "auto");
					// 方法1
					if(self.design.notInProgress&&self.design.notInProgress.length != 0) that.setNodeColors(that.design.notInProgress, "nodeSuccess", canvas);		//已走的节点
					if(self.design.inProgress&&self.design.inProgress.length != 0) that.setNodeColors(that.design.inProgress, "nodeDoing", canvas);		//进行中节点
					// 方法2
					// const elementRegistry = self.bpmnViewer.get('elementRegistry');
					// let modeling = self.bpmnViewer.get('modeling');
					// // 已完成的节点
					// console.log("self.design.notInProgress", self.design.notInProgress)
					// if (self.design.notInProgress && self.design.notInProgress.length != 0) {
					// 	self.design.notInProgress.forEach((e) => {
					// 		if (elementRegistry._elements[e]) {
					// 			modeling.setColor(elementRegistry._elements[e].element, {
					// 				stroke: '#009688',
					// 			});
					// 		}
					// 	});
					// }
					// // 正在进行的节点
					// console.log("self.design.inProgress", self.design.inProgress)
					// if (self.design.inProgress && self.design.inProgress.length != 0) {
					// 	self.design.inProgress.forEach((e) => {
					// 		if (elementRegistry._elements[e]) {
					// 			modeling.setColor(elementRegistry._elements[e].element, {
					// 				stroke: 'red',
					// 			});
					// 		}
					// 	});
					// }
				})
			},
			addModelerListener() {
				const eventBus = this.bpmnViewer.get('eventBus');

				eventBus.on('element.click', 500, function(e) {
					console.log("e---click", e)
				});
			}
		},
	}
</script>


<style lang="scss" scoped>
	#canvas {
		width: 100%;
		height: 45vh;
		background: #fff url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+) repeat !important;
	}

	/deep/.bjs-powered-by {
		display: none;
	}

	.nodeSuccess {
		.djs-visual {
			> :nth-child(1) {
				stroke: #009688 !important;
			}

			> :nth-child(2) {
				fill: #009688 !important;
			}
		}
	}

	.nodeDoing {
		.djs-visual {
			> :nth-child(1) {
				stroke: red !important;
			}
		}
	}
</style>
