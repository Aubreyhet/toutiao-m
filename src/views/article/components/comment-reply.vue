<!-- 评论回复组件 -->
<template>
  <div class='comment-reply'>
    <van-nav-bar
      :title="`${comment.reply_count}条回复`"
    >
    <van-icon slot="left" name="cross" @click="$emit('close')"/>
    </van-nav-bar>
    <div class="solle-box">
      <CommentItem :item='comment'></CommentItem>
      <van-cell title="全部回复"></van-cell>
      <CommentList :articleId='comment.com_id' :list='comments' type='c'></CommentList>
    </div>

    <div class="reply-box">
      <van-button size="small" round class="rep-btn" @click="posShow=true">发表评论</van-button>
    </div>

    <van-popup v-model="posShow" position="bottom">
      <CommentPost :target='comment.com_id' @posted-succes='postsuFn'></CommentPost>
    </van-popup>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  // import引入的组件需要注入到对象中才能使用
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },

  data () {
    // 这里存放数据
    return {
      posShow: false,
      comments: []
    }
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {
    postsuFn (data) {
      // 关闭弹框
      this.posShow = false
      // 添加数据到评论列表
      this.comments.unshift(data.data.new_obj)
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
.solle-box{
  position: fixed;
  top: 240px;
  bottom: 88px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.reply-box{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88px;
  background: #fff;
  border-top: 2px solid #ccc;
  .rep-btn{
    width: 60%;
  }
}
</style>
