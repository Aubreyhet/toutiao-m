<!-- 文章列表项 -->
<template>

  <van-cell class="article-index" :to="`/article/${articleObj.art_id}`">
    <div slot="title" class="van-multi-ellipsis--l2">{{ articleObj.title }}</div>
    <div slot="label">
      <div v-if="articleObj.cover.type === 3" class="cover-wrap">
        <div v-for="(obj, index) in articleObj.cover.images" :key="index" class="cover-item">
          <van-image
            class="cover-item-img"
            :src="obj"
            fit='cover'
          />
        </div>
      </div>
      <div class="art-aut">
          <span>{{ articleObj.aut_name }}</span>
          <span>{{ articleObj.comm_count }}</span>
          <span>{{ articleObj.pubdate | relativeTime }}</span>
        </div>
    </div>
    <van-image
        v-if="articleObj.cover.type === 1"
        slot="default"
        class="right-cover"
        fit='cover'
        :src="articleObj.cover.images[0]"
      />
  </van-cell>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  name: 'ArticleIndex',

  props: {
    articleObj: {
      type: Object,
      required: true
    }
  },

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
  created () {
    // console.log(this.articleObj.cover.images)
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
.article-index{
  .title{
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value{
    flex: unset;
    width: 232px;
    height: 146px;
    margin-left: 25px;
  }
  .right-cover{
    width: 232px;
    height: 146px;
  }
  .art-aut span{
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap{
    display: flex;
    padding: 30px 0;
    .cover-item{
      flex: 1;
      height: 146px;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item-img{
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
