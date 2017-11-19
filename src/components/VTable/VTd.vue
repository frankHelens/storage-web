<template>
  <div
    :class="['table-data']"
    :style="columnStyle">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'v-td',
  props: {
    columnStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
