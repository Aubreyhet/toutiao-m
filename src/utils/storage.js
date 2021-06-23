// 本地存储模块封装

/**
 *  本地存储 数据存储
 */

export const setItem = (key, data) => {
  // 如果数据是数组或者对象类型的 转成json字符串类型进行存储
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  window.localStorage.setItem(key, data)
}

/**
 *  本地存储 数据的获取
 */

export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  // 进行错误捕获处理 能转成数组或者对象的 返回转换后的数据 不能转换的直接将数据返回出去
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

/**
 *  本地存储 数据的删除
 */

export const removeItem = (key) => {
  // 直接进行移除即可
  window.localStorage.removeItem(key)
}
