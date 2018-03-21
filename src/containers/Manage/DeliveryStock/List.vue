<template lang="pug">
  DataTablePage(
    ref="table"
    mainColumn="name"
    longColumn="num"
    resource="/deliveryStock"
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
  name: 'deliveryStock',
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
          this.$router.push('/manage/deliveryStockDetail')
        }
      }],
      operation: [],
      tableInitList: ['createdAt', 'code', 'clientName', 'storageType', 'deliveryPrice', 'clientAddress', 'linkMan', 'linkPhone', 'makePe', 'remark'],
      tableFullList: [],
      createList: [],
      updateList: [],
      filterInitList: ['code', 'clientName', 'createdAt'],
      columns: {
        ...baseColumns
      },
      onRowDblclick (row, index) { // 双击事件
        _this.$router.push('/manage/deliveryStockDetail/' + row.id)
      }
    }
  }
}
</script>
