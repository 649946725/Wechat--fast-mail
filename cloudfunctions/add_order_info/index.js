const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection(event.jihe).add({
    data: {
      _openid: event.openid,
      name: event.name,
      code:event.code,
      tell:event.tell,
      address:event.address,
      type:event.type,
      image:event.image,
      style:event.style,
      kuaidi:event.kuaidi,
      peiname:event.peiname,
      peitell:event.peitell,
      cost:event.cost,
      peiopenid:event.peiopenid
    }
  })
}