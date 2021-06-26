<!--  -->
<template>
  <div class='home-container'>
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        type="info"
        slot="title"
        size="small"
        round
        icon="search"
      >搜索</van-button>
    </van-nav-bar>

    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab :title="v.name" v-for="v in channels" :key="v.id">
        <ArticleList :channel="v"/>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamhurger-btn" @click="popupIsShow=true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="popupIsShow"
      round
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '90%' }"
    >
    <ChannelEdit></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { getUserChannels } from '@/api/user'
import ArticleList from './components/articlelist'
import ChannelEdit from './components/channeledit.vue'

export default {
  name: 'HomeIndex',

  props: {},

  // import引入的组件需要注入到对象中才能使用
  components: {
    ArticleList,
    ChannelEdit
  },

  data () {
    // 这里存放数据
    return {
      active: 0,
      channels: [],
      popupIsShow: false
    }
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {
    // 调用获取用户频道的接口
    async getUserChannelsFn () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (error) {
        console.log(error.request)
      }
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例
  created () {
    this.getUserChannelsFn()
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
.home-container{
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title{
    max-width: 100% !important;
  }
  .search-btn{
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon{
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs{
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active{
      color: #333;
    }
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .van-tabs__line{
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color:#3296fa;
    }
    .placeholder{
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamhurger-btn{
      position:fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, .902);
      i.icon{
        font-size: 33px;
      }
      &:before{
        content: '';
        position:absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
