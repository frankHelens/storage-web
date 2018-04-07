<template>
  <DataTablePage
    ref="table"
    mainColumn="name"
    longColumn="num"
    resource="user"
    labelName="name"
    label="用户"
    :dialogSize="40"
    :relation="false"
    :toolbar="toolbar"    
    :tableInitList="tableInitList"
    :filterInitList="filterInitList"
    :createList="createList"
    :updateList="updateList"
    :columns="columns"
    :selection="true"
    :relationResource="relationResource"
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
      relationResource: 'system/relation',
      toolbar: [toolbarDelete, toolbarCreate],
      onRowDblclick: (data) => {
        const { table } = this.$refs
        const labelName = table.labelName ? '【' + data[table.labelName] + '】' : ''
        table.updateDialogLabel = '编辑' + table.label + labelName
        table.updateDialogVisible = true
        table.updateDialogFormValues = cloneDeep(data)
      },
      tableInitList: ['loginName', 'name', 'linkPhone', 'roleIds', 'createdAt', 'updatedAt', 'remark'],
      createList: ['loginName', 'loginPassword', 'name', 'linkPhone', 'roleIds', 'remark'],
      updateList: ['loginName', 'name', 'linkPhone', 'roleIds', 'remark'],
      filterInitList: ['name', 'linkPhone', 'createdAt'],
      columns: columns
    }
  }
}
</script>
