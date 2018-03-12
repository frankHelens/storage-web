<template lang="pug">
  el-table(
    stripe
    border
    highlight-current-row
    :header-row-style="headerRowStyle"
    :size="size"
    :data="currentData"
    style="width: 100%")
    el-table-column(
      v-for="(column, index) in tableList"
      :prop="column"
      :key="index"
      :align="columns[column].algin || 'center'"
      :label="columns[column].label"
      :width="columns[column].width")
      template(scope="scope")
        FormItem(
          v-model="scope.row[scope.column.property]"
          v-bind="columns[scope.column.property].tableForm"
          :column="scope.column"
          :values="scope.row"
          :options="columns[scope.column.property].options"
          @changeValues="changeValues")
</template>

<script>
import FormItem from './FormItem'

export default {
  components: {
    FormItem
  },
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    tableData: {
      type: Array,
      default: () => []
    },
    tableList: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      headerRowStyle: {
        // textAlign: 'center'
      },
      currentData: this.tableData
    }
  },
  methods: {
    changeValues (values, id) {
      if (values) {
        const index = this.currentData.findIndex(item => item.id === id)
        this.$set(this.currentData, index, values)
      }
      this.$emit('changeDatas', this.currentData)
    }
  }
}
</script>
