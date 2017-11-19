<template>
  <nav-list
    class='navbar'
    :class="{'navbar-close':!isOpen,'hover': isHover}"
    :data="routesPure"
  />
</template>

<script>
import { mapGetters } from 'vuex'

import NavList from './NavList'

export default {
  name: 'Navbar',
  props: {
    isOpen: Boolean,
    routesPure: Array
  },
  data () {
    return {
      open: '',
      active: ''
    }
  },
  computed: {
    ...mapGetters([
      'isHover'
    ])
  },
  components: {
    NavList
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
  created () {
    const that = this
    this.routes = this.routesPure.map(item => {
      item.isOpen = that.$route.path.indexOf(item.url) !== -1 && that.$route.path !== item.url
      item.isActive = that.$route.path.indexOf(item.url) !== -1
      return item
    })
  }
}
</script>

<style lang="sass">
.navbar
  background-color: #232b38
  margin: 0
  padding: 8px 0
  list-style: none
  line-height: 1.5
  ul
    display: none
    margin: 0
    padding: 8px 0
    list-style: none
    line-height: 1.5
  li
    display: block
    position: relative
    margin: 0
    padding: 0
    border: 0
    >a
      display: block
      position: relative
      margin: 0
      border: 0
      padding: 6px 15px
      text-decoration: none
      font-size: 14px
      font-weight: 300
      color: #a7b6c9
      &:hover
        background: #39414c
      >i
        margin-left: 4px
        margin-right: 4px
        font-size: 18px
      .arrow:before
        position: absolute
        top: 4px
        right: 14px
        width: 20px
        height: auto
        text-align: center
        display: inline
        font-size: 16px
        font-family: FontAwesome
        font-weight: 300
        content: "\f104"
        color: #606C7D
    &.active
      >a
        background: #39414c
    &.open
      >ul
        display: block
      >a>.arrow:before
        content: "\f107"
  ul a
    padding-left: 40px
  ul ul a
    padding-left: 60px
  ul ul ul a
    padding-left: 80px
  >li
    &.active
      >a
        background: #03a9f4
        border-top-color: transparent
        color: #fff
        &:hover
          background: #03a9f4
        .arrow:before
          color: #fff
    >a
      padding: 10px 15px
      border-top: 1px solid #3d4957
      &:hover
        background: #3e4b5c
      .arrow:before
        top: 8px
  &.navbar-close
    >li
      >ul
        display: none
      >a
        padding: 10px 0
        i
          display: inline-block
          margin: 0
          width: 45px
          text-align: center
        .title
          display: none
        .arrow
          display: none
      &.active
        >a
          background: #03a9f4
          border-top-color: transparent
          color: #fff
          &:hover
            background: #03a9f4
          .arrow:before
            color: #fff
    &.hover
      width: 235px
      >li
        &.open
          >ul
            display: block
        >a
          padding: 10px 15px
          i
            display: inline
            margin: 0
            width: 45px
            text-align: center
          .title
            display: inline
          .arrow
            display: inline
        &.active
          >a
            background: #03a9f4
            border-top-color: transparent
            color: #fff
            &:hover
              background: #03a9f4
            .arrow:before
              color: #fff
</style>
