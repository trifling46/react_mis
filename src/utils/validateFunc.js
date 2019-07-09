/**
 * Created by Administrator on 2019-03-18.
 */
/**
 * 验证 数字 number
 */
export function validateNum(value) {
  let reg = /^\d+$/
  if(reg.test(value)) {
    return {
      status: true,
      msg: '通过验证'
    }
  } else {
    return {
      status: false,
      msg: `请输入数字！`
    }
  }
}
