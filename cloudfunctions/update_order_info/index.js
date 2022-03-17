
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    //这里的update依据是event._id
    return await db.collection(event.jihe).doc(event.id).update({
      data: {
       style:event.style,
       peiname:event.peiname,
        peitell: event.peitell,
        peiopenid:event.peiopenid
      }
    })
  } catch (e) {
    console.error(e)
  }

}