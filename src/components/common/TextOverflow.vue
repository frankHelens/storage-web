<template>
  <div
    v-if="isToolTip"
    class="text-overflow"
    :style="tooltipStyle">
    <el-popover
      placement="top-start"
      trigger="hover">
      <div class="text-break">{{ content }}</div>
      <span slot="reference">{{ content }}</span>
    </el-popover>
  </div>
  <div
    v-else>
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'text-overflow',
  props: {
    content: {
      type: String
    },
    contentLength: {
      type: Number,
      default: 10
    },
    tooltipWidth: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      tooltipShow: false
    }
  },
  computed: {
    tooltipStyle () {
      return {
        width: this.tooltipWidth
      }
    },
    isToolTip () {
      return this.content && this.content.length > this.contentLength
    }
  }
}
</script>

<style scoped lang="sass">
.text-overflow
  max-width: 300px
  text-overflow: ellipsis
  white-space: nowrap
  overflow: hidden
.text-break
  word-break: break-all
  word-wrap: break-word
  max-width: 300px
</style>
