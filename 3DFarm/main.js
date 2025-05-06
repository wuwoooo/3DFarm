//#ifndef VUE3
import Vue from 'vue'
import App from './App'
import lib from "./common/lib.js"
Vue.prototype.lib = lib
import utils from './common/utils.js'
Vue.prototype.utils = utils
import global from './common/global.js'
Vue.prototype.global = global
//#ifdef H5
import wx from './common/wx.js'
Vue.prototype.wx = wx
//#endif

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
//#endif

//#ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
//#endif