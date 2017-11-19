<template>
  <div class="main">
    <!-- <h2
      v-if="title"
      class="title">
      {{title}}
    </h2> -->
    <div class="table-top clearfix">
      <ButtonList
        ref="buttonList"
        v-if="toolbarList && toolbarList.length > 0"
        class="toolbar"
        :buttonList="toolbarList"
      />
      <slot 
        class="customToolbar"
        name="toolbar">
      </slot>
      <FilterBox
        v-if="filterList && filterList.length > 0 && isFilterShow"
        class="filter-box"
        :columns="columnsList"
        :filterList="filterList"
        :filterBy="filterBy"
        @changeFilterBy="changeFilterBy"
      />
    </div>
    <DataTable
      class="table-wrapper"
      :cid="cid"
      :pid="pid"
      :isTree="isTree"
      :isLoading="isLoading"
      :mainColumn="mainColumn"
      :longColumn="longColumn"
      :tableWrapperWidth="tableWrapperWidth"
      :tableFullList="tableFullList"
      :tableInitList="tableInitList"
      :operationList="operationList"
      :operationWidth="operationWidth"
      :columns="columnsList"
      :tableData="tableData"
      :orderBy="orderBy"
      :isExpand="isExpand"
      :selection="selection"
      :pageStorage="pageStorage"
      @changeOrderBy="changeOrderBy"
      @changeSelection="changeSelection"
    />
    <div
      class="page"
      v-if="!isTree"
      >
      <slot name="info"></slot>
      <el-pagination
        class="pagination"
        layout="total, sizes, prev, pager, next"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="pageSize"
        :current-page="pageIndex"
        :total="recordsFiltered"
        @size-change="pageSizeChange"
        @current-change="pageIndexChange">
      </el-pagination>
    </div>
      <!-- :size="dialogSize" -->
    <el-dialog
      v-if="createDialogShow"
      :visible.sync="createDialogVisible"
      :title="createDialogLabel"
      :width="dialogSize + '%'">
      <smart-form
        class="form"
        labelPosition="right"
        :formList="createList"
        :columns="columnsList"
        :values="createDialogFormValues"
        :formLabelWidth="formLabelWidth"
        :buttonList="createButtonList"
      />
    </el-dialog>
      <!-- :size="dialogSize" -->
    <el-dialog
      v-if="updateDialogShow"
      :title="updateDialogLabel"
      :visible.sync="updateDialogVisible"
      :width="dialogSize + '%'">
      <smart-form
        class="form"
        labelPosition="right"
        :formList="updateList"
        :columns="columnsList"
        :values="updateDialogFormValues"
        :formLabelWidth="formLabelWidth"
        :buttonList="updateFullList"
      />
    </el-dialog>
    <slot></slot>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { fetchList, fetchCreate, fetchUpdate, fetchDelete } from '../../utils/api'
// import md5 from 'md5'
import { fetchList, fetchCreate, fetchUpdate } from '@/utils/api'
import { pinyinInitial } from 'hanyu-pinyin'
import { cloneDeep } from 'lodash'

import VForm from '@/components/VForm'
import SmartForm from '@/components/SmartForm'
import DataTable from '@/components/DataTable'
import ButtonList from '@/components/ButtonList'
import FilterBox from '@/components/FilterBox'

// import { operationEventUpdate, operationEventDelete } from './operationEvent'

export default {
  name: 'DataTablePage',
  components: {
    VForm,
    DataTable,
    ButtonList,
    FilterBox,
    SmartForm
  },
  props: {
    isTree: {
      type: Boolean,
      default: false
    },
    resource: {
      type: String,
      default: ''
    }, /* 标题英文名 */
    // relation: {
    //   type: Boolean,
    //   default: false
    // }, /* 是否有关联数据接口 */
    // relationResource: String,
    title: {
      type: String,
      default: ''
    }, /* 标题英文名 */
    label: {
      type: String,
      default: 'label'
    }, /* 标题英文名 */
    labelName: {
      type: String,
      default: 'label'
    },
    dialogSize: Number,
    toolbar: {
      type: Array,
      default: () => []
    },
    operation: {
      type: Array,
      default: () => []
    },
    operationWidth: {
      type: Number,
      default: 200
    },
    cid: {
      type: String,
      default: 'id'
    }, /* 页面对话框标题 */
    pid: {
      type: String,
      default: 'pid'
    }, /* 页面对话框标题 */
    mainColumn: {
      type: String,
      default: 'label'
    }, /* 标题英文名 */
    longColumn: {
      type: String,
      default: 'label'
    }, /* 标题英文名 */
    columns: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tableFullList: {
      type: Array,
      default: () => []
    },
    tableInitList: {
      type: Array,
      default: () => []
    },
    filterFullList: {
      type: Array,
      default: () => []
    },
    filterInitList: {
      type: Array,
      default: () => []
    },
    printList: {
      type: Array,
      default: () => []
    },
    createList: {
      type: Array,
      default: () => []
    },
    updateList: {
      type: Array,
      default: () => []
    },
    createFormValues: {
      type: Object,
      default: () => {
        return {}
      }
    },
    filterByAlways: {
      type: Array,
      default: () => []
    },
    filterByInit: {
      type: Array,
      default: () => []
    },
    orderByInit: {
      type: Array,
      default: () => []
    },
    formLabelWidth: {
      type: Number,
      default: 100
    },
    isDialogFormColumn: {
      type: Boolean,
      default: false
    },
    tableWidth: {
      type: Number,
      default: 0
    },
    buttonList: {
      type: Array,
      default: () => []
    },
    selection: {
      type: Boolean,
      default: false
    },
    isExpand: Function
  },
  data () {
    // 字段信息
    const that = this
    const columnsList = cloneDeep(this.columns)
    // this.columns.serial = {
    //   label: '序号',
    //   width: 35,
    //   type: 'custom',
    //   customRender (data, full, column, index) {
    //     return index + 1
    //   }
    // }
    const columnsKeys = Object.keys(columnsList)
    columnsKeys.map(key => {
      // columnsList[key].width = columnsList[key].width || 300
      if (columnsList[key].form) {
        columnsList[key].form.size = this.dialogSize >= 50 ? 12 : 24
      }
    })
    const relationKeys = columnsKeys.filter(key => columnsList[key].relation).map(key => columnsList[key].relation)

    return {
      deleteList: [],
      filterList: this.filterInitList,
      isFilterShow: !relationKeys.length,
      relationKeys: relationKeys,
      tableData: [],
      createDialogVisible: false,
      createDialogLabel: '新增' + this.label,
      createDialogButtons: [{
        name: 'submit',
        label: '提交',
        style: 'primary',
        validate: true
      }],
      updateDialogVisible: false,
      updateDialogLabel: '编辑' + this.label,
      updateDialogFormValues: {},
      // createDialogFormValues: {},
      updateDialogButtons: [{
        name: 'submit',
        label: '提交',
        style: 'primary',
        validate: true
      }],
      columnsList: columnsList,
      filterBy: [...this.filterByInit, ...this.filterByAlways],
      orderBy: this.orderByInit,
      pageSize: Number(this.$route.query.pageSize) || 10,
      pageIndex: Number(this.$route.query.pageIndex) || 1,
      recordsFiltered: 0,
      recordsTotal: 0,
      relationList: [],
      isLoading: false,
      createButtonList: [{
        name: 'submit',
        label: '提交',
        type: 'primary',
        validate: true,
        funcProps: {
          el: this
        },
        func (data, props, button) {
          button.loading = true
          that.createFormSubmit(data, button)
        }
      }],
      updateButtonList: [{
        name: 'submit',
        label: '提交',
        type: 'primary',
        validate: true,
        funcProps: {
          el: this
        },
        func (data, props, button) {
          button.loading = true
          that.updateFormSubmit(data, button)
        }
      }]
    }
  },
  watch: {
    pageIndex (to) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          pageIndex: to
        }
      })
    },
    pageSize (to) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          pageSize: to
        }
      })
    },
    resource (val) {
      this.resource = val
      this.getData()
    },
    filterByAlways (val) {
      this.filterBy = [...val]
      this.getData()
    }
  },
  mounted () {
    this.relationKeys.length ? this.getRelation() : this.getData()
  },
  computed: {
    ...mapGetters([
      'isOpen',
      'isHover',
      'treeStorage'
    ]), /* navbar状态获取,影响table宽度 */
    pageStorage () {
      return this.isTree ? this.treeStorage[this.$route.path] : null
    },
    tableWrapperWidth () {
      return this.tableWidth ? this.tableWidth : !this.isOpen && !this.isHover ? document.body.clientWidth - 85 : document.body.clientWidth - 275
    }, /* 影响table宽度计算，和navbar状态相关 */
    createDialogShow () {
      return this.createDialogVisible
    }, /* 判断新增弹窗是否打开 */
    updateDialogShow () {
      return this.updateDialogVisible
    }, /* 判断编辑弹窗是否打开 */
    createColumns () {
      return this.createList.map(key => Object.assign(this.columns[key], {name: key}))
    }, /* 计算新增表单的字段 */
    updateColumns () {
      return this.updateList.map(key => Object.assign(this.columns[key], {name: key}))
    }, /* 计算编辑表单的字段 */
    operationList () {
      return this.operation.map(item => {
        return {
          ...item,
          size: 'mini',
          funcProps: {
            ...item.funcProps,
            table: this
          }
        }
      })
    }, /* 计算table的操作列 */
    toolbarList () {
      return this.toolbar.map(item => {
        return {
          ...item,
          funcProps: {
            ...item.funcProps,
            table: this
          }
        }
      })
    }, /* 计算table的工具栏toolbar */
    updateFullList () {
      return [...this.updateButtonList, ...this.buttonList]
    },
    createDialogFormValues () {
      return this.createFormValues
    }
  },
  methods: {
    changeOrderBy (option) {
      let orderByItem = this.orderBy.find(item => item.name === option.key)
      if (orderByItem) {
        orderByItem.sort = option.order
      } else {
        this.orderBy = [...this.orderBy, {
          name: option.key,
          sort: option.order
        }]
      }
      this.getData()
    },
    changeFilterBy (data) {
      this.filterBy = [...data, ...this.filterByAlways]
      this.getData()
    },
    getRelation (value) {
      this.isLoading = true
      fetch({
        url: '/relation',
        params: {
          relationList: this.relationKeys.join(',')
        }
      })
      .then((data) => {
        Object.keys(this.columnsList).map(key => {
          const relation = this.columnsList[key].relation
          if (data[relation]) {
            this.columnsList[key].options = [...this.columnsList[key].optionsInit || [], ...data[relation]].map(option => {
              const label = option[this.columnsList[key].labelName || 'label']
              const subtext = pinyinInitial(label)
              return {
                value: option.value !== undefined ? option.value : option.id,
                label,
                subtext,
                ...option
              }
            })
          }
        })
        this.isLoading = false
        this.isFilterShow = true
        this.$emit('getRelation', this.columnsList)
        this.getData()
      }).catch(() => {
        this.isLoading = false
      })
    }, /* 获取当前资源所关联的数据，并填到对应的列里 */
    pageSizeChange (value) {
      this.pageSize = value
      this.pageIndex = 1
      this.getData()
    }, /* 每页显示记录数的修改函数 */
    pageIndexChange (value) {
      this.pageIndex = value
      this.getData()
    }, /* 当前页码的修改函数 */
    getData () {
      this.tableData = []
      this.isLoading = true
      fetchList({
        resource: this.resource,
        orderBy: this.orderBy.map(item => item.name + '|' + item.sort).join(';'),
        filterBy: this.filterBy.map(item => {
          if (Object.prototype.toString.call(item.value) === '[object Array]') {
            return item.name + '|' + item.type + '|[' + item.value + ']'
          } else {
            return item.name + '|' + item.type + '|' + item.value
          }
        }).join(';'),
        pageSize: this.isTree ? 999999 : this.pageSize,
        pageIndex: this.isTree ? 1 : this.pageIndex
      })
      .then((data) => {
        this.isLoading = false
        this.$emit('getData', data)
        this.tableRender({
          ...data
        })
      }).catch(() => {
        this.isLoading = false
      })
    }, /* 获取数据 */
    tableRender (data) {
      this.tableData = data.data
      this.recordsFiltered = data.recordsFiltered
      this.recordsTotal = data.recordsTotal
    },
    createFormSubmit (data, button) {
      let formValues = {}
      this.createList.map(item => {
        formValues[item] = data[item]
      })
      fetchCreate({
        resource: this.resource,
        data: formValues
      })
      .then(data => {
        if (data) {
          this.$emit('createFormSubmit', data)
          this.getData()
          this.createDialogVisible = false
        }
        button.loading = false
      })
    }, /* 新增表单的提交事件 */
    updateFormSubmit (data, button) {
      let formValues = {}
      this.updateList.map(item => {
        formValues[item] = data[item]
      })
      fetchUpdate({
        resource: this.resource,
        id: data.id,
        data: formValues
      })
      .then(data => {
        if (data) {
          this.$emit('updateFormSubmit', data)
          this.getData()
          this.updateDialogVisible = false
        }
        button.loading = false
      })
    }, /* 编辑表单的提交事件 */
    changeSelection (selectionList) {
      this.deleteList = selectionList.map(item => {
        return item.id
      })
      // 控制删除按钮
      this.$refs.buttonList.$children.find(button => button.name === 'delete').isDisable = !this.deleteList.length
    }
  }
}
</script>

<style scoped lang="sass">
.table-wrapper
  display: flex
  flex-direction: column
  flex: 1
.table-top
  .toolbar
    float: left
    margin-right: 12px
    margin-bottom: 10px
  .filter-box
    float: right
    margin-left: 12px
    margin-bottom: -12px
  .customToolbar
    margin-bottom: 10px
.pagination
  flex: 1
  padding-top: 12px
  text-align: right
</style>
