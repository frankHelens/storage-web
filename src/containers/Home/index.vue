<template>
  <div class="layout" :class="{'layout-hide-text': isClose}">
    <Row type="flex">
      <Col :span="spanLeft" class="layout-menu-left">
      <Menu
        :active-name="activeName"
        :open-names="openNames"
        theme="dark"
        width="auto"
        @on-select="changeOpen">
        <div class="layout-logo-left">
          <span v-show="!isClose">{{title}}</span>
        </div>
        <div
          v-for="nav in navlist"
          :key="nav">
          <Submenu
            v-if="nav.children"
            v-show="!isClose"
            :name="nav.id">
            <template slot="title">
              <Icon :type="nav.icon" :size="iconSize"></Icon>
              <span class="layout-text">{{nav.label}}</span>
            </template>
            <MenuItem
              v-for="navItem in nav.children"
              :key="navItem"
              :name="navItem.id">{{navItem.label}}</MenuItem>
          </Submenu>
          <MenuItem
            v-else
            :name="nav.id">
            <Icon :type="nav.icon" :size="iconSize"></Icon>
            <span class="layout-text">{{nav.label}}</span>
          </MenuItem>
          <div v-show="isClose">
            <MenuItem :name="nav.id">
              <Icon :type="nav.icon" :size="iconSize"></Icon>
              <span class="layout-text">{{nav.label}}</span>
            </MenuItem>  
          </div>
        </div>
      </Menu>
    </Col>
    <Col :span="spanRight" class="layout-content-right">
    <div class="layout-header">
      <div class="header-left">
        <Button type="text" @click="toggleClick">
          <Icon type="navicon" size="32"></Icon>
        </Button>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem
              v-for="item in BreadcrumbList"
              :key="item"
              replace
              :href="item.url">{{item.label}}</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      <div class="header-nav-list">
        <Topbar/>
      </div>
    </div>
    <div class="layout-content">
      <div class="layout-content-main">
        <router-view class="content"></router-view>
      </div>
    </div>
  </Col>
</Row>
</div>
</template>
<script>
import { treeFormat, TITLE } from '@/utils/common'
import Topbar from './Topbar'
import { cloneDeep } from 'lodash'
import menus from '@/utils/menu'

export default {
  components: {
    Topbar
  },
  data () {
    return {
      title: TITLE,
      isClose: false,
      spanLeft: 12,
      spanRight: 12,
      routesPure: menus,
      realName: 'Admin',
      data: {
        'id': 1,
        'loginName': 'sa',
        'name': 'Admin',
        'menus': []
      },
      BreadcrumbList: []
    }
  },
  watch: {
    $route (to) {
      const { matched } = to
      const { path } = matched[matched.length - 1]
      this.getBreadcrumbList(path)
    }
  },
  created () {
    const { matched } = this.$route
    const { path } = matched[matched.length - 1]
    this.getBreadcrumbList(path)
  },
  computed: {
    activeName () {
      const bread = this.BreadcrumbList.find(bread => bread.url === this.$route.path)
      return bread ? bread.id : 0
    },
    openNames () {
      return [this.BreadcrumbList[0].id]
    },
    iconSize () {
      return this.isClose ? 24 : 19
    },
    navlist () {
      const navList = cloneDeep(this.routesPure).filter(item => !item.noMenu)
      return treeFormat(navList, 'id', 'parentId')
    }
  },
  methods: {
    changeOpen (id) {
      const url = this.routesPure.find(route => route.id === id).url
      this.$router.push(url)
    },
    toggleClick () {
      this.isClose = !this.isClose
    },
    getBreadcrumbList (path) { // 获取面包屑
      let breadcrumbList = []
      const getActiveUrl = (path) => {
        const activeUrl = this.routesPure.find(routes => routes.url === path)
        if (activeUrl) {
          breadcrumbList.unshift({
            url: activeUrl.url,
            label: activeUrl.label,
            id: activeUrl.id
          })
          const parentUrl = this.routesPure.find(routes => routes.id === activeUrl.parentId)
          if (parentUrl.url === '') {
            breadcrumbList.unshift({
              url: parentUrl.url,
              label: parentUrl.label,
              id: parentUrl.id
            })
          } else {
            getActiveUrl(parentUrl.url)
          }
        }
      }
      getActiveUrl(path)
      this.BreadcrumbList = breadcrumbList
    }
  }
}
</script>
<style scoped lang="sass">
$topHeight: 50px
.layout
  border: 1px solid #d7dde4
  height: 100%
  background: #f5f7f9
  position: relative
  border-radius: 4px
  overflow: hidden
  display: flex
  flex-direction: column
.layout-breadcrumb
  padding: 15px
.layout-content
  flex: 1px
  min-height: 200px
  margin: 15px
  overflow: hidden
  background: #fff
  border-radius: 4px
.layout-content-main
  padding: 10px
.layout-copy
  text-align: center
  padding: 10px 0 20px
  color: #9ea7b4
.layout-menu-left
  width: 230px
  overflow: auto
.layout-header
  display: flex
  justify-content: space-between
  height: $topHeight
  background: #fff
  box-shadow: 0 1px 1px rgba(0,0,0,.1)
.header-left
  width: 50%
  display: flex
.layout-logo-left
  width: 100%
  height: $topHeight
  line-height: $topHeight
  font-size: 20px
  background: #2d2d32
  border-bottom: 1px solid #29292d
  color: #fff
  border-radius: 3px
  text-align: center
.layout-ceiling-main a
  color: #9ba7b5
.layout-hide-text
  .layout-text
    display: none
  .layout-menu-left 
    width: 70px
.layout-content-right
  display: flex
  flex-direction: column
  flex: 1
.ivu-col
  transition: width .2s ease-in-out
.header-nav-list
  height: inherit
  line-height: $topHeight
</style>
