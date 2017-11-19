<template>
  <ul class="top-menu-tasks">
    <li>
      <router-link to="/base/task">
        显示全部
      </router-link>
    </li>
    <task-item
      v-for="task in tasks"
      :key="task.id"
      :taskId="task.id"
      :currentStepName="task.currentStepName"
      :remainingTime="task.remainingTime"
      :totalTime="task.totalTime"
    />
    <li v-if="tasks.length === 0">
      <div class="top-menu-tasks-notask">当前没有待办任务</div>
    </li>
  </ul>
</template>

<script>
import moment from 'moment'

import { fetchList } from '../../../utils/api'

import TaskItem from './TaskItem'

export default {
  name: 'task-list',
  components: {
    TaskItem
  },
  data () {
    return {
      tasks: []
    }
  },
  created () {
    this.getData()
    // this.polling()
  },
  methods: {
    polling () {
      this.getData()
      setTimeout(this.polling, 1800000)
    },
    getData () {
      fetchList({
        resource: 'flow/getUserAllTask?orderBy=&filterBy=currentStepStatus%7Cequalto%7CINITIAL&pageSize=999999&pageIndex=1'
      }).then(data => {
        if (data.data && this.tasks.length !== data.data.length) {
          this.tasks = data.data ? data.data.map(item => {
            return {
              id: item.id,
              currentStepName: item.currentStepName,
              remainingTime: item.deadline - Number(moment().format('x')),
              totalTime: item.deadline - item.startTime
            }
          }) : []
          this.$emit('getTaskNum', data.recordsFiltered)
        }
      })
    }
  }
}
</script>

<style scoped lang="sass">
.top-menu-tasks
  width: 280px
  box-sizing: border-box
  max-height: 400px
  overflow: auto
  list-style: none
  padding: 0 15px 0 20px
  >li
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
  .top-menu-tasks-notask
    font-size: 14px
    color: #aaa
    text-align: center
</style>
