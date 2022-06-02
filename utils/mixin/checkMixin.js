import {
	mapGetters,
	mapMutations
} from 'vuex'
import Vue from 'vue'
export default {
	install(Vue) {
		Vue.mixin({
			computed: {
				...mapGetters({
					vtheme: 'theme',
				})
			},
			onShow() {
				const token = uni.getStorageSync("token")
				var path = '' //路由路径
				var fullPath = '' //路由路径带参数
				var pages = getCurrentPages(); //获取路由栈
				if(pages && pages[pages.length - 1]){
					let curRoute = pages[pages.length - 1].route //获取当前页面路由
					let curParam = pages[pages.length - 1].options; //获取路由参数
					let param = this.$u.queryParams(curParam)					// 拼接参数
					path = curRoute //当前页面路由栈路由路径
					fullPath = curRoute + param
				}
				let router = [ //路由白名单
					'',
					'/',
					'#/',
					'pages/login/login',
					'pages/login/author',
					'pages/index/guide',
					'pages/index/index'
				]
				// 路由白名单判断页面跳转前是否验证token
				if(router.includes(path)){
					// console.log("login 和  author 、引导页 排除mixinOnshow")
					uni.removeStorage({ //清除crm缓存数据
						key: 'crmData'
					});
				} else {
					uni.setStorage({
						key: 'location',
						data: fullPath
					})
					if (token && token != 300) {
						this.$http.post('/system/checkToken', {
								token: token
							}).then((res) => {
								if(res.statusCode != 200){
									this.goLogin()
								}
							}).catch((err) => {
								this.goLogin()
							});
					} else {
						this.goLogin()
					}
				}
			},
			methods: {
				...mapMutations({
					vGetTheme: 'GET_THEME',
				}),
				goLogin(){
					this.$u.toast('登录失效，请重新登录！')
					uni.removeStorage({
						key: 'token',
						success: function(res) {}
					});
					// 有企业微信
					if(this.isWechat()){
						uni.reLaunch({
							url: '/pages/login/author'  //企业微信
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'   //账户登录
						})
					}
					// 无企业微信
					// uni.reLaunch({
					// 	url: '/pages/login/login'   //账户登录
					// })
				}
			}
		})
	}
}
