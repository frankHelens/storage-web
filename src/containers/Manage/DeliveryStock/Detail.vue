<template lang="pug">
  div
    FormTablePage(
      ref="formTablepage"
      :formList="formList"
      :tableList="tableList"
      :tableSubmitList="tableSubmitList"
      :tableData="tableData"
      :columns="columns"
      :values="values"
      :toolbarValues="toolbarValues"
      :toolbarList="toolbarList"
      :resource="resource"
      :submitResource="submitResource"
      :formTableColumns="formTableColumns"
      :formTableButtons="formTableButtons"
      @getData="getData"
      @getRelation="getRelation")
    PrintTable(
      v-if="hasData"
      ref="print"
      :dataList="printData"
      :printList="tableList"
      :columns="printTableColumns"
      :isHorizontal="false"
      :printStyle="printStyle"
      :isCount="true")
      div(slot="title")
        .title-wrap
          h2.title 创发烘培设备
          .sub-title 出货单
          .code 单据编号： {{printBaseData.code || ''}}
        table.title-info
          tr
            td(
              width="30%"
              v-for="(item, i) in Math.ceil(printToolbarList.length/2)"
              :key="i") {{printToolbarList[i] | renderValue(printBaseColumns, printBaseData)}}
          tr
            td(
              width="30%"
              v-for="(item, i) in Math.ceil(printToolbarList.length/2)"
              :key="i") {{printToolbarList[i + 3] | renderValue(printBaseColumns, printBaseData)}}
</template>

<script>
import FormTablePage from '@/containers/FormTablePage'
import { baseColumns, formTableColumns } from './columns'
import PrintTable from '@/components/PrintTable'
import { infoRender } from '@/utils/infoRender'

/* globals localStorage */
export default {
  components: {
    FormTablePage,
    PrintTable
  },
  filters: {
    renderValue (name, columns, full) {
      const column = columns[name]
      return column.label + '：' + infoRender(full[name], column, full)
    }
  },
  data () {
    return {
      formList: ['clientName', 'linkMan', 'linkPhone', 'storageType', 'clientAddress', 'remark'],
      tableList: ['code', 'productName', 'unit', 'deliveryNum', 'unitPrice', 'productPrice', 'remark'],
      tableSubmitList: ['code', 'productId', 'deliveryNum', 'unitPrice', 'productPrice', 'remark'],
      toolbarList: ['makePe', 'nowDate', 'code'],
      printToolbarList: ['clientName', 'nowDate', 'storageType', 'clientAddress', 'linkMan', 'linkPhone'],
      columns: {
        ...baseColumns,
        nowDate: {
          label: '日期',
          size: 7,
          type: 'custom',
          customRender: (data, full) => {
            return full.createdAt ? this.$moment(full.createdAt).format('YYYY-MM-DD') : this.$moment().format('YYYY-MM-DD')
          }
        }
      },
      formTableColumns: formTableColumns,
      values: {},
      toolbarValues: {
        makePe: localStorage.realName,
        code: ''
      },
      resource: 'deliveryStock/detail',
      submitResource: 'deliveryStock/detail',
      tableData: [],
      productOptions: [],
      loading: false,
      formTableButtons: [{
        name: 'print',
        label: '打印',
        func: (data, props) => {
          this.$refs.print.printEvent()
        }
      }],
      hasData: false,
      printData: [],
      printTableColumns: {},
      printBaseData: {},
      printBaseColumns: {},
      printStyle: `
        .title-wrap {
          position: relative;
          width: 100%;
        }
        .title{
          margin: auto;
        }
        .sub-title, .code {
          position: absolute;          
        }        
        .sub-title {
          font-size: 19px;
          left: 63%;
          top: 10px;
        }
        .code, .title-info {
          right: 0;
          top: 0;
          font-size: 14px;
        }
        .title-info {
          margin: 10px 0 0 10px;
        }
      `
    }
  },
  methods: {
    getData ({ base, tableData }) {
      this.printBaseData = base
      this.printData = tableData
      this.hasData = true
    },
    getRelation (tableColumns, columns) {
      this.hasData = false
      this.printTableColumns = tableColumns
      this.printBaseColumns = columns
    }
  }
}
</script>
