<template lang="pug">
  .form-table-main(v-if="hasData")
    SmartForm(
      inline
      :formList="formList"
      :columns="columnsList"
      :values="values"
      @changeFormValue="changeFormValue")
    ButtonList(
      :data="formTableData"
      :buttonList="formTableButtonList")
    FormTable(
      :tableData="tableData"
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

export default {
  components: {
    SmartForm,
    FormTable,
    ButtonList
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableList: {
      type: Array,
      default: () => []
    },
    resource: {
      type: String,
      default: ''
    },
    submitResource: {
      type: String,
      default: ''
    },
    formList: {
      type: Array,
      default: () => []
    },
    tableSubmitList: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Object,
      default: () => {}
    },
    values: {
      type: Object,
      default: () => {}
    },
    formTableColumns: {
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
          fromTable.$post({
            url: submitResource,
            data: postData
          })
          .then(data => {
            if (data) {
              fromTable.$message({
                message: '添加成功！',
                type: 'success'
              })
              fromTable.$router.push('/manage/enterStock')
            }
          })
        }
      }],
      formTableData: {
        base: {},
        tableData: this.tableData
      } // 数据列表
    }
  },
  methods: {
    setPostData (data, submitList) {
      const { tableData, base } = data
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
        this.hasData = true
        // this.getData()
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
    }
  }
}
</script>
