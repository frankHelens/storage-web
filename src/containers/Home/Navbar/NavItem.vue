<template>
  <li :class="{'open':isOpen, 'active':item.isActive}">
    <template v-if="item.children&&item.children.length">
      <a href="javascript:;" @click="changeOpen()">
        <i v-if="item.icon" :class="['fa', 'fa-' + item.icon]"></i>
        <span class="title">{{item.label}}</span>
        <span class="arrow"></span>
      </a>
      <ul>
        <nav-item
          v-for="(child,index) in item.children"
          :key="index"
          :item="child"
        />
      </ul>
    </template>
    <router-link v-else :to="item.url">
      <i v-if="item.icon" :class="['fa', 'fa-' + item.icon]"></i>
      <span class="title">{{item.label}}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    item: Object
  },
  data () {
    return {
      isOpen: this.item.isOpen
    }
  },
  methods: {
    changeOpen: function () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
