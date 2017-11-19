<template>
  <div
    @click="handleClick" 
    :class="['table-caption', {isSort: column.sort, active: active }]"
    :style="columnStyle">
    {{ column.label }}
    <span v-if="column.sort" class="arrow" :class="classDirection"
    >
    </span>
  </div>
</template>

<script>
export default {
  name: 'v-th',
  props: {
    columnName: String,
    column: Object,
    active: {
      type: Boolean,
      default: false
    },
    sortDirection: {
      type: String,
      default: 'sort'
    },
    columnStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    classDirection () {
      return this.sortDirection === 'asc'
      ? 'fa fa-sort-asc'
      : this.sortDirection === 'desc'
      ? 'fa fa-sort-desc'
      : 'fa fa-sort'
    }
  },
  methods: {
    handleClick () {
      if (this.column.sort) {
        const sortBy = [{
          name: this.columnName,
          sort: this.sortDirection === 'desc' ? 'asc' : 'desc'
        }]
        this.$emit('changeOrderBy', sortBy)
      }
    }
  }
}
</script>

<style scoped lang="sass">
.table-caption
  &.isSort
    cursor: pointer
    .arrow
      display: inline-block
      width: 0
      height: 0
      margin-left: 5px
      opacity: 0.66
    &.active
      .arrow
        opacity: 1
</style>
