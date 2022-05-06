
/*
 * @Author: fg
 * @Date: 2022-05-06 13:39:52
 * @LastEditors: fg
 * @LastEditTime: 2022-05-06 17:43:18
 * @Description: InputPage
 */
import Config from '../public/config'
const InputPage = {
  init () {
    const that = this
    document.getElementById('confirmBtn').onclick = this.handleBtnTap

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
      InputPage.getUrl()
    }
  },
  getUrl () {
    const url = `${Config.apiUrl}/notifyMembership?userName=${this.data.inputValue}`
    console.log(url)
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
