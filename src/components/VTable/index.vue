<template>
  <div :style="tableStyle">
    <slot v-if="!fixedHeader" name="header"></slot>
    <slot></slot>
    <slot v-if="!fixedFooter" name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'v-table',
  props: {
    fixedFooter: {
      type: Boolean,
      default: false
    },
    fixedHeader: {
      type: Boolean,
      default: false
    },
    height: {
      type: String
    },
    enableSelectAll: {
      type: Boolean,
      default: false
    },
    allRowsSelected: {
      type: Boolean,
      default: false
    },
    multiSelectable: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: true
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    tableStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      isSelectAll: false
    }
  },
  mounted () {
    if (this.allRowsSelected) {
      this.selectAll()
    }
  },
  methods: {
    handleRowClick (index, tr) {
      this.$emit('rowClick', index, tr)
      this.$emit('row-click', index, tr)
    },
    handleRowHover (index, tr) {
      this.$emit('rowHover', index, tr)
      this.$emit('row-hover', index, tr)
    },
    handleRowHoverExit (index, tr) {
      this.$emit('rowHoverExit', index, tr)
      this.$emit('row-hover-exit', index, tr)
    },
    handleRowSelect (selectedRows) {
      this.$emit('rowSelection', selectedRows)
      this.$emit('row-selection', selectedRows)
    },
    handleCellClick (rowIndex, columnName, td, tr) {
      this.$emit('cellClick', rowIndex, columnName, td, tr)
      this.$emit('cell-click', rowIndex, columnName, td, tr)
    },
    handleCellHover (rowIndex, columnName, td, tr) {
      this.$emit('cellHover', rowIndex, columnName, td, tr)
      this.$emit('cell-hover', rowIndex, columnName, td, tr)
    },
    handleCellHoverExit (rowIndex, columnName, td, tr) {
      this.$emit('cellHoverExit', rowIndex, columnName, td, tr)
      this.$emit('cell-hover-exit', rowIndex, columnName, td, tr)
    },
    changeSelectAll (isSelectAll) {
      this.isSelectAll = isSelectAll
    },
    selectAll () {
      const tbody = this.getTbody()
      if (tbody) tbody.selectAll()
    },
    unSelectAll () {
      const tbody = this.getTbody()
      if (tbody) tbody.unSelectAll()
    },
    getTbody () {
      for (let i = 0; i < this.$children.length; i++) {
        const childItem = this.$children[i]
        if (childItem.isTbody) return childItem
      }
    }
  },
  watch: {
    allRowsSelected (val, oldVal) {
      if (val === oldVal) return
      if (val) {
        this.selectAll()
      } else {
        this.unSelectAll()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.v-table
  display: flex
  flex: 1
  padding: 0 24px
  width: 100%
  border-collapse: collapse
  border-spacing: 0
</style>
