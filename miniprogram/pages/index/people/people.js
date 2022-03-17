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
  souquan() {
    wx.requestSubscribeMessage({
      tmplIds: ['TwlLarlzWJAAx9ltnEcNQPb09xBaOgvtGp88rugrI3k'],
      success(res) {
        console.log(res)
      }
    })
  },
  tells(e){
    wx.makePhoneCall({
      phoneNumber:e.currentTarget.dataset.tell,
    })
  },
  chankan(e){
    var index = parseInt(e.currentTarget.dataset.index)
console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.image[index], // 当前显示图片的http链接
      urls:e.currentTarget.dataset.image // 需要预览的图片http链接列表
    })
  },
  obtain_peisongyuan() {
    var that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        db.collection('peisongyuan').where({
          _openid: res.result.openid
        })
          .get({
            success: function (res) {
              console.log(res.data[0].peiname)
              that.setData({
                peiname: res.data[0].peiname,
                peitell: res.data[0].peitell
              })
            }
          })
      }
    })
 
  
   
  },
  jiesou(e){
    var that=this
    var peiname = that.data.peiname
    var peitell = that.data.peitell
    var id=e.currentTarget.dataset.id
    var info = e.currentTarget.dataset.info
    info.style="已接单"
    var r=info._openid
    var style="已接单"
    var style1="未接单"
    that.souquan()
    wx.showModal({
      title: '接受',
      content: '确定接受吗？',
      cancelText: '取消',
      confirmText: "确定",
      success: res => {
        if (res.confirm) {
          that.update(id, style, style1, peiname, peitell)
          that.new_order(r,info,peiname,peitell)
        }
      }
    })
  
  },
  new_order(r,q,x,y){
    var that=this
    wx.cloud.callFunction({
      name: 'new_order',
      data: {
        openid:r,
        name8:x,
        phone_number9:y,
        phrase16:q.style,
        amount13:q.cost,
        thing20: '我们将以最快的速度给您送达！'
      },
      success: res => {
        console.error(res)
      },
      fail: err => {
        console.error(err)
      }
    })
  },
  jujue(e){
    var that = this
    var peiname = that.data.peiname
    var peitell = that.data.peitell
    var id = e.currentTarget.dataset.id
    var info = e.currentTarget.dataset.info
    info.style ="已拒绝"
    var r = info._openid
    var style = "已拒绝"
    var style1 = "未接单"
    that.souquan()
    wx.showModal({
      title: '拒绝',
      content: '确定拒绝吗？',
      cancelText: '取消',
      confirmText: "确定",
      success: res => {
        if (res.confirm) {
          that.update(id, style, style1, peiname, peitell)
          that.new_order(r, info, peiname, peitell)
        }
      }
    })
  },
  wancheng(e){
    var that = this
    var id = e.currentTarget.dataset.id
    var info = e.currentTarget.dataset.info
    var peiname = that.data.peiname
    var peitell = that.data.peitell
    info.style = "已完成"
    var r = info._openid
    var style = "已完成"
    var style1 = "已接单"
    that.souquan()
    wx.showModal({
      title: '完成',
      content: '确定完成吗？',
      cancelText: '取消',
      confirmText: "确定",
      success: res => {
        if (res.confirm) {
          that.update(id, style, style1, peiname, peitell)
          that.new_order(r, info, peiname, peitell)
        }
      }
    })
  },
  update(e,r,q,x,y){
    var that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
    wx.cloud.callFunction({
      name: 'update_order_info',
      data: {
        jihe: 'order_info',
        id: e,
        style:r,
        peiname:x,
        peitell:y,
        peiopenid:res.result.openid
      },
      success: res => {
        console.log("成功")
        that.onPullDownRefresh(q)
      }
    })
      }
    })
  },
  onChange(e){
    var style=e.detail.title
    console.log(style)
    var that = this
    that.setData({
      index_1: e.detail.title
    })
 that.obtain(style)
  },

 obtain(e){
   var that=this
   that.huoquopenid()
   var peiopenid=that.data.openid
   var style=e
   wx.showToast({
     title: '加载中..',
     icon: 'loading',
     mask: 'true',
   })
   if (style == '未接单')
   {
     var where={
       style: e
     }
   }
   else{
     var where = {
       style: e,
       peiopenid: peiopenid
     }
   }
   wx.cloud.callFunction({
     name: 'get_oder_info',
     data: {
       jihe:'order_info',
       where: where
     },
     success: res => {
       console.log("获取成功")
       var info=res.result.data
       if(style=='未接单')
       {
       that.setData({
         info:info
       })
       }
       else if (style == '已接单'){
         that.setData({
           info1: info
         })
       }
         else{
         that.setData({
           info2: info
         })

       }
       wx.hideToast()
     },
     fail:res=>{
       console.log("获取失败")
       if (style == '未接单') {
         that.setData({
           info:''
         })
       }
       else if (style == '已接单') {
         that.setData({
           info1:''
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
  onLoad: function (options) {
var that=this
    that.obtain_peisongyuan()
var style='未接单'
that.obtain(style)
  },

huoquopenid(){
  var  that=this
wx.cloud.callFunction({
  name:'login',
  data:{},
  success:res=>{
     that.setData({
       openid:res.result.openid
     })
  }
})
},
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
  onPullDownRefresh: function (e) {
var that=this
if(e==null)
{
  that.obtain(that.data.index_1)
}
else{
  var style = e
    that.obtain(style)
}
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