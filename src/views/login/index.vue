<!--  -->
<template>
  <div class='login-container'>
      <van-nav-bar title="登录" class="page-nav-bar">
        <template #left>
          <van-icon name="cross" size="18" @click="$router.back()"/>
        </template>
      </van-nav-bar>
      <van-form @submit="onSubmit" ref="loginForm">
        <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="请输入手机号"
          type="number"
          maxlength="11"
          :rules="userFormRules.mobile"
        >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
        </van-field>
        <van-field
          v-model="user.code"
          name="code"
          placeholder="请输入验证码"
          type="number"
          maxlength="6"
          :rules="userFormRules.code"
        >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button >
          <van-count-down
            :time="1000 * 6"
            format="ss 秒之后重试"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            size="small"
            type="primary"
            round
            class="send-sms-btn"
            native-type="button"
            @click="sendSms"
          >
          获取验证码
          </van-button>
        </template>
        </van-field>
        <div class="submit-btn">
          <van-button block type="info" native-type="submit" class="btn">登录</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { loginAPI, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',

  props: {},

  // import引入的组件需要注入到对象中才能使用
  components: {},

  data () {
    // 这里存放数据
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {

    // 提交表单点击登录按钮处理函数
    async onSubmit () {
      // 1.获取输入框信息
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // 2.验证用户信息是否合法
      // 3.提交表单请求登录
      // 4.对请求响应进行处理
      try {
        const { data } = await loginAPI(user)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
        this.$router.push('/my')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },

    // 点击获取验证码按钮处理函数
    async sendSms () {
      // 校验手机号
      try {
        this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log(err)
      }
      // 倒计时处理
      console.log(123)
      this.isCountDownShow = true
      // 发起请求
      try {
        await sendSms(this.user.mobile)
        this.$toast('验证码发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('发送过于频繁，请稍后重试')
        } else {
          this.$toast('验证码发送失败，请稍后重试')
        }
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
.login-container{
  .iconfont{
    font-size: 37px;
  }
  .send-sms-btn{
    width: 155px;
    height: 47px;
    background-color: #ededed;
    border: none;
    color: #666666;
    font-size: 22px;
  }
  .submit-btn{
    padding: 53px 33px;
    .btn{
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
