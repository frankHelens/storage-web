<template>
  <div>
    <Table
      border
      :loading="isLoading"
      :height="tableWrapperHeight"
      :columns="columnsList"
      :data="tableData"
      :highlight-row="isHighlightRow"
      @on-selection-change="changeSelection"
      @on-sort-change="changeOrderBy"
      @on-row-dblclick="onRowDblclick">
    </Table>
  </div>
</template>
<script>
import { timeRender, selectRender, multiselectRender } from '@/utils/infoRender'
import VOperation from '@/components/VTable/VOperation'
// import ButtonList from '@/components/ButtonList'

export default {
  components: { VOperation },
  props: {
    columns: {
      type: Object,
      default: () => ({})
    },
    tableInitList: {
      type: Array,
      default: () => []
    },
    tableFullList: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    orderBy: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: []
    },
    operationList: {
      type: Array,
      default: () => []
    },
    operationWidth: {
      type: Number,
      default: 120
    },
    selection: {
      type: Boolean,
      default: false
    },
    isHighlightRow: {
      type: Boolean,
      default: false
    },
    onRowDblclick: {
      type: Function,
      default: () => ({})
    }
  },
  data () {
    return {
    }
  },
  computed: {
    columnsList () {
      const tableList = this.tableInitList.map(item => {
        return {
          render: (h, params) => {
            if (this.columns[item].type === 'select') {
              return selectRender(params.row[item], this.columns[item].options)
            } else if (this.columns[item].type === 'multiselect') {
              return multiselectRender(params.row[item], this.columns[item].options)
            } else if (this.columns[item].type === 'time') {
              return timeRender(params.row[item], this.columns[item].dateType)
            } else {
              return params.row[item]
            }
          },
          ...this.columns[item],
          title: this.columns[item].label,
          key: item
        }
      })
      const operationList = this.operationList.length ? [{
        key: 'operation',
        width: this.operationWidth,
        title: '操作',
        fixed: 'right',
        align: 'center',
        render: (h, params) => {
          return h(VOperation, {
            props: {
              operationList: this.operationList,
              data: params.row
            }
          })
        }
      }] : []
      const selection = this.selection ? [{
        type: 'selection',
        width: 58,
        align: 'center'
      }] : []
      return [...selection, ...tableList, ...operationList]
    },
    tableWrapperHeight () {
      return document.body.clientHeight - 250
    }
  },
  methods: {
    changeSelection (selectionList) {
      this.$emit('changeSelection', selectionList)
    },
    changeOrderBy (options) {
      if (options.column.sortable === 'custom') {
        this.$emit('changeOrderBy', options)
      }
    }
    // onRowDblclick (row, index) {
    //   console.log(row, index)
    // }
  }
}
</script>
