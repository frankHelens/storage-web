<template>
  <DataTablePage
    ref="table"
    mainColumn="roleName"
    longColumn="roleName"
    resource="role"
    labelName="roleName"
    label="角色"
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
  name: 'role',
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
      tableInitList: ['roleName', 'roleDesc', 'createdAt', 'updatedAt'],
      createList: ['roleName', 'roleDesc'],
      updateList: ['roleName', 'roleDesc'],
      filterInitList: ['roleName', 'createdAt'],
      columns: columns
    }
  }
}
</script>
