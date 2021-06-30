<!-- 点赞文章 -->
<template>
  <van-icon
    color="#777"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{isLike:value}"
    @click="likeFn"
    :loading='loading'
  />
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { addLike, daleteLike } from '@/api/article'

export default {
  name: 'LikeIndex',

  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },

  // import引入的组件需要注入到对象中才能使用
  components: {},

  data () {
    // 这里存放数据
    return {
      loading: false
    }
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {
    async likeFn () {
      try {
        this.loading = true
        let isLike = -1
        if (this.value === 1) {
          await daleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          isLike = 1
        }
        this.$emit('input', isLike)
        this.$toast.success(this.value === 1 ? '取消点赞' : '点赞成功')
        this.loading = false
      } catch (err) {
        this.$toast('数据操作失败，请稍后重试')
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
  .van-icon{
    color: #e5645f !important;
  }
</style>
