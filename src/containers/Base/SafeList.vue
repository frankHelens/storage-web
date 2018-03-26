<template lang="pug">
  DataTablePage(
    ref="table"
    mainColumn="name"
    longColumn="num"
    resource="product/safe"
    label=""
    labelName="name"
    :dialogSize="60"
    :relation="false"
    :tableInitList="tableInitList"
    :columns="columns"
    :selection="true")
</template>

<script>
import DataTablePage from '@/containers/DataTablePage'
// import { cloneDeep } from 'lodash'
import columns from './columns'

export default {
  name: 'product',
  components: {
    DataTablePage
  },
  data () {
    return {
      tableInitList: ['code', 'name', 'type', 'unit', 'safeNum', 'productNum', 'updatedAt', 'remark'],
      // createList: ['code', 'name', 'type', 'unit', 'safeNum', 'price', 'remark'],
      // updateList: ['code', 'name', 'type', 'unit', 'safeNum', 'price', 'remark'],
      // filterInitList: ['code', 'name', 'type'],
      onRowDblclick: (data) => {
        const { table } = this.$refs
        console.log(table)
      },
      columns: {
        ...columns,
        remark: {
          label: '备注'
        }
      }
    }
  }
}
</script>
