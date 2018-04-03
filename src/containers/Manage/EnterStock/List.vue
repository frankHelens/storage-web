<template lang="pug">
  DataTablePage(
    ref="table"
    mainColumn="name"
    longColumn="num"
    resource="/enterStock"
    title=""
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
    :operation="operation"
    :columns="columns"
    :isHighlightRow="true"
    :onRowDblclick="onRowDblclick")
</template>

<script>
import DataTablePage from '@/containers/DataTablePage'
import { baseColumns } from './columns'

export default {
  name: 'enterStock',
  components: {
    DataTablePage
  },
  data () {
    const _this = this
    return {
      toolbar: [{
        name: 'create',
        icon: 'plus',
        label: '新增',
        func: (data, props) => {
          this.$router.push('/manage/enterStockDetail')
        }
      }],
      operation: [],
      tableInitList: ['createdAt', 'code', 'origin', 'storageType', 'takePe', 'makePe', 'remark'],
      tableFullList: [],
      createList: [],
      updateList: [],
      filterInitList: ['code', 'origin', 'createdAt'],
      columns: {
        ...baseColumns
      },
      onRowDblclick (row, index) { // 双击事件
        _this.$router.push('/manage/enterStockDetail/' + row.id)
      }
    }
  }
}
</script>
