import { getLodop } from '@/utils/LodopFuncs'

export const printEvent = ({ isHorizontal, dom, style, title, el }) => {
  const LODOP = getLodop()
  // 样式
  const css = `<style>
    div {display: block !important;}
    h2 {text-align: center;}
    table {width: 100%;margin: 0 auto; font-size: 12px;}
    thead {font-weight:bold;}
    tr,td {height: 40px;text-align: center;min-width: 40px;}
    ${style}
  </style>`
  // 打印内容
  const html = dom.innerHTML
  const footer = `<p><span style="margin-right:20px;">打印人：${localStorage.realname}</span><span>打印日期：${el.$moment().format('YYYY-MM-DD')}</span></p>`
  LODOP.PRINT_INIT('printInit') // 打印初始化
  if (isHorizontal) {
    // 设置横向打印
    LODOP.SET_PRINT_PAGESIZE(2, '100%', '100%', 'A4')
    // 横向时的正向显示
    LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1)
    // 底图上有模拟走纸板的条纹线, 可以隐藏该条线
    LODOP.SET_SHOW_MODE('HIDE_PAPER_BOARD', 1)
    // 标题
    LODOP.ADD_PRINT_HTM(26, 0, '100%', 100, css + `<h2>${title}</h2>`)
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
    // 内容
    LODOP.ADD_PRINT_TABLE(70, '2%', '95%', '80%', css + html)
    // 打印人 跟 时间
    LODOP.ADD_PRINT_HTM(740, '2%', '80%', 100, css + footer)
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
    // 分页
    LODOP.ADD_PRINT_HTM(740, '80%', 300, 100, '总页号：<font color="#0000ff" format="0" style="color:#000;"><span tdata="pageNO">第###页</span>/<span tdata="pageCount">共###页</span></font>')
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
  } else {
    // // 标题
    LODOP.ADD_PRINT_HTM(20, 0, 700, 1100, css + `<h2>${title}</h2>`)
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
    // 内容
    LODOP.ADD_PRINT_TABLE(60, 30, 700, 950, css + html)
    // 打印人 跟 时间
    LODOP.ADD_PRINT_HTM(1050, '5%', '80%', 100, css + footer)
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
    // 分页
    LODOP.ADD_PRINT_HTM(1050, '70%', 300, 100, '总页号：<font color="#0000ff" format="0" style="color:#000;"><span tdata="pageNO">第###页</span>/<span tdata="pageCount">共###页</span></font>')
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
  }
  LODOP.PREVIEW()
}
