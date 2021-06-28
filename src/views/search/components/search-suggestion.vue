<!-- 搜索联想页面 -->
<template>
  <div class='search-sugges'>
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
    <div slot="title" v-html="highligh(text)"></div>
    </van-cell>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SuggesIndex',

  props: {
    searchText: {
      type: String,
      required: true
    }
  },

  // import引入的组件需要注入到对象中才能使用
  components: {},

  data () {
    // 这里存放数据
    return {
      suggestions: []
    }
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {
    searchText: {
      // handler (val) {
      //   this.loadGetSuggestions(val)
      // },
      handler: debounce(function (val) {
        this.loadGetSuggestions(val)
      }, 200),
      immediate: true
    }
  },

  // 方法集合
  methods: {
    async loadGetSuggestions (val) {
      try {
        const { data } = await getSearchSuggestions(val)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据请求失败，请稍后重试')
      }
    },
    highligh (text) {
      const newStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, newStr)
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例
  created () {},

  // 生命周期 - 挂载完成（可以访问DOM元素
  mounted () {},

  beforeCreate () {}, // 生命周期 - 创建之前

  beforeMount () {}, // 生命周期 - 挂载之前

  beforeUpdate () {}, // 生命周期 - 更新之前

  updated () {}, // 生命周期 - 更新之后

  beforeDestroy () {}, // 生命周期 - 销毁之前

  destroyed () {}, // 生命周期 - 销毁完成

  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='less' scoped>
// @import url(); 引入公共css类
.search-sugges{
  /deep/ span.active{
    color: #3296fa;
  }
}
</style>
