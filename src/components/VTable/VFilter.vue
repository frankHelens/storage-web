<template>
  <div>
    <el-input v-if="column.filter.type === 'input'" @change="inputEvent" :value="value" />
    <el-select
      v-else-if="column.filter.type === 'select'"
      v-model="value"
      placeholder="请选择"
      :filterable="column.live"
      :filter-method="filterMethod"
      @change="selectEvent">
      <!-- :filter-method="liveFilter" -->
      <el-option
        v-for="option in options"
        v-if="option.show"
        :key="option.value"
        :label="option.label"
        :value="option.value">
      </el-option>
    </el-select>
    <el-date-picker
      v-if="column.filter.type === 'dateRange'"
      v-model="value"
      type="daterange"
      placeholder="选择日期范围"
      @change="dataPickerEvent"
      >
    </el-date-picker>
    <div 
      v-if="column.filter.type === 'digitRange'" 
      class="digit-input el-date-editor el-input">
      <input 
        type="text" 
        class="minStyle digit-input_inner el-input__inner" 
        @change="minDigitEvent"
        v-bind:value="value"/>
      <div class="digit_input_center digit-input_inner">-</div>
      <input 
        type="text"
        class="maxStyle digit-input_inner el-input__inner"
        @change="maxDigitEvent"
        :value="value"/>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import moment from 'moment'
export default {
  name: 'v-filter',
  props: {
    column: Object,
    searchQuery: Array
  },
  data () {
    const options = this.column.options ? [{
      id: '',
      value: '',
      label: '全部',
      subtext: 'qb'
    }, ...this.column.options].map(option => {
      return {
        ...option,
        value: option.value || option.id,
        show: true
      }
    }) : []
    return {
      fullOptions: options,
      options: options,
      search: this.searchQuery,
      searchQueryIsDirty: false,
      isCalculating: false,
      value: ''
    }
  },
  computed: {
    searchIndicator () {
      if (this.isCalculating) {
        return 'loading'
      } else if (this.searchQueryIsDirty) {
        return 'typing'
      } else {
        return 'done'
      }
    }
  },
  methods: {
    filterMethod (text) {
      if (this.options.some(option => option.label === text)) {
        this.options = this.fullOptions.map(option => {
          return {
            ...option,
            show: true
          }
        })
      } else {
        this.options = this.fullOptions.map(option => {
          return {
            ...option,
            show: option.label.indexOf(text) >= 0 || option.subtext.indexOf(text) >= 0
          }
        })
      }
    },
    inputEvent: debounce(function (value) {
      this.searchQueryIsDirty = true
      this.search = value === '' ? [] : [{
        name: this.column.name,
        type: this.column.filter.like ? 'like' : 'equalto',
        value: value
      }]
      this.filterEvent()
    }, 500),
    selectEvent (value) {
      this.searchQueryIsDirty = true
      if (value !== '') {
        this.search = [{
          name: this.column.name,
          type: 'equalto',
          value: value
        }]
      } else {
        this.search = []
      }
      this.filterEvent()
    },
    dataPickerEvent (value) {
      var valueArr = value.split(' - ')
      this.searchQueryIsDirty = true
      if (value !== '') {
        this.search = [{
          name: this.column.name,
          type: 'greaterthanorequalto',
          value: moment(valueArr[0]).format('x')
        }, {
          name: this.column.name,
          type: 'lessthanorequalto',
          value: moment(valueArr[1]).endOf('day').format('x')
        }]
      } else {
        this.search = []
      }
      this.filterEvent()
    },
    liveFilter (value) {

    },
    minDigitEvent: debounce(function (e) {
      if (e.srcElement.value !== '') {
        this.search = [{
          name: this.column.name,
          type: 'greaterthanorequalto',
          value: moment(e.srcElement.value).format('x')
        }]
      } else {
        this.search = []
      }
      this.filterEvent()
    }, 500),
    maxDigitEvent: debounce(function (e) {
      if (e.srcElement.value !== '') {
        this.search = [{
          name: this.column.name,
          type: 'lessthanorequalto',
          value: moment(e.srcElement.value).format('x')
        }]
      } else {
        this.search = []
      }
      this.filterEvent()
    }, 500),
    filterEvent () {
      this.isCalculating = true
      this.$emit('filterBy', this.column, this.search)
      setTimeout(function () {
        this.isCalculating = false
        this.searchQueryIsDirty = false
      }.bind(this), 1000)
    }
  }
}
</script>

<style scoped lang="sass">
th
  text-align: left
.minStyle
  flex: 1
  border-top-right-radius: 0
  border-bottom-right-radius: 0
.maxStyle
  flex: 1
  border-top-left-radius: 0
  border-bottom-left-radius: 0
.digit-input_inner
  width: 40%
  float: left
.digit_input_center
  width: 20%
  height: 36px
  line-height: 36px
  text-align: center
  background-color: #bfcbd9
</style>
