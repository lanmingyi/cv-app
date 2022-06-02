export default {
	install(Vue, options) {
		Vue.prototype.isNull = (data) => { //判断是否为空
		    return (data === "" || data === undefined || data === null || typeof(data)==="undefined");
		}
		//获取地址参数
		Vue.prototype.getQueryString = (name) => {
		    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(
		        /\+/g, '%20')) || null
		}
		Vue.prototype.convertBase64UrlToBlob = (dataurl, filename) => {  //图片base64w位转成图片流
			var arr = dataurl.split(',')
			var mime = arr[0].match(/:(.*?);/)[1]
			var bstr = atob(arr[1])
			var n = bstr.length
			var u8arr = new Uint8Array(n)
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n)
			}
			return new File([u8arr], filename, {
				type: mime
			})
		}
		Vue.prototype.toHump = (name)=> {  //单个属性下划线转驼峰
		    return name.replace(/\_(\w)/g, function(all, letter){
		        return letter.toUpperCase();
		    });
		}
		Vue.prototype.objectHumpToLine = (obj) => {  //对象属性名驼峰转下划线
			var newObj = new Object()
			for (let key in obj) {
					newObj[key.replace(/([A-Z])/g, "_$1").toLowerCase()] = obj[key]
			}
			return newObj
		}
		Vue.prototype.lineToObjectHump = (obj) => {  //对象属性名下划线转驼峰
			var newObj = new Object()
			for (let key in obj) {
					let name = Vue.prototype.toHump(key)
					newObj[name] = obj[key]
			}
			return newObj
		}
		Vue.prototype.mergeFromList = (data,type)=>{ //合并模板表单和列表数据显示
			let list = uni.getStorageSync('jsonData')
			list.map((val, index) => {
				if(type == 'details'){
					list[index].options.disabled = true; //禁止表单编辑
					list[index].options.border = false;  //禁止边框显示
					list[index].options.required = false;  //禁止显示表单左上角红点
				}
				list[index].options.value = data[list[index].options.name] //插入表单数据value值
			})
			return list
		}
		Vue.prototype.now = Date.now || function () {
			return new Date().getTime();
		}
		Vue.prototype.isArray = Array.isArray || function (obj) {
			return obj instanceof Array;
		}
		Vue.prototype.getHashParameters = () => { //获取地址栏字段
			var arr = (location.hash || '').split('?')[1].split('&')
			var params = {}
			for (var i = 0; i < arr.length; i++) {
				var data = arr[i].split('=')
				if (data.length === 2) {
					params[data[0]] = data[1]
				}
			}
			return params
		}
		Vue.prototype.colorType = () => { //  随机颜色
			let theme = uni.getStorageSync('theme')
			let name = theme.split("-")[0];
			let colorList = []
			if (name == 'green') {
				colorList = ['#DF6856', '#ff9955', '#5DCBB9', '#22ACF5', '#74b97d', '#53AECE', '#FBBD08']
			} else {
				colorList = ['#DF6856', '#F5A267', '#5DCBB9', '#22ACF5', '#74b97d']
			}
			var i = colorList[Math.floor(Math.random() * colorList.length)];
			return i;
		}
		Vue.prototype.delayTime = (index) => { //获取延迟时间
			return Number((index + 0.2) * 0.05) + 's';
		}
		Vue.prototype.isWechat = () => { //判断是否是微信端
			// #ifdef APP-PLUS
			console.log('app端')
			return false;
			// #endif
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/micromessenger/i) == 'micromessenger') {
				console.log('是微信客户端')
				return true;
			} else {
				console.log('不是微信客户端')
				return false;
			}
		}
		Vue.prototype.filter = (num) => { //过滤转换
			switch (num) {
				case 1:
					return '一'
					break;
				case 2:
					return '二'
					break;
				case 3:
					return '三'
					break;
				case 4:
					return '四'
					break;
				case 5:
					return '五'
					break;
				case 6:
					return '六'
					break;
				default:
					return '日'
			}
		}
		Vue.prototype.stateColor = (state) => {  //转换色值
			switch (state) {
				case '待沟通':
					return '#FF0033'
					break;
				case '无需求':
					return '#CCCCCC'
					break;
				case '需回访':
					return '#ff9900'
					break;
				case '跟进中':
					return '#66CCFF'
					break;
				case '决策中':
					return '#009999'
					break;
				case '洽谈中':
					return '#663399'
					break;
				case '已成单':
					return '#339933'
					break;
				default:
					return '#FF0033'
			}
		}
		Vue.prototype.ColorList = [{
				title: '嫣红',
				name: 'red',
				color: '#e54d42',
			},
			{
				title: '桔橙',
				name: 'orange',
				color: '#f37b1d',
			},
			{
				title: '明黄',
				name: 'yellow',
				color: '#fbbd08',
			},
			{
				title: '橄榄',
				name: 'olive',
				color: '#8dc63f',
			},
			{
				title: '森绿',
				name: 'green',
				color: '#39b54a',
			},
			{
				title: '天青',
				name: 'cyan',
				color: '#1cbbb4',
			},
			{
				title: '海蓝',
				name: 'blue',
				color: '#0081ff',
			},
			{
				title: '姹紫',
				name: 'purple',
				color: '#6739b6',
			},
			{
				title: '木槿',
				name: 'mauve',
				color: '#9c26b0',
			},
			{
				title: '桃粉',
				name: 'pink',
				color: '#e03997',
			},
			{
				title: '棕褐',
				name: 'brown',
				color: '#a5673f',
			},
			{
				title: '玄灰',
				name: 'grey',
				color: '#8799a3',
			},
			{
				title: '草灰',
				name: 'gray',
				color: '#aaaaaa',
			},
			{
				title: '墨黑',
				name: 'black',
				color: '#333333',
			},
			{
				title: '雅白',
				name: 'white',
				color: '#ffffff',
			},
		]
	}
}
