<!-- 文章评论列表 -->
<template>
  <div class='comment-list'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.content" /> -->
      <CommentItem v-for="(item, index) in list" :key="index" :item="item" @replyClick="$emit('replyClick', $event)"></CommentItem>
    </van-list>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { getComments } from '@/api/comment.js'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',

  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (val) {
        return ['a', 'c'].includes(val)
      },
      default: 'a'
    }
  },

  // import引入的组件需要注入到对象中才能使用
  components: {
    CommentItem
  },

  data () {
    // 这里存放数据
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
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
        // 1.异步获取数据
        console.log('请求品论')
        const { data } = await getComments({
          type: this.type, // 请求的数据类型 a是文章的评论 c是评论的评论
          source: this.articleId.toString(), // 数据的id 如文章的id 或者评论的id
          offset: this.offset, // 获取文章的偏移量 默认是null
          limit: this.limit // 获取评论的条数
        })
        // 2.将数据赋值给变量
        const { results } = data.data
        console.log(this.articleId)
        // console.log(this.list)
        this.list.push(...results)
        // console.log(this.list)
        // 将请求回来的数据传给父组件
        this.$emit('comment-count', data.data)
        // 3.将loading设置为false
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          // 如果有数据 就将请求下次的id赋值给变量
          this.offset = data.data.last_id
        }
        // 如果没有就将finshed 设置为完成状态
        this.finished = true
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
        this.loading = false
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例
  created () {
    this.onLoad()
  },

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

</style>
