<!-- 收藏按钮组件 -->
<template>
  <van-icon
    color="#777"
    :name="value ? 'star' : 'star-o'"
    :class="{iscollect:value}"
    @click="collectFn"
    :loading='loading'
  />
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { addCollect, daleteCollect } from '@/api/article'
export default {
  name: 'CollectIndex',

  props: {
    value: {
      type: Boolean,
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
    async collectFn () {
      this.loading = true
      try {
        // 先进行判断收藏状态 已经收藏就调用取消收藏 反之调用收藏
        if (this.value) {
          await daleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$toast.success(!this.value ? '收藏成功' : '收藏失败')
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast('数据处理失败，请稍后重试')
      }
      this.loading = false
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
  color: #ffa500 !important;
}
</style>
