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
    },
    min: Number,
    max: Number
  },
  computed: {
    currentValue: {
      get () {
        if (this.type === 'number') {
          return this.value || 0
        } else {
          return this.value
        }
      },
      set (val) {
        if (this.type === 'remoteSelect') {
          if (val !== '') {
            this.$emit('changeValues', this.queryDatas.find(item => val === item[this.column.property]), this.values.id)
          } else {
            this.$emit('changeValues', {}, this.values.id)
          }
        } else {
          this.$emit('changeValues', this.queryDatas.find(item => val === item[this.column.property]), this.values.id)
          this.$emit('input', val)
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
