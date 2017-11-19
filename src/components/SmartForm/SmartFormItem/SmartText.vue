<template>
	<div class='text-value'>
    {{value}}
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      currentValue: String,
      options: {
        type: Array,
        default: () => []
      },
      dataType: {
        type: String,
        default: 'string'
      }
    },
    data () {
      return {
        value: this.dataType === 'date'
        ? moment(this.currentValue).format('YYYY-MM-DD')
        : this.dataType === 'select'
        ? this.options.find(option => this.currentValue === option.value).label
        : this.currentValue
      }
    }
  }
</script>

<style scoped lang="sass">
.text-value
  font-size: 16px
  color: #666
</style>
