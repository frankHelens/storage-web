<template>
  <DataTablePage
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
    :columns="columns">
  </DataTablePage>
</template>

<script>
import DataTablePage from '@/containers/DataTablePage'
import columns from './columns'

export default {
  name: 'enterStock',
  components: {
    DataTablePage
  },
  data () {
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
      tableInitList: ['createdAt', 'code', 'origin', 'storageType', 'enterPrice', 'takePe', 'makePe', 'remark'],
      tableFullList: [],
      createList: [],
      updateList: [],
      filterInitList: ['code', 'origin', 'createdAt'],
      columns: {
        ...columns
      }
    }
  }
}
</script>
