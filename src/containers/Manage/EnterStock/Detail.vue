<template lang="pug">
  FormTablePage(
    ref="formTablepage"
    :formList="formList"
    :tableList="tableList"
    :tableData="tableData"
    :columns="columns"
    :values="values"
    :submitResource="submitResource")
</template>

<script>
import FormTablePage from '@/containers/FormTablePage'
import { getColumns } from '@/containers/Manage/columns'

export default {
  components: {
    FormTablePage
  },
  data () {
    return {
      formList: ['origin', 'storageType', 'enterPrice', 'takePe', 'makePe', 'remark'],
      tableList: ['productName', 'productId', 'enterNum', 'discount', 'remark'],
      columns: getColumns(this),
      values: {},
      submitResource: 'enterStock/detail',
      tableData: [{
        productId: 'aaaaa',
        enterNum: 100,
        discount: 100,
        remark: '测试测试'
      }, {
        productId: 'aaaaa',
        enterNum: 100,
        discount: 100,
        remark: '测试测试'
      }, {
        productId: 'aaaaa',
        enterNum: 100,
        discount: 100,
        remark: '测试测试'
      }, {
        productId: 'aaaaa',
        enterNum: 100,
        discount: 100,
        remark: '测试测试'
      }, {
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
