import Vue from 'vue'
import App from './App'
import store from './store'
import uView from 'uview-ui'

import { baseUrl,redirectUrl,upLoadUrl,appId} from '@/common/api/config.js' //接口地址文件
import { http } from '@/common/api/index.js' // 全局挂载引入，配置相关在该common->api->index.js文件里修改
import customComponents from '@/components/custom'// 自定义组件全局注册  --->不含页面(pages)组件

import mixin from '@/utils/mixin/checkMixin.js' //全局监听、 utils->mixin->checkMixin.js
Vue.use(mixin)
import utils from '@/utils/utils.js' //全局方法 utils->utils.js
Vue.use(utils)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$http = http
Vue.use(customComponents)
Vue.use(uView)

//app各接口地址 在common->api->config文件修改
Vue.prototype.$redirectUrl = redirectUrl;  //回调地址
Vue.prototype.$baseUrl = baseUrl;  //接口地址
Vue.prototype.$upLoadUrl = upLoadUrl;  //图片上传地址
Vue.prototype.$appId = appId; //企业微信appId

// #ifdef MP || H5
// import vconsole from './static/vconsole.min.js' // 引入vconsole   -- H5调试
// Vue.prototype.$vconsole = new vconsole() // 使用vconsole
// #endif

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()
