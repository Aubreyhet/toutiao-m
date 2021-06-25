<!-- 文章列表组件 -->
<template>
  <div class='articlec-list'>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text='refReshText'>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell v-for="(obj, index) in artList"  :key="index" :title="obj.title"/> -->
        <ArticleItem
          v-for="(obj, index) in artList"
          :key="index"
          :title="obj.title"
          :articleObj='obj'
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticlecList',

  props: {
    channel: {
      type: Object,
      required: true
    }
  },

  // import引入的组件需要注入到对象中才能使用
  components: {
    ArticleItem
  },

  data () {
    // 这里存放数据
    return {
      artList: [],
      loading: false,
      finished: false,
      error: false, // 控制列表加载失败的错误状态
      times_tamp: null, // 请求数据的时间戳
      isLoading: true,
      refReshText: '刷新成功'
    }
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.times_tamp || Date.now(),
          with_top: 1
        })
        // 模拟抛出错误
        // if ( Math.random() > 0.5) {
        //   JSON.parse('jugiugkjhi')
        // }
        const { results } = data.data
        // 把请求的结果数据放到data list 数组中
        // 使用数组的展开操作将数据push进去
        this.artList.push(...results)

        // 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false

        if (results.length) {
          // 判断数据是否全部加载完成
          // 如果还有数据 更新获取下一页数据的时间戳
          this.times_tamp = data.data.pre_timestamp
        } else {
          // 如果没有数据了 就将finished 设置为完成
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    // 下拉属性的方法
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(), // 永远获取最新的数据
          with_top: 1
        })
        // 错误模拟
        // if ( Math.random() > 0.2) {
        //   JSON.parse('jugiugkjhi')
        // }
        // 将请求到的数据unshift 到数组的最上边
        const { results } = data.data
        this.artList.unshift(...results)
        this.isLoading = false
        this.refReshText = `加载成功，更新${results.length}条数据`
      } catch (err) {
        this.isLoading = false
        this.refReshText = '加载失败'
      }
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
.articlec-list{
  height: 79vh;
  overflow-y: auto;
}
</style>
