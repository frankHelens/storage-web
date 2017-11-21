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
      <Button type="text" @click="toggleClick">
        <Icon type="navicon" size="32"></Icon>
      </Button>
      <div class="header-nav-list">
        <Topbar/>
      </div>
    </div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem
          v-for="item in BreadcrumbList"
          :key="item"
          replace
          :href="item.url">{{item.label}}</BreadcrumbItem>
      </Breadcrumb>
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
      routesPure: [{
      //   id: 0,
      //   label: '系统管理',
      //   url: '/manager',
      //   icon: 'gear-b',
      //   type: 'MODULE'
      // }, {
      //   id: 1,
      //   parentId: 0,
      //   label: '用户管理',
      //   url: '/manager/account',
      //   icon: '',
      //   type: 'PAGE'
      // }, {
        id: 2,
        label: '业务办理',
        url: '',
        icon: 'document-text',
        type: 'MODULE'
      }, {
        id: 3,
        parentId: 2,
        label: '商品信息',
        url: '/product/list',
        icon: 'document-text',
        type: 'MODULE'
      // }, {
      //   id: 4,
      //   label: '统计报表',
      //   url: '/business/business1',
      //   icon: 'stats-bars',
      //   type: 'PAGE'
      // }, {
      //   id: 5,
      //   label: '活跃分析',
      //   parentId: 4,
      //   url: '/business/business1',
      //   icon: '',
      //   type: 'PAGE'
      // }, {
      //   id: 6,
      //   label: '用户留存',
      //   parentId: 4,
      //   url: '/business/business1',
      //   icon: '',
      //   type: 'PAGE'
      }],
      realName: 'Admin',
      data: {
        'id': 1,
        'loginName': 'sa',
        'name': 'Admin',
        'menus': []
      },
      activeName: 0,
      openNames: [],
      BreadcrumbList: []
    }
  },
  created () {
    const activeUrl = this.routesPure.find(routes => routes.url === this.$route.path)
    const parentUrl = this.routesPure.find(routes => routes.id === activeUrl.parentId)
    this.activeName = activeUrl ? activeUrl.id : 0
    this.openNames = parentUrl ? [parentUrl.id] : []
    this.BreadcrumbList = parentUrl ? [parentUrl, activeUrl] : [activeUrl]
  },
  computed: {
    iconSize () {
      return this.isClose ? 24 : 19
    },
    navlist () {
      return treeFormat(this.routesPure, 'id', 'parentId')
    }
  },
  methods: {
    changeOpen (id) {
      const url = this.routesPure.find(route => route.id === id).url
      this.$router.push(url)
    },
    toggleClick () {
      this.isClose = !this.isClose
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
  padding: 10px 15px 0
.layout-content
  flex: 1px;
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
