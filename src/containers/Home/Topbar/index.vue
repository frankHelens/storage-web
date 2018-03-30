<template>
  <div class="top-container">
    <TopMenuItem/>
    <User :realName="realName"/>
  </div>
</template>
<script>
import TopMenuItem from './TopMenuItem'
import User from './User'

/* globals localStorage */
export default {
  name: 'Topbar',
  props: {
    isOpen: Boolean,
    realName: String
  },
  components: {
    TopMenuItem,
    User
  },
  data () {
    return {
      taskNum: 0,
      values: {}
    }
  },
  methods: {
    getTaskNum (taskNum) {
      this.taskNum = taskNum
    }
  }
}
</script>

<style scoped lang="sass">
.top-container 
  display: flex
  >div
    cursor: pointer
    margin-right: 20px
    height: 50px
    line-height: 50px
</style>
