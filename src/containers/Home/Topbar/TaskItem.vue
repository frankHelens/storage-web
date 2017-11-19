<template>
  <li>
    <router-link :to="'/base/task/'+taskId">
      {{taskId}}.{{currentStepName}}
      <b :class="{colorRed: isTimeout}">({{remainingTimeText}})</b>
      <el-progress
        :text-inside="true"
        :stroke-width="5"
        :percentage="percentage"
        :status="isTimeout?'exception':'success'"
        class="mt10"></el-progress>
    </router-link>
  </li>
</template>

<script>
import moment from 'moment'
export default {
  name: 'task-item',
  props: {
    taskId: Number,
    currentStepName: String,
    remainingTime: Number,
    totalTime: Number
  },
  computed: {
    isTimeout () {
      return this.remainingTime < 0
    },
    percentage () {
      return this.isTimeout ? 100 : (this.totalTime - this.remainingTime) * 100 / this.totalTime
    },
    remainingTimeText () {
      if (this.isTimeout) {
        return '已超时'
      } else {
        return '剩余' + moment.duration(this.remainingTime).days() + '天' + moment.duration(this.remainingTime).hours() + '小时'
      }
    }
  }
}
</script>

<style scoped lang="sass">
li
  padding: 20px 0
  border-bottom: 1px solid #e8e8e8
  &:nth-last-of-type(1)
    border-bottom: 0px
  a
    display: block
    font-size: 14px
    color: #999
    text-decoration: none
  b
    font-size: 12px
    margin-left: 5px
.colorRed
  color: #fe6553
</style>
