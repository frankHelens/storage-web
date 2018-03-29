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
  el-select(
    clearable
    v-else-if="type === 'select'"
    v-model="currentValue")
    el-option(
      v-for="(item, index) in options"
      :key="index"
      :label="item.label"
      :value="item.value")
  InputNumber(
    v-else-if="type === 'number'"
    :min="min"
    :max="max"
    v-model="currentValue")
</template>

<script>
export default {
  props: {
    value: String | Number,
    name: String,
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
    },
    min: Number,
    max: Number,
    index: Number
  },
  computed: {
    currentValue: { // 双向绑定数据
      get () {
        if (this.type === 'number') {
          return this.value || 0
        } else {
          return this.value
        }
      },
      set (val) {
        if (this.type === 'remoteSelect') {
          const { remoteName } = this.column.tableForm
          if (val !== '') {
            const value = this.queryDatas.find(item => val === item[remoteName])
            this.$emit('changeValues', {...this.values, ...value}, this.index)
          } else {
            this.$emit('changeValues', {}, this.index)
          }
        } else {
          this.$emit('changeValues', this.queryDatas.find(item => val === item[this.name]), this.index)
          this.$emit('input', val)
        }
        if (this.column.tableForm.chains) {
          const { chains } = this.column.tableForm
          chains.map(chain => {
            this.$emit('changeChain', {
              name: this.name,
              value: this.column.tableForm.dataType === 'number' ? Number(val) : val,
              chain,
              index: this.index,
              values: this.values,
              column: this.column
            })
          })
        }
      }
    }
  },
  data () {
    return {
      loading: false,
      remoteOptions: [],
      queryDatas: []
    }
  },
  methods: {
    remoteFunc (val) { // 远程查询方法
      this.loading = true
      const { remoteName } = this.column.tableForm
      if (val) {
        setTimeout(() => {
          this.$get({
            url: this.remoteResource,
            params: {
              filterBy: remoteName + '|like|' + val
            }
          })
          .then(data => {
            this.loading = false
            if (data) {
              this.remoteOptions = data.data.map(item => {
                return {
                  value: item[remoteName],
                  label: item[remoteName]
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
