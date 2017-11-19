<template>
  <ul @mouseenter="changeHover(true)" @mouseleave="changeHover(false)">
    <nav-item
      v-for="(item,index) in navlist"
      :key="index"
      :item="item"
      :navIsOpen="navIsOpen"
    />
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'
import { treeFormat } from '@/utils/common'
import NavItem from './NavItem'

export default {
  name: 'NavList',
  components: {
    NavItem
  },
  props: {
    data: Array,
    navIsOpen: Boolean
  },
  computed: {
    navlist: function () {
      return treeFormat(this.data, 'id', 'parentId')
    }
  },
  methods: {
    ...mapMutations([
      'changeHover'
    ])
  }
}
</script>
