<template lang="pug">
  FormTablePage(
    :formList="formList"
    :tableList="tableList"
    :tableData="tableData"
    :columns="columns"
    :values="values"
    :submitResource="submitResource")
</template>

<script>
import FormTablePage from '@/containers/FormTablePage'
import columns from '@/containers/Manage/columns'

export default {
  components: {
    FormTablePage
  },
  data () {
    return {
      formList: ['origin', 'storageType', 'enterPrice', 'takePe', 'makePe', 'remark'],
      tableList: ['productId', 'enterNum', 'discount', 'remark'],
      columns: {
        ...columns
      },
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
      }]
    }
  }
}
</script>
