<template>
  <div>
    <Dropdown
      trigger="click"
      @on-click="changeTopValue">
      <Badge :count="count">
        <Icon type="ios-bell-outline" size="25"></Icon>
      </Badge>
      <span class="top-title">{{title}}</span>
      <Icon type="arrow-down-b" size="16"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="product in productList"
          :key="product"
          :name="product.url"
        >{{product.label}}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>

/* globals localStorage */
export default {
  name: 'TopMenuItem',
  props: {
  },
  data () {
    return {
      title: '安全库存',
      count: 10,
      productList: [{
        name: 'xx',
        label: '猜测测试正宗椰树牌 - 当前库存： 5',
        url: '/query/list'
      }, {
        name: 'xx',
        label: '正宗椰树牌 - 当前库存： 10',
        url: '/query/list'
      }, {
        name: 'xx',
        label: '正宗椰树牌 - 当前库存： 15',
        url: '/query/list'
      }, {
        name: 'xx',
        label: '正宗椰树牌 - 当前库存： 20',
        url: '/query/list'
      }]
    }
  },
  methods: {
    changeTopValue (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped lang="sass">
.top-title
  font-size: 14px    
  margin-left: 7px
</style>
