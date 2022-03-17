// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid,
      page: 'pages/index/order/order',
      lang: 'zh_CN',
      data: {
        name8: {
          value: event.name8
        },
        phone_number9: {
          value: event.phone_number9
        },
        phrase16: {
        value: event.phrase16
        },
        thing20: {
          value: event.thing20
        },

      },
      templateId: 'xVZG-duw6cYWH7hpkZrzfr7mzxnoU-T0kGt6dCRFol0',
    })
    return result
  } catch (err) {
    return err
  }
}