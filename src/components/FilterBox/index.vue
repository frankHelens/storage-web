<template>
  <div class="filter-box">
    <SmartForm
      class="step-form"
      labelPosition="right"
      :inline="true"
      :formList="filterList"
      :columns="filterColumns"
      :values="filterValues"
      :buttonList="buttonList"
    />
  </div>
</template>
<script>
import SmartForm from '@/components/SmartForm'

export default {
  name: 'FilterBox',
  components: {
    SmartForm
  },
  props: {
    columns: Object,
    filterList: {
      type: Array,
      default: () => []
    },
    filterBy: {
      type: Array,
      default: () => []
    }
  },
  data () {
    let filterColumns = {}
    Object.keys(this.columns).map(key => {
      filterColumns[key] = {
        ...this.columns[key],
        form: this.columns[key].filter
      }
    })
    let filterValues = {}
    this.filterBy.map(item => {
      filterValues[item.name] = item.value
    })
    return {
      filterValues: filterValues,
      filterColumns: filterColumns,
      buttonList: [{
        name: 'search',
        label: '搜索',
        validate: true,
        func: (data, props) => {
          let filterBy = []
          Object.keys(data).map(key => {
            if (filterColumns[key]) {
              console.log(filterColumns[key])
              const columnFilter = filterColumns[key].filter
              if (columnFilter.type === 'daterange') {
                filterBy.push({
                  name: key,
                  type: 'ge',
                  value: data[key].start
                })
                filterBy.push({
                  name: key,
                  type: 'le',
                  value: data[key].end
                })
              } else {
                let type = 'eq'
                if (columnFilter.like) {
                  type = 'like'
                }
                filterBy.push({
                  name: key,
                  type: type,
                  value: data[key]
                })
              }
            }
          })
          const result = filterBy.filter(item => {
            return item.value !== '' && item.value !== undefined
          })
          this.$emit('changeFilterBy', result)
        }
      }]
    }
  }
}
</script>

<style scoped lang="sass">
</style>
