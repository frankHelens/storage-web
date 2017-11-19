<template>
<el-tabs class="main-tabs" v-model="tabContent">
  <el-tab-pane
    class="main-tabs-pane"
    v-for="tab in tabList"
    :key="tab"
    :label="tab.label" :name="tab.name">
    <slot :name="tab.name"></slot>
  </el-tab-pane>
</el-tabs>
</template>

<script>
export default {
  name: 'tab-pane',
  props: {
    tabList: {
      type: Array,
      default: () => []
    },
    initIndex: {
      type: Number,
      default: 0
    },
    path: {
      type: String
    }
  },
  watch: {
    tabContent (to) {
      this.$router.push({
        path: this.path || this.$router.path,
        query: { state: to }
      })
    }
  },
  data () {
    return {
      tabContent: this.$route.query.state || this.tabList[this.initIndex].name
    }
  }
}
</script>
