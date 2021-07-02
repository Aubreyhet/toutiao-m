<!-- 用户资料页面 -->
<template>
  <div class='user-profile'>
    <van-nav-bar title="个人中心" class="page-nav-bar" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-cell @click="$refs.file.click()" title="头像" is-link>
      <van-image
        class="avater"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <!-- 头像选择 -->
    <input type="file" hidden ref="file" @change="onChangeFn">
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow = true"></van-cell>
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isUpdateGenderShow=true"></van-cell>
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdataBirthdayShow=true"></van-cell>

    <!-- 编辑用户昵称弹框 -->
    <van-popup position="bottom" style="height:100%" v-model="isUpdateNameShow">
      <UpdateName @close="isUpdateNameShow=false" v-model="user.name" v-if="isUpdateNameShow"></UpdateName>
    </van-popup>

    <!-- 编辑用户性别弹框 -->
    <van-popup position="bottom" v-model="isUpdateGenderShow">
      <UpdateGender @close="isUpdateGenderShow=false" v-model="user.gender" v-if="isUpdateGenderShow"></UpdateGender>
    </van-popup>

    <van-popup position="bottom" v-model="isUpdataBirthdayShow">
      <UpdateBirthday @close="isUpdataBirthdayShow=false" v-model="user.birthday" v-if="isUpdataBirthdayShow"/>
    </van-popup>

    <van-popup position="bottom" v-model="isUpdataPhotoShow" style="height:100%">
      <UpdatePhoto @change-photo='user.photo = $event' @close="isUpdataPhotoShow=false" :img='img'/>
    </van-popup>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',

  props: {},

  // import引入的组件需要注入到对象中才能使用
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },

  data () {
    // 这里存放数据
    return {
      user: {}, // 用户信息对象
      isUpdateNameShow: false, // 显示隐藏编辑昵称
      isUpdateGenderShow: false,
      isUpdataBirthdayShow: false,
      isUpdataPhotoShow: false,
      img: null
    }
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        this.$toast('数据获取失败，稍后重试')
      }
    },
    onChangeFn () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdataPhotoShow = true
      this.$refs.file.value = ''
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例
  created () {
    this.loadUserProfile()
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
.user-profile{
  .avater{
    width: 60px;
    height: 60px;
  }
  .van-popup{
    background-color: #f5f7f9;
  }
}
</style>
