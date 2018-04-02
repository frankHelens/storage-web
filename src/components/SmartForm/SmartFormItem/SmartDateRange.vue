<template>
  <DatePicker
    type="daterange"
    placement="bottom-end"
    v-model="value"
    :disabled="disabled"
    :placeholder="placeholder"
    @on-change="changeValue"
    style="width: 150px"></DatePicker>
  <!-- <el-date-picker
    v-model="value"
    type="daterange"
    :align="getAlign"
    :placeholder="placeholder"
    :disabled="disabled"
    :picker-options="pickerOptions"
    @change="changeValue">
  </el-date-picker> -->
</template>

<script>
import moment from 'moment'

export default {
  name: 'daterange',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '选择日期范围'
    },
    dataType: {
      type: String,
      default: 'string'
    },
    currentValue: {
      type: String | Number
    },
    shortcuts: {
      type: Array
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      pickerOptions: {
        shortcuts: this.shortcuts
      },
      value: this.currentValue
    }
  },
  computed: {
    getAlign () {
      return this.shortcuts && this.shortcuts.length ? 'align' : ''
    }
  },
  methods: {
    changeValue (value) {
      const times = value
      const result = {
        start: times[0] && times[0] !== '' ? moment(times[0], 'YYYY-MM-DD').startOf('day').format('x') : undefined,
        end: times[0] && times[0] !== '' ? moment(times[1], 'YYYY-MM-DD').endOf('day').format('x') : undefined
      }
      this.$emit('changeValue', result)
    }
  }
}
</script>
