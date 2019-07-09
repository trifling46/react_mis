/**
 * Created by Administrator on 2019-03-07.
 */
let app = {}
function setApp (instance){
  app = instance
}
function getApp () {
  return app
}
export {
  setApp,
  getApp
}
