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
      :title="title"
      :dataList="printData"
      :printList="tableList"
      :columns="formTableColumns"
      :isHorizontal="false")
</template>

<script>
import FormTablePage from '@/containers/FormTablePage'
import { baseColumns, formTableColumns } from './columns'
import PrintTable from '@/components/PrintTable'

/* globals localStorage */
export default {
  components: {
    FormTablePage,
    PrintTable
  },
  data () {
    return {
      title: '创发烘焙设备',
      formList: ['clientName', 'linkMan', 'linkPhone', 'storageType', 'clientAddress', 'remark'],
      tableList: ['code', 'productName', 'unit', 'deliveryNum', 'unitPrice', 'productPrice', 'remark'],
      tableSubmitList: ['code', 'productId', 'deliveryNum', 'unitPrice', 'productPrice', 'remark'],
      toolbarList: ['makePe', 'nowDate', 'code'],
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
        // nowDate: '',
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
          console.log(data, props)
          this.$refs.print.printEvent()
        }
      }],
      hasData: false,
      printData: [],
      printColumns: {}
    }
  },
  methods: {
    getData ({ base, tableData }) {
      this.printData = tableData
      this.hasData = true
      console.log(tableData)
    },
    getRelation ({columns}) {
      this.printColumns = columns
    }
  }
}
</script>
