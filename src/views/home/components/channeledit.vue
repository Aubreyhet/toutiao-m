<!-- 频道编辑组件 -->
<template>
  <div class='channel-edit'>
    <van-cell :border='false'>
      <div slot="title" class="title-text">我的频道</div>
      <van-button type="danger" plain round size="mini" class="edit-btn"> 编辑 </van-button>
    </van-cell>
    <van-grid :gutter="10" class="grid-item">
      <van-grid-item v-for="value in 6" :key="value" text="文字" />
    </van-grid>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  name: 'ChannelIndex',

  props: {},

  // import引入的组件需要注入到对象中才能使用
  components: {},

  data () {
    // 这里存放数据
    return {}
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {},

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
.channel-edit{
  padding: 85px 0;
  .title-text{
    font-size: 32px;
    color: #333;
  }
  .edit-btn{
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item{
    width: 160px;
    height: 86px;
    .van-grid-item__content{
      background: #f4f5f6;
      .van-grid-item__text{
        font-size: 28px;
        color: #222;
      }
    }
  }
}
</style>
