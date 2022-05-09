/*
 * @Author: fg
 * @Date: 2022-05-09 11:40:12
 * @LastEditors: fg
 * @LastEditTime: 2022-05-09 11:41:30
 * @Description: 工具函数
 */

/**
 * @description: 获取url参数
 * @param {*} name 获取某个属性值
 * @return {*}
 */
function getUrlParam (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

module.exports = {
  getUrlParam
}
