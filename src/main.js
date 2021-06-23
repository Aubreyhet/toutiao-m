import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant组件库
import Vant from 'vant'
// 引入组件库样式
import 'vant/lib/index.css'

// 导入全局样式
import './styles/index.less'
// 字体图标样式
import './styles/icon.less'

// 引入amfe-flexible做适配
import 'amfe-flexible'

// 使用vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
