<template>
  <div v-if="content.length > minLength">
    <el-popover
      placement="top-start"
      trigger="hover"
      :width="width">
      <span
        class="text-break">
        {{content}}
      </span>
      <span slot="reference">
        <slot>
        </slot>
      </span>
    </el-popover>
  </div>
  <div
    v-else>
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'v-render',
  props: {
    content: {
      type: String | Number,
      default: '-'
    },
    minLength: {
      type: Number,
      default: 12
    },
    width: {
      type: Number,
      default: 200
    }
  }
}
</script>

<style scoped lang="sass">
.text-break
  word-break: break-all
  word-wrap: break-word
</style>
