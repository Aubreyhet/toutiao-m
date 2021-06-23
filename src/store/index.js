import Vue from 'vue'
import Vuex from 'vuex'

// 导入本地数据操作的模块
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  // 定义用户Token的常量
  state: {
    // 首先提供一个数据
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    // 进行用户数据Token存储
    setUser (state, data) {
      state.user = data

      // 将数据存储到本地
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
