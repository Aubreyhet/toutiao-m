<!-- 搜索页面 -->
<template>
  <div class='search-index'>
    <!-- 搜索组件 -->
    <form action="/" class="postion">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="searchIsShow = false"
      />
    </form>
    <!-- /搜索组件 -->

    <!-- 搜索相关自组件 -->
    <!-- 搜索结果 -->
    <SearchResult :searchText='searchText' v-if="searchIsShow"></SearchResult>
    <!-- 搜索联想 -->
    <SearchSugges @search='onSearch' :searchText='searchText' v-else-if="searchText"></SearchSugges>
    <!-- 搜索历史 -->
    <SearchHistory @clearAll='searchHistors = []' @search='onSearch' :searchHistors='searchHistors' v-else></SearchHistory>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import SearchHistory from './components/search-history.vue'
import SearchSugges from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'

import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',

  props: {},

  // import引入的组件需要注入到对象中才能使用
  components: {
    SearchHistory,
    SearchSugges,
    SearchResult
  },

  data () {
    // 这里存放数据
    return {
      searchText: '',
      searchIsShow: false,
      searchHistors: getItem('SEARCH_HISTORS') || []
    }
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {
    searchHistors (val) {
      setItem('SEARCH_HISTORS', val)
    }
  },

  // 方法集合
  methods: {
    onCancel () {
      this.$router.back()
    },
    onSearch (val) {
      this.searchText = val
      // 在搜索结果显示前存储搜索记录 数据不能重复 将最新的数据存到数组的最前边
      const index = this.searchHistors.indexOf(val)
      if (index !== -1) {
        this.searchHistors.splice(index, 1)
      }
      this.searchHistors.unshift(val)
      this.searchIsShow = true
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
.search-index{
  padding-top: 108px;
  .van-search__action{
    color: #fff;
  }
  .postion{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index:1;
  }
}
</style>
