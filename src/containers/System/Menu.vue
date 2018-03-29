<template>
  <DataTablePage
    ref="table"
    mainColumn="label"
    longColumn="label"
    resource="menu"
    labelName="label"
    label="菜单"
    :dialogSize="60"
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
      relationResource: 'menu/relation',
      toolbar: [toolbarDelete, toolbarCreate],
      onRowDblclick: (data) => {
        const { table } = this.$refs
        const labelName = table.labelName ? '【' + data[table.labelName] + '】' : ''
        table.updateDialogLabel = '编辑' + table.label + labelName
        table.updateDialogVisible = true
        table.updateDialogFormValues = cloneDeep(data)
      },
      tableInitList: ['label', 'parentId', 'url', 'icon', 'type', 'noMenu', 'enabled', 'remark'],
      createList: ['label', 'parentId', 'url', 'icon', 'type', 'noMenu', 'enabled', 'remark'],
      updateList: ['label', 'parentId', 'url', 'icon', 'type', 'noMenu', 'enabled', 'remark'],
      filterInitList: ['label'],
      columns: columns
    }
  }
}
</script>
