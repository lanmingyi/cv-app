<template>
	<view class="container" :class="[vtheme]">
		<view v-if="src" class="bg-box">
			<web-view :src="src"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			};
		},
		onLoad() {
			setTimeout(()=>{
				this.src = '/hybrid/html/seal.html'
				console.log("123",this.src)
			},300)
		},
		onReady() {
			
		},
		methods: {
			getVueToImg() {
				var that = this
				let domCanvas = uni.createCanvasContext('sealBox')

				let dom = document.querySelector('#pdfDom')
				// let opts = {
				// 	dpi: 350,//分辨率  越高清晰度越高
				// 	logging: false, //日志开关，便于查看html2canvas的内部执行流程
				// 	useCORS: true, // 【重要】开启跨域配置
				// 	width: 480,
				// 	scale: 6,
				// 	allowTaint: true,
				// }
				let opts = {
					dpi: 350, //分辨率  越高清晰度越高
					logging: false, //日志开关，便于查看html2canvas的内部执行流程
					useCORS: true, // 【重要】开启跨域配置
					allowTaint: false,
					width: 375,
					scale: 2,
				}
				html2Canvas(dom, opts).then(function(canvas) {
					let contentWidth = canvas.width
					let contentHeight = canvas.height
					let pageHeight = contentWidth / 592.28 * 841.89
					let leftHeight = contentHeight
					let position = 0
					let imgWidth = 595.28
					let imgHeight = 592.28 / contentWidth * contentHeight
					let pageData = canvas.toDataURL('image/png', 1.0)

					// uni.previewImage({
					// 	urls: [pageData] //预览图片 数组
					// });
					let img = that.base64DowImg(pageData)
					console.log("img-----",img)
					
					// let img = that.convertBase64UrlToBlob(pageData, 'headimg.png')
					// console.log("img----",img)
					// uni.saveImageToPhotosAlbum({
					// 	filePath: img,
					// 	success: function() {
					// 		uni.showToast({
					// 			title: '图片保存成功',
					// 			icon: 'none'
					// 		})
					// 	}
					// });

					
					// uni.saveImageToPhotosAlbum({
					// 	filePath: pageData,
					// 	success(res) {
					// 		that.$u.toast("已经保存到相册")
					// 	}
					// });
				})
			},
			tabsChange(index) {
				console.log("index", index)
				this.swiperCurrent = index;
				if (index == 1) {
					this.ctx = uni.createCanvasContext('yinzhang');
					this.$u.getRect('.yinzhang').then(res => {
						this.width = res.width
						this.height = res.height
						console.log("yinzhang-----", res, this.width, this.height)
						this.$nextTick(function() {
							this.initSeal()
						})
					})
				}
			},
			copy(url) {
				uniCopy({
					content: url,
					success: (res) => {
						uni.showToast({
							title: '内容已复制到剪切板！',
							icon: 'none'
						})
					},
					error: (e) => {
						uni.showToast({
							title: '抱歉，复制失败！',
							icon: 'none'
						})
					}
				})
			},
			// 上传图片
			upload() {
				// this.$refs.uUpload.upload()
			},
			onUpLoad(res, index, lists, name) {
				console.log("返回", res, index, lists, name)
				if (res.statusCode == 200) {
					let data = JSON.parse(res.data)
					uni.showToast({
						title: "上传成功",
						icon: 'none'
					})
					this.sealImgUrl = data.filePath
				} else {
					uni.showToast({
						title: '上传失败！',
						icon: 'none'
					})
				}
			},
			// 本地图片
			chooseImages(e) {
				const that = this
				uni.chooseImage({
					count: 1, //  上传图片数量的控制
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success(res) {
						let imageLists = []
						let tempfilepaths = res.tempFilePaths //  图片的本地文件路径列表
						console.log("tempfilepaths", tempfilepaths, res)
						tempfilepaths.forEach((item, index) => {
							if (index < 1) { // 处理H5 端，多选的情况  （只有小于 count 才会被push 到数组里面）
								imageLists.push({ // push 对象到  imageLists[] 数组里面
									url: item
								})
							}
						})
						let img = ''
						try {
							img = imageLists[0].url;
						} catch (error) {
							img = window.URL.createObjectURL(imageLists[0].url);
						}
						that.sealImgUrl = img
					}
				})
				that.$nextTick(function() {
					console.log("img", that.sealImgUrl)
				})
			},
			//盖章
			seal() {
				console.log("盖章", this.sealImgUrl)
				if (this.sealImgUrl) {
					this.x = 0
					this.y = 0
					this.showSeal = true
					this.$nextTick(function() {
						this.sureShow = false
					})
				} else {
					uni.showToast({
						title: '请先上传印章~',
						icon: 'none'
					})
				}
			},
			sealSure() {
				this.sureShow = true
			},
			sealCancel() {
				this.showSeal = false
				this.x = 0
				this.y = 0
			},
			onChange(e) {

			},
			// 绘制印章单位
			createCompany() {
				this.ctx.clearRect(0, 0, 700, 730);
				this.ctx.draw();
				this.initSeal(this.companyName)
			},
			initSeal(name) {
				const context = this.ctx;
				console.log("context", context, this.width, this.height)
				let width = this.width / 2;
				let height = this.height / 2;
				var companyName = name ? name : this.companyName;
				var text = "";
				context.setLineCap('round'); //设置线两端端点样式更加圆润
				context.setLineJoin('round'); //设置两条线连接处更加圆润
				context.setStrokeStyle("#ff0000"); //设置线的颜色
				context.setLineWidth(3); //设置线条的宽度
				// context.moveTo(190, 170);
				context.arc(width, height, 90, 0, Math.PI * 2); //宽、高、半径
				context.stroke();
				//绘制底部'专用章'
				this.createTip(context, width, height)
				//绘制五角星
				this.create5star(context, width, height, 25, "#f00", 0);
				context.font = 'bold 21px SimSun';
				context.setTextBaseline('middle'); //设置文本的垂直对齐方式
				context.setTextAlign('center'); //设置文本的水平对对齐方式
				context.setLineWidth(2.5);
				context.setFillStyle('#f00');
				context.strokeText(text, 219000 + 60);
				// 绘制印章单位
				context.translate(width, height); // 平移到此位置,
				var count = companyName.length; // 字数
				var angle = 4 * Math.PI / (3 * (count - 1)); // 字间角度
				var chars = companyName.split("");
				var c;
				for (var i = 0; i < count; i++) {
					c = chars[i]; // 需要绘制的字符
					if (i == 0) {
						context.rotate(5 * Math.PI / 6);
					} else {
						context.rotate(angle);
					}
					context.save();
					context.translate(70, 0); // 平移到此位置,此时字和x轴垂直，公司名称和最外圈的距离
					context.rotate(Math.PI / 2); // 旋转90度,让字平行于x轴
					context.setFillStyle("#ff0000"); //设置填充颜色
					context.fillText(c, 0, 0); //此点为字的中心点
					context.restore();
				}
				context.draw()
			},
			//绘制五角星
			create5star(context, sx, sy, radius, color, rotato) {
				context.save();
				context.setFillStyle(color); //设置填充颜色
				context.translate(sx, sy); //移动坐标原点
				context.rotate(Math.PI + rotato); //旋转
				context.beginPath(); //创建路径
				var x = Math.sin(0);
				var y = Math.cos(0);
				var dig = Math.PI / 5 * 4;
				for (var i = 0; i < 5; i++) { //画五角星的五条边
					var x = Math.sin(i * dig);
					var y = Math.cos(i * dig);
					context.lineTo(x * radius, y * radius);
				}
				context.closePath();
				context.stroke();
				context.fill();
				context.restore();
			},
			// 绘制测试章--字体
			createTip(context, width, height) {
				console.log("width,height", this.tips, width, height)
				context.save();
				var tips = this.tips
				context.font = 'bolder 15px SimSun';
				context.textBaseline = 'middle'; //设置文本的垂直对齐方式
				context.textAlign = 'center'; //设置文本的水平对对齐方式
				context.lineWidth = 1;
				context.fillStyle = '#f00';
				context.fillText(tips, width, height + 60);
			},
			//重写
			retDraw() {
				this.ctx.clearRect(0, 0, 700, 730);
				this.ctx.draw();
			},
			//预览
			previewCanvasImg() {
				uni.canvasToTempFilePath({
					canvasId: 'yinzhang',
					fileType: 'jpg',
					quality: 1, //图片质量
					success(res) {
						uni.previewImage({
							urls: [res.tempFilePath] //预览图片 数组
						});
					}
				});
			},
			//保存到本地
			subCanvas() {
				let that = this
				that.ctx.draw(true, () => {
					uni.canvasToTempFilePath({
						canvasId: 'yinzhang',
						fileType: 'png',
						quality: 1, //图片质量
						success(res) {
							console.log(res, 'canvas生成图片地址');
							//保存到系统相册
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success(res) {
									that.$u.toast("已成功保存到相册")
								}
							});
						}
					});
				});
			},
			//上传
			uploadCanvasImg() {
				let that = this
				let token = uni.getStorageSync('token')
				uni.canvasToTempFilePath({
					canvasId: 'yinzhang',
					fileType: 'png',
					quality: 1, //图片质量
					success(res) {
						//上传
						uni.uploadFile({
							url: that.$upLoadUrl,
							filePath: res.tempFilePath,
							name: 'file',
							header: {
								'token': token
							},
							success(res) {
								let data = JSON.parse(res.data)
								uni.showToast({
									title: "上传成功",
									icon: 'none'
								})
								that.filePath = data.filePath
							}
						});
					}
				});
			},
		}
	};
</script>

<style scoped>
	/deep/ uni-canvas {
		width: 100vw;
		height: 50vh;
		margin: 0 auto;
		background: #fff url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+) repeat !important;
	}

	/deep/.uni-input-input {
		font-size: 13px;
	}

	.wrapper {}

	.swiper-box {
		width: 100vw;
		height: calc(100vh - 88rpx);
		margin: 0 auto;
	}

	.seal-box {
		width: 110px;
		height: 110px;
	}

	.seal-img {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
</style>
