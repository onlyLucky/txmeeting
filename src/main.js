/*
 * @Author: fg
 * @Date: 2022-05-06 10:28:25
 * @LastEditors: fg
 * @LastEditTime: 2022-05-06 14:04:13
 * @Description: 主入口
 */
import './libs/rem.js'
import './style/index.css'
import InputPage from './inputPage.js'
console.log('src/index')

window.onload = function () {
  InputPage.init()
}
