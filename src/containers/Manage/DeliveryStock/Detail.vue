<template lang="pug">
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
    :formTableButtons="formTableButtons")
</template>

<script>
import FormTablePage from '@/containers/FormTablePage'
import { baseColumns, formTableColumns } from './columns'

export default {
  components: {
    FormTablePage
  },
  data () {
    return {
      formList: ['clientName', 'linkMan', 'linkPhone', 'storageType', 'clientAddress', 'remark'],
      tableList: ['code', 'productName', 'unit', 'deliveryNum', 'unitPrice', 'productPrice', 'remark'],
      tableSubmitList: ['code', 'productId', 'deliveryNum', 'unitPrice', 'productPrice', 'remark'],
      toolbarList: ['makePe', 'nowDate', 'code'],
      columns: baseColumns,
      formTableColumns: formTableColumns,
      values: {},
      toolbarValues: {
        nowDate: this.$moment().format('YYYY-MM-DD'),
        makePe: '店面',
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
        }
      }]
    }
  }
}
</script>
