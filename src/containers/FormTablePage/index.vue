<template lang="pug">
  .form-table-main(v-loading="!hasData")
    .toolbar
      ButtonList(
        :data="formTableData"
        :buttonList="formTableButtonList")
      slot(name="toolbar")
        ImportantInfo.important-info(
          :infoList="toolbarList"
          :formValues="infoValues"
          :columns="columnsList")
    SmartForm(
      v-if="hasData"
      ref="smartForm"
      :formList="formList"
      :columns="columnsList"
      :values="formTableData.base"
      :formLabelWidth="80"
      @changeFormValue="changeFormValue")
    FormTable(
      v-if="hasData"
      :tableData="formTableData.tableData"
      :tableList="tableList"
      :columns="formTableColumnsList"
      @changeDatas="changeDatas"
      @getSumsPrice="getSumsPrice")
</template>

<script>
import SmartForm from '@/components/SmartForm'
import FormTable from '@/components/FormTable'
import ImportantInfo from '@/components/ImportantInfo'
import { cloneDeep } from 'lodash'
import { fetch } from '@/utils/api'
import ButtonList from '@/components/ButtonList'
import { getRemoteValues } from '@/utils/common'

export default {
  components: {
    SmartForm,
    FormTable,
    ButtonList,
    ImportantInfo
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
      default: () => ({})
    },
    values: { // 表格上方的基础内容值
      type: Object,
      default: () => ({})
    },
    formTableColumns: { // 表格的字段定义
      type: Object,
      default: () => ({})
    },
    toolbarList: {
      type: Array,
      default: () => []
    },
    toolbarValues: {
      type: Object,
      default: () => ({})
    },
    formTableButtons: {
      type: Array,
      default: () => []
    },
    formTableValues: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getRelation()
  },
  watch: {
    $route (to) {
      const { id } = to.params
      if (id) {
        this.id = id
        this.getData(id)
      }
    }
  },
  data () {
    const columnsList = cloneDeep(this.columns)
    const formTableColumnsList = cloneDeep(this.formTableColumns)
    // 判断是否显示
    return {
      id: this.$route.params.id,
      relationKeys: this.getRelationKeys({...columnsList, ...formTableColumnsList}),
      columnsList: columnsList,
      formTableColumnsList: formTableColumnsList,
      hasData: false,
      formTableData: {
        base: this.values,
        tableData: this.tableData
      }, // 数据列表
      infoValues: this.toolbarValues
    }
  },
  computed: {
    formTableButtonList () {
      const customFormTableButtonList = this.$route.params.id ? this.formTableButtons : []
      return [{ // 提交
        name: 'formtableSubmit',
        label: '保存',
        funcProps: {
          formTable: this
        },
        func: (data, {formTable}) => {
          const { tableSubmitList, submitResource, $refs } = formTable
          // 验证
          $refs.smartForm.$refs.form.validate((valid) => {
            if (valid) {
              const postData = this.setPostData(data, tableSubmitList)
              formTable.requestData({
                url: submitResource,
                data: postData
              })
              .then(data => {
                if (data) {
                  formTable.$message({
                    message: '操作成功！',
                    type: 'success'
                  })
                  const { path, params } = formTable.$route
                  if (params.id) {
                    this.getRelation()
                  } else {
                    formTable.$router.push(path + '/' + data)
                  }
                }
              })
            } else {
              return false
            }
          })
        }
      }, ...customFormTableButtonList]
    }
  },
  methods: {
    requestData ({url, data}) { // 请求接口
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
      const filterData = tableData.filter(item => {
        return item.code || item.productName
      })
      const submitTableData = filterData.map(data => {
        let values = {}
        submitList.map(item => {
          values[item] = data[item]
        })
        return values
      })
      return {
        base: {
          ...this.infoValues,
          ...base
        },
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
        this.$emit('getData', data)
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
        this.infoValues = {
          ...this.infoValues,
          ...data.base
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
        this.$emit('getRelation', this.formTableColumnsList)
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
        resList.push(this.formTableValues)
      }
      return resList
    },
    getSumsPrice (values) { // 业务需求，添加总金额
      this.infoValues.deliveryPrice = values
      this.infoValues.enterPrice = values
    }
  }
}
</script>

<style lang="sass" scoped>
  .toolbar
    height: 40px
    display: flex
    justify-content: space-between
    .important-info
      width: 500px
      line-height: 32px
  .form-table-main
    min-height: 600px
</style>
