<template>
<el-tree
  show-checkbox
  node-key="value"
  :accordion="true"
  :data="treeData"
  :default-checked-keys="Array.from(value)"
  @check-change="treeChangeValue"
  >
</el-tree>  
</template>

<script>
// import { dataTypeFunc } from '@/utils/common'
import { treeFormat } from '@/utils/common'

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
      treeData: treeFormat(this.options, 'value'),
      value: new Set(this.currentValue)
    }
  },
  methods: {
    treeChangeValue (data, state, child) {
      let currentValue = this.value
      state && !data.children ? currentValue.add(data.value) : currentValue.delete(data.value)
      this.$emit('changeValue', currentValue)
    }
  }
}
</script>
