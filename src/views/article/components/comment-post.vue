<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="sendComment"
      :disabled='!message.length'
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  inject: ['articleId'],
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async sendComment () {
      try {
        const data = await addComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : null
        })
        console.log(this.articleId, this.message)
        // 发布成功之后操作
        // 关闭tankuang调用父组件自定义事件 将返回的数据传过去
        this.message = ''
        this.$emit('posted-succes', data.data)
        this.$toast.success('评论成功')
      } catch (err) {
        console.log(err.response)
        this.$toast.fail('操作失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
