<template>
  <div class="cart">
    <div class="cart-title">
      {{title}}
      <span class="cart-title-num">已添加 {{num}} 项</span>
    </div>
    <ul class="cart-list">
      <slot></slot>
    </ul>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  components: {
  },
  props: {
    title: {
      type: String,
      default: '购物车'
    },
    num: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style lang="sass" scoped>
.cart
  border: 1px solid #ddd
  flex: 1
  display: flex
  flex-direction: column
.cart-title
  padding: 0 18px
  font-size: 18px
  line-height: 48px
  background: #20a0ff
  color: #fff
.cart-title-num
  float: right
  font-size: 14px
.cart-list
  padding: 0 18px
  overflow: auto
  flex: 1
  display: flex
  flex-direction: column
.cart-footer
  height: 100px
  background: #20a0ff
</style>
