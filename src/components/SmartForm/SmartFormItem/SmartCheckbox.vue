<template>
  <el-checkbox
    :disabled="disabled"
    v-model="checkValue"
    @change="changeCheckValue"></el-checkbox>
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
        default: 'boolean'
      },
      currentValue: {
        type: Boolean | Number
      }
    },
    data () {
      return {
        checkValue: dataTypeFunc(this.currentValue, 'boolean')
      }
    },
    methods: {
      changeCheckValue (event) {
        this.$emit('changeValue', dataTypeFunc(event.target.checked, this.dataType))
      }
    }
  }
</script>
