/*
 * @Author: fg
 * @Date: 2022-05-06 10:28:25
 * @LastEditors: fg
 * @LastEditTime: 2022-05-06 15:14:46
 * @Description: 主入口
 */
import resizeRem from './libs/rem.js'
import './style/index.css'
import './libs/jquery.min.js'
import InputPage from './inputPage.js'
console.log('src/index')

window.onload = function () {
  InputPage.init()
  resizeRem()
}
