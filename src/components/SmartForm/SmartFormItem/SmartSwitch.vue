<template>
  <el-switch
    v-model="value"
    :off-text="options[0].label"
    :on-text="options[1].label"
    :off-color="options[0].style | color"
    :on-color="options[1].style | color"
    @change="changeValue">
  </el-switch>
</template>

<script>
  import { dataTypeFunc } from '@/utils/common'

  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      dataType: {
        type: String,
        default: 'number'
      },
      currentValue: {
        type: Object | Number
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        value: dataTypeFunc(this.currentValue, 'boolean')
      }
    },
    filters: {
      color (style) {
        if (style === 'success') {
          return '#58d68d'
        }
        if (style === 'primary') {
          return '#03a9f4'
        }
        if (style === 'info') {
          return '#03a9f4'
        }
        if (style === 'warning') {
          return '#ffcd14'
        }
        if (style === 'danger') {
          return '#fe6553'
        }
      }
    },
    methods: {
      changeValue (value) {
        const values = dataTypeFunc(value, this.dataType)
        this.$emit('changeValue', values)
      }
    }
  }
</script>
