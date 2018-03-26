<template>
  <div>
    <Dropdown
      trigger="click"
      @on-click="changeTopValue">
      <Badge :count="productList.length - 1">
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
  created () {
    this.$get({
      url: '/product/safe'
    })
    .then(data => {
      const dataList = data.data.map(item => {
        const { code, productNum, name } = item
        return {
          label: code + '-' + name + '：' + productNum
        }
      })
      this.productList = [{
        label: '全部',
        url: '/base/safeList'
      }, ...dataList]
    })
  },
  data () {
    return {
      title: '安全库存',
      count: 0,
      productList: []
    }
  },
  methods: {
    changeTopValue (url) {
      console.log(url)
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
