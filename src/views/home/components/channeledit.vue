<!-- 频道编辑组件 -->
<template>
  <div class='channel-edit'>
    <van-cell :border='false'>
      <div slot="title" class="title-text">我的频道</div>
      <van-button
      type="danger"
      plain
      round
      size="mini"
      class="edit-btn"
      @click="isEdit = !isEdit">
      {{ isEdit ? '完成' : '编辑'}}
      </van-button>
    </van-cell>
    <van-grid :gutter="10" class="grid-item">
      <van-grid-item v-for="(obj, index) in channelArr" :key="index" @click="channelSelfFn(obj, index)">
        <van-icon slot="icon" name="close" v-show="isEdit && !fixdChannel.includes(obj.id)"/>
        <span slot="text" class="text" :class="{active: index == active}">{{ obj.name }}</span>
      </van-grid-item>
    </van-grid>

    <van-cell :border='false'>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="grid-item">
      <van-grid-item v-for="(obj, index) in comChannel" :key="index" :text="obj.name" icon="plus" @click="addChannel(obj)"/>
    </van-grid>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { getChannelList } from '@/api/channel.js'
export default {
  name: 'ChannelIndex',

  props: {
    channelArr: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },

  // import引入的组件需要注入到对象中才能使用
  components: {},

  data () {
    // 这里存放数据
    return {
      allChannelList: [],
      isEdit: false, // 编辑和完成状态切换
      fixdChannel: [0] // 固定显示不能删除的
    }
  },

  // 监听属性 类似于data概念
  computed: {
    // 使用计算属性过滤 全部频道除去用户频道就是推荐频道
    comChannel () {
      // 两种实现方法
      // 1.使用数组的foreach 和find 方法
      // const newArr = []
      // this.allChannelList.forEach(item => {
      //   const res = this.channelArr.find(chan => chan.id === item.id)
      //   if (!res) {
      //     newArr.push(item)
      //   }
      // })
      // return newArr

      // 2.使用数组的filter 过滤和find 方法
      // 数组filter 方法会返回一个数组
      return this.allChannelList.filter(item => !this.channelArr.find(chan => chan.id === item.id))
    }
  },

  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {
    async getChannelListFn () {
      try {
        const { data } = await getChannelList()
        this.allChannelList = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    addChannel (o) {
      this.channelArr.push(o)
    },
    // 点击我的频道去判断是完成状态还是编辑状态 然后做出相应动作
    channelSelfFn (obj, index) {
      if (this.isEdit) {
        // 如果是编辑状态下 一 不能删除固定频道的数据
        if (this.fixdChannel.includes(obj.id)) {
          return
        }
        // 做删除操作
        this.channelArr.splice(index, 1)
        // 如果删除的是获取焦点之前的频道 要将选中的active加一操作, 但是编辑框不能隐藏掉需要继续显示
        if (index < this.active) {
          this.$emit('updata-active', index, true)
        }
      } else {
        // 非编辑状态 就跳转到相应的频道  需要调用父组件的自定义事件
        this.$emit('updata-active', index, false)
      }
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例
  created () {
    this.getChannelListFn()
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
  /deep/ .van-grid-item{
    .van-icon-close{
      font-size: 40px;
      position: absolute;
      top: -15px;
      right: -15px;
      color: #cacaca;
      z-index: 2;
     }
    width: 160px;
    height: 86px;
    .van-grid-item__content{
      flex-direction: row;
      background: #f4f5f6;
      white-space: nowrap;
      .van-icon-plus{
        font-size: 28px;
        margin-right: 4px;
      }
      .van-grid-item__text, .text{
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active{
        color: red;
      }
      .van-grid-item__icon-wrapper{
        position:unset;
      }
    }
  }
}
</style>
