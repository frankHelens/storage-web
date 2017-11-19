<template>
  <!-- <input-number
    :disabled="disabled"
    :min="min"
    :max="max"
    :step="step"
    v-model="value"
    @on-change="changeValue">
  </input-number> -->
  <el-input-number
    v-model="value"
    :disabled="disabled"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    :step="step"
    :debounce="debounce"
    @change="changeValue">
  </el-input-number>
</template>

<script>
  // import InputNumber from 'iview/src/components/input-number'
  import { dataTypeFunc } from '@/utils/common'
  export default {
    components: {
      // InputNumber
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      dataType: {
        type: String,
        default: 'number'
      },
      currentValue: {
        type: String | Number,
        default: 1
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: Infinity
      },
      step: {
        type: Number,
        default: 1
      }
    },
    data () {
      console.log(this.currentValue)
      return {
        value: dataTypeFunc(this.currentValue, 'number')
      }
    },
    methods: {
      changeValue (value) {
        this.$emit('changeValue', dataTypeFunc(value, this.dataType))
      }
    }
  }
</script>

