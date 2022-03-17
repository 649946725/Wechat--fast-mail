// pages/text/text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
  },
  dianji1() {
    wx.requestSubscribeMessage({
      tmplIds: ['TwlLarlzWJAAx9ltnEcNQPb09xBaOgvtGp88rugrI3k'],
      success(res) {
        console.log(res)
      }
    })
  },
  dianji2() {
    wx.cloud.callFunction({
      name: 'new_order',
      data: {
        openid:'oeoVY42vED5Er8jXi7UtbGl0dEyE',
        name8:'秦宇泽',
        phone_number9:'123456',
        phrase16:'已接单',
        amount13:'2元',
        thing20:'哈哈哈'
      },
      success: res => {
        console.error(res)
      },
      fail: err => {
        console.error(err)
      }
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})