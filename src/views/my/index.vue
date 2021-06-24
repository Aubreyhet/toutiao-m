<!-- 我的页面 -->
<template>
  <div class='my-container'>
    <!-- 个人中心未登录状态的制作 -->
    <div class="header no-login" v-if="!user">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="login-img" src="../../assets/mobile.png">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

      <!-- 登录状态个人信息展示 -->
    <div class="header user-info" v-else>
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            round
            fit='cover'
            :src="userInfo.photo"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" plain round>编辑资料</van-button>
        </div>
      </div>

      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="item-name">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="item-name">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="item-name">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="item-name">获赞</span>
        </div>
      </div>
    </div>
    <!-- 宫格导航 -->
    <van-grid class="grid-nav" :column-num="2">
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 消息通知&智能对话 -->
    <van-cell title="消息通知" is-link/>
    <van-cell class="mb-9" title="小智同学" is-link/>

    <!-- 退出登录 -->
    <van-cell title="退出登录" class="logout-cell" v-if="user" @click="onlogout" clickable/>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',

  props: {},

  // import引入的组件需要注入到对象中才能使用
  components: {},

  data () {
    // 这里存放数据
    return {
      userInfo: {}
    }
  },

  // 监听属性 类似于data概念
  computed: {
    ...mapState(['user'])
  },

  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {
    onlogout () {
      // 点击退出登录 退出当前登录状态 删除user数据
      this.$dialog.confirm({
        title: '标题',
        message: '弹窗内容'
      })
        .then(() => {
          // 点击确认按钮 退出登录 清除用户信息
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 点击取消，取消操作 什么也不做
          console.log('取消？')
        })
    },

    // 获取个人用户信息
    async onGetUserInfo () {
      try {
        const res = await getUserInfo()
        console.log(res.data.data)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例
  created () {
    this.onGetUserInfo()
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
.my-container{
  background-color: #f5f7f9;
  .header{
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .no-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .login-img{
        width: 132px;
        height: 132px;
        padding-bottom: 15px;
      }
      .text{
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info{
    .base-info{
      padding: 70px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .avatar{
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name{
          font-size: 28px;
          color: #fff;
        }
      }
    }
    .data-stats{
      padding: 0 32px;
      display: flex;
      align-items: center;
      .data-item{
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count{
          font-size: 36px;
        }
        .item-name{
          font-size: 23px;
        }
      }
    }
  }
  // 宫格导航样式
  .grid-nav{
    height: 145px;
    .grid-item{
      i.iconfont{
        font-size: 45px;
        padding-bottom:10px;
      }
      i.icon-shoucang{
        color: #eb5253;
      }
      i.icon-lishi{
        color: #ff9d1d;
      }
      span.text{
        font-size: 28px;
      }
    }
  }

  // 消息通知与小智同学样式
  .logout-cell{
    text-align: center;
    color: #d86262;
  }
}
</style>
