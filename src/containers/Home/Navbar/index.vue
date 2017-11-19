<template>
  <el-aside :width="isOpen?'230px':'65px'" class="aside">
    <el-menu
      default-active="1-4-1"
      :collapse="!isOpen"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
  import { treeFormat } from '@/utils/common'

  export default {
    props: {
      isOpen: Boolean,
      routesPure: Array
    },
    data () {
      return {}
    },
    watch: {
      '$route': 'activeChange'
    },
    methods: {
      activeChange () {
        const that = this
        this.routes = this.routesPure.map(item => {
          const path = that.$route.path
          const isSelf = path === item.url
          const isParents = path.indexOf(item.url) === 0 && !isSelf
          item.isOpen = isParents && !isSelf
          item.isActive = isSelf || isParents
          return item
        })
      }
    },
    computed: {
      navList () {
        console.log(treeFormat(this.routesPure))
        return treeFormat(this.routesPure)
      }
    }
  }
</script>

<style lang="sass" scoped>
.aside
  background-color: #545c64
  transition: all 0.1s
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1)
</style>
