<template>
  <ButtonList
    v-if="buttonList.length>0"
    :buttonList="buttonList"
    :data="data"
  />
  <span v-else>
    -
  </span>
</template>

<script>
import ButtonList from '@/components/ButtonList'

export default {
  name: 'v-operation',
  components: {
    ButtonList
  },
  props: {
    operationList: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    buttonList () {
      return this.operationList.map(operation => {
        return {
          ...operation,
          funcProps: {
            ...operation.funcProps,
            id: this.data.id
          }
        }
      })
    }
  }
}
</script>
