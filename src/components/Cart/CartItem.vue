<template>
  <li class="cart-item clearfix">
    <div class="cart-item-left">
      <slot name="left"></slot>
    </div>
    <div class="cart-item-right">
      <div class="cart-item-right-content">
        <slot name="right"></slot>
        <el-input-number
          v-model="number"
          @change="handleChange"
          :max="max"
          :min="1">
        </el-input-number>
        <span class="close" @click="handleClose">×</span>
      </div>
      <slot name="unit"></slot>
    </div>
  </li>
</template>

<script>
export default {
  name: 'cart-item',
  components: {
  },
  props: {
    title: {
      type: String,
      default: '购物车'
    },
    max: {
      type: Number
    },
    num: {
      type: Number,
      default: 1
    },
    id: {
      type: Number | String
    }
  },
  data () {
    return {
      number: this.num
    }
  },
  watch: {
    num (value) {
      this.number = value
    }
  },
  computed: {
  },
  methods: {
    handleClose (e) {
      this.$emit('remove', this.id)
    },
    handleChange (number) {
      this.$emit('changeNum', this.id, number)
    }
  }
}
</script>

<style lang="sass" scoped>
.cart-item
  padding: 18px 0
  border-bottom: 1px solid #eee
.cart-item-left
  float: left
.cart-item-right
  float: right
.cart-item-right-content
  height: 32px
  padding-right: 32px
  position: relative
.close
  cursor: pointer
  position: absolute
  top: 6px
  right: 0
  width: 20px
  height: 20px
  line-height: 18px
  text-align: center
  background: #dbedfb
  color: #fff
  border-radius: 10px
  &:hover
    background: #acdcea
</style>
