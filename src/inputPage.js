
/*
 * @Author: fg
 * @Date: 2022-05-06 13:39:52
 * @LastEditors: fg
 * @LastEditTime: 2022-05-09 14:15:23
 * @Description: InputPage
 */
import { getUrlParam } from './libs/utools'
import Config from '../public/config'
const InputPage = {
  init () {
    const that = this
    document.getElementById('confirmBtn').onclick = this.handleBtnTap
    // fetch('./public/pages/index.html').then(res => {
    //   console.log(res, 123)
    // })
    console.log(getUrlParam('mac'))
    $('#Input').bind('input propertychange', function (event) {
      that.data.inputValue = $(this).val()
    })
    $('#Input').on('focusout', function () {
      const ua = window.navigator.userAgent
      if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0) { // 键盘收起页面空白问题
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    })
    $('#Input').on('focusout', function () {
      const ua = window.navigator.userAgent
      if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0) { // 键盘收起页面空白问题
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    })
  },
  data: {
    showInput: true,
    inputValue: ''
  },
  handleBtnTap () {
    if (InputPage.data.inputValue) {
      let url = ''
      if (getUrlParam('mac')) {
        url = `/bindPad?userName=${this.data.inputValue}&mac=${getUrlParam('mac')}`
      }
      if (getUrlParam('meetingId')) {
        url = `/joinMeeting?userName=${this.data.inputValue}&meetingId=${Number(getUrlParam('meetingId'))}`
      }
      if (url) {
        InputPage.getUrl({ url })
      }
    }
  },
  postMeet (httpConfig) {
    const url = `${Config.apiUrl}${httpConfig.url}`
    $.ajax({
      type: 'post',
      url,
      success: (res) => { // 【成功回调】
        if (res.code === 0) {
          if (res.msg) {
            window.location.href = res.msg
          } else {
            this.showMsg('当前暂无会议')
          }
        } else {
          this.showMsg('加入会议失败')
        }
      },
      error: function (xhr, type) { // 【失败回调】
        this.showMsg('加入会议失败')
        console.log(xhr, type, 'baocuo')
      }
    })
  },
  showMsg (txt) {
    $('#alert').text(txt)
    $('#alert').css({ bottom: '1rem' })
    setTimeout(() => {
      $('#alert').css({ bottom: '-10rem' })
    }, 2000)
  }
}

export default InputPage
