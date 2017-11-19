<template>
  <el-button
    :size="size"
    :type="type"
    :loading="loading"
    :disabled="isDisable"
    @click="handleClick">
      <Icon v-if="icon && !loading" :type="icon" size="14"></Icon>
      {{label}}
  </el-button>
</template>

<script>
export default {
  name: 'ButtonItem',
  props: {
    name: String,
    size: {
      type: String,
      default: 'small'
    },
    type: String,
    icon: String,
    label: String,
    disabled: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    funcProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    func: Function
  },
  data () {
    return {
      loading: false,
      isDisable: this.disabled
    }
  },
  methods: {
    handleClick (e) {
      this.func(this.data, this.funcProps, this, e)
    }
  }
}
</script>
