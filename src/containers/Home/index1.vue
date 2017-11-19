<template>
<el-container id="home" style="height:100%;">
  <el-header style="background-color: #545c64;font-size: 12px">
    <topbar
      :isOpen="isOpen"
      :realName="realName"
    />
  </el-header>
  <el-container>
    <navbar
      v-if="routesPure && routesPure.length > 0"
      :class="{'nav':true,'navbar-open':isOpen}"
      :isOpen="isOpen"
      :routesPure="routesPure"/>
    <el-main>
      <router-view class="content"></router-view>
    </el-main>
  </el-container>
    <!-- <div class="wrapper">
      <navbar
        v-if="routesPure && routesPure.length > 0"
        :class="{'nav':true,'navbar-open':isOpen}"
        :isOpen="isOpen"
        :routesPure="routesPure"/>
      <router-view class="content"></router-view>
    </div> -->
</el-container>
</template>

<script>
/* globals localStorage */
import { mapGetters } from 'vuex'
// import { fetch } from '@/utils/api'
// import { getMenus } from '@/utils/auth'

import Navbar from './Navbar'
import Topbar from './Topbar'

export default {
  components: {
    Navbar,
    Topbar
  },
  data () {
    return {
      routesPure: [{
        id: 0,
        label: '系统管理',
        url: '/manager',
        icon: 'cog',
        type: 'MODULE'
      }, {
        id: 1,
        parentId: 0,
        label: '用户管理',
        url: '/manager/account',
        icon: '',
        type: 'PAGE'
      }, {
        id: 2,
        label: '业务办理',
        url: '/business',
        icon: 'search',
        type: 'MODULE'
      }, {
        id: 3,
        parentId: 2,
        label: '业务办理1',
        url: '/business/business1',
        icon: '',
        type: 'PAGE'
      }],
      realName: 'Admin',
      data: {
        'id': 1,
        'loginName': 'sa',
        'name': 'Admin',
        'menus': []
      }
    }
  },
  created () {
    // fetch({
    //   method: 'get',
    //   url: 'rbac/user/get'
    // }).then(response => {
    //   this.realName = response.name
    //   localStorage.realname = response.name
    //   this.routesPure = response.menus.filter(item => item.type !== 'BUTTON').map(item => {
    //     return {
    //       ...item,
    //       isOpen: false,
    //       isActive: false
    //     }
    //   })
    //   localStorage.actions = response.menus.filter(item => item.type === 'BUTTON').map(item => {
    //     return item.url
    //   })
    // })
  },
  computed: {
    ...mapGetters([
      'isOpen'
    ])
  },
  motheds: {
    toggleNav: function () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped lang="sass">
</style>
