<template lang="pug">
  FormTablePage(
    ref="formTablepage"
    :formList="formList"
    :tableList="tableList"
    :tableSubmitList="tableSubmitList"
    :tableData="tableData"
    :columns="columns"
    :values="values"
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
      tableSubmitList: ['code', 'productId', 'enterNum', 'productPrice', 'remark'],
      columns: formColumns,
      formTableColumns: formTableColumns,
      values: {},
      submitResource: 'enterStock/detail',
      tableData: [{
        id: 0
      }, {
        id: 1
      }, {
        id: 2
      }, {
        id: 3
      }, {
        id: 4
      }, {
        id: 5
      }],
      productOptions: [],
      loading: false
    }
  },
  methods: {
    getProducts (props) {
      return this.$get(props)
    }
  }
}
</script>
