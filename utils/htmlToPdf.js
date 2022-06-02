// 导出html页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
	install(Vue, options) {
		Vue.prototype.getPdf = function() {
			var that =  this
			let dom = document.querySelector('#pdfDom')
			setTimeout(()=>{
				var title = '电子签章'
				let opts = {
					background: "#fff",
					dpi: 750,//分辨率  越高清晰度越高
					logging: false, //日志开关，便于查看html2canvas的内部执行流程
					useCORS: false, // 【重要】开启跨域配置
					width: 480,
					scale: 6,
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
					
					let imgBolb = that.convertBase64UrlToBlob(pageData,'文件流.img')
					console.log("imgBolb",imgBolb)
					
					let imgUri = canvas.toDataURL("image/png").replace("image/png","image/octet-stream")
					console.log("imgUri",imgUri);
					
					let pdfDoc = new JsPDF('', 'pt', 'a4')
					if (leftHeight < pageHeight) {
						pdfDoc.addImage(pageData, 'JPEG', 70, 0, imgWidth, imgHeight)
					} else {
						while (leftHeight > 0) {
							pdfDoc.addImage(pageData, 'JPEG', 70, position, imgWidth, imgHeight)
							leftHeight -= pageHeight
							position -= 841.89
							if (leftHeight > 0) {
								pdfDoc.addPage()
							}
						}
					}
					that.$nextTick(()=>{
						console.log("pdfDoc",pdfDoc)
						// pdfDoc.save(title + new Date().getTime() + '.pdf')
					})
				})
			},100)
		},
		Vue.prototype.viewPdf = function() {
			var that =  this
			let dom = document.querySelector('#pdfDom')
			setTimeout(()=>{
				var title = '电子签章'
				let opts = {
					dpi: 350,//分辨率  越高清晰度越高
					logging: false, //日志开关，便于查看html2canvas的内部执行流程
					useCORS: false, // 【重要】开启跨域配置
					width: 480,
					scale: 6,
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
					uni.previewImage({
						urls: [pageData] //预览图片 数组
					});
				})
			},100)
		}
	}
}
