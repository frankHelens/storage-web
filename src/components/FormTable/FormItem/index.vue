<template lang="pug">
  el-input(
    clearable
    v-if="type === 'input'"
    v-model="currentValue")
  el-select(
    clearable
    v-else-if="type === 'remoteSelect'"
    v-model="currentValue"
    :filterable="filterable"
    :loading="loading"
    remote
    :remote-method="remoteFunc")
    el-option(
      v-for="(item, index) in remoteOptions"
      :key="index"
      :label="item.label"
      :value="item.value")
  //- el-date-picker(
  //-   v-else-if="type === 'date'"
  //-   type="date"
  //-   v-model="currentValue")
</template>

<script>
export default {
  props: {
    value: String | Number,
    type: {
      type: String,
      default: 'input'
    },
    filterable: {
      type: Boolean,
      default: true
    },
    remoteResource: {
      type: String,
      default: '/product'
    },
    values: {
      type: Object,
      default: () => ({})
    },
    column: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('changeValues', this.queryDatas.find(item => val === item[this.column.property]), this.values.id)
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      loading: false,
      remoteOptions: this.options,
      queryDatas: []
    }
  },
  methods: {
    remoteFunc (val) {
      this.loading = true
      const { property } = this.column
      if (val) {
        setTimeout(() => {
          this.$get({
            url: this.remoteResource,
            params: {
              filterBy: property + '|like|' + val
            }
          })
          .then(data => {
            this.loading = false
            if (data) {
              this.remoteOptions = data.data.map(item => {
                return {
                  value: item[property],
                  label: item[property]
                }
              })
              this.queryDatas = data.data
            } else {
              this.remoteOptions = []
            }
          })
        }, 500)
      }
    }
  }
}
</script>
