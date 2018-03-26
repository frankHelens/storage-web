<template>
  <DataTablePage
    ref="table"
    mainColumn="name"
    longColumn="num"
    resource="menu"
    labelName="name"
    label="菜单"
    :dialogSize="40"
    :relation="false"
    :toolbar="toolbar"    
    :tableInitList="tableInitList"
    :filterInitList="filterInitList"
    :createList="createList"
    :updateList="updateList"
    :columns="columns"
    :selection="true"
    :onRowDblclick="onRowDblclick">
  </DataTablePage>
</template>

<script>
import DataTablePage from '@/containers/DataTablePage'
import { toolbarDelete, toolbarCreate } from '@/containers/DataTablePage/toolbar'
import { cloneDeep } from 'lodash'
import columns from './columns'

export default {
  name: 'user',
  components: {
    DataTablePage
  },
  data () {
    return {
      toolbar: [toolbarDelete, toolbarCreate],
      onRowDblclick: (data) => {
        const { table } = this.$refs
        const labelName = table.labelName ? '【' + data[table.labelName] + '】' : ''
        table.updateDialogLabel = '编辑' + table.label + labelName
        table.updateDialogVisible = true
        table.updateDialogFormValues = cloneDeep(data)
      },
      tableInitList: ['loginName', 'name', 'linkPhone', 'createdAt', 'updatedAt', 'remark'],
      createList: ['loginName', 'loginPassword', 'name', 'linkPhone', 'remark'],
      updateList: ['loginName', 'name', 'linkPhone', 'remark'],
      filterInitList: ['name', 'linkPhone', 'createdAt'],
      columns: columns
    }
  }
}
</script>
