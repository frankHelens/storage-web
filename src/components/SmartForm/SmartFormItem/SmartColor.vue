<template>
  <el-color-picker v-model="value" @change="changeValue"></el-color-picker>
</template>

<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      currentValue: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        value: this.currentValue
      }
    },
    methods: {
      changeValue (value) {
        console.log(value)
        this.$emit('changeValue', value)
      }
    }
  }
</script>

