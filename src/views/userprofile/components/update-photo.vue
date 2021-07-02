<!-- 头像设置组件 -->
<template>
  <div class='update-photo'>
    <img class="img" :src="img" ref="img">
    <div class="tools">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">确认</div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等
// 例如：import 《组件名称》 from '《组件路径》'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { upDateUserPhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',

  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },

  // import引入的组件需要注入到对象中才能使用
  components: {},

  data () {
    // 这里存放数据
    return {
      cropper: null
    }
  },

  // 监听属性 类似于data概念
  computed: {},

  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {
    onConfirm () {
      console.log(123)
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.upDateUserPhotoFn(blob)
      })
    },
    async upDateUserPhotoFn (formObj) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const formData = new FormData()
        formData.append('photo', formObj)
        const { data } = await upDateUserPhoto(formData)
        this.$emit('close')
        this.$emit('change-photo', data.data.photo)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败，请稍后重试')
      }
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例
  created () {},

  // 生命周期 - 挂载完成（可以访问DOM元素
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },

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
.update-photo{
  background-color: #000;
  height: 100%;
  .img{
    max-width: 100%;
    display: block;
  }
  .tools{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    font-size: 40px;
    div{
      width: 90px;
      height: 90px;
      text-align: center;
      line-height: 90px;
      color: #fff;
    }
  }
}
</style>
