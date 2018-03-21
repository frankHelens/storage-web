<template lang="pug">
  el-table(
    border
    highlight-current-row
    :show-summary="showSummary"
    :summary-method="getSummaries"
    :max-height="tableWrapperHeight"
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
          @changeValues="changeValues"
          @changeChain="changeChain")
</template>

<script>
import FormItem from './FormItem'
import { getRemoteValues } from '@/utils/common'

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
    },
    showSummary: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentData: this.tableData
    }
  },
  computed: {
    tableWrapperHeight () {
      return document.body.clientHeight - 280
    }
  },
  methods: {
    getSummaries ({ columns, data }) {
      const sums = []
      columns.forEach((column, index) => {
        const { isSum } = this.columns[column.property].tableForm
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (isSum) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index]
        } else {
          sums[index] = ''
        }
      })
      // 获取总金额
      this.$emit('getSumsPrice', sums[sums.length - 2])
      return sums
    },
    changeValues (values, index) {
      if (values) {
        const currentValues = getRemoteValues(values, this.columns)
        this.$set(this.currentData, index, currentValues)
      }
      this.$emit('changeDatas', this.currentData)
    },
    changeChain ({name, value, chain, index, values, column}) { // 数据联动
      const chainType = {
        equal: value,
        multiply: (Number(value) * Number(values[chain.value])).toFixed(2),
        division: (Number(value) / Number(values[chain.value])).toFixed(2),
        custom () {
          return column.tableForm.customFun({name, value, chain, index, values, column})
        }
      }
      values[chain.name] = chainType[chain.type]
      this.$set(this.currentData, index, values)
      this.$emit('changeDatas', this.currentData)
    }
  }
}
</script>
