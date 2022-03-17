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
      page: 'pages/index/people/people',
      lang: 'zh_CN',
      data: {
        character_string1: {
          value: event.character_string1
        },
        name2: {
          value: event.name2
        },
        phone_number3: {
          value: event.phone_number3
        },
        date5: {
          value: event.date5
        },

      },
      templateId: 'TwlLarlzWJAAx9ltnEcNQPb09xBaOgvtGp88rugrI3k',
    })
    return result
  } catch (err) {
    return err
  }
}