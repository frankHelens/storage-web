<template>
	<el-input
    v-model="value"
    :disabled="disabled"
    :placeholder="placeholder"
    @change="changeValue"
  />
</template>

<script>
  import { dataTypeFunc } from '@/utils/common'

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
      },
      currentValue: {
        type: String | Number
      }
    },
    // data () {
    //   return {
    //     value: dataTypeFunc(this.currentValue, 'string')
    //   }
    // },
    methods: {
      changeValue (value) {
        this.$emit('changeValue', dataTypeFunc(value, this.dataType))
      }
    },
    computed: {
      value () {
        return dataTypeFunc(this.currentValue, 'string')
      }
    }
  }
</script>

