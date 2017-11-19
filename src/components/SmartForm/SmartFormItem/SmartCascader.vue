<template>
  <el-cascader
    v-model="value"
    :options="optionsTree"
    :show-all-levels="false"
    :change-on-select="!onlySelectLeaf"
    :clearable="true"
    :disabled="disabled"
    @change="changeValue">
  </el-cascader>
</template>

<script>
import { treeFormat } from '@/utils/common'

function treeValue (result, cid, options) {
  if (cid !== undefined && cid !== '') {
    const pid = options.find(option => option.value === cid).parentId
    if (pid) {
      return treeValue([cid, ...result], pid, options)
    } else {
      return [cid, ...result]
    }
  } else {
    return result
  }
}

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
    onlySelectLeaf: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      value: treeValue([], this.currentValue, this.options)
    }
  },
  computed: {
    optionsTree () {
      return treeFormat(this.options, 'value')
    }
  },
  methods: {
    changeValue (value) {
      this.$emit('changeValue', value[value.length - 1])
    }
  }
}
</script>
