const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
    mixins: [require('../../mixin/themeChanged')],
    data: {
        list: [{
                id: 'form',
                name: '菜鸟驿站',
                open: false,
                pages: ['中通快递', '圆通快递', '申通快递','韵达快递']
            },
            {
                id: 'layout',
                name: '水泥篮球场',
                open: false,
                pages: ['顺丰快递', '京东快递', "极兔快递","天天快递","苏宁快递","百世快递"]
            },
          {
            id: 'youzheng',
            name: '校内邮政',
            open: false,
            pages: ['邮政快递']
          },
            //   {
            //     id: 'dingdan',
            //     name: '我的订单',
            //     open: false,
            //     pages: ['订单']
            // },

        ]
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id,
            list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
    },
    dingdan:function(){
        wx.navigateTo({
          url: 'order/order',
        })
    },
    people:function(){
        wx.navigateTo({
          url: 'people/people',
        })
    },
    changeTheme: function () {
        console.log(this.data);
        getApp().themeChanged(this.data.theme === 'light' ? 'dark' : 'light');
    },

  obtain_peisongyuan() {
    var that = this
    var that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        db.collection('peisongyuan').where({
          _openid:res.result.openid
        })
          .get({
            success: function (res) {
              console.log(res)
              var peisongyuan = res.data[0]
              that.setData({
                peisongyuan: peisongyuan
              })
            }
          })
      }
    })
 
  },
  onLoad: function (options) {
    var that=this
    that.obtain_peisongyuan()
  },
});