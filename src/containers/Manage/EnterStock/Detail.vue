<template lang="pug">
  FormTablePage(
    ref="formTablepage"
    :formList="formList"
    :tableList="tableList"
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
      tableList: ['code', 'name', 'unit', 'productNum', 'unitPrice', 'newPrice', 'remark'],
      columns: formColumns,
      formTableColumns: formTableColumns,
      values: {},
      submitResource: 'enterStock/detail',
      tableData: [{
        id: 0,
        productId: 'aaaaa',
        enterNum: 100,
        discount: 100,
        remark: '测试测试'
      }, {
        id: 1,
        productId: 'aaaaa',
        enterNum: 100,
        discount: 100,
        remark: '测试测试'
      }, {
        id: 2,
        productId: 'aaaaa',
        enterNum: 100,
        discount: 100,
        remark: '测试测试'
      }, {
        id: 3,
        productId: 'aaaaa',
        enterNum: 100,
        discount: 100,
        remark: '测试测试'
      }, {
        id: 4,
        productId: 'aaaaa',
        enterNum: 100,
        discount: 100,
        remark: '测试测试'
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
