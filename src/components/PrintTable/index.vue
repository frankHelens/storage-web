<template lang="pug">
div(style="display: none;")
  div(ref="title")
    slot(name="title")
  div(ref="print")
    slot
      table.table(
        border="1"
        cellpadding="0"
        cellspacing="0")
        thead
          tr
            td(v-for="columnName in printList"
                :key="columnName"
                :width="columns[columnName].printWidth || columns[columnName].width") {{columns[columnName].label}}
        tbody
          tr(
            v-for="(data, index) in printData"
            :key="index")
            td(
              v-for="columnName in printList"
              :key="columnName")
              InfoRender(
                :full="data"
                :data="data[columnName]"
                :column="columns[columnName]"
                :minLength="columns[columnName].minLength"
                :isWarp="true")
                template(scope="props") {{ props.content}}
          tr(v-if="isCount")
            th.count(
              colspan="3"
              tdata="AllSum"
              format="UpperMoney"
              :tindex="printList | getIndex(columns)") 合计：######
            th.count(
              :colspan="printList.length - 3"
              tdata="AllSum"
              format="#,##0.00"
              :tindex="printList | getIndex(columns)") ￥###
  div(ref="footer")
    slot(name="footer")
</template>

<script>

/**
 * @name printTable 打印组件
 * @author 黄丰瑞 <huangfr@gddit.com>
 * @description 通过字段数组，字段配置, 以及数据形成打印页面
 */

import InfoRender from '@/components/InfoRender'
import { printEvent } from './printEvent'

export default {
  name: 'printTable',
  components: {
    InfoRender
  },
  props: {
    title: { // 头部标题
      type: String
    },
    printList: { // 字段数组
      type: Array,
      default: () => []
    },
    columns: { // 字段列配置
      type: Object,
      default: () => ({})
    },
    dataList: { // 数据
      type: Array,
      default: () => []
    },
    printStyle: {
      type: String,
      default: ''
    },
    isHorizontal: {
      type: Boolean,
      default: false
    },
    value: {
      tpye: Boolean,
      default: false
    },
    isCount: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    getIndex (list, columns) {
      return list.findIndex(item => columns[item].isCount)
    }
  },
  data () {
    return {
      printData: this.dataList
    }
  },
  methods: {
    printEvent () { // 打印事件
      printEvent({
        dom: this.$refs.print,
        title: this.title || this.$refs.title.innerHTML || '',
        style: this.printStyle,
        isHorizontal: this.isHorizontal,
        el: this,
        footer: this.$refs.footer.innerHTML || ''
      })
    }
  }
}
</script>
