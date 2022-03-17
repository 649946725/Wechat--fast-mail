const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
        { name: '1', value: '小件' },
        { name: '2', value: '大件', checked: 'true' },
    ],
    imgList: [],
    image: [],
},
  ChooseImage() {
    var that = this
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showToast({
          title: '正在上传',
          icon: 'loading',
          mask: 'true',
        })
        if (that.data.imgList.length != 0) {
          that.setData({
            imgList: that.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          that.setData({
            imgList: res.tempFilePaths
          })
        }
        console.log(res.tempFilePaths);
        const tempFilePaths = res.tempFilePaths
        wx.cloud.uploadFile({
          cloudPath: "代取快递一卡通/"+new Date().getTime() + '.png', 
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success(res) {
            console.log(res.fileID)
            var image = []
            image.push(res.fileID)
            if (that.data.image.length != 0) {
              that.setData({
                image: that.data.image.concat(image)
              })
            } else {
              that.setData({
                image: image
              })
            }
            wx.hideToast()
            console.log(that.data.image)
          }
        })
      }
    })


    /*wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }

    });*/
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: "确定",
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
},
souquan(){
  wx.requestSubscribeMessage({
    tmplIds: ['xVZG-duw6cYWH7hpkZrzfr7mzxnoU-T0kGt6dCRFol0'],
    success(res) {
      console.log(res)
    }
  })
},
order(r,q){
  var date=new Date()
  var date5 =date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() 
    wx.cloud.callFunction({
      name: 'order',
      data: {
        openid:r,
        character_string1: q.code,
        name2: q.name,
        phone_number3:q.tell,
        amount4:q.cost,
        date5:date5
      },
      success: res => {
        console.error(res)
      },
      fail: err => {
        console.error(err)
      }
    })
},
 info(e){
   var that=this
   var kuaidi=that.data.kuaidi
   var info=e.detail.value
   var cost="2元"
   if(info.type[0]!='小件')
   {
     info.type[0]='大件',
     cost="5元"
   }
   info.cost=cost
   console.log(info)
   if (info.name == '' || info.tell == '' || info.code == '' || info.address == ''||that.data.image[0]==null) {
     wx.showToast({
       title: '请填写完整信息',
       icon: 'none',
       duration: 2000
     })
   }
   else if (info.name ==' ' || info.tell == ' ' || info.code == ' ' || info.address ==' ')
   {
     wx.showToast({
       title: '请填写正确信息',
       icon: 'none',
       duration: 2000
     })
   }
   else{
    that.souquan()
     wx.showLoading({
       mask: 'true',
       title: '正在提交中',
     })
   wx.cloud.callFunction({
     name: 'login',
     data: {      
     },
     success:res=>{
       wx.cloud.callFunction({
         name:'add_order_info',
         data:{
           jihe: 'order_info',
           openid: res.result.openid,
           name: info.name,
           code: info.code,
           tell: info.tell,
           address:info.address,
           type: info.type[0],
           kuaidi:kuaidi,
           style:'未接单',
           peiname:'暂无',
           peitell:'暂无',
           cost:cost,
           peiopenid:'暂无',
           image:that.data.image
         },
         success: res => {
           console.log('添加成功')
           wx.hideLoading()
           wx.showToast({
             title: '提交成功',
             icorn: 'success'
           })
           wx.redirectTo({
             url: '../success/success',
           })
           that.setData({
             name: '',
             tell: '',
             code:'',
             address:'',
             imageList:[],
           })
         }
       })
     }
   })
     that.obtain()
     var infoopenid=that.data.infoopenid
     infoopenid.forEach(item=>{
       that.order(item._openid,info)
     })
   }
 },
 obtain(){
   var that=this
   db.collection('peisongyuan').get({
     success: function (res) {
       that.setData({
          infoopenid:res.data
       })
     }
   })
 },
  onLoad: function (options) {
console.log(options)
var kuaidi=options.id
var that=this
that.setData({
  kuaidi:kuaidi
})
that.obtain()
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
      url: '../success/success',
    })
  },
})