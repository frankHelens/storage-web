<template>
  <el-input
    v-model="value"
    type="password"
    :disabled="disabled"
    :placeholder="placeholder"
    @change="changeValue"
  />
</template>

<script>
import { encrypt, dataTypeFunc } from '@/utils/common'

export default {
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
      default: 'string'
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    changeValue (value) {
      const mdValue = dataTypeFunc(value, this.dataType) === '' ? '' : encrypt(value)
      this.$emit('changeValue', mdValue)
    }
  }
}
</script>

