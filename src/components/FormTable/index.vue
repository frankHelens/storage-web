<template lang="pug">
  el-table(
    stripe
    border
    highlight-current-row
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
          :index="scope.$index"
          :name="scope.column.property"
          v-model="scope.row[scope.column.property]"
          v-bind="columns[scope.column.property].tableForm"
          :column="columns[scope.column.property]"
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
      currentData: this.tableData
    }
  },
  methods: {
    changeValues (values, index) {
      if (values) {
        let currentValues = values
        Object.keys(this.columns).filter(key => {
          return this.columns[key].tableForm
        }).map(item => {
          const { remoteName } = this.columns[item].tableForm
          if (remoteName) {
            if (values[remoteName]) {
              currentValues[item] = values[remoteName] || ''
            }
          }
        })
        this.$set(this.currentData, index, currentValues)
      }
      this.$emit('changeDatas', this.currentData)
    }
  }
}
</script>
