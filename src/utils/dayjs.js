// 导入vue准备将时间处理方法以过滤器的方式挂载到vue上
import Vue from 'vue'
// 导入时间格式化模块
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

// 导入语言包
dayjs.locale('zh-cn')

// 导入相对时间包
dayjs.extend(relativeTime)

Vue.filter('relativeTime', val => dayjs().to(dayjs(val)))
