<template>
<tfoot>
  <slot></slot>
</tfoot>
</template>

<script>
export default {
  name: 'v-tfoot',
  created () {
    this.isTfoot = true
  },
  computed: {
    showCheckbox () {
      return this.$parent.showCheckbox
    }
  }
}
</script>
