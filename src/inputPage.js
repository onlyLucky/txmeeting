
/*
 * @Author: fg
 * @Date: 2022-05-06 13:39:52
 * @LastEditors: fg
 * @LastEditTime: 2022-05-23 13:39:57
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
    $('.result').hide()
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
    if (getUrlParam('mac')) {
      that.data.isBind = true
    } else {
      that.data.isBind = false
    }
    $('#Input').on('focusout', function () {
      const ua = window.navigator.userAgent
      if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0) { // 键盘收起页面空白问题
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    })
    if (window.localStorage.getItem('username')) {
      if (getUrlParam('meetingId')) {
        this.postMeet({
          url: `/joinMeeting?userName=${window.localStorage.getItem('username')}&meetingId=${Number(getUrlParam('meetingId'))}`
        })
      } else {
        this.data.inputValue = window.localStorage.getItem('username')
        $('#Input').val(window.localStorage.getItem('username'))
      }
    }
  },
  data: {
    showInput: true,
    inputValue: '',
    isBind: false,
    isLoading: false
  },
  handleBtnTap () {
    if (InputPage.data.inputValue && !InputPage.data.isLoading) {
      let url = ''
      if (getUrlParam('mac')) {
        url = `/bindPad?userName=${InputPage.data.inputValue}&mac=${getUrlParam('mac')}`
      }
      if (getUrlParam('meetingId')) {
        url = `/joinMeeting?userName=${InputPage.data.inputValue}&meetingId=${Number(getUrlParam('meetingId'))}`
      }
      if (url) {
        InputPage.postMeet({ url })
      }
    }
  },

  postMeet (httpConfig) {
    this.data.isLoading = true
    const url = `${Config.apiUrl}${httpConfig.url}`
    $.ajax({
      type: 'post',
      url,
      success: (res) => { // 【成功回调】
        this.data.isLoading = false
        if (res.code === 0) {
          if (this.data.isBind) {
            window.localStorage.setItem('username', res.data.userCode)
            this.showMsg('会议绑定成功')
            $('.result').eq(1).find('span').text(res.data.nickname)
            $('.result').eq(2).find('span').text(res.data.userCode)
            // $('.result span').text(res.msg)
            $('.inputBox').hide()
            $('.bottomBtn').hide()
            $('.result').show()
          } else {
            if (res.msg) {
              window.location.href = res.msg
            } else {
              this.showMsg('当前暂无会议')
            }
          }
        } else {
          const txt = this.data.isBind ? '会议绑定失败' : '加入会议失败'
          this.showMsg(res.msg || txt)
        }
      },
      error: function (xhr, type) { // 【失败回调】
        this.data.isLoading = false
        const txt = this.data.isBind ? '会议绑定失败' : '加入会议失败'
        this.showMsg(txt)
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
