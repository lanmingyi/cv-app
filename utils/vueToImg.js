// 导出页面为Img 保存在本地
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
	install(Vue, options) {
		Vue.prototype.getVueToImg = function() {
			var that = this
			let domCanvas = uni.createCanvasContext('sealBox')
			
			let dom = document.querySelector('#pdfDom')
			var title = that.htmlTitle ? that.htmlTitle : '电子签章'
			// let opts = {
			// 	dpi: 350,//分辨率  越高清晰度越高
			// 	logging: false, //日志开关，便于查看html2canvas的内部执行流程
			// 	useCORS: true, // 【重要】开启跨域配置
			// 	width: 480,
			// 	scale: 6,
			// 	allowTaint: true,
			// }
			let opts = {
				dpi: 350,//分辨率  越高清晰度越高
				logging: false, //日志开关，便于查看html2canvas的内部执行流程
				useCORS: true, // 【重要】开启跨域配置
				width: 375,
				scale: 3,
				allowTaint: true,
			}
			html2Canvas(dom, opts).then(function(canvas) {
				let contentWidth = canvas.width
				let contentHeight = canvas.height
				let pageHeight = contentWidth / 592.28 * 841.89
				let leftHeight = contentHeight
				let position = 0
				let imgWidth = 595.28
				let imgHeight = 592.28 / contentWidth * contentHeight
				let pageData = canvas.toDataURL('image/jpeg', 1.0)
				
				console.log("00000")
				// uni.previewImage({
				// 	urls: [pageData] //预览图片 数组
				// })
				// console.log("111111")
				// uni.saveImageToPhotosAlbum({
				// 	filePath: pageData,
				// 	success:function(res) {
				// 		console.log("res",res)
				// 		uni.showToast({
				// 			title: '已成功保存到相册',
				// 			duration: 2000
				// 		});
				// 	},
				// 	fail:function(err) {
				// 		console.log("err",err)
				// 	},
				// 	complete:function(complete) {
				// 		console.log("complete",complete)
				// 	}
				// });
			})
			
			domCanvas.draw(true, () => {
				uni.canvasToTempFilePath({
					canvasId: 'sealBox',
					fileType: 'png',
					quality: 1, //图片质量
					success(res) {
						console.log(res, 'canvas生成图片地址');
						that.$u.toast('成功')
						//保存到系统相册
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								that.$u.toast('成功保存到相册')
							},
							fail:function(err) {
								console.log("err",err)
							},
							complete:function(complete) {
								console.log("complete",complete)
							}
						});
					}
				});
			});
		}
	}
}
