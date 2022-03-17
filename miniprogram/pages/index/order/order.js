const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_1:'未接单'
  },
  tells(e) {
    if(e.currentTarget.dataset.tell!='暂无')
    {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tell,
    })
    }
  },
  quxiao(e){
    var that = this
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '取消',
      content: '确定取消吗？',
      cancelText: '取消',
      confirmText: "确定",
      success: res => {
        if (res.confirm) {
          console.log(id)
    that.remove(id)
        }
      }
    })
  },
 remove(e){
   var that=this
   wx.cloud.callFunction({
     name: 'remove',
     data: {
       _id:e,
       jihe:'order_info'
     },
     success: res => {
       that.onPullDownRefresh('未接单')
     }
   })
 },
  onChange(e) {
    var style = e.detail.title

    console.log(style)
    var that = this
    that.setData({
      index_1: e.detail.title
    })
    that.obtain(style)
  },

  obtain(e) {
    var that = this
    var style = e
    wx.showToast({
      title: '加载中..',
      icon: 'loading',
      mask: 'true',
    })
    wx.cloud.callFunction({
      name:'login',
      data:{},
      success:res=>{
        wx.cloud.callFunction({
          name: 'get_oder_info',
          data: {
            jihe: 'order_info',
            where: {
             _openid: res.result.openid,
             style:style
            }
          },
          success: res => {
            console.log("获取成功")
            var info = res.result.data
            if (style == '未接单') {
              that.setData({
                info: info
              })
            }
            else if (style == '已接单') {
              that.setData({
                info1: info
              })
            }
            else {
              that.setData({
                info2: info
              })

            }
            wx.hideToast()
      },
      fail: res => {
            console.log("获取失败")
            if (style == '未接单') {
              that.setData({
                info: ''
              })
            }
            else if (style == '已接单') {
              that.setData({
                info1: ''
              })
            }
            else {
              that.setData({
                info2: ''
              })

            }
            wx.hideToast()
          }
    })
   
      },
      
    })
  },
  onLoad: function (options) {
    var that = this
    var style = '未接单'
    that.obtain(style)
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
    var that = this
    var style =that.data.index_1
    console.log(style)
  that.obtain(style)
    wx.stopPullDownRefresh()
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