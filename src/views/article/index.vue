<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="黑马头条"
    >
    <template #left>
      <van-icon name="arrow-left" size="18" @click="$router.back()"/>
    </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleInfo.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleInfo.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleInfo.aut_name }}</div>
          <div slot="label" class="publish-date">{{ articleInfo.pubdate | relativeTime}}</div>

          <van-button
            v-if="articleInfo.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="followFn"
            :loading='isFollow'
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="followFn"
            :loading='isFollow'
          >关注</van-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" ref="artInfoBody" v-html="articleInfo.content"></div>
        <van-divider>正文结束</van-divider>
        <CommentList :articleId='articleInfo.art_id' @comment-count='commentCount = $event.total_count'/>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            :info="commentCount"
            color="#777"
          />
          <CollectArticle v-model="articleInfo.is_collected" :articleId='articleInfo.art_id'/>
          <LikeArticle v-model="articleInfo.attitude" :articleId='articleInfo.art_id'/>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus == 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleInfoById">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

  </div>
</template>

<script>
import { getArticleInfo } from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, delFollow } from '@/api/user'
import CollectArticle from '@/components/collect-artcile.vue'
import LikeArticle from '@/components/like-artcile.vue'
import CommentList from './components/comment-list.vue'

export default {
  name: 'ArticleIndex',
  components: {
    CollectArticle,
    LikeArticle,
    CommentList
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      articleInfo: {}, // 文章数据
      errStatus: 0,
      loading: true,
      isFollow: false,
      commentCount: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleInfoById()
  },
  mounted () {},
  methods: {
    async getArticleInfoById () {
      this.loading = true
      try {
        const { data } = await getArticleInfo(this.articleId)
        this.articleInfo = data.data
        console.log(this.articleInfo)
        setTimeout(() => {
          this.ImagePreviewfn()
        }, 0)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
      }
      // 不管请求成功与失败 都应该将loading 状态设置为false
      this.loading = false
    },
    ImagePreviewfn () {
      const images = []
      const imgNode = this.$refs.artInfoBody.querySelectorAll('img')
      imgNode.forEach((ele, index) => {
        images.push(ele.src)
        ele.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    async followFn () {
      this.isFollow = true
      try {
        // 如果是关注状态就 取消关注 反之添加关注
        if (this.articleInfo.is_followed) {
          const res = await delFollow(this.articleInfo.aut_id)
          console.log(res)
        } else {
          await addFollow(this.articleInfo.aut_id)
        }
        this.articleInfo.is_followed = !this.articleInfo.is_followed
      } catch (err) {
        let errMessage = '请求失败，请稍后重试'
        console.log(err.response)
        if (err.response && err.response.status === 400) {
          errMessage = '您自己不能关注自己'
        }
        this.$toast(errMessage)
      }
      this.isFollow = false
    }
  }
}
</script>

<style scoped lang="less">
@import './markdowncss.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    /deep/ .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
