<template lang="pug">
  FormTablePage(
    ref="formTablepage"
    :formList="formList"
    :tableList="tableList"
    :tableSubmitList="tableSubmitList"
    :tableData="tableData"
    :columns="columns"
    :values="values"
    :resource="resource"
    :submitResource="submitResource"
    :formTableColumns="formTableColumns")
</template>

<script>
import FormTablePage from '@/containers/FormTablePage'
import { formColumns, formTableColumns } from '@/containers/Manage/columns'

export default {
  components: {
    FormTablePage
  },
  data () {
    return {
      formList: ['origin', 'storageType', 'enterPrice', 'takePe', 'makePe', 'remark'],
      tableList: ['code', 'productName', 'unit', 'enterNum', 'unitPrice', 'productPrice', 'remark'],
      tableSubmitList: ['code', 'productId', 'enterNum', 'unitPrice', 'productPrice', 'remark'],
      columns: formColumns,
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
