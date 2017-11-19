<template>
  <el-select v-model="value"
    :placeholder="placeholder"
    :filterable="live"
    :clearable="true"
    :disabled="disabled"
    @change="changeValue">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  import { dataTypeFunc } from '@/utils/common'

  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      live: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      dataType: {
        type: String,
        default: 'string'
      },
      currentValue: {
        type: String | Number
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        value: this.currentValue
      }
    },
    methods: {
      changeValue (value) {
        const values = value !== '' ? dataTypeFunc(value, this.dataType) : ''
        this.$emit('changeValue', values)
      }
    }
  }
</script>
