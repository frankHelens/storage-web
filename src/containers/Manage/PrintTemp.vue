<template lang="pug">
div(style="display:none;")
  .title 创发烘焙设备
  .sub-title 出仓单
</template>

<script>
import { getLodop } from '@/utils/LodopFuncs'

export default{
  data () {
    return {}
  },
  methods: {
    printEvent () {
      const LODOP = getLodop()
      LODOP.PRINT_INIT('printInit') // 打印初始化
      // 设置横向打印
      LODOP.SET_PRINT_PAGESIZE(2, '100%', '100%', 'A4')
      // 横向时的正向显示
      LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1)
      // 底图上有模拟走纸板的条纹线, 可以隐藏该条线
      LODOP.SET_SHOW_MODE('HIDE_PAPER_BOARD', 1)
      // 标题
      // LODOP.ADD_PRINT_HTM(26, 0, '100%', 100, css + `<h2>${title}</h2>`)
      // LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
      // 内容
      // LODOP.ADD_PRINT_TABLE(70, '2%', '95%', '80%', css + html)
      // 打印人 跟 时间
      // LODOP.ADD_PRINT_HTM(740, '2%', '80%', 100, css + footer)
      // LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
      // 分页
      LODOP.ADD_PRINT_HTM(740, '80%', 300, 100, '总页号：<font color="#0000ff" format="0" style="color:#000;"><span tdata="pageNO">第###页</span>/<span tdata="pageCount">共###页</span></font>')
      LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
      LODOP.PREVIEW()
    }
  }
}
</script>
