import Vue from 'vue'
import Vuex from 'vuex'
import {baseUrl}  from '@/common/api/config.js'

Vue.use(Vuex)


const store = new Vuex.Store({
	state: {
		forcedLogin: false,
		hasLogin: false,
		userInfo: '',
		token: '',
		wpsUrl: '',
		theme: 'default-theme'
	},
	mutations: {
		login(state, userInfo) {
			console.log(userInfo)
			state.hasLogin = true;
			state.userInfo = userInfo;
			console.log(state.userInfo)
			state.token = userInfo.token
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: userInfo
			})
			uni.setStorage({ //缓存用户登陆状态
				key: 'token',
				data: userInfo.token
			})
			uni.removeStorage({
				key: 'crmData'
			})
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = '';
			state.token = '';
			uni.removeStorage({
				key: 'userInfo'
			})
			uni.removeStorage({
				key: 'token'
			})
			uni.removeStorage({
				key: 'location'
			})
			uni.removeStorage({
				key: 'crmData'
			})
		},
		SET_TOKEN: (state, token) => {
			state.token = token
			uni.setStorage({ //缓存用户登陆状态
				key: 'token',
				data: token
			})
		},
		USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: userInfo
			})
		},
		SET_WPAURL: (state, wpsUrl) => {
			state.wpsUrl = wpsUrl
			uni.setStorage({
				key: 'wpsUrl',
				data: wpsUrl
			})
		},
		SET_THEME(state,theme){
			state.theme = theme+'-theme'
			uni.setStorage({
				key: 'theme',
				data: state.theme
			})
		}
	},
	getters: {
	    theme: state => state.theme   
	},
	actions: {
		// 第三方登录
		EnterpriseWeChatLogin({
			commit
		}, param) {
			return new Promise((resolve, reject) => {
				uni.request({
					url: baseUrl + '/system/qiyeweixin/qywxLogin.api',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: param,
					success: res => {
						const result = res.data
						console.log("result-----", result)
						if (result.statusCode === 200) {
							commit('SET_TOKEN', result.token)
							commit('USERINFO', result.userInfo)
							uni.switchTab({
								url: '/pages/home/home'
							})
							resolve()
						} else {
							commit('SET_TOKEN', 300)
							reject(result)
						}
					},
					fail: function(res) {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				});
			})
		},

	}
})

export default store
