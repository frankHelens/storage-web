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
    :formTableColumns="formTableColumns")
</template>

<script>
import FormTablePage from '@/containers/FormTablePage'
import { baseColumns, formTableColumns } from './columns'

/* globals localStorage */
export default {
  components: {
    FormTablePage
  },
  data () {
    return {
      formList: ['origin', 'storageType', 'takePe', 'remark'],
      tableList: ['code', 'productName', 'unit', 'enterNum', 'remark'],
      tableSubmitList: ['code', 'productId', 'enterNum', 'remark'],
      toolbarList: ['makePe', 'nowDate', 'code'],
      toolbarValues: {
        nowDate: this.$moment().format('YYYY-MM-DD'),
        makePe: localStorage.realName,
        code: ''
      },
      columns: baseColumns,
      formTableColumns: formTableColumns,
      values: {},
      resource: 'enterStock/detail',
      submitResource: 'enterStock/detail',
      tableData: [],
      productOptions: [],
      loading: false
    }
  }
}
</script>
