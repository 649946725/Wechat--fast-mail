// pages/index/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  souquan() {
    wx.requestSubscribeMessage({
      tmplIds: ['xVZG-duw6cYWH7hpkZrzfr7mzxnoU-T0kGt6dCRFol0'],
      success(res) {
        console.log(res)
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

  },

  dingdan:function(){
    wx.redirectTo({
      url: '../order/order',
    })
  }
})