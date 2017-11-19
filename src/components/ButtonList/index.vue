<template>
  <div class="button-wrap">
    <ButtonItem
      v-for="button in buttons"
      :key="button.name"
      :name="button.name"
      :size="button.size"
      :type="button.type"
      :icon="button.icon"
      :label="button.label"
      :disabled="button.disabled"
      :data="data"
      :funcProps="button.funcProps"
      :func="button.func"
    />
  </div>
</template>

<script>
import ButtonItem from './ButtonItem.vue'
export default {
  name: 'buttonList',
  components: {
    ButtonItem
  },
  props: {
    buttonList: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    buttons () {
      return this.buttonList.filter(button => {
        return !button.isShow || button.isShow(this.data, button)
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.button-wrap
  vertical-align: top
</style>
