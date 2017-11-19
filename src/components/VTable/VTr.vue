<template>
  <li
    class="table-record clearfix">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'v-tr'
}
</script>
<style scoped lang="sass">
.table-record
  border-left: none
  border-top: none
  .table-caption,.table-data
    float: left
    padding: 10px 20px
    background-color: #fff
    border-left: 1px solid #ddd
    border-bottom: 1px solid #ddd
    &:first-child
      border-left: none
  &:first-child .table-data
    border-top: none
  &:last-child
    .table-caption
      border-bottom: 1px solid #ddd
</style>
