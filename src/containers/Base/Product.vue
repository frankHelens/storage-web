<template lang="pug">
  DataTablePage(
    ref="table"
    mainColumn="name"
    longColumn="num"
    resource="/product"
    label=""
    labelName="name"
    :dialogSize="60"
    :relation="false"
    :toolbar="toolbar"    
    :tableFullList="tableFullList"
    :tableInitList="tableInitList"
    :filterInitList="filterInitList"
    :createList="createList"
    :updateList="updateList"
    :columns="columns"
    :selection="true"
    :onRowDblclick="onRowDblclick")
</template>

<script>
import DataTablePage from '@/containers/DataTablePage'
import { toolbarDelete, toolbarCreate } from '@/containers/DataTablePage/toolbar'
import { cloneDeep } from 'lodash'
import columns from './columns'

export default {
  name: 'product',
  components: {
    DataTablePage
  },
  data () {
    return {
      toolbar: [toolbarDelete, toolbarCreate],
      // , 'storeNum', 'totalNum'
      tableInitList: ['code', 'name', 'type', 'unit', 'safeNum', 'productNum', 'price', 'newPrice', 'remark', 'createdAt', 'updatedAt'],
      tableFullList: ['code', 'name', 'type', 'unit', 'safeNum', 'productNum', 'price', 'newPrice', 'remark', 'createdAt', 'updatedAt'],
      createList: ['code', 'name', 'type', 'unit', 'safeNum', 'price', 'remark'],
      updateList: ['code', 'name', 'type', 'unit', 'safeNum', 'price', 'remark'],
      filterInitList: ['code', 'name', 'type', 'createdAt'],
      onRowDblclick: (data) => {
        const { table } = this.$refs
        const labelName = table.labelName ? '【' + data[table.labelName] + '】' : ''
        table.updateDialogLabel = '编辑' + table.label + labelName
        table.updateDialogVisible = true
        table.updateDialogFormValues = cloneDeep(data)
      },
      columns: columns
    }
  }
}
</script>
