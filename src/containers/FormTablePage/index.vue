<template lang="pug">
  .form-table-main(v-loading="!hasData")
    SmartForm(
      v-if="hasData"
      :formList="formList"
      :columns="columnsList"
      :values="formTableData.base"
      @changeFormValue="changeFormValue")
    .toolbar
      ButtonList(
        :data="formTableData"
        :buttonList="formTableButtonList")
    FormTable(
      v-if="hasData"
      :tableData="formTableData.tableData"
      :tableList="tableList"
      :columns="formTableColumnsList"
      @changeDatas="changeDatas")
</template>

<script>
import SmartForm from '@/components/SmartForm'
import FormTable from '@/components/FormTable'
import { cloneDeep } from 'lodash'
import { fetch } from '@/utils/api'
import ButtonList from '@/components/ButtonList'
import { getRemoteValues } from '@/utils/common'

export default {
  components: {
    SmartForm,
    FormTable,
    ButtonList
  },
  props: {
    tableData: { // 表格数据
      type: Array,
      default: () => []
    },
    tableList: { // 表格列
      type: Array,
      default: () => []
    },
    resource: { // 请求接口
      type: String,
      default: ''
    },
    submitResource: { // 提交接口
      type: String,
      default: ''
    },
    formList: { // 表格上方的基础列
      type: Array,
      default: () => []
    },
    tableSubmitList: { // 表格提交的列
      type: Array,
      default: () => []
    },
    columns: { // 表格上方的基础字段定义
      type: Object,
      default: () => {}
    },
    values: { // 表格上方的基础内容值
      type: Object,
      default: () => {}
    },
    formTableColumns: { // 表格的字段定义
      type: Object,
      default: () => {}
    }
  },
  created () {
    this.getRelation()
  },
  data () {
    const columnsList = cloneDeep(this.columns)
    const formTableColumnsList = cloneDeep(this.formTableColumns)
    return {
      id: this.$route.params.id,
      relationKeys: this.getRelationKeys({...columnsList, ...formTableColumnsList}),
      columnsList: columnsList,
      formTableColumnsList: formTableColumnsList,
      hasData: false,
      formTableButtonList: [{ // 提交
        name: 'formtableSubmit',
        label: '提交',
        funcProps: {
          fromTable: this
        },
        func: (data, {fromTable}) => {
          const { tableSubmitList, submitResource } = fromTable
          const postData = this.setPostData(data, tableSubmitList)
          fromTable.requestData({
            url: submitResource,
            data: postData
          })
          .then(data => {
            if (data) {
              fromTable.$message({
                message: '操作成功！',
                type: 'success'
              })
              fromTable.$router.push('/manage/enterStock')
            }
          })
        }
      }],
      formTableData: {
        base: this.values,
        tableData: this.tableData
      } // 数据列表
    }
  },
  methods: {
    requestData ({url, data}) {
      if (this.id) {
        return this.$put({
          url: url + '/' + this.id,
          data: data
        })
      } else {
        return this.$post({
          url: url,
          data: data
        })
      }
    },
    setPostData (data, submitList) { // 设置提交的数据
      const { tableData, base } = data
      // 删除多余信息
      delete base.enter_stock_detail
      const filterData = tableData.filter(item => Object.keys(item).length > 1)
      const submitTableData = filterData.map(data => {
        let values = {}
        submitList.map(item => {
          values[item] = data[item]
        })
        return values
      })
      return {
        base,
        tableData: submitTableData
      }
    },
    changeFormValue (values) { // 获取form的数据
      this.formTableData.base = values
    },
    changeDatas (list) { // 获取表格form的数据
      this.formTableData.tableData = list
    },
    getRelationKeys (list) { // 获取字典表的key
      const keys = Object.keys(list)
      return keys.filter(key => list[key].relation).map(key => list[key].relation)
    },
    getData (id) { // 获取数据
      this.$get({
        url: this.resource + '/' + id
      })
      .then(data => {
        this.hasData = true
        const tableData = cloneDeep(data).tableData.map(item => {
          return {
            ...getRemoteValues(item.product, this.formTableColumns),
            ...item
          }
        })
        this.formTableData = {
          base: data.base,
          tableData: this.setTableData(tableData)
        }
      })
    },
    getRelation () { // 获取字典表项
      this.hasData = false
      fetch({
        url: 'relation',
        params: {
          relationList: this.relationKeys.join(',')
        }
      })
      .then((data) => {
        this.setOptions(this.columnsList, data)
        this.setOptions(this.formTableColumnsList, data)
        this.$emit('getRelation', this.columnsList)
        if (this.id) {
          this.getData(this.id)
        } else {
          this.formTableData.tableData = this.setTableData()
          this.hasData = true
        }
      }).catch(() => {
      })
    },
    setOptions (columnsList, data) { // 获取的下拉列表
      Object.keys(columnsList).map(key => {
        const relation = columnsList[key].relation
        if (data[relation]) {
          columnsList[key].options = [...columnsList[key].optionsInit || [], ...data[relation]].map(option => {
            const label = option[columnsList[key].labelName || 'label']
            return {
              value: option.value !== undefined ? option.value : option.id,
              label,
              ...option
            }
          })
        }
      })
      return columnsList
    },
    setTableData (list) {
      const resList = list || []
      for (let i = 0; i < (25 - resList.length); i++) {
        resList.push({})
      }
      return resList
    }
  }
}
</script>

<style lang="sass" scoped>
  .toolbar
    height: 40px
  .form-table-main
    min-height: 600px
</style>
