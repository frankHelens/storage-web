<template>
<div>
  <div class="screenStyle" v-Clickoutside="handleClose"> 
    <div class="el-button btnStyle" @click="handleOpen">
      <i v-show="isShow" class="el-input__icon is-reverse el-icon-caret-top"></i>
      <i v-show="!isShow" class="el-input__icon is-reverse el-icon-caret-bottom"></i>
      <div type="text" class="el-button__inner">列过滤器</div>
    </div>
    <div class="el-select-dropdown__wrap screenStyle ulWarpStyle" v-show="isShow">
      <ul class="el-select-dropdown__list ulStyle">
        <li class="el-select-dropdown__item" v-for="item in tableFullList">
          <el-checkbox 
            v-model="currentFilter[item]"
            @change="changeListEvent(item)"
            class="checkboxStyle">{{columnsObject[item].label}}
          </el-checkbox>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import Clickoutside from '../../utils/clickoutside'

export default {
  directives: {
    Clickoutside
  },
  props: {
    columnsObject: Object,
    tableList: {
      type: Array,
      default: () => []
    },
    tableFullList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    let currentFilter = {}
    this.tableFullList.map(item => {
      currentFilter[item] = this.tableList.indexOf(item) !== -1
    })
    return {
      isShow: false,
      iconState: '',
      currentFilter: currentFilter,
      afterChangeList: []
    }
  },
  methods: {
    handleOpen () {
      this.isShow = !this.isShow
    },
    handleClose () {
      this.isShow = false
    },
    changeListEvent () {
      this.afterChangeList = []
      for (var key in this.currentFilter) {
        if (this.currentFilter[key] === true) {
          this.afterChangeList.push(key)
        }
      }
      this.$emit('grandSonEvent', this.afterChangeList)
    }}
}
</script>

<style scoped lang="sass">
.screenStyle
  width: 200px
.btnStyle 
  width: 100%
  position: relative
.ulWarpStyle
  position: absolute
  z-index: 11
  max-height: 274px
  overflow: auto
  border-radius: 2px
  box-shadow: 0px 3px 5px  #d1dbe5
  border: 1px solid #d1dbe5
  margin: 5px 0px
.ulStyle 
  position: relative;
  background-color: #ffffff 
.ulStyle li:hover
  background-color: #e4e8f1
.checkboxStyle 
  display: block
</style>
