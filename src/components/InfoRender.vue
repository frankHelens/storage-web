<template>
  <div class="text-overflow" v-if="content.length > minLength">
    <el-popover
      placement="top-start"
      trigger="hover"
      :width="width">
      <span
        class="text-break">
        {{content}}
      </span>
      <span slot="reference">
        <slot :content="content">
        </slot>
      </span>
    </el-popover>
  </div>
  <div class="text-overflow" v-else>
    <slot :content="content">
    </slot>
  </div>
</template>

<script>
import { infoRender } from '@/utils/infoRender'
export default {
  name: 'info-render',
  props: {
    recordIndex: Number,
    data: String | Number | Object | Array,
    column: Object,
    full: Object,
    minLength: {
      type: Number,
      default: 7
    },
    width: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {}
  },
  computed: {
    content () {
      return infoRender(this.data, this.column, this.full, this.recordIndex)
    }
  }
}
</script>

<style scoped lang="sass">
.text-overflow
  text-overflow: ellipsis
  white-space: nowrap
  overflow: hidden
.text-break
  word-break: break-all
  word-wrap: break-word
</style>
