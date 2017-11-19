<template>
  <!-- <el-date-picker
    v-model="value"
    type="date"
    :placeholder="placeholder"
    :picker-options="pickerOptions"
    @change="changeValue">
  </el-date-picker> -->
  <el-date-picker
    v-model="value"
    type="date"    
    :align="getAlign"    
    :disabled="disabled"
    :placeholder="placeholder"
    @change="changeValue">
  </el-date-picker>
</template>

<script>
// import moment from 'moment'
import { timeRender } from '@/utils/infoRender'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择日期'
    },
    dataType: {
      type: String,
      default: 'number'
    },
    currentValue: {
      type: String | Number
    },
    shortcuts: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time
        }
      },
      value: this.currentValue,
      value1: ''
    }
  },
  computed: {
    getAlign () {
      return this.shortcuts.length ? 'align' : ''
    }
  },
  methods: {
    changeValue (value) {
      // const dateValue = value ? Number(moment(value).format('x')) : ''
      const dateValue = value ? this.formatValue(value, this.dataType) : ''
      this.$emit('changeValue', dateValue)
    },
    formatValue (value, dataType) {
      if (dataType === 'string') {
        return timeRender(value, 'YYYY-MM-DD')
      }
      if (dataType === 'number') {
        return Number(timeRender(value, 'x'))
      }
    }
  }
}
</script>
