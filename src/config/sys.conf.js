
/**
 * Created by Administrator on 2017/9/28 0028.
 * 系统视图配置
 */
export default {
  pagination: {
    pageSizes: ['20', '50', '100', '200'],
    pageSize: 50
  },
  loading: {
    target: document.body,
    body: true,
    fullscreen: true,
    lock: true,
    customClass: 'z-loading',
    text: 'loading...'
  },
  table: {
    operatorWidth: 160,
    selectionWidth: 45
  },
  labelWidths: {
    xs_1: '80px',
    xs_2: '90px',
    sm_1: '100px',
    sm_2: '110px',
    md_1: '120px',
    md_2: '130px',
    lg_1: '140px',
    lg_2: '150px'
  },
  colWidths: {
    xs: 6,
    sm: 8,
    md: 10,
    lg: 12
  }
}
